<template>
  <div class="account-subCard-wrapper">
    <div class="account-subCard-main">
      <h1>{{ category }}</h1>

      <h1 class="number">${{ roundedAmount }} / ${{ roundedLimitAmount }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    category: {
      type: String,
      required: true,
    },
    limitAmount: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    roundedAmount() {
      const roundedNumber = this.amount.toFixed(2);
      return parseFloat(roundedNumber).toLocaleString();
    },
    roundedLimitAmount() {
      const roundedNumber = this.limitAmount.toFixed(2);
      return parseFloat(roundedNumber).toLocaleString();
    },
    progressBar() {
      return {
        width: `${(this.amount / this.limitAmount) * 100}%`,
      };
    },
  },
};
</script>
<style scoped>
.account-subCard-main {
  display: flex;
  justify-content: space-between;
}

.account-subCard-main h1 {
  font-size: 0.5rem;
  transition: all 0.3s ease-in-out;
}

@media screen and (min-width: 767px) {
  .account-subCard-main h1 {
    font-size: 1.1rem;
  }
}

@media screen and (min-width: 1022px) {
  .account-subCard-main h1 {
    font-size: 1.2rem;
  }
}
</style>
