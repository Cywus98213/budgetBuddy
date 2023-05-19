<template>
  <div class="Card-Wrapper">
    <div class="left">
      <div class="iteminfo">
        <h1 class="type">Date:</h1>
        <h1>{{ expenseDate }}</h1>
      </div>
      <div class="iteminfo">
        <h1 class="type">Name:</h1>
        <h1>{{ expenseTitle }}</h1>
      </div>
      <div class="iteminfo">
        <h1 class="type">Price:</h1>
        <h1>{{ expenseAmount }}</h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    expenseDate: {
      type: String,
      required: true,
    },
    expenseTitle: {
      type: String,
      required: true,
    },
    expenseAmount: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style scoped>
.Card-Wrapper {
  background-color: var(--main-bg-clr);
  border-radius: var(--radius);
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.iteminfo {
  text-align: left;
}
.left {
  width: 70%;
  display: flex;
  justify-content: space-between;
}
.type {
  font-weight: 100;
}
</style>
