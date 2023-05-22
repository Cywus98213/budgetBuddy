<template>
  <div class="subCard-wrapper">
    <div class="subCard-main">
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
.subCard-main {
  display: flex;
  justify-content: space-between;
}
</style>
