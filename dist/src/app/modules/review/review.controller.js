import catchAsync from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';
import { ReviewServices } from './review.service.js';
const createReview = catchAsync(async (req, res) => {
    const result = await ReviewServices.createReview(req.user.id, req.body);
    sendResponse(res, { statusCode: 201, success: true, message: "Review created successfully", data: result });
});
export const ReviewControllers = {
    createReview
};
//# sourceMappingURL=review.controller.js.map