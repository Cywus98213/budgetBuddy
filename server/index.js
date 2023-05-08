if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Expenses = require("./models/expenses");

const PORT = process.env.PORT || 3000;

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/budgetbuddy";

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/history", async (req, res) => {
  const expenses = await Expenses.find({});
  res.status(200).json(expenses);
});

app.get("/budget", async (req, res) => {
  const expenses = await Expenses.find({});
  res.status(200).json(expenses);
});

app.post("/budget", async (req, res) => {
  console.log(req.body);
  const newExpense = new Expenses(req.body);
  await newExpense.save();
  console.log(newExpense);
  res.status(200).json(newExpense);
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
