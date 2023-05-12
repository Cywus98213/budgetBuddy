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
  Expenses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
  LimitAmount: {
    type: Number,
    default: 200,
    required: true,
  },
});

module.exports = mongoose.model("BudgetPlan", budgetPlanSchema);
