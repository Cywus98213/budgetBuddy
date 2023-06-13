const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savingPlanSchema = new Schema({
  SavingGoalName: {
    type: String,
    required: true,
  },
  SavingGoalCurrentAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  SavingGoalTarget: {
    type: Number,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("SavingPlan", savingPlanSchema);
