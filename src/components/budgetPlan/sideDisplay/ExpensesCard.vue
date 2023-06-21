<template>
  <div class="Card-Wrapper">
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
      <h1>${{ expenseAmount }}</h1>
    </div>

    <Button :text="'Delete'" @click="deleteExpense" />
  </div>
</template>
<script>
import axios from "axios";
import Button from "../../common/Button.vue";

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
    expenseId: {
      type: String,
      required: true,
    },
  },
  components: {
    Button,
  },
  methods: {
    deleteExpense() {
      this.$emit("deleteExpense", this.expenseId);
    },
  },
};
</script>
<style scoped>
.Card-Wrapper {
  background-color: var(--main-bg-clr);
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.type {
  font-weight: 100;
}

@media screen and (min-width: 767px) {
  .Card-Wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 0.3fr;
  }
}
</style>
