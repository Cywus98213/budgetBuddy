const cron = require("node-cron");
const User = require("../models/users");
const moment = require("moment");
const income = require("../models/incomes");

// const dailyIncomePlanCheck = cron.schedule("0 0 * * *", () => {
//   try {
//     const todayDate = moment().format("YYYY-MM-DD");
//     User.find().then((users) => {
//       users.forEach((user) => {
//         user.IncomePlan.forEach((plan) => {
//           if (plan.status === "schedule") {
//             if (moment(plan.IncomeDate).isSame(todayDate)) {
//               user.Balance += plan.IncomeAmount;
//               plan.status = "processed";

//               const newIncome = new income({
//                 Title: plan.IncomeName,
//                 Amount: plan.IncomeAmount,
//                 creator: user._id,
//                 Date: plan.IncomeDate,
//                 Category: plan.IncomeCategory,
//               });

//               newIncome.save();
//               user.Incomes.push(newIncome);
//               plan.save();
//               user.save();
//             }
//           }
//         });
//       });
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

const testing = cron.schedule("* * * * *", () => {
  try {
    const todayDate = moment().format("YYYY-MM-DD");
    User.find().then((users) => {
      users.forEach((user) => {
        console.log("--------------------");
        console.log(`User Check ${user._id}`);
        if (user.IncomePlan.length === 0) {
          console.log("User Dont have any Income Plan");
          return;
        }
        user.IncomePlan.forEach((plan) => {
          console.log(`Status Check ${plan._id}`);
          if (plan.status === "scheduled") {
            console.log("Status Check Passed");
            if (moment(plan.IncomeDate).isSame(plan.IncomeDate)) {
              user.Balance += plan.IncomeAmount;
              plan.status = "processed";
              const newIncome = new income({
                Title: plan.IncomeName,
                Amount: plan.IncomeAmount,
                creator: user._id,
                Date: plan.IncomeDate,
                Category: plan.IncomeCategory,
              });
              newIncome.save();
              user.Incomes.push(newIncome);
              plan.save();
              user.save();
              console.log("Excuted");
            }
          }
        });
      });
    });
    console.log("1 Minute Passed");
  } catch (err) {
    console.log(err);
  }
});

module.exports = { testing };
