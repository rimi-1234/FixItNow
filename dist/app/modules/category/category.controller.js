import catchAsync from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';
import { CategoryServices } from './category.service.js';
const getAllCategories = catchAsync(async (req, res) => {
    const result = await CategoryServices.getAllCategories();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Categories retrieved successfully',
        data: result,
    });
});
const createCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.createCategory(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Category created successfully',
        data: result,
    });
});
const updateCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.updateCategory(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Category updated successfully',
        data: result,
    });
});
const deleteCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.deleteCategory(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Category deleted successfully',
        data: result,
    });
});
export const CategoryControllers = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=category.controller.js.map