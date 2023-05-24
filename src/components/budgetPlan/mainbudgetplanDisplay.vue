<template>
  <div class="main-display-wrapper">
    <h1 class="main-header">BudgetPlan Overview</h1>
    <h1 class="main-amount">
      <span class="main-amount" :class="checkLimit"
        >${{ Amount.toFixed(2) }}
      </span>
      / ${{ LimitAmount }}
    </h1>
  </div>
</template>
<script>
export default {
  props: {
    LimitAmount: {
      type: Number,
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    checkLimit() {
      return {
        Safe: this.Amount <= this.LimitAmount * 0.8,
        OverLimit: this.Amount > this.LimitAmount,
        AlmostOverLimit: this.Amount > this.LimitAmount * 0.8,
      };
    },
  },
};
</script>
<style scoped>
.main-display-wrapper {
  background-color: var(--primary-component-bg);
  border-radius: var(--radius);
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.main-header {
  font-size: 0.8rem;
}
.main-amount {
  font-size: 1.1rem;
  font-weight: 700;
}

.Safe {
  color: var(--safe-clr);
}
.AlmostOverLimit {
  color: var(--warning-clr);
}
.OverLimit {
  color: var(--danger-clr);
}

@media screen and (min-width: 374px) {
  .main-amount {
    font-size: 1.5rem;
  }
  .main-header {
    font-size: 1.3rem;
  }
}

@media screen and (min-width: 767px) {
  .main-amount {
    font-size: 4rem;
  }
  .main-header {
    font-size: 2rem;
  }
}
</style>
