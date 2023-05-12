if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BudgetPlan = require("../models/budgetPlan");
const mongoose = require("mongoose");
const Expenses = require("../models/expenses");

const PrivateKey = process.env.PRIVATE_KEY;

router.post("/register", async (req, res) => {
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

    // Create Default Gorceries Plan
    const foodPlan = new BudgetPlan({
      Category: "Gorceries",
      Amount: 0,
      Expenses: [],
      creator: user._id,
    });

    //Create Default Entertainment Plan
    const entertainmentPlan = new BudgetPlan({
      Category: "Entertainment",
      Amount: 0,
      Expenses: [],
      creator: user._id,
    });

    //Create Default Entertainment Plan
    const utilitiesPlan = new BudgetPlan({
      Category: "Utilities",
      Amount: 0,
      Expenses: [],
      creator: user._id,
    });
    await foodPlan.save();
    await entertainmentPlan.save();
    await utilitiesPlan.save();

    user.BudgetPlan.push(foodPlan);
    user.BudgetPlan.push(entertainmentPlan);
    user.BudgetPlan.push(utilitiesPlan);

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

router.get("/:id/budget", async (req, res) => {
  const user = await User.findById(req.params.id).populate("BudgetPlan");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  } else {
    res.status(200).send(user);
  }
});

router.post("/:id/budget", async (req, res) => {
  const { Title, Amount, Category, Date } = req.body;
  const user = await User.findById(req.params.id);

  const expense = new Expenses({
    Title: Title,
    Amount: Amount,
    Category: Category,
    Date: Date,
    creator: user._id,
  });

  await expense.save();

  const budgetPlan = await BudgetPlan.findOne({ Category: Category });

  budgetPlan.Expenses.push(expense);

  await budgetPlan.save();

  user.Expenses.push(expense);

  await user.save();

  res.status(200).json({ message: "Expense added successfully" });
});

module.exports = router;
