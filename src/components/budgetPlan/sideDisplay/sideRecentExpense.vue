<template>
  <div class="side-display-wrapper">
    <h1>Recent Expenses:</h1>
    <div class="Cards-container">
      <ExpensesCard
        v-for="expense in Expenses"
        :expenseDate="expense.Date"
        :expenseTitle="expense.Title"
        :expenseAmount="expense.Amount"
        :expenseId="expense._id"
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
  methods: {},
};
</script>
<style scoped>
.side-display-wrapper {
  background-color: var(--primary-component-bg);
  border-radius: var(--radius);
  padding: 1rem;
  height: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.side-display-wrapper h1 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
.Cards-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 40vh;
  padding: 0 1rem 0 0;
  overflow-y: scroll;
}
</style>
