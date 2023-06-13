<template>
  <div class="savingPlan-wrapper">
    <div class="savingPlan-header">
      <h1>{{ savingGoalName }}</h1>
      <div class="header-nav">
        <Button :text="'View Detail'" />
      </div>
    </div>
    <div class="main">
      <p class="main-money">
        $ {{ SavingGoalCurrentAmount }} / ${{ SavingGoalTarget }}
      </p>
    </div>
  </div>
</template>
<script>
import Button from "../common/Button.vue";
export default {
  components: {
    Button,
  },
  props: {
    savingGoalName: {
      type: String,
      required: true,
    },
    SavingGoalTarget: {
      type: Number,
      required: true,
    },
    SavingGoalCurrentAmount: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style scoped>
.savingPlan-wrapper {
  padding: 1rem;
  border-radius: var(--radius);
  background-color: var(--primary-component-bg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
.savingPlan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.savingPlan-header h1 {
  font-size: 1.1rem;
}
</style>
