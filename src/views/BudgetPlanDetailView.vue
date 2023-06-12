<template>
  <div class="wrapper">
    <budgetplanModal v-if="isEditPlan" @closeform="exitForm" />
    <div class="header">
      <BackButton />
      <h1 class="budgetPlanCategory">{{ Category }} Plan</h1>
      <div class="navButton">
        <budgetPlanNavButton :iconSrc="NavEditIcon" @click="toggleEdit" />
        <budgetPlanNavButton
          :iconSrc="NavDeleteIcon"
          @click="DeleteBudgetPlanHandler"
        />
      </div>
    </div>
    <div class="grid-container">
      <div class="main">
        <mainbudgetplanDisplay :Amount="Amount" :LimitAmount="LimitAmount" />
      </div>
      <div class="side">
        <sideRecentExpense
          :Expenses="Expenses"
          @renderExpenses="getbudgetPlanDetail"
        />
      </div>
    </div>
  </div>
</template>
<script>
import budgetplanModal from "../components/budgetPlan/budgetPlanModal/budgetplanModal.vue";
import budgetPlanNavButton from "../components/budget/budgetPlanNavButton.vue";
import NavEditIcon from "../assets/Icons/budget/edit.svg";
import NavDeleteIcon from "../assets/Icons/budget/delete.svg";
import sideRecentExpense from "../components/budgetPlan/sideDisplay/sideRecentExpense.vue";
import mainbudgetplanDisplay from "../components/budgetPlan/mainbudgetplanDisplay.vue";
import BackButton from "../components/budgetPlan/BackButton.vue";
import axios from "axios";
export default {
  components: {
    BackButton,
    budgetplanModal,
    mainbudgetplanDisplay,
    sideRecentExpense,
    budgetPlanNavButton,
  },
  data() {
    return {
      isEditPlan: false,
      Category: "",
      LimitAmount: "",
      Expenses: [],
      Amount: 0,
      NavEditIcon: NavEditIcon,
      NavDeleteIcon: NavDeleteIcon,
    };
  },
  methods: {
    getbudgetPlanDetail() {
      axios
        .get(
          `http://localhost:3000/${this.$route.params.id}/budgetplan/${this.$route.params.budgetplanid}`
        )
        .then((res) => {
          this.Category = res.data.Category;
          this.LimitAmount = res.data.LimitAmount;
          this.Expenses = res.data.Expenses;
          this.Amount = res.data.Amount;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    DeleteBudgetPlanHandler() {
      axios
        .delete(
          `http://localhost:3000/${this.$route.params.id}/budgetplan/${this.$route.params.budgetplanid}`,
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.$router.push({ name: "budget" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleEdit() {
      this.isEditPlan = true;
    },
    exitForm() {
      this.isEditPlan = false;
      this.getbudgetPlanDetail();
    },
  },
  mounted() {
    this.getbudgetPlanDetail();
  },
};
</script>
<style scoped>
.wrapper {
  padding: 1rem;
}
.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.budgetPlanCategory {
  font-size: 0.8rem;
  color: var(--primary-font-white);
  font-family: "ClashDisplay", sans-serif;
}
.navButton {
  margin-left: auto;
}
.graph {
  background-color: var(--primary-component-bg);
  border-radius: var(--radius);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.BarChart {
  padding: 0.3rem;
}
.grid-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
}

@media screen and (min-width: 374px) {
  .budgetPlanCategory {
    font-size: 1.1rem;
  }
}

@media screen and (min-width: 767px) {
  .budgetPlanCategory {
    font-size: 1.5rem;
  }
}
</style>
