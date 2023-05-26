<template>
  <div class="dashboard-wrapper">
    <div class="header">
      <h1 class="header-title">Dashboard.</h1>
    </div>
    <div class="dashboard-main">
      <AccountOverviewCard />
      <incomePlanCard />
    </div>
  </div>
</template>
<script>
import AccountOverviewCard from "../components/dashboard/AccountOverview/AccountOverviewCard.vue";
import incomePlanCard from "../components/dashboard/IncomePlanOverview/incomePlanCard.vue";
export default {
  components: {
    AccountOverviewCard,
    incomePlanCard,
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
