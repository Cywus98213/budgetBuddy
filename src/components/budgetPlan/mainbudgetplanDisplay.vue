<template>
  <div class="main-display-wrapper">
    <h1 class="main-header">BudgetPlan Overview</h1>
    <h1 class="main-amount">${{ Amount }} / ${{ LimitAmount }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    LimitAmount: {
      type: Number,
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style scoped>
.main-display-wrapper {
  background-color: var(--primary-component-bg);
  border-radius: var(--radius);
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.main-header {
  font-size: 1.2rem;
}
.main-amount {
  font-size: 4rem;
  font-weight: 700;
}
</style>
