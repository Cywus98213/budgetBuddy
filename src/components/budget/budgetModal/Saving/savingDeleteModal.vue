<template>
  <div class="modal-bg">
    <div class="blocker"></div>
    <savingDeleteForm @closeform="exitForm" :savingplanId="savingplanId" />
  </div>
</template>
<script>
import savingDeleteForm from "./savingDeleteForm.vue";

export default {
  components: {
    savingDeleteForm,
  },
  props: {
    savingplanId: {
      type: String,
      required: true,
    },
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
