if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const express = require("express");
const router = express.Router();
const Expenses = require("../models/expenses");

module.exports = router;
