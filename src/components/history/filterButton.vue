<template>
  <button class="historyButton-wrapper">
    <img :src="iconSrc" />
  </button>
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
.historyButton-wrapper {
  cursor: pointer;
  background-color: var(--primary-button-clr);
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  outline: 3px var(--main-bg-clr) solid;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.historyButton-wrapper:hover {
  transform: translateY(-2px);
}
.historyButton-wrapper:active {
  transform: translateY(2px);
}
</style>
