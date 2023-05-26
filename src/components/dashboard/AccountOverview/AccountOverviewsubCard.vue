<template>
  <div class="account-subCard-wrapper">
    <div class="account-subCard-main">
      <h1>{{ category }}</h1>
      <h1>${{ amount }} / ${{ limitAmount }}</h1>
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
};
</script>
<style scoped>
.account-subCard-main {
  display: flex;
  justify-content: space-between;
}

.account-subCard-main h1 {
  font-size: 0.5rem;
}

@media screen and (min-width: 767px) {
  .account-subCard-main h1 {
    font-size: 1rem;
  }
}

@media screen and (min-width: 1022px) {
  .account-subCard-main h1 {
    font-size: 1.2rem;
  }
}
</style>
