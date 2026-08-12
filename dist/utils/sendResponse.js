export const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data || undefined,
        errorDetails: data.errorDetails || undefined,
    });
};
//# sourceMappingURL=sendResponse.js.map