export interface IReviewCreatePayload {
    bookingId: string;
    rating: number;
    comment?: string;
}
export interface IReviewLatestQuery {
    limit?: number;
}
export interface IReviewLatestItem {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    customer: {
        id: string;
        email: string;
        name: string | null;
    };
}
//# sourceMappingURL=review.interface.d.ts.map