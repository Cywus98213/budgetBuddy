<template>
  <div class="wrapper">
    <div class="header">
      <h1 class="header-title">Budget.</h1>
    </div>
    <div class="budget-header">
      <mainBudgetCard />
    </div>
    <div class="budget-main">
      <div
        v-for="(expenseCategory, index) in expenseCategories"
        :key="index"
        class="budgetplan"
      >
        <budgetPlanCard
          :category="expenseCategory"
          :expenses="expenseData[expenseCategory]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import mainBudgetCard from "../components/budget/mainbudgetCard.vue";
import budgetPlanCard from "../components/budget/budgetPlanCard.vue";
export default {
  components: {
    mainBudgetCard,
    budgetPlanCard,
  },
  data() {
    return {
      expenseData: {}, // initialize empty object to store expenses for each category
      expenseCategories: ["Groceries", "Entertainment", "Personal", "Other"], // expense categories to display
    };
  },
  methods: {
    getUserbudget() {
      axios
        .get("http://localhost:3000/budget")
        .then((res) => {
          console.log(res);
          // loop through each expense category and filter out the expenses that match the category
          for (const category of this.expenseCategories) {
            this.expenseData[category] = res.data.filter(
              (expense) => expense.Category === category
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getUserbudget();
  },
};
</script>

<style scoped>
.wrapper {
  padding: 1rem;
}
.header-title {
  font-family: "ClashDisplay", sans-serif;
  font-size: 2rem;
}
.budget-header {
  max-width: 100%;
  margin: 0.5rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.budget-main {
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  gap: 0.6rem;
  max-height: calc(100vh - 18rem);
}

@media screen and (min-width: 767px) {
  .budget-main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (min-width: 1022px) {
  .budget-main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
