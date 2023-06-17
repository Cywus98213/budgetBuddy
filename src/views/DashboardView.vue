<template>
  <div class="dashboard-wrapper">
    <div class="header">
      <h1 class="header-title">Dashboard.</h1>
    </div>
    <div class="dashboard-main">
      <AccountOverviewCard />
      <incomePlanOverviewCard />
      <savingPlanOverviewCard />
    </div>
  </div>
</template>
<script>
import savingPlanOverviewCard from "../components/dashboard/SavingPlanOverview/savingPlanOverviewCard.vue";
import AccountOverviewCard from "../components/dashboard/AccountOverview/AccountOverviewCard.vue";
import incomePlanOverviewCard from "../components/dashboard/IncomePlanOverview/incomePlanOverviewCard.vue";
export default {
  components: {
    AccountOverviewCard,
    incomePlanOverviewCard,
    savingPlanOverviewCard,
  },
};
</script>
<style scoped>
.dashboard-wrapper {
  height: 100vh;
  padding: 1rem;
}

.header-title {
  font-family: "ClashDisplay", sans-serif;
  font-size: 2rem;
}
</style>
