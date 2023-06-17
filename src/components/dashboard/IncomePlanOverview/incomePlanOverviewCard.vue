<template>
  <div class="Income-Overview-wrapper">
    <div class="Income-Overview-wrapper-header">
      <h1>Income Overview</h1>
    </div>
    <div class="income-overview-main">
      <incomePlansubCard
        v-if="haveIncomePlan"
        v-for="(incomeplan, index) in incomePlans"
        :incomeName="incomeplan.IncomeName"
        :incomeAmount="incomeplan.IncomeAmount"
        :incomeDate="incomeplan.IncomeDate"
        :incomeStatus="incomeplan.status"
        :incomeFrequency="incomeplan.IncomeFrequency"
        :incomeId="incomeplan._id"
        :key="index"
      />
      <div v-else>
        <p>No Income Plan...</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import incomePlansubCard from "./incomePlansubCard.vue";
export default {
  components: {
    incomePlansubCard,
  },
  data() {
    return {
      haveIncomePlan: false,
      incomePlans: [],
    };
  },
  methods: {
    getIncomePlan() {
      //get income plan from database
      axios
        .get(`http://localhost:3000/${this.$route.params.id}/income`, {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.incomePlans = res.data.IncomePlan;

          if (this.incomePlans.length > 0) {
            this.haveIncomePlan = true;
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$store.dispatch("logout");
            this.$router.push("/login");
          }
        });
    },
  },
  created() {
    this.getIncomePlan();
  },
};
</script>
<style scoped>
.Income-Overview-wrapper {
  background-color: var(--primary-component-bg);
  border-radius: var(--radius);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: calc(100vw - 7rem);
}

.Income-Overview-wrapper h1 {
  font-size: 1.2rem;
}
.income-overview-main {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0;
}
</style>
