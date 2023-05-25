<template>
  <div class="main-budget-wrapper">
    <div class="main-section">
      <p class="budgetTitle">My Balance</p>
      <p class="budgetAmount" :class="BalanceChecker">
        ${{ userBalance.toFixed(2) }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    userBalance: {
      type: Number,
      required: true,
    },
  },

  methods: {},
  computed: {
    BalanceChecker() {
      return {
        safe: this.userBalance > 0,
        alert: this.userBalance < 0,
      };
    },
  },
};
</script>
<style scoped>
.main-budget-wrapper {
  padding: 1rem;
  border-radius: var(--radius);
  background-color: var(--primary-component-bg);
}
.main-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.budgetTitle {
  font-size: 1.2rem;
}
.budgetAmount {
  font-size: 2rem;
  font-weight: bold;
}

.safe {
  color: var(--safe-clr);
}

.alert {
  color: var(--danger-clr);
}

@media screen and (min-width: 424px) {
  .budgetAmount {
    font-size: 3rem;
  }
}
@media screen and (min-width: 767px) {
  .button-section {
    flex-direction: row;
  }
  .budgetAmount {
    font-size: 4rem;
  }
}
</style>
