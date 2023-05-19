const mongoose = require("mongoose");
const Expense = require("./expenses");
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

budgetPlanSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Expense.deleteMany({
      _id: {
        $in: doc.Expenses,
      },
    });
  }
});

module.exports = mongoose.model("BudgetPlan", budgetPlanSchema);
