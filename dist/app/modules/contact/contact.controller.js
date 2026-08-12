import catchAsync from '../../../utils/catchAsync.js';
import { ContactServices } from './contact.service.js';
const createMessage = catchAsync(async (req, res) => {
    const result = await ContactServices.createMessage(req.body);
    res.status(201).json({ success: true, message: 'Message sent successfully', data: result });
});
const getMessages = catchAsync(async (req, res) => {
    const result = await ContactServices.getMessages(req.query);
    res.status(200).json({ success: true, message: 'Messages retrieved', data: result });
});
const markRead = catchAsync(async (req, res) => {
    const result = await ContactServices.markRead(req.params.id);
    res.status(200).json({ success: true, message: 'Marked as read', data: result });
});
export const ContactControllers = { createMessage, getMessages, markRead };
//# sourceMappingURL=contact.controller.js.map