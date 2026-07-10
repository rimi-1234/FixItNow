export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'FixItNow API',
    version: '1.0.0',
    description: `
## FixItNow — Home Services Marketplace API

A RESTful backend API where **Customers** browse & book home services, **Technicians** manage jobs, and **Admins** oversee the platform.

### Authentication
All protected routes require a Bearer JWT token in the Authorization header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

### Admin Credentials (pre-seeded)
- **Email:** admin@fixitnow.com
- **Password:** Admin@1234

### Demo Credentials
- **Technician:** technician@fixitnow.com / tech123
- **Customer:** customer@fixitnow.com / customer123
    `,
    contact: { name: 'FixItNow Support', email: 'admin@fixitnow.com' },
  },
  servers: [
    { url: 'http://localhost:5000/api', description: 'Local Development' },
    { url: 'https://your-api.vercel.app/api', description: 'Production' },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Something went wrong' },
          errorDetails: { type: 'object' },
        },
      },
      SuccessResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { type: 'object' },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['email', 'password', 'role'],
        properties: {
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          password: { type: 'string', minLength: 6, example: 'pass1234' },
          role: { type: 'string', enum: ['CUSTOMER', 'TECHNICIAN'], example: 'CUSTOMER' },
          skills: { type: 'array', items: { type: 'string' }, example: ['Plumbing', 'AC Repair'], description: 'Required if role is TECHNICIAN' },
          experience: { type: 'integer', example: 3, description: 'Years of experience (TECHNICIAN only)' },
          hourlyRate: { type: 'number', example: 25.0, description: 'Hourly rate in USD (TECHNICIAN only)' },
          bio: { type: 'string', example: 'Expert plumber with 3 years experience' },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'admin@fixitnow.com' },
          password: { type: 'string', example: 'Admin@1234' },
        },
      },
      BookingCreate: {
        type: 'object',
        required: ['technicianId', 'serviceId', 'scheduledTime'],
        properties: {
          technicianId: { type: 'string', format: 'uuid' },
          serviceId: { type: 'string', format: 'uuid' },
          scheduledTime: { type: 'string', format: 'date-time', example: '2026-07-15T10:00:00Z' },
        },
      },
      PaymentCreate: {
        type: 'object',
        required: ['bookingId'],
        properties: {
          bookingId: { type: 'string', format: 'uuid', description: 'Must be an ACCEPTED booking' },
        },
      },
      ReviewCreate: {
        type: 'object',
        required: ['bookingId', 'rating'],
        properties: {
          bookingId: { type: 'string', format: 'uuid', description: 'Must be a COMPLETED booking' },
          rating: { type: 'integer', minimum: 1, maximum: 5, example: 5 },
          comment: { type: 'string', example: 'Great service, very professional!' },
        },
      },
      BookingStatusUpdate: {
        type: 'object',
        required: ['status'],
        properties: {
          status: {
            type: 'string',
            enum: ['ACCEPTED', 'DECLINED', 'IN_PROGRESS', 'COMPLETED'],
            example: 'ACCEPTED',
          },
        },
      },
      UserStatusUpdate: {
        type: 'object',
        required: ['status'],
        properties: {
          status: { type: 'string', enum: ['ACTIVE', 'BANNED'], example: 'BANNED' },
        },
      },
      CategoryCreate: {
        type: 'object',
        required: ['name', 'slug'],
        properties: {
          name: { type: 'string', example: 'Painting' },
          slug: { type: 'string', example: 'painting' },
        },
      },
      ServiceCreate: {
        type: 'object',
        required: ['name', 'description', 'price', 'categoryId'],
        properties: {
          name: { type: 'string', example: 'Wall Painting' },
          description: { type: 'string', example: 'Professional interior wall painting' },
          price: { type: 'number', example: 150.0 },
          categoryId: { type: 'string', format: 'uuid' },
        },
      },
      AvailabilityUpdate: {
        type: 'object',
        required: ['availability'],
        properties: {
          availability: {
            type: 'array',
            items: { type: 'string' },
            example: ['Monday 9AM-5PM', 'Wednesday 10AM-4PM', 'Saturday 8AM-2PM'],
          },
        },
      },
    },
  },
  paths: {
    // ─── AUTH ───────────────────────────────────────────
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register new user (Customer or Technician)',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/RegisterRequest' } } },
        },
        responses: {
          201: { description: 'User registered successfully' },
          400: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          409: { description: 'Email already in use' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login and receive JWT',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } },
        },
        responses: {
          200: { description: 'Login successful, returns accessToken + user info' },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Get current authenticated user profile',
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'Current user profile' },
          401: { description: 'Unauthorized' },
        },
      },
    },

    // ─── SERVICES ────────────────────────────────────────
    '/services': {
      get: {
        tags: ['Services (Public)'],
        summary: 'Browse all services with optional filters',
        parameters: [
          { name: 'category', in: 'query', schema: { type: 'string' }, description: 'Filter by category name' },
          { name: 'minPrice', in: 'query', schema: { type: 'number' }, description: 'Minimum price' },
          { name: 'maxPrice', in: 'query', schema: { type: 'number' }, description: 'Maximum price' },
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Search by service name' },
        ],
        responses: { 200: { description: 'List of services' } },
      },
      post: {
        tags: ['Services (Public)'],
        summary: 'Create a service (Technician only)',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ServiceCreate' } } },
        },
        responses: {
          201: { description: 'Service created' },
          403: { description: 'Forbidden' },
        },
      },
    },

    // ─── TECHNICIANS ─────────────────────────────────────
    '/technicians': {
      get: {
        tags: ['Technicians (Public)'],
        summary: 'Browse all technicians with filters',
        parameters: [
          { name: 'skill', in: 'query', schema: { type: 'string' }, description: 'Filter by skill (e.g. Plumbing)' },
          { name: 'minExperience', in: 'query', schema: { type: 'integer' }, description: 'Min years of experience' },
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Search by email' },
        ],
        responses: { 200: { description: 'List of technicians with profiles & services' } },
      },
    },
    '/technicians/{id}': {
      get: {
        tags: ['Technicians (Public)'],
        summary: 'Get technician profile with services and reviews',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Technician profile' },
          404: { description: 'Technician not found' },
        },
      },
    },

    // ─── CATEGORIES ──────────────────────────────────────
    '/categories': {
      get: {
        tags: ['Categories (Public)'],
        summary: 'Get all service categories',
        responses: { 200: { description: 'List of categories' } },
      },
    },

    // ─── BOOKINGS ────────────────────────────────────────
    '/bookings': {
      post: {
        tags: ['Bookings'],
        summary: 'Create a booking (Customer only)',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/BookingCreate' } } },
        },
        responses: {
          201: { description: 'Booking created with status REQUESTED' },
          400: { description: 'Validation error' },
          403: { description: 'Forbidden — Customer role required' },
        },
      },
      get: {
        tags: ['Bookings'],
        summary: "Get current customer's bookings",
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'List of bookings with payment & review status' } },
      },
    },
    '/bookings/{id}': {
      get: {
        tags: ['Bookings'],
        summary: 'Get specific booking details',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Booking details' },
          403: { description: 'Access denied' },
          404: { description: 'Booking not found' },
        },
      },
    },

    // ─── PAYMENTS ────────────────────────────────────────
    '/payments/create': {
      post: {
        tags: ['Payments (Stripe)'],
        summary: 'Create Stripe payment intent for an ACCEPTED booking',
        description: 'Returns a `clientSecret` that the frontend uses with Stripe.js to complete payment. The booking must be in ACCEPTED status.',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/PaymentCreate' } } },
        },
        responses: {
          201: {
            description: 'Payment intent created',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Payment intent created successfully. Use clientSecret to confirm payment.',
                  data: { clientSecret: 'pi_xxx_secret_xxx', payment: { id: 'uuid', status: 'PENDING' } },
                },
              },
            },
          },
          400: { description: 'Booking not ACCEPTED or already paid' },
        },
      },
    },
    '/payments/confirm': {
      post: {
        tags: ['Payments (Stripe)'],
        summary: 'Stripe webhook — confirms payment (called by Stripe)',
        description: 'This endpoint receives raw webhook events from Stripe. Do NOT call this manually. Stripe calls it after a successful `payment_intent.succeeded` event.',
        parameters: [{ name: 'stripe-signature', in: 'header', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: '{ received: true }' },
          400: { description: 'Invalid webhook signature' },
        },
      },
    },
    '/payments': {
      get: {
        tags: ['Payments (Stripe)'],
        summary: 'Get payment history for current customer',
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'List of payments with booking details' } },
      },
    },
    '/payments/{id}': {
      get: {
        tags: ['Payments (Stripe)'],
        summary: 'Get specific payment details',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Payment details' },
          404: { description: 'Payment not found' },
        },
      },
    },

    // ─── TECHNICIAN MANAGEMENT ───────────────────────────
    '/technician/profile': {
      put: {
        tags: ['Technician Management'],
        summary: 'Update technician profile (Technician only)',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  skills: { type: 'array', items: { type: 'string' }, example: ['Plumbing', 'Electrical'] },
                  experience: { type: 'integer', example: 5 },
                  hourlyRate: { type: 'number', example: 30 },
                  bio: { type: 'string', example: 'Expert plumber with 5 years of experience' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Profile updated' }, 403: { description: 'Forbidden' } },
      },
    },
    '/technician/availability': {
      put: {
        tags: ['Technician Management'],
        summary: 'Update availability slots (Technician only)',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/AvailabilityUpdate' } } },
        },
        responses: { 200: { description: 'Availability updated' } },
      },
    },
    '/technician/bookings': {
      get: {
        tags: ['Technician Management'],
        summary: "Get all bookings for the logged-in technician",
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'List of incoming bookings' } },
      },
    },
    '/technician/bookings/{id}': {
      patch: {
        tags: ['Technician Management'],
        summary: 'Accept / Decline / Progress / Complete a booking (Technician only)',
        description: `Valid status transitions:
- **REQUESTED → ACCEPTED** or **REQUESTED → DECLINED**
- **PAID → IN_PROGRESS**
- **IN_PROGRESS → COMPLETED**`,
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/BookingStatusUpdate' } } },
        },
        responses: {
          200: { description: 'Booking status updated' },
          400: { description: 'Invalid status transition' },
          403: { description: 'Not your booking' },
        },
      },
    },

    // ─── REVIEWS ─────────────────────────────────────────
    '/reviews': {
      post: {
        tags: ['Reviews'],
        summary: 'Leave a review for a COMPLETED booking (Customer only)',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ReviewCreate' } } },
        },
        responses: {
          201: { description: 'Review submitted' },
          400: { description: 'Booking not completed or already reviewed' },
        },
      },
    },

    // ─── ADMIN ───────────────────────────────────────────
    '/admin/users': {
      get: {
        tags: ['Admin'],
        summary: 'Get all platform users (Admin only)',
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'All users (customers & technicians)' } },
      },
    },
    '/admin/users/{id}': {
      patch: {
        tags: ['Admin'],
        summary: 'Ban or unban a user (Admin only)',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/UserStatusUpdate' } } },
        },
        responses: { 200: { description: 'User status updated' }, 404: { description: 'User not found' } },
      },
    },
    '/admin/bookings': {
      get: {
        tags: ['Admin'],
        summary: 'Get all bookings platform-wide (Admin only)',
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'All platform bookings' } },
      },
    },
    '/admin/categories': {
      get: {
        tags: ['Admin'],
        summary: 'Get all categories (Admin only)',
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'All service categories' } },
      },
      post: {
        tags: ['Admin'],
        summary: 'Create a new service category (Admin only)',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CategoryCreate' } } },
        },
        responses: { 201: { description: 'Category created' } },
      },
    },
  },
  tags: [
    { name: 'Auth', description: 'Registration, Login, and Profile' },
    { name: 'Services (Public)', description: 'Browse services — no auth required' },
    { name: 'Technicians (Public)', description: 'Browse technicians — no auth required' },
    { name: 'Categories (Public)', description: 'Service categories — no auth required' },
    { name: 'Bookings', description: 'Customer booking management' },
    { name: 'Payments (Stripe)', description: 'Stripe payment integration' },
    { name: 'Technician Management', description: 'Technician profile, availability & job management' },
    { name: 'Reviews', description: 'Post-job reviews by customers' },
    { name: 'Admin', description: 'Admin-only platform management endpoints' },
  ],
};
