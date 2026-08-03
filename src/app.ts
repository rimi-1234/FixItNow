import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import router from "./app/routes/index.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { swaggerSpec } from "./app/docs/swagger.js";
import { PaymentServices } from "./app/modules/payment/payment.service.js";
import config from "./config/index.js";
import { paymentResultHtml } from "./utils/payment-result-html.js";

const app: Application = express();

app.use(cors());

// Stripe webhooks require the raw, unparsed request body to verify the
// signature — this MUST be registered before the global JSON body parser,
// otherwise the body will already be consumed/parsed as JSON by the time
// it reaches the payment route.
app.use("/api/payments/confirm", express.raw({ type: "application/json" }));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// ─── Swagger API Docs ────────────────────────────────────────────────────────
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "FixItNow API Docs",
    swaggerOptions: { persistAuthorization: true },
  })
);

// ─── API Routes ──────────────────────────────────────────────────────────────
app.use("/api", router);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "FixItNow API",
    data: {
      health: "/health",
      docs: "/api-docs",
      apiBase: "/api",
      examples: {
        services: "/api/services",
        categories: "/api/categories",
        authLogin: "POST /api/auth/login",
      },
    },
  });
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "FixItNow API is running",
    data: {
      status: "healthy",
      timestamp: new Date().toISOString(),
      docs: "/api-docs",
    },
  });
});

// Known deployed web app URL — used as a safety-net fallback whenever
// FRONTEND_URL is misconfigured to point at this API's own domain. Without
// this, dashboard/booking links would point back at the API (which has no
// /dashboard routes) and 404, or worse, redirect to itself forever.
const KNOWN_FRONTEND_FALLBACK = "https://fixit-frontend-umber.vercel.app";

function requestOrigin(req: Request) {
  const proto = (req.get("x-forwarded-proto") ?? req.protocol ?? "https").split(",")[0];
  const host = req.get("host") ?? "";
  return `${proto}://${host}`.replace(/\/$/, "");
}

function sameHost(a: string, b: string) {
  if (!a || !b) return false;
  if (a === b) return true;
  try {
    return new URL(a).host === new URL(b).host;
  } catch {
    return false;
  }
}

function frontendBase(req: Request) {
  const configured = (config.frontend_url || config.app_url || "").replace(/\/$/, "");
  const origin = requestOrigin(req);
  if (configured && sameHost(configured, origin)) return KNOWN_FRONTEND_FALLBACK;
  return configured || KNOWN_FRONTEND_FALLBACK;
}

function shouldRedirectToFrontend(req: Request, front: string) {
  if (!front) return false;

  // Never redirect to ourselves — a misconfigured FRONTEND_URL pointing at this
  // same API domain would otherwise cause an infinite redirect loop.
  const origin = requestOrigin(req);
  if (sameHost(front, origin)) return false;

  const appUrl = (config.app_url || "").replace(/\/$/, "");
  if (appUrl && front !== appUrl) return true;
  const host = req.get("host") ?? "";
  if (front.includes("localhost:3000") && !host.includes("3000")) return true;
  return false;
}

// Stripe / SSLCommerz browser redirects — prefer the web app when configured.
app.get("/payment/success", async (req: Request, res: Response) => {
  const bookingIdQuery = typeof req.query.bookingId === "string" ? req.query.bookingId : "";
  const sessionId = typeof req.query.session_id === "string" ? req.query.session_id : "";

  let synced = false;
  let bookingId = bookingIdQuery;

  if (sessionId) {
    try {
      const result = await PaymentServices.syncCheckoutSessionPaid(sessionId);
      synced = result.synced;
      if (result.bookingId) bookingId = result.bookingId;
    } catch (err) {
      console.error("Failed to sync Stripe Checkout session:", err);
    }
  }

  const front = frontendBase(req);
  if (shouldRedirectToFrontend(req, front)) {
    const params = new URLSearchParams();
    if (bookingId) params.set("bookingId", bookingId);
    if (sessionId) params.set("session_id", sessionId);
    return res.redirect(302, `${front}/payment/success?${params.toString()}`);
  }

  const dash = bookingId
    ? `${front}/dashboard/customer/bookings/${bookingId}`
    : `${front}/dashboard/customer`;

  res.status(200).send(
    paymentResultHtml({
      variant: "success",
      title: synced ? "Payment successful" : "Payment received",
      subtitle: synced
        ? "Your booking is marked paid. You can return to FixItNow or close this tab."
        : "We're finishing confirmation. Check your bookings in a moment.",
      bookingId: bookingId || undefined,
      statusLine: synced ? "Status: PAID / COMPLETED" : "Status: pending sync",
      primaryHref: dash || undefined,
      primaryLabel: bookingId ? "View booking" : "Open dashboard",
      secondaryHref: front || undefined,
      secondaryLabel: front ? "Back to FixItNow" : undefined,
    })
  );
});

app.get("/payment/cancel", (req: Request, res: Response) => {
  const bookingId = typeof req.query.bookingId === "string" ? req.query.bookingId : "";
  const front = frontendBase(req);

  if (shouldRedirectToFrontend(req, front)) {
    const params = new URLSearchParams();
    if (bookingId) params.set("bookingId", bookingId);
    const q = params.toString();
    return res.redirect(302, `${front}/payment/cancel${q ? `?${q}` : ""}`);
  }

  const retry = bookingId
    ? `${front}/dashboard/customer/bookings/${bookingId}/pay`
    : `${front}/dashboard/customer`;

  res.status(200).send(
    paymentResultHtml({
      variant: "cancel",
      title: "Payment cancelled",
      subtitle: "No charge was made. You can try again whenever you're ready.",
      bookingId: bookingId || undefined,
      primaryHref: retry || undefined,
      primaryLabel: bookingId ? "Try again" : "Open dashboard",
      secondaryHref: bookingId
        ? `${front}/dashboard/customer/bookings/${bookingId}`
        : front || undefined,
      secondaryLabel: bookingId ? "View booking" : "Back to FixItNow",
    })
  );
});

app.get("/payment/fail", (req: Request, res: Response) => {
  const front = frontendBase(req);
  if (shouldRedirectToFrontend(req, front)) {
    return res.redirect(302, `${front}/payment/cancel`);
  }

  res.status(200).send(
    paymentResultHtml({
      variant: "fail",
      title: "Payment failed",
      subtitle: "Something went wrong with checkout. You can try again from your booking.",
      primaryHref: front ? `${front}/dashboard/customer` : undefined,
      primaryLabel: "Open dashboard",
      secondaryHref: front || undefined,
      secondaryLabel: front ? "Back to FixItNow" : undefined,
    })
  );
});

// ─── Error Handling ──────────────────────────────────────────────────────────
app.use(notFound);
app.use(globalErrorHandler);

export default app;
