const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Hashedpassword: {
    type: String,
    required: true,
  },
  Balance: {
    type: Number,
    default: 0,
    required: true,
  },
  BudgetPlan: [
    {
      type: Schema.Types.ObjectId,
      ref: "BudgetPlan",
    },
  ],
  IncomePlan: [
    {
      type: Schema.Types.ObjectId,
      ref: "IncomePlan",
    },
  ],
  Expenses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
