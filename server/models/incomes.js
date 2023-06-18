const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  Date: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
    default: "Income",
  },
});

module.exports = mongoose.model("Income", incomeSchema);
