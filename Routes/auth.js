const express = require("express");
const { User } = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const route = express();
require("dotenv").config();

route.use(express.json());

route.post("/", async (req, res) => {
  try {

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY, {
          expiresIn: "7d",
        });
        const response = {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: token,
        };
        return res.json(response);
      } else {
        return res.status(401).send({ message: "Invalid Email or Password" });
      }
    } else {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;