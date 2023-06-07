<template>
  <div class="wrapper">
    <div class="header">
      <h1 class="header-title">History.</h1>
      <div class="dateOrderButton">
        <p>Sort By Date:</p>
        <filterButton :iconSrc="descendingIcon" @click="filterByDescending" />
        <filterButton :iconSrc="ascendingIcon" @click="filterByAscending" />
      </div>
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
import ascendingIcon from "../assets/Icons/history/ascendingIcon.svg";
import descendingIcon from "../assets/Icons/history/descendingIcon.svg";
import filterButton from "../components/history/filterButton.vue";
import axios from "axios";
import ExpenseCard from "../components/history/expenseCard.vue";
export default {
  components: {
    ExpenseCard,
    filterButton,
  },
  data() {
    return {
      expenses: [],
      descending: false,
      ascending: false,
      descendingIcon: descendingIcon,
      ascendingIcon: ascendingIcon,
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
    filterByAscending() {
      this.ascending = !this.ascending;
      this.descending = false;
      if (this.ascending === true) {
        this.expenses.sort((a, b) => new Date(b.Date) - new Date(a.Date));
      }
    },
    filterByDescending() {
      this.descending = !this.descending;
      this.ascending = false;
      if (this.descending === true) {
        this.expenses.sort((a, b) => new Date(a.Date) - new Date(b.Date));
      }
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dateOrderButton {
  display: flex;
  gap: 1rem;
  align-items: center;
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
  background-color: var(--primary-component-bg);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.section-header p {
  font-size: 0.8rem;
  font-weight: 100;
}
.card-wrapper {
  overflow-y: auto;
}
@media screen and (min-width: 767px) {
  .section-header p {
    font-size: 1rem;
  }
  .section-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
@media screen and (min-width: 1022px) {
  .section-header p {
    font-size: 1.2rem;
  }
}
</style>
