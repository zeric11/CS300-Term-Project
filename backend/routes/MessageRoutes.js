const express = require("express");
const { protect } = require("../middleware/Authentication");
const asyncHandler = require("express-async-handler");
const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
const Chat = require("../models/ChatModel");

const router = express.Router();

// Get all Messages
router.route("/:chatId").get(protect, asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "username")
            .populate("chat");
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}));

// Create New Message
router.route("/").post(protect, asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Message.create(newMessage);
        message = await message.populate("sender", "username");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "username",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}));

// Delete an existing message.
router.route("/").delete(asyncHandler(async(req, res) => {
    const { _id } = req.body;
    try {
        const response = await Message.deleteOne({ _id })
        res.status(200).json(response);
    } catch(error) {
        res.status(400);
        throw new Error(error.message);
    }
}));


module.exports = router;