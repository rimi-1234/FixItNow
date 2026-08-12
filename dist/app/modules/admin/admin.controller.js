import catchAsync from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';
import { AdminServices } from './admin.service.js';
const getAllUsers = catchAsync(async (req, res) => {
    const result = await AdminServices.getAllUsers(req.query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Users retrieved successfully',
        data: result,
    });
});
const updateUserStatus = catchAsync(async (req, res) => {
    const { status } = req.body;
    const result = await AdminServices.updateUserStatus(req.params.id, status);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: `User status updated to ${status}`,
        data: result,
    });
});
const getAllBookings = catchAsync(async (req, res) => {
    const result = await AdminServices.getAllBookings(req.query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'All bookings retrieved successfully',
        data: result,
    });
});
export const AdminControllers = {
    getAllUsers,
    updateUserStatus,
    getAllBookings,
};
//# sourceMappingURL=admin.controller.js.map