const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
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
});

module.exports = mongoose.model("Incomes", incomeSchema);
