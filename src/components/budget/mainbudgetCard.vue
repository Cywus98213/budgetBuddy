<template>
  <div class="wrapper">
    <ExpenseModal v-if="isAddExpense" @closeform="exitForm" />
    <IncomeModal v-if="isAddIncome" @closeform="exitForm" />
    <div class="main-section">
      <p class="budgetTitle">My Balance</p>
      <p class="budgetAmount">$0.00</p>
      <div class="button-section">
        <Button
          :text="'Add Income'"
          :iconSrc="AddincomeIcon"
          @click="toggleIncomeForm"
        />
        <Button
          :text="'Add Expense'"
          :iconSrc="AddspendingIcon"
          @click="toggleExpenseForm"
        />
      </div>
    </div>
  </div>
</template>
<script>
import IncomeModal from "./budgetModal/Income/IncomeModal.vue";
import ExpenseModal from "./budgetModal/Expense/expenseModal.vue";
import AddincomeIcon from "../../assets/Icons/budget/Addincome.svg";
import AddspendingIcon from "../../assets/Icons/budget/Addspending.svg";
import Button from "../common/Button.vue";
export default {
  components: {
    IncomeModal,
    Button,
    ExpenseModal,
  },
  data() {
    return {
      isAddExpense: false,
      isAddIncome: false,
      AddincomeIcon: AddincomeIcon,
      AddspendingIcon: AddspendingIcon,
    };
  },
  methods: {
    toggleExpenseForm() {
      this.isAddExpense = true;
    },
    toggleIncomeForm() {
      this.isAddIncome = true;
    },
    exitForm() {
      this.isAddIncome = false;
      this.isAddExpense = false;
    },
  },
};
</script>
<style scoped>
.wrapper {
  border-radius: var(--radius);
  background-color: var(--primary-component-bg);
}
.main-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.budgetTitle {
  font-size: 1.2rem;
}
.budgetAmount {
  font-size: 2rem;
  font-weight: bold;
}
@media screen and (min-width: 424px) {
  .budgetAmount {
    font-size: 3rem;
  }
}
@media screen and (min-width: 767px) {
  .button-section {
    flex-direction: row;
  }
  .budgetAmount {
    font-size: 4rem;
  }
}
</style>
