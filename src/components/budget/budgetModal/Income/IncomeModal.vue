<template>
  <div class="modal-bg">
    <div class="blocker"></div>
    <IncomeModalForm @closeform="exitForm" />
  </div>
</template>
<script>
import IncomeModalForm from "./IncomeModalForm.vue";

export default {
  components: {
    IncomeModalForm,
  },
  methods: {
    exitForm() {
      this.$emit("closeform");
    },
  },
};
</script>
<style scoped>
.modal-bg {
  z-index: 5;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
}
.blocker {
  z-index: 6;
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: rgba(53, 53, 53, 0.589);
  opacity: 0.7;
  top: 0;
  left: 0;
}
</style>
