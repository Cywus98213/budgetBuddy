<template>
  <div class="dashboard-wrapper">
    <div class="header">
      <h1 class="header-title">Dashboard.</h1>
    </div>
    <div class="main">
      <overviewCard />
    </div>
  </div>
</template>
<script>
import overviewCard from "../components/dashboard/overviewCard.vue";
export default {
  components: {
    overviewCard,
  },
};
</script>
<style scoped>
.dashboard-wrapper {
  height: 100vh;
  width: 100%;
  padding: 1rem;
}

.header-title {
  font-family: "ClashDisplay", sans-serif;
  font-size: 2rem;
}
</style>
