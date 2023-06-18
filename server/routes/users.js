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
const IncomePlan = require("../models/incomePlan");
const Expenses = require("../models/expenses");
const Income = require("../models/incomes");
const SavingPlan = require("../models/savingPlan");
const moment = require("moment");

const PrivateKey = process.env.PRIVATE_KEY;

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, PrivateKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

router.post("/register", async (req, res) => {
  try {
    const { Email, Username, Password } = req.body;

    // Check if user already exists

    User.find().then((users) => {
      users.forEach((user) => {
        if (user.Email === Email) {
          return res.status(400).json({ error: "Email already exists" });
        }
        if (user.Username === Username) {
          return res.status(400).json({ error: "Username already exists" });
        }
      });
    });

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
  try {
    const { Username, Password } = req.body;
    const currentDate = new Date();

    // const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    // console.log(ip); // The user's IP address

    // Perform IP geolocation to determine the user's approximate location
    // You can use third-party APIs or libraries to perform IP geolocation

    // Based on the location, determine the appropriate time zone and send it to the client
    // const timeZone = "America/New_York"; // Example time zone
    // res.send(timeZone);

    // Find user by email
    const user = await User.findOne({ Username: Username });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }

    // Compare password using bcrypt
    const passwordMatches = await bcrypt.compare(Password, user.Hashedpassword);

    // Check if password is correct
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid password" });
    }
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, PrivateKey, {
      expiresIn: "3h",
    });

    // Respond with JWT

    res.status(200).json({
      message: "Login Successful, Redirecting...",
      token: token,
      userId: user.id,
    });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id/budget", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: "BudgetPlan",
        model: "BudgetPlan",
        populate: {
          path: "Expenses",
          model: "Expense",
        },
      })
      .populate({
        path: "SavingPlan",
        model: "SavingPlan",
      });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:id/budget", verifyToken, async (req, res) => {
  try {
    const { inputTitle, inputAmount, inputCategory, inputDate } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const parseDate = moment(inputDate).format("YYYY-MM-DD");

    const expense = new Expenses({
      Title: inputTitle,
      Amount: inputAmount,
      Category: inputCategory,
      Date: parseDate,
      creator: req.params.id,
    });

    await expense.save();

    user.Balance -= inputAmount;

    const budgetPlan = await BudgetPlan.findOne({ Category: inputCategory });

    if (!budgetPlan) {
      return res.status(404).json({ error: "Budget Plan not found." });
    } else {
      budgetPlan.Expenses.push(expense);
      budgetPlan.Amount += inputAmount;
    }

    await budgetPlan.save();

    user.Expenses.push(expense);

    await user.save();

    res.status(200).json({ message: "Expense added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id/history", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: "Expenses",
        model: "Expense",
      })
      .populate({
        path: "Incomes",
        model: "Income",
      });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:id/budgetplan", verifyToken, async (req, res) => {
  try {
    const { Category, LimitAmount } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingBudgetPlan = await BudgetPlan.findOne({ Category: Category });

    if (existingBudgetPlan) {
      return res.status(400).json({ error: "Budget Plan already exists" });
    }

    const budgetPlan = new BudgetPlan({
      Category: Category,
      LimitAmount: LimitAmount,
      Expenses: [],
      creator: req.params.id,
    });

    await budgetPlan.save();

    user.BudgetPlan.push(budgetPlan);

    await user.save();
    res.status(200).json({ message: "Budget Plan added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id/budgetplan/:budgetplanid", verifyToken, async (req, res) => {
  const budgetPlan = await BudgetPlan.findById(
    req.params.budgetplanid
  ).populate("Expenses");

  if (!budgetPlan) {
    return res.status(404).json({ error: "Budget Plan not found" });
  }

  res.status(200).send(budgetPlan);
});

router.put("/:id/budgetplan/:budgetplanid", verifyToken, async (req, res) => {
  try {
    const { Amount, LimitAmount } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

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
    try {
      const budgetPlan = await BudgetPlan.findById(req.params.budgetplanid);
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!budgetPlan) {
        return res.status(404).json({ error: "Budget Plan not found" });
      }

      await BudgetPlan.findByIdAndDelete(req.params.budgetplanid);

      user.BudgetPlan.pull(budgetPlan);

      await user.save();

      res.status(200).json({ message: "Budget Plan deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/:id/income", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("IncomePlan");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id/income/:incomeplanid", verifyToken, async (req, res) => {
  try {
    const incomePlan = await IncomePlan.findById(req.params.incomeplanid);
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!incomePlan) {
      return res.status(404).json({ error: "Income Plan not found" });
    }

    user.IncomePlan.pull(incomePlan);

    await IncomePlan.findByIdAndDelete(req.params.incomeplanid);

    await user.save();

    res.status(200).json({ message: "Income Plan deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:id/income", verifyToken, async (req, res) => {
  try {
    const {
      IncomeSource,
      IncomeAmount,
      IncomeFrequency,
      IncomeDate,
      IncomeCategory,
    } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const todayDate = moment().format("YYYY-MM-DD");
    const parsedDate = moment(IncomeDate).format("YYYY-MM-DD");

    const incomePlan = new IncomePlan({
      IncomeName: IncomeSource,
      IncomeAmount: IncomeAmount,
      IncomeFrequency: IncomeFrequency,
      IncomeDate: parsedDate,
      IncomeCategory: IncomeCategory,
      creator: user._id,
    });

    user.IncomePlan.push(incomePlan);

    if (moment(parsedDate).isSameOrBefore(todayDate)) {
      user.Balance += IncomeAmount;
      incomePlan.status = "processed";

      const income = new Income({
        Title: IncomeSource,
        Amount: IncomeAmount,
        Category: IncomeCategory,
        Date: parsedDate,
        creator: user._id,
      });

      user.Incomes.push(income);

      await income.save();
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

router.get("/:id/account", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "BudgetPlan",
      populate: {
        path: "Expenses",
        model: "Expense",
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete(
  "/:id/budgetplan/:budgetplanid/expense/:expenseid",
  verifyToken,
  async (req, res) => {
    try {
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
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/:id/profile", verifyToken, async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).send(user);
});

router.get("/:id/savingplan", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("SavingPlan");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:id/savingplan", async (req, res) => {
  try {
    const { SavingGoalName, SavingGoalTarget } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const savingPlan = new SavingPlan({
      SavingGoalName: SavingGoalName,
      SavingGoalTarget: SavingGoalTarget,
      creator: req.params.id,
    });

    user.SavingPlan.push(savingPlan);

    await user.save();

    await savingPlan.save();

    res.status(200).json({ message: "Saving Plan added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id/savingplan", verifyToken, async (req, res) => {
  try {
    const { depositAmount, savingplanId } = req.body;
    const user = await User.findById(req.params.id);
    const savingPlan = await SavingPlan.findById(savingplanId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    if (!savingPlan) {
      res.status(404).json({ error: "Saving Plan not found" });
    }

    user.Balance -= depositAmount;
    savingPlan.SavingGoalCurrentAmount += depositAmount;

    await user.save();
    await savingPlan.save();

    res.status(200).json({ message: "Saving Plan updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete(
  "/:id/savingplan/:savingplanid",
  verifyToken,
  async (req, res) => {
    try {
      const { id, savingplanid } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const savingPlan = await SavingPlan.findById(savingplanid);

      if (!savingPlan) {
        return res.status(404).json({ error: "Saving Plan not found" });
      }

      user.SavingPlan.pull(savingplanid);

      user.Balance += savingPlan.SavingGoalCurrentAmount;

      await SavingPlan.findByIdAndDelete(savingplanid);

      await user.save();

      res.status(200).json({ message: "Saving Plan deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
