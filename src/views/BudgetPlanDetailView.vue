<template>
  <div class="wrapper">
    <div class="header">
      <BackButton />
      <h1 class="budgetPlanCategory">{{ Category }} Plan</h1>
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
import sideRecentExpense from "../components/budgetPlan/sideDisplay/sideRecentExpense.vue";
import mainbudgetplanDisplay from "../components/budgetPlan/mainbudgetplanDisplay.vue";
import BackButton from "../components/budgetPlan/BackButton.vue";
import axios from "axios";
export default {
  components: {
    BackButton,
    mainbudgetplanDisplay,
    sideRecentExpense,
  },
  data() {
    return {
      Category: "",
      LimitAmount: "",
      Expenses: [],
      Amount: "",
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
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-auto-columns: 1fr;
  gap: 1rem;
  grid-auto-flow: row;
  grid-template-areas:
    "main main . ."
    "main main . ."
    "side side . ."
    "side side . .";
}

.main {
  grid-area: main;
}

.side {
  grid-area: side;
}
</style>
