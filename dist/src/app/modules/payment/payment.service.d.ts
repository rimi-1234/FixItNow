import { PaymentProvider } from '@prisma/client';
export declare const PaymentServices: {
    createPaymentIntent: (customerId: string, bookingId: string, provider?: PaymentProvider) => Promise<{
        provider: "STRIPE";
        gatewayUrl: string;
        sessionId: string;
        payment: {
            id: string;
            status: import("@prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            bookingId: string;
            transactionId: string | null;
            amount: number;
            method: string;
            provider: import("@prisma/client").$Enums.PaymentProvider;
            paidAt: Date | null;
        };
    } | {
        provider: "SSLCOMMERZ";
        gatewayUrl: string;
        payment: {
            id: string;
            status: import("@prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            bookingId: string;
            transactionId: string | null;
            amount: number;
            method: string;
            provider: import("@prisma/client").$Enums.PaymentProvider;
            paidAt: Date | null;
        };
    }>;
    confirmPayment: (rawBody: Buffer | string, sig: string) => Promise<{
        received: boolean;
    }>;
    syncCheckoutSessionPaid: (sessionId: string) => Promise<{
        synced: boolean;
        paymentStatus: "no_payment_required" | "unpaid";
        bookingId: string | null;
        payment?: undefined;
    } | {
        synced: boolean;
        paymentStatus: "paid";
        bookingId: string | null;
        payment: {
            id: string;
            status: import("@prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            bookingId: string;
            transactionId: string | null;
            amount: number;
            method: string;
            provider: import("@prisma/client").$Enums.PaymentProvider;
            paidAt: Date | null;
        } | null;
    }>;
    validateSslCommerzTransaction: (tranId: string, valId: string) => Promise<{
        id: string;
        status: import("@prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        bookingId: string;
        transactionId: string | null;
        amount: number;
        method: string;
        provider: import("@prisma/client").$Enums.PaymentProvider;
        paidAt: Date | null;
    }>;
    markSslCommerzTransactionFailed: (tranId: string) => Promise<{
        id: string;
        status: import("@prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        bookingId: string;
        transactionId: string | null;
        amount: number;
        method: string;
        provider: import("@prisma/client").$Enums.PaymentProvider;
        paidAt: Date | null;
    } | null>;
    getUserPayments: (customerId: string) => Promise<({
        booking: {
            service: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                price: number;
                categoryId: string;
                technicianId: string;
            };
            technician: {
                id: string;
                email: string;
            };
        } & {
            id: string;
            status: import("@prisma/client").$Enums.BookingStatus;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            customerId: string;
            serviceId: string;
            scheduledTime: Date;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        bookingId: string;
        transactionId: string | null;
        amount: number;
        method: string;
        provider: import("@prisma/client").$Enums.PaymentProvider;
        paidAt: Date | null;
    })[]>;
    getPaymentDetails: (paymentId: string, customerId: string) => Promise<{
        booking: {
            service: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                price: number;
                categoryId: string;
                technicianId: string;
            };
            technician: {
                id: string;
                email: string;
            };
            customer: {
                id: string;
                email: string;
            };
        } & {
            id: string;
            status: import("@prisma/client").$Enums.BookingStatus;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            customerId: string;
            serviceId: string;
            scheduledTime: Date;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        bookingId: string;
        transactionId: string | null;
        amount: number;
        method: string;
        provider: import("@prisma/client").$Enums.PaymentProvider;
        paidAt: Date | null;
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map