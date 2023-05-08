const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpensesSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  //   creator: {
  //     type: Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  Amount: {
    type: Number,
    default: 0,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
});

const Expenses = mongoose.model("Expenses", ExpensesSchema);

module.exports = Expenses;
