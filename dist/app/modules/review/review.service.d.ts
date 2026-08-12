import { IReviewCreatePayload } from './review.interface.js';
import type { IReviewLatestItem } from './review.interface.js';
export declare const ReviewServices: {
    createReview: (customerId: string, payload: IReviewCreatePayload) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        bookingId: string;
        customerId: string;
        rating: number;
        comment: string | null;
    }>;
    getLatestReviews: (limit?: number) => Promise<IReviewLatestItem[]>;
};
//# sourceMappingURL=review.service.d.ts.map