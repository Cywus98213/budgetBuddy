<template>
  <div class="overview-wrapper">
    <div class="overview-header">
      <h1>Account Overview</h1>
      <div class="overview-nav">
        <Button :iconSrc="downloadIcon" :text="'Download report'" />
      </div>
    </div>
    <div class="overview-main">
      <div class="main-left">
        <div class="main-left-header">
          <h1>Category</h1>
          <h1>Progress</h1>
          <h1>Total</h1>
        </div>
        <overviewsubCard
          v-for="(budgetPlan, index) in budgetPlans"
          :key="index"
          :category="budgetPlan.Category"
          :limitAmount="budgetPlan.LimitAmount"
          :amount="budgetPlan.Amount"
        />
      </div>
      <div class="main-right">
        <h1>Graph</h1>
      </div>
    </div>
  </div>
</template>
<script>
import overviewsubCard from "./overviewsubCard.vue";
import downloadIcon from "../../assets/Icons/dashboard/download.svg";
import Button from "../common/Button.vue";
export default {
  components: {
    Button,
    overviewsubCard,
  },
  props: {
    budgetPlans: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      downloadIcon: downloadIcon,
    };
  },
  methods: {},
};
</script>
<style scoped>
.overview-wrapper {
  background-color: var(--primary-component-bg);
  border-radius: var(--radius);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0.5rem auto;
}
.overview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.overview-header h1 {
  font-size: 1.2rem;
}
.overview-main {
  display: flex;
  margin: 1rem auto;
  gap: 1rem;
  justify-content: space-between;

  border-radius: var(--radius);
}
.main-left {
  width: 80%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: var(--radius);
}
.main-left-header {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 0 1rem 0;
}
.main-left-header::after {
  content: "";
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background-color: var(--main-bg-clr);
}
.main-left-header h1 {
  font-weight: 100;
}
.main-right {
  width: 30%;
  display: grid;
  padding: 1rem;
  place-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: var(--radius);
  background-color: var(--main-bg-clr);
}
</style>
