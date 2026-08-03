# FixItNow API

Home-services marketplace backend (Node.js + Express + TypeScript + Prisma + PostgreSQL).

Three roles: **CUSTOMER**, **TECHNICIAN**, **ADMIN**.

## Mandatory submission info

| Item | Value |
|------|--------|
| Backend Repo | https://github.com/rimi-1234/FixItNow |
| Frontend Repo | https://github.com/rimi-1234/fixit-frontend |
| Live API | https://fix-it-now-123.vercel.app |
| API Docs (Swagger) | https://fix-it-now-123.vercel.app/api-docs |
| Live Frontend | https://fixit-frontend-umber.vercel.app |
| Postman Collection | [`FixItNow.postman_collection.json`](./FixItNow.postman_collection.json) |
| Demo Video | _(add Loom / Drive link — see frontend [`VIDEO_EXPLANATION_GUIDE.md`](https://github.com/rimi-1234/fixit-frontend/blob/main/VIDEO_EXPLANATION_GUIDE.md))_ |
| Admin Email | `admin@fixitnow.com` |
| Admin Password | `Admin@1234` |

### Seed accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@fixitnow.com` | `Admin@1234` |
| Technician | `technician@fixitnow.com` | `tech123` |
| Customer | `customer@fixitnow.com` | `customer123` |

## Quick start

```bash
npm install
cp .env.example .env   # fill in secrets
npx prisma migrate deploy
npm run db:seed
npm run dev
```

- API: `http://localhost:5000`
- Health: `http://localhost:5000/health`
- Swagger: `http://localhost:5000/api-docs`

### Environment

| Variable | Purpose |
|---|---|
| `APP_URL` | This API’s public base URL (Stripe/SSLCommerz callbacks). Deployed: `https://fix-it-now-123.vercel.app` |
| `FRONTEND_URL` | Next.js web app URL for Checkout success/cancel redirects. Deployed: `https://fixit-frontend-umber.vercel.app` |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_ACCESS_SECRET` | JWT signing secret |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | Stripe test keys |
| `SSLCOMMERZ_*` | SSLCommerz sandbox credentials |

`FRONTEND_URL` must point at the **web app**, not this API domain — otherwise payment success redirects loop or land on the wrong host.

### Stripe webhooks (local)

```bash
npm run stripe:webhook
```

Copy the printed `whsec_...` into `.env` as `STRIPE_WEBHOOK_SECRET`, then restart the API.

## Response format

Success:

```json
{ "success": true, "message": "...", "data": {} }
```

Error:

```json
{ "success": false, "message": "...", "errorDetails": {} }
```

## Main modules

| Module | Base path |
|--------|-----------|
| Auth | `/api/auth` (register returns `accessToken` + user) |
| Services | `/api/services` (public list) |
| Technicians | `/api/technicians` |
| Categories | `/api/categories` |
| Bookings | `/api/bookings` |
| Payments | `/api/payments` (Stripe + SSLCommerz) |
| Reviews | `/api/reviews` |
| Admin | `/api/admin` |

## Payment

- **Stripe Checkout** — `POST /api/payments/create` with `{ "bookingId", "provider": "STRIPE" }` returns `gatewayUrl`
- **SSLCommerz** — same endpoint with `"provider": "SSLCOMMERZ"`
- Webhook: `POST /api/payments/confirm`
- Browser return: `/payment/success` and `/payment/cancel` (redirect to `FRONTEND_URL` when configured)
- Status tracked on `Payment` (`PENDING` / `COMPLETED` / `FAILED`) and booking (`PAID`)

Test card: `4242 4242 4242 4242`

## Booking status flow

`REQUESTED` → `ACCEPTED` / `DECLINED` → `PAID` → `IN_PROGRESS` → `COMPLETED`  
(or `CANCELLED` before `IN_PROGRESS`)

## Docs for testing

- [POSTMAN_TESTING.md](./POSTMAN_TESTING.md)
- [POSTMAN_STEP_BY_STEP.md](./POSTMAN_STEP_BY_STEP.md)
