<template>
  <div class="side-display-wrapper">
    <h1>Recent Expenses:</h1>
    <div>
      <ExpensesCard
        v-for="expense in Expenses"
        :Date="expense.Date"
        :Title="expense.Title"
        :Amount="expense.Amount"
      />
    </div>
  </div>
</template>
<script>
import ExpensesCard from "./ExpensesCard.vue";
export default {
  data() {
    return {};
  },
  components: {
    ExpensesCard,
  },
  props: {
    Expenses: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
.side-display-wrapper {
  background-color: var(--primary-component-bg);
  border-radius: var(--radius);
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
