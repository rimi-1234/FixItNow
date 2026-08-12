import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route.js';
import { ServiceRoutes } from '../modules/service/service.route.js';
import { TechnicianRoutes } from '../modules/technician/technician.route.js';
import { CategoryRoutes } from '../modules/category/category.route.js';
import { BookingRoutes } from '../modules/booking/booking.route.js';
import { PaymentRoutes } from '../modules/payment/payment.route.js';
import { ReviewRoutes } from '../modules/review/review.route.js';
import { AdminRoutes } from '../modules/admin/admin.route.js';
import { ContactRoutes } from '../modules/contact/contact.route.js';
import { BlogRoutes } from '../modules/blog/blog.route.js';
const router = express.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/services',
        route: ServiceRoutes,
    },
    {
        path: '/technicians',
        route: TechnicianRoutes,
    },
    {
        path: '/categories',
        route: CategoryRoutes,
    },
    {
        path: '/bookings',
        route: BookingRoutes,
    },
    {
        path: '/payments',
        route: PaymentRoutes,
    },
    {
        path: '/reviews',
        route: ReviewRoutes,
    },
    {
        path: '/admin',
        route: AdminRoutes,
    },
    {
        path: '/contact',
        route: ContactRoutes,
    },
    {
        path: '/blog',
        route: BlogRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
//# sourceMappingURL=index.js.map