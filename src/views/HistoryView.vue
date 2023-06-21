<template>
  <div class="wrapper">
    <div class="header">
      <h1 class="header-title">History.</h1>
      <div class="dateOrderButton">
        <filterButton :iconSrc="descendingIcon" @click="filterByDescending" />
        <filterButton :iconSrc="ascendingIcon" @click="filterByAscending" />
      </div>
    </div>
    <div class="cards-section">
      <div class="section-header">
        <p>Date:</p>
        <p>Title:</p>
        <p>Category:</p>
        <p>Amount:</p>
      </div>

      <div class="card-container">
        <ExpenseCard
          v-for="expense in paginatedBudgetPlans"
          :amount="expense.Amount"
          :date="expense.Date"
          :title="expense.Title"
          :category="expense.Category"
          :type="expense.Type"
          :key="expense._id"
        />
      </div>
      <div class="pagination" v-if="exceedPages">
        <Button
          @click="showPreviousPage"
          :disabled="currentPage === 1"
          :text="'Previous'"
        />

        <span>{{ currentPage }} / {{ totalPages }}</span>
        <Button
          @click="showNextPage"
          :disabled="currentPage === totalPages"
          :text="'Next'"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Button from "../components/common/Button.vue";
import ascendingIcon from "../assets/Icons/history/ascendingIcon.svg";
import descendingIcon from "../assets/Icons/history/descendingIcon.svg";
import filterButton from "../components/history/filterButton.vue";
import axios from "axios";
import ExpenseCard from "../components/history/expenseCard.vue";
export default {
  components: {
    ExpenseCard,
    filterButton,
    Button,
  },
  data() {
    return {
      historyRecord: [],
      descending: false,
      ascending: false,
      currentPage: 1, // Current page number
      plansPerPage: 16, // Number of plans per page
      descendingIcon: descendingIcon,
      ascendingIcon: ascendingIcon,
    };
  },

  methods: {
    getExpenses() {
      axios
        .get(
          `https://budgetbuddyproject-8ca78d75eded.herokuapp.com/${this.$route.params.id}/history`,
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            this.historyRecord = [...res.data.Expenses, ...res.data.Incomes];
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$store.dispatch("logout");
            this.$router.push("/login");
          }
        });
    },
    filterByAscending() {
      this.ascending = !this.ascending;
      this.descending = false;
      if (this.ascending === true) {
        this.historyRecord.sort((a, b) => new Date(b.Date) - new Date(a.Date));
      }
    },
    filterByDescending() {
      this.descending = !this.descending;
      this.ascending = false;
      if (this.descending === true) {
        this.historyRecord.sort((a, b) => new Date(a.Date) - new Date(b.Date));
      }
    },
    showNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    showPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  computed: {
    paginatedBudgetPlans() {
      const startIndex = (this.currentPage - 1) * this.plansPerPage;
      const endIndex = startIndex + this.plansPerPage;
      return this.historyRecord.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.historyRecord.length / this.plansPerPage);
    },
    exceedPages() {
      return this.historyRecord.length > this.plansPerPage;
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
.card-container {
  overflow-y: auto;
}
.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
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
