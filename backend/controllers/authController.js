// authController.js

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            console.log("User already exists:", email);
            return res.status(400).json({ msg: "User already exists" });
        }
        user = new User({
            username,
            email,
            password,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const token = generateJwtToken(user.id);
        res.json({ token });
    } catch (err) {
        console.error("Error registering user:", err.message);
        res.status(500).send("Server Error");
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = generateJwtToken(user.id);
        res.status(200).json({ token });
    } catch (err) {
        console.error("Error logging in user:", err.message);
        res.status(500).send("Server Error");
    }
};

function generateJwtToken(userId) {
    const payload = {
        user: {
            id: userId,
        },
    };
    return jwt.sign(payload, "jwtSecret", { expiresIn: 3600 });
}