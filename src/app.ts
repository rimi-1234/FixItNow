import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import router from "./app/routes/index.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { swaggerSpec } from "./app/docs/swagger.js";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// ─── Error Handling ──────────────────────────────────────────────────────────
app.use(globalErrorHandler);
app.use(notFound);

export default app;