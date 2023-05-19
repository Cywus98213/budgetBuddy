<template>
  <div class="wrapper">
    <div class="header">
      <h1 class="header-title">Budget.</h1>
    </div>
    <div class="budget-header">
      <mainBudgetCard />
    </div>
    <div class="planNav">
      <budgetRefreshButton :iconSrc="budgetRefreshIcon" />
      <planModal v-if="isAddPlan" @closeform="exitForm" />
      <Button :text="'Create Plan'" @click="togglePlanForm" />
    </div>
    <div class="budget-main">
      <div
        v-if="loaded"
        v-for="(budgetPlan, index) in userBudgetPlan"
        :key="index"
        class="budgetplan"
      >
        <budgetPlanCard
          :category="budgetPlan.Category"
          :expenses="budgetPlan.Expenses"
          :limitAmount="budgetPlan.LimitAmount"
          :amount="budgetPlan.Amount"
          :planid="budgetPlan._id"
        />
      </div>
      <div v-else class="loading">
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import planModal from "../components/budget/budgetModal/plan/planModal.vue";
import budgetRefreshButton from "../components/budget/budgetRefreshButton.vue";
import budgetRefreshIcon from "../assets/Icons/budget/refresh.svg";
import budgetPlanNavButton from "../components/budget/budgetPlanNavButton.vue";
import Button from "../components/common/Button.vue";
import mainBudgetCard from "../components/budget/mainbudgetCard.vue";
import budgetPlanCard from "../components/budget/budgetPlanCard.vue";
export default {
  components: {
    mainBudgetCard,
    budgetPlanCard,
    Button,
    budgetPlanNavButton,
    budgetRefreshButton,
    planModal,
  },
  data() {
    return {
      loaded: false,
      userBudgetPlan: {},
      isAddPlan: false,
      budgetRefreshIcon: budgetRefreshIcon,
    };
  },
  methods: {
    exitForm() {
      this.isAddPlan = false;
      location.reload();
    },
    togglePlanForm() {
      this.isAddPlan = true;
    },
    getUserbudget() {
      axios
        .get(`http://localhost:3000/${this.$route.params.id}/budget`)
        .then((res) => {
          console.log(res.data);
          this.userBudgetPlan = res.data.BudgetPlan;

          this.loaded = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    setInterval(() => {
      this.getUserbudget();
    }, 600000);
    this.getUserbudget();
  },
};
</script>

<style scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
}
.wrapper {
  padding: 1rem;
}
.header-title {
  font-family: "ClashDisplay", sans-serif;
  font-size: 2rem;
}
.budget-header {
  max-width: 100%;
  margin: 0.5rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.planNav {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  margin: 1rem auto;
}

.budget-main {
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  gap: 0.6rem;
  max-height: calc(100vh - 18rem);
}

@media screen and (min-width: 767px) {
  .budget-main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (min-width: 1022px) {
  .budget-main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
