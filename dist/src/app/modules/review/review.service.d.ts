import { IReviewCreatePayload } from './review.interface.js';
export declare const ReviewServices: {
    createReview: (customerId: string, payload: IReviewCreatePayload) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        customerId: string;
        bookingId: string;
        rating: number;
        comment: string | null;
    }>;
};
//# sourceMappingURL=review.service.d.ts.map