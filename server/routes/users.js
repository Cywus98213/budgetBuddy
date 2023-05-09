if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const PrivateKey = process.env.PRIVATE_KEY;

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { Email, Username, Password } = req.body;
  try {
    // Hash password using bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(Password, saltRounds);

    // Create new user document
    const user = new User({
      Email: Email,
      Username: Username,
      Hashedpassword: passwordHash,
    });

    // Save new user document to database
    await user.save();

    // Respond with success message
    res.json({ message: "User registered successfully" });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { Username, Password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ Username: Username });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password using bcrypt
    const passwordMatches = await bcrypt.compare(Password, user.Hashedpassword);

    // Check if password is correct
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email or password" });
    } else {
      res.status(200);
    }
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, PrivateKey, {
      expiresIn: "1h",
    });

    // Respond with JWT
    res.json({ token: token, userId: user.id });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
