<template>
  <div class="savingPlan-wrapper">
    <div class="savingPlan-header">
      <h1>{{ SavingGoalName }}</h1>
    </div>
    <div class="main">
      <p class="main-money">
        <span class="sub-money">${{ roundedSavingGoalCurrentAmount }}</span> of
        ${{ roundedSavingGoalCurrentTarget }}
      </p>
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-bar-fill" :style="progressBar"></div>
        </div>
        <div class="percentage-number">
          <div class="percentage-bar">{{ percentageNumber }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import savingSettingIcon from "../../../assets/Icons/budget/savingSetting.svg";
import CircleButton from "../../common/CircleButton.vue";
import Button from "../../common/Button.vue";
export default {
  components: {
    Button,
    CircleButton,
  },
  data() {
    return {
      savingSettingIcon: savingSettingIcon,
    };
  },
  props: {
    SavingGoalName: {
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
    SavingPlanId: {
      type: String,
      required: true,
    },
  },
  methods: {},
  computed: {
    roundedSavingGoalCurrentTarget() {
      const roundedNumber = this.SavingGoalTarget.toFixed(2);
      return parseFloat(roundedNumber).toLocaleString();
    },
    roundedSavingGoalCurrentAmount() {
      const roundedNumber = this.SavingGoalCurrentAmount.toFixed(2);
      return parseFloat(roundedNumber).toLocaleString();
    },
    progressBar() {
      return {
        width: `${
          (this.SavingGoalCurrentAmount / this.SavingGoalTarget) * 100
        }%`,
      };
    },
    percentageNumber() {
      return `${(
        (this.SavingGoalCurrentAmount / this.SavingGoalTarget) *
        100
      ).toFixed(1)}%`;
    },
  },
};
</script>
<style scoped>
.savingPlan-wrapper {
  padding: 1rem;
  border-radius: var(--radius);
  background-color: var(--main-bg-clr);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.savingPlan-header h1 {
  font-size: 1.1rem;
}
.main-money {
  font-size: 1.1rem;
  color: var(--sub-price-clr);
}
.sub-money {
  color: var(--primary-price-clr);
}
.progress-container {
  display: grid;
  grid-template-columns: 10fr 1fr;
  align-items: center;
  gap: 1rem;
}
.progress-bar {
  height: 0.5rem;
  background-color: var(--sub-price-clr);
  border-radius: var(--radius);
  outline: 3px var(--main-bg-clr) solid;
}
.progress-bar-fill {
  height: 100%;
  background-color: var(--progress-bar-fill-clr);
  border-radius: var(--radius);
  box-shadow: 1px 0 0 0 rgba(0, 0, 0, 0.1);
  transition: all 0.7s ease;
}
</style>
