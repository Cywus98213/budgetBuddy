<template>
  <div class="side-display-wrapper">
    <deleteExpenseModal
      v-if="showDeleteModal"
      @closeform="exitForm"
      @successful="successful"
      :expenseId="expenseId"
      @renderExpenses="renderExpenses"
    />
    <h1>Recent Expenses:</h1>
    <div class="Cards-container">
      <ExpensesCard
        v-if="Expenses.length > 0"
        v-for="(expense, index) in paginatedExpenses"
        :expenseDate="expense.Date"
        :expenseTitle="expense.Title"
        :expenseAmount="expense.Amount"
        :expenseId="expense._id"
        :key="index"
        @renderExpenses="renderExpenses"
        @deleteExpense="deleteExpense"
      />
      <p v-else>No Expenses...</p>
    </div>
    <div class="pagination" v-if="exceedPages">
      <Button
        @click="showPreviousPage"
        :disabled="currentPage === 1"
        :text="'Previous'"
      />

      <span>{{ currentPage }} / {{ pages }}</span>
      <Button
        @click="showNextPage"
        :disabled="currentPage === pages"
        :text="'Next'"
      />
    </div>
  </div>
</template>
<script>
import deleteExpenseModal from "../../budget/budgetModal/Expense/deleteExpenseModal.vue";
import Button from "../../common/Button.vue";
import ExpensesCard from "./ExpensesCard.vue";
export default {
  data() {
    return {
      currentPage: 1,
      expensesPerPage: 5,
      showDeleteModal: false,
      expenseId: "",
    };
  },
  components: {
    ExpensesCard,
    Button,
    deleteExpenseModal,
  },
  props: {
    Expenses: {
      type: Array,
      required: true,
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.Expenses.length / this.expensesPerPage);
    },
    paginatedExpenses() {
      const start = (this.currentPage - 1) * this.expensesPerPage;
      const end = start + this.expensesPerPage;
      return this.Expenses.slice(start, end);
    },
    exceedPages() {
      return this.Expenses.length > this.expensesPerPage;
    },
  },
  methods: {
    showNextPage() {
      if (this.currentPage < this.pages) {
        this.currentPage++;
      }
    },
    showPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    exitForm() {
      this.showDeleteModal = false;
    },
    renderExpenses() {
      this.$emit("renderExpenses");
    },
    successful(msg) {
      this.$emit("successful", msg);
    },
    deleteExpense(expenseId) {
      this.showDeleteModal = true;
      this.expenseId = expenseId;
      this.$emit("deleteExpense");
    },
  },
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

  overflow-y: auto;
}
.pagination {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}
</style>
