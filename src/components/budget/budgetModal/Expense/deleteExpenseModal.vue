<template>
  <div class="modal-bg">
    <div class="blocker"></div>
    <deleteExpenseModalForm
      @closeform="exitForm"
      @successful="successful"
      :expenseId="expenseId"
      @renderExpenses="renderExpenses"
    />
  </div>
</template>
<script>
import deleteExpenseModalForm from "./deleteExpenseModalForm.vue";

export default {
  components: {
    deleteExpenseModalForm,
  },
  props: {
    expenseId: {
      type: String,
      required: true,
    },
  },
  methods: {
    exitForm() {
      this.$emit("closeform");
    },
    successful(msg) {
      this.$emit("successful", msg);
    },
    renderExpenses() {
      this.$emit("renderExpenses");
    },
  },
};
</script>
<style scoped>
.modal-bg {
  z-index: 48;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
}
.blocker {
  z-index: 49;
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: rgba(53, 53, 53, 0.589);
  opacity: 0.7;
  top: 0;
  left: 0;
}
</style>
