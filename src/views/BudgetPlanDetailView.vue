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
        <sideRecentExpense :Expenses="Expenses" />
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
      Amount: "",
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
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    DeleteBudgetPlanHandler() {
      axios
        .delete(
          `http://localhost:3000/${this.$route.params.id}/budgetplan/${this.$route.params.budgetplanid}`
        )
        .then((res) => {
          console.log(res.data);
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
      location.reload();
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
  font-size: 2rem;
  color: var(--primary-font-white);
  font-family: "ClashDisplay", sans-serif;
}
.navButton {
  margin-left: auto;
}
.grid-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
