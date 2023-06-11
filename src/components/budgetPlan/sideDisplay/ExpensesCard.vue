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
      //delete expense
      axios
        .delete(
          `http://localhost:3000/${this.$route.params.id}/budgetplan/${this.$route.params.budgetplanid}/expense/${this.expenseId}`
        )
        .then((res) => {
          console.log(res);
          this.$emit("renderExpenses");
        })
        .catch((err) => {
          console.log(err);
        });
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
  gap: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.type {
  font-weight: 100;
}
</style>
