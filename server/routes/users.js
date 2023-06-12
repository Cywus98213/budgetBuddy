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
const schedule = require("node-schedule");
const IncomePlan = require("../models/incomePlan");
const Expenses = require("../models/expenses");

const PrivateKey = process.env.PRIVATE_KEY;

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, PrivateKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

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
    const groceriesPlan = new BudgetPlan({
      Category: "Groceries",
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
    await groceriesPlan.save();
    await entertainmentPlan.save();
    await utilitiesPlan.save();

    user.BudgetPlan.push(groceriesPlan);
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
  const currentDate = new Date();
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

    user.IncomePlan.forEach((incomePlan) => {
      if (incomePlan.status === "processed") {
        return;
      } else if (incomePlan.status === "scheduled") {
        const scheduledDate = new Date(incomePlan.Date);
        if (currentDate.toDateString() === scheduledDate.toDateString()) {
          user.Balance += incomePlan.Amount;
          incomePlan.status = "processed";
        }
      }
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
  const user = await User.findById(req.params.id)
    .populate({
      path: "BudgetPlan",
      populate: {
        path: "Expenses",
        model: "Expense",
      },
    })
    .populate({
      path: "IncomePlan",
      model: "IncomePlan",
    });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  } else {
    res.status(200).send(user);
  }
});

router.post("/:id/budget", verifyToken, async (req, res) => {
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

  user.Balance -= Amount;

  const budgetPlan = await BudgetPlan.findOne({ Category: Category });

  budgetPlan.Expenses.push(expense);
  budgetPlan.Amount += Amount;

  await budgetPlan.save();

  user.Expenses.push(expense);

  await user.save();

  res.status(200).json({ message: "Expense added successfully" });
});

router.get("/:id/history", async (req, res) => {
  const user = await User.findById(req.params.id).populate("Expenses");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  } else {
    res.status(200).send(user);
  }
});

router.post("/:id/budgetplan", verifyToken, async (req, res) => {
  const { Category, LimitAmount, userId } = req.body;
  const user = await User.findById(userId);

  const existingBudgetPlan = user.BudgetPlan.find(
    (budgetPlan) => budgetPlan.Category === Category
  );

  if (existingBudgetPlan) {
    return res.status(400).json({ error: "Budget Plan already exists" });
  }

  const budgetPlan = new BudgetPlan({
    Category: Category,
    LimitAmount: LimitAmount,
    Expenses: [],
    creator: userId,
  });

  await budgetPlan.save();

  user.BudgetPlan.push(budgetPlan);

  await user.save();

  res.status(200).json({ message: "Budget Plan added successfully" });
});

router.get("/:id/budgetplan/:budgetplanid", async (req, res) => {
  const budgetPlan = await BudgetPlan.findById(
    req.params.budgetplanid
  ).populate("Expenses");

  if (!budgetPlan) {
    return res.status(404).json({ error: "Budget Plan not found" });
  }

  res.status(200).send(budgetPlan);
});

router.put("/:id/budgetplan/:budgetplanid", verifyToken, async (req, res) => {
  const { Amount, LimitAmount } = req.body;
  try {
    const budgetPlan = await BudgetPlan.findByIdAndUpdate(
      req.params.budgetplanid,
      {
        Amount: Amount,
        LimitAmount: LimitAmount,
      }
    );
    await budgetPlan.save();
    res.status(200).json({ message: "Budget Plan updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete(
  "/:id/budgetplan/:budgetplanid",
  verifyToken,
  async (req, res) => {
    const budgetPlan = await BudgetPlan.findById(req.params.budgetplanid);
    const user = await User.findById(req.params.id);

    if (!budgetPlan) {
      return res.status(404).json({ error: "Budget Plan not found" });
    }

    user.BudgetPlan.pull(budgetPlan);

    await BudgetPlan.findByIdAndDelete(req.params.budgetplanid);

    res.status(200).json({ message: "Budget Plan deleted successfully" });
  }
);

router.get("/:id/income", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("IncomePlan");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  } else {
    res.status(200).send(user);
  }
});

router.delete("/:id/income/:incomeplanid", verifyToken, async (req, res) => {
  const incomePlan = await IncomePlan.findById(req.params.incomeplanid);
  const user = await User.findById(req.params.id);

  if (!incomePlan) {
    return res.status(404).json({ error: "Income Plan not found" });
  }

  user.IncomePlan.pull(incomePlan);

  await IncomePlan.findByIdAndDelete(req.params.incomeplanid);

  await user.save();

  res.status(200).json({ message: "Income Plan deleted successfully" });
});

router.post("/:id/income", verifyToken, async (req, res) => {
  try {
    const { IncomeSource, IncomeAmount, IncomeFrequency, IncomeDate } =
      req.body;
    const todayDate = new Date();
    const parsedDate = new Date(IncomeDate);
    const user = await User.findById(req.params.id);
    const incomePlan = new IncomePlan({
      IncomeName: IncomeSource,
      IncomeAmount: IncomeAmount,
      IncomeFrequency: IncomeFrequency,
      IncomeDate: parsedDate,
      creator: user._id,
    });

    user.IncomePlan.push(incomePlan);

    if (parsedDate.toDateString() === todayDate.toDateString()) {
      user.Balance += IncomeAmount;
      incomePlan.status = "processed";
    }

    await user.save();

    await incomePlan.save();

    res.status(200).json({ message: "IncomePlan added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }

  // console.log(parsedDate);
  // console.log(parsedDate.getDate());
});

router.get("/:id/account", async (req, res) => {
  const user = await User.findById(req.params.id).populate({
    path: "BudgetPlan",
    populate: {
      path: "Expenses",
      model: "Expense",
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  } else {
    res.status(200).send(user);
  }
});

router.delete(
  "/:id/budgetplan/:budgetplanid/expense/:expenseid",
  verifyToken,
  async (req, res) => {
    const { id, budgetplanid, expenseid } = req.params;
    const budgetPlan = await BudgetPlan.findById(budgetplanid);
    const expense = await Expenses.findById(expenseid);
    const user = await User.findById(id);

    if (!budgetPlan) {
      return res.status(404).json({ error: "Budget Plan not found" });
    }

    budgetPlan.Amount -= expense.Amount;
    user.Balance += expense.Amount;
    user.Expenses.pull(expenseid);

    await BudgetPlan.findByIdAndUpdate(budgetplanid, {
      $pull: { Expenses: expenseid },
    });
    await Expenses.findByIdAndDelete(expenseid);

    await budgetPlan.save();
    await user.save();

    res.status(200).json({ message: "Expense deleted successfully" });
  }
);

router.get("/:id/profile", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).send(user);
});

module.exports = router;
