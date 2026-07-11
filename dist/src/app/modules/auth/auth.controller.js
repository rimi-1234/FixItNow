import catchAsync from '../../../utils/catchAsync.js';
import { AuthServices } from './auth.service.js';
const registerUser = catchAsync(async (req, res) => {
    const result = await AuthServices.registerUser(req.body);
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result
    });
});
const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: result
    });
});
const getMe = catchAsync(async (req, res) => {
    const user = req.user;
    const result = await AuthServices.getMeFromDB(user.email);
    res.status(200).json({
        success: true,
        message: "User profile retrieved successfully",
        data: result
    });
});
export const AuthControllers = {
    registerUser,
    loginUser,
    getMe,
};
//# sourceMappingURL=auth.controller.js.map