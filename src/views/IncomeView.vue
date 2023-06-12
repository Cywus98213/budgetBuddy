<template>
  <div class="IncomeView-wrapper">
    <div class="header">
      <h1 class="header-title">Income.</h1>
    </div>
    <div class="planNav">
      <IncomeModal v-if="isAddIncome" @closeform="exitForm" />
      <Button :text="'Add Income'" @click="toggleIncomeForm" />
    </div>
    <div class="content-card">
      <incomePlanCard
        v-for="(incomePlan, index) in paginatedBudgetPlans"
        :key="index"
        :incomeSource="incomePlan.IncomeName"
        :incomeAmount="incomePlan.IncomeAmount"
        :incomeDate="incomePlan.IncomeDate"
        :incomeFrequency="incomePlan.IncomeFrequency"
        :incomeStatus="incomePlan.status"
        :incomeId="incomePlan._id"
        @deleteIncomePlan="getIncomePlan"
      />
    </div>
    <div class="pagination">
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
</template>
<script>
import incomePlanCard from "../components/income/incomePlanCard.vue";
import IncomeModal from "../components/budget/budgetModal/Income/IncomeModal.vue";
import Button from "../components/common/Button.vue";
import axios from "axios";
export default {
  data() {
    return {
      haveIncomePlan: false,
      incomePlans: [],
      currentPage: 1, // Current page number
      plansPerPage: 9, // Number of plans per page
      isAddIncome: false,
    };
  },
  components: {
    Button,
    IncomeModal,
    incomePlanCard,
  },
  methods: {
    getIncomePlan() {
      //get income plan from database
      axios
        .get(`http://localhost:3000/${this.$route.params.id}/income`)
        .then((res) => {
          console.log(res.data);
          this.incomePlans = res.data.IncomePlan;

          if (this.incomePlans.length > 0) {
            this.haveIncomePlan = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleIncomeForm() {
      this.isAddIncome = true;
    },
    exitForm() {
      this.isAddIncome = false;
      this.getIncomePlan();
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
      return this.incomePlans.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.incomePlans.length / this.plansPerPage);
    },
  },
  mounted() {
    this.getIncomePlan();
  },
};
</script>
<style scoped>
.IncomeView-wrapper {
  padding: 1rem;
}
.header-title {
  font-family: "ClashDisplay", sans-serif;
  font-size: 2rem;
}
.planNav {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
.content-card {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(1, 1fr);
}
.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

@media screen and (min-width: 767px) {
  .content-card {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1023px) {
  .content-card {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (min-width: 2044px) {
  .content-card {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
