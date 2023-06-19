<template>
  <div class="SavingOverview-wrapper">
    <div class="SavingOverview-header">
      <h1>Saving Overview</h1>
    </div>
    <div class="saving-overview-main">
      <savingPlansubCard
        v-if="haveSavingPlan"
        v-for="(savingPlan, index) in savingPlans"
        :SavingGoalName="savingPlan.SavingGoalName"
        :SavingGoalTarget="savingPlan.SavingGoalTarget"
        :SavingGoalCurrentAmount="savingPlan.SavingGoalCurrentAmount"
        :SavingPlanId="savingPlan._id"
        :key="index"
      />
      <div v-else>
        <p>No Saving Plan...</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import savingPlansubCard from "./savingPlansubCard.vue";
export default {
  components: {
    savingPlansubCard,
  },
  data() {
    return {
      haveSavingPlan: false,
      savingPlans: [],
    };
  },
  methods: {
    getSavingPlan() {
      //get saving plan from database
      axios
        .get(`http://localhost:3000/${this.$route.params.id}/savingplan`, {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.savingPlans = res.data.SavingPlan;

          if (this.savingPlans.length > 0) {
            this.haveSavingPlan = true;
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
    this.getSavingPlan();
  },
};
</script>
<style scoped>
.SavingOverview-wrapper {
  background-color: var(--primary-component-bg);
  border-radius: var(--radius);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0.5rem 0;
}
.saving-overview-main {
  max-height: calc(100vw - 5rem);
  padding: 0.5rem 1rem 0 0;
  display: grid;
  gap: 1rem;
  overflow-y: auto;
  grid-template-columns: repeat(auto-fit, minmax(250px, 270px));
}
.SavingOverview-header h1 {
  font-size: 1.2rem;
}
</style>
