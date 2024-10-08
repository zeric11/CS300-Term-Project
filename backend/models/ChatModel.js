const mongoose = require("mongoose");


const chatModel = mongoose.Schema({
        chatName: { type: String, trim: true },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);


module.exports = mongoose.model("Chat", chatModel);

