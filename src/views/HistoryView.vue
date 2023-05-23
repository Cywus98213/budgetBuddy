<template>
  <div class="wrapper">
    <div class="header">
      <h1 class="header-title">History.</h1>
    </div>
    <div class="cards-section">
      <div class="section-header">
        <p>Date:</p>
        <p>Title</p>
        <p>Category:</p>
        <p>Amount:</p>
      </div>

      <div class="card-wrapper">
        <ExpenseCard
          v-for="expense in expenses"
          :amount="expense.Amount"
          :date="expense.Date"
          :title="expense.Title"
          :category="expense.Category"
          :key="expense._id"
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ExpenseCard from "../components/history/expenseCard.vue";
export default {
  components: {
    ExpenseCard,
  },
  data() {
    return {
      expenses: [],
    };
  },

  methods: {
    getExpenses() {
      axios
        .get(`http://localhost:3000/${this.$route.params.id}/history`)
        .then((res) => {
          this.expenses = res.data.Expenses;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getExpenses();
  },
};
</script>
<style scoped>
.wrapper {
  padding: 1rem;
}

.cards-section {
  margin: 0.5rem auto;
  display: flex;
  flex-direction: column;
}
.header-title {
  font-family: "ClashDisplay", sans-serif;
  font-size: 2rem;
}

.section-header {
  border-radius: 0.3rem;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  background-color: var(--primary-component-bg);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.section-header p {
  font-size: 0.8rem;
}
.card-wrapper {
  overflow-y: auto;
}
@media screen and (min-width: 767px) {
  .section-header p {
    font-size: 1rem;
  }
}
@media screen and (min-width: 1022px) {
  .section-header p {
    font-size: 1.2rem;
  }
}
</style>
