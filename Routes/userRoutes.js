const express = require("express");
const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const route = express();
require("dotenv").config();

// @route POST /users
// @description Create New User
// @acess PUBLIC
route.post("/", async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).send({ message: "User already exist" });
        }
        bcrypt.genSalt(Number(process.env.SALT));
        const password = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name,
            email,
            password,
        });
        await newUser.save();
        res.status(200).send({ message: "User created successfully." });
    } catch (error) {
        res.status(500).send({ message: "User Already Exist" });
    }
});


// @route GET /users
// @description Get All User Details
// @acess PUBLIC
route.get("/", async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        res.status(500).send({ error: "Server Error" });
    }
});

module.exports = route;