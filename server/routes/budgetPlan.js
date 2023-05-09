if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const express = require("express");
const budgetPlan = require("./routes/budgetPlan");
const router = express.Router();

module.exports = router;
