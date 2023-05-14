<template>
  <div class="btn-container">
    <img :src="iconSrc" alt="Refresh" />
  </div>
</template>
<script>
export default {
  props: {
    iconSrc: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
.btn-container {
  display: grid;
  place-items: center;
}
img {
  cursor: pointer;
  background-color: var(--primary-button-clr);
  padding: 0.5rem;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
img:active {
  transform: translateY(2px);
}
</style>
