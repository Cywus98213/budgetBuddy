const cron = require("node-cron");
const User = require("../models/users");
const moment = require("moment");
const income = require("../models/incomes");
const incomePlan = require("../models/incomePlan");

// const Monthlytesting = cron.schedule("*/2 * * * *", () => {
//   User.find().then((users) => {
//     users.forEach((user) => {
//       if (user.IncomePlan.length === 0) {
//         console.log("User Dont have any Income Plan");
//         return;
//       }
//       user.IncomePlan.forEach(async (plan) => {
//         const CurrentCheckingPlan = await incomePlan.findById(plan._id);
//         if (CurrentCheckingPlan.IncomeFrequency === "Monthly") {
//           if (moment(CurrentCheckingPlan.IncomeDate).isAfter()){

//           }
//         }
//     });
//   });
// });

// });

const testing = cron.schedule("* * * * *", () => {
  try {
    const todayDate = moment().format("YYYY-MM-DD");
    User.find().then((users) => {
      users.forEach((user) => {
        if (user.IncomePlan.length === 0) {
          console.log("User Dont have any Income Plan");
          return;
        }
        user.IncomePlan.forEach(async (plan) => {
          const CurrentCheckingPlan = await incomePlan.findById(plan._id);
          console.log("--------------------");
          console.log(`User Check ${user._id}`);
          console.log(
            `Status Check ${CurrentCheckingPlan._id}: ${CurrentCheckingPlan.status}`
          );
          if (CurrentCheckingPlan.status === "scheduled") {
            console.log("Status Check Passed");
            if (moment(CurrentCheckingPlan.IncomeDate).isSame(todayDate)) {
              user.Balance += CurrentCheckingPlan.IncomeAmount;
              CurrentCheckingPlan.status = "processed";
              CurrentCheckingPlan.IncomeDate = moment(
                CurrentCheckingPlan.IncomeDate
              ).add(1, "months");

              const newIncome = new income({
                Title: CurrentCheckingPlan.IncomeName,
                Amount: CurrentCheckingPlan.IncomeAmount,
                creator: user._id,
                Date: CurrentCheckingPlan.IncomeDate,
                Category: CurrentCheckingPlan.IncomeCategory,
              });
              newIncome.save();
              user.Incomes.push(newIncome);
              CurrentCheckingPlan.save();
              user.save();
              console.log("Date Matched");
            } else {
              console.log("Date Not Matched");
            }
          } else {
            console.log("Status Check Failed");
          }
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = { testing };
