<template>
  <div class="wrapper">
    <div class="header">
      <h1 class="header-title">Transactions.</h1>
    </div>
    <div class="cards-section">
      <div class="section-header">
        <p>Date:</p>
        <p>Category:</p>
        <p>Price:</p>
      </div>

      <div class="card-wrapper">
        <ExpenseCard
          v-for="(expense, index) in expenses"
          :amount="expense.Amount"
          :date="expense.Date"
          :category="expense.Category"
          :note="expense.Notes"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ExpenseCard from "../components/transactions/expenseCard.vue";
export default {
  components: {
    ExpenseCard,
  },
  data() {
    return {
      expenses: [
        {
          Amount: 299.99,
          Date: new Date("2023-01-01"),
          Category: "Personal",
          Notes: "Apple Purchase",
        },
        {
          Amount: 78.26,
          Date: new Date("2023-01-01"),
          Category: "Food",
          Notes: "Weekly Gorcery",
        },
        {
          Amount: 299.99,
          Date: new Date("2023-01-01"),
          Category: "Personal",
          Notes: "Apple Purchase",
        },
        {
          Amount: 78.26,
          Date: new Date("2023-01-01"),
          Category: "Food",
          Notes: "Weekly Gorcery",
        },
        {
          Amount: 299.99,
          Date: new Date("2023-01-01"),
          Category: "Personal",
          Notes: "Apple Purchase",
        },
        {
          Amount: 78.26,
          Date: new Date("2023-01-01"),
          Category: "Food",
          Notes: "Weekly Gorcery",
        },
        {
          Amount: 299.99,
          Date: new Date("2023-01-01"),
          Category: "Personal",
          Notes: "Apple Purchase",
        },
        {
          Amount: 78.26,
          Date: new Date("2023-01-01"),
          Category: "Food",
          Notes: "Weekly Gorcery",
        },
        {
          Amount: 299.99,
          Date: new Date("2023-01-01"),
          Category: "Personal",
          Notes: "Apple Purchase",
        },
        {
          Amount: 78.26,
          Date: new Date("2023-01-01"),
          Category: "Food",
          Notes: "Weekly Gorcery",
        },
        {
          Amount: 299.99,
          Date: new Date("2023-01-01"),
          Category: "Personal",
          Notes: "Apple Purchase",
        },
        {
          Amount: 78.26,
          Date: new Date("2023-01-01"),
          Category: "Food",
          Notes: "Weekly Gorcery",
        },
        {
          Amount: 299.99,
          Date: new Date("2023-01-01"),
          Category: "Personal",
          Notes: "Apple Purchase",
        },
        {
          Amount: 78.26,
          Date: new Date("2023-01-01"),
          Category: "Food",
          Notes: "Weekly Gorcery",
        },
        {
          Amount: 299.99,
          Date: new Date("2023-01-01"),
          Category: "Personal",
          Notes: "Apple Purchase",
        },
        {
          Amount: 78.26,
          Date: new Date("2023-01-01"),
          Category: "Food",
          Notes: "Weekly Gorcery",
        },
        {
          Amount: 299.99,
          Date: new Date("2023-01-01"),
          Category: "Personal",
          Notes: "Apple Purchase",
        },
        {
          Amount: 78.26,
          Date: new Date("2023-01-01"),
          Category: "Food",
          Notes: "Weekly Gorcery",
        },
        {
          Amount: 78.26,
          Date: new Date("2023-01-01"),
          Category: "Food",
          Notes: "Weekly Gorcery",
        },
      ],
    };
  },
};
</script>
<style scoped>
.wrapper {
  height: 100vh;
  width: 100%;
  padding: 1rem;
}

.cards-section {
  height: 95%;
  display: flex;
  flex-direction: column;
}
.header-title {
  font-family: "ClashDisplay", sans-serif;
  font-size: 2rem;
}
.section-header {
  width: 100%;
  border-radius: 0.3rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  background-color: var(--primary-component-bg);
  padding: 1rem;

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-wrapper {
  overflow-y: auto;
}
</style>
