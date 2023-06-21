<template>
  <div class="modal-bg">
    <div class="blocker"></div>
    <ExpenseModalForm @closeform="exitForm" @successful="successful" />
  </div>
</template>
<script>
import ExpenseModalForm from "./ExpenseModalForm.vue";

export default {
  components: {
    ExpenseModalForm,
  },
  methods: {
    exitForm() {
      this.$emit("closeform");
    },
    successful(msg) {
      this.$emit("successful", msg);
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
