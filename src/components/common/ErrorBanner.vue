<template>
  <div class="Msg-wrapper">
    <h1 class="Msg">{{ Msg }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    Msg: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
.Msg-wrapper {
  padding: 1rem;
  background-color: var(--danger-clr);
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0 0 var(--radius) var(--radius);
  text-align: center;
}
</style>
