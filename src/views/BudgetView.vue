<template>
  <div class="wrapper">
    <div class="header">
      <h1 class="header-title">Budget.</h1>
    </div>
    <div class="budget-header">
      <mainBudgetCard />
    </div>
    <div class="budget-main">
      <div class="budgetplan">
        <budgetPlanCard category="Groceries" />
      </div>
      <div class="budgetplan">
        <budgetPlanCard category="Entertainment" />
      </div>
      <div class="budgetplan">
        <budgetPlanCard category="Personal" />
      </div>
    </div>
  </div>
</template>
<script>
import mainBudgetCard from "../components/budget/budgetCard.vue";
import budgetPlanCard from "../components/budget/budgetPlanCard.vue";
export default {
  components: {
    mainBudgetCard,
    budgetPlanCard,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  padding: 1rem;
}
.header-title {
  font-family: "ClashDisplay", sans-serif;
  font-size: 2rem;
}
.budget-header {
  width: 100%;
  margin: 0.5rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.budget-main {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(1, 1fr);
}

@media screen and (min-width: 767px) {
  .budget-main {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (min-width: 1023px) {
  .budget-main {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
