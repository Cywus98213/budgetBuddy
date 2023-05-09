const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetPlanSchema = new Schema({
  Category: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    default: 0,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  Expense: [
    {
      type: Schema.Types.ObjectId,
      ref: "Expenses",
    },
  ],
  LimitAmount: {
    type: Number,
    default: 0,
    required: true,
  },
});

const BudgetPlan = mongoose.model("BudgetPlan", budgetPlanSchema);

module.exports = BudgetPlan;
