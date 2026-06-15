import ContactMessage from "../models/ContactMessage.js";
import { trackContactSubmit } from "./analyticsController.js";

export const createContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,
    });

    try {
      await trackContactSubmit(req);
    } catch (analyticsError) {
      console.error(`Failed to track contact_submit: ${analyticsError.message}`);
    }

    res.status(201).json({ message: "Message saved", contactMessage: message });
  } catch (error) {
    next(error);
  }
};

export const getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const updateMessageReadStatus = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: Boolean(req.body.isRead) },
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json(message);
  } catch (error) {
    next(error);
  }
};

export const deleteContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    await message.deleteOne();
    res.json({ message: "Message deleted" });
  } catch (error) {
    next(error);
  }
};
