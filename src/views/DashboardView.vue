<template>
  <div class="wrapper">
    <div class="header">
      <h1 class="header-title">Dashboard.</h1>
    </div>
    <div class="main">
      <overviewCard :budgetPlans="budgetPlans" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import overviewCard from "../components/dashboard/overviewCard.vue";
export default {
  components: {
    overviewCard,
  },
  data() {
    return {
      budgetPlans: [],
      expenses: [],
      incomes: [],
    };
  },
  methods: {
    getOverview() {
      axios
        .get(`http://localhost:3000/${this.$route.params.id}/overview`)
        .then((res) => {
          this.budgetPlans = res.data.BudgetPlan;

          this.expenses = res.data.Expenses;
          this.incomes = res.data.IncomePlan;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getOverview();
  },
};
</script>
<style scoped>
.wrapper {
  height: 100vh;
  width: 100%;
  padding: 1rem;
}

.header-title {
  font-family: "ClashDisplay", sans-serif;
  font-size: 2rem;
}
</style>
