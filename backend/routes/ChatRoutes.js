const express = require("express");
const asyncHandler = require("express-async-handler");
const Chat = require("../models/ChatModel");
const User = require("../models/UserModel");
const { protect } = require("../middleware/Authentication");

const router = express.Router();

// Fetch all chats for a user
router.route("/").get(protect, asyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("admin", "-password")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "username",
                });
                res.status(200).send(results);
            });
    } catch(error) {
        res.status(400);
        throw new Error(error.message);
    }
}));

// Create New Group Chat
router.route("/create").post(protect, asyncHandler(async (req, res) => {
    if(!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
    }
    var users = JSON.parse(req.body.users);
    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            admin: req.user,
        });
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("admin", "-password");
    
        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}));

// Rename Group
router.route("/rename").put(protect, asyncHandler(async (req, res) => {
    const { chatId, name } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate( chatId, { name: name }, { new: true })
        .populate("users", "-password")
        .populate("admin", "-password");
  
    if(!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
}));

// Remove user from Group
router.route("/remove").put(protect, asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    const removed = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
        .populate("users", "-password")
        .populate("admin", "-password");
  
    if(!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
}));

// Add user to Group / Leave
router.route("/add").put(protect, asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
        .populate("users", "-password")
        .populate("admin", "-password");
  
    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
}));

// Delete an existing chat.
router.route("/").delete(asyncHandler(async(req, res) => {
    const { _id } = req.body;
    try {
        const response = await Chat.deleteOne({ _id })
        res.status(200).json(response);
    } catch(error) {
        res.status(400);
        throw new Error(error.message);
    }
}));


module.exports = router;
