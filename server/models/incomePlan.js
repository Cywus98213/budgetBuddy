const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomePlanSchema = new Schema({
  IncomeName: {
    type: String,
    required: true,
  },
  IncomeAmount: {
    type: Number,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  IncomeDate: {
    type: String,
    required: true,
  },
  IncomePerviousExcutedDate: {
    type: String,
  },
  IncomeFrequency: {
    type: String,
    enum: ["Weekly", "Bi-weekly", "Monthly", "One-time"],
    required: true,
  },
  IncomeCategory: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["scheduled", "processed"],
    default: "scheduled",
  },
});

module.exports = mongoose.model("IncomePlan", incomePlanSchema);
