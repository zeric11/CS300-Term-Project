const express = require("express");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const { protect } = require("../middleware/Authentication");

const router = express.Router();

const JWT_SECRET = "JWT Secret";


const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn:"7d"
    });
};

// Create a new user.
router.route("/signup").post(asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        resizeBy.status(400);
        throw new Error("Please Enter all the Fields");
    }

    const userExists = await User.findOne({ username });
    if(userExists) {
        res.status(400);
        throw new Error("\"" + username + "\" is already taken.");
    }

    const user = await User.create({
        username,
        password
    });
    if(user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Failed to Create the User");
    }

}));

// Retrieve an existing user.
router.route("/signin").post(asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid Username or Password");
    }
}));

// Get all users.
router.route("/").get(protect, asyncHandler(async (req, res) => {
    var keyword = {};
    if(req.query.search) {
        keyword = { username: { $regex: req.query.search, $options: "i" } }
    }
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
}));

// Delete an existing user.
router.route("/").delete(asyncHandler(async(req, res) => {
    const { _id } = req.body;
    try {
        const response = await User.deleteOne({ _id });
        res.status(200).json(response);
    } catch(error) {
        res.status(400);
        throw new Error(error.message);
    }
}));


module.exports = router;
