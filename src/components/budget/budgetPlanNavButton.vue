<template>
  <img class="header-icon" :src="iconSrc" alt="" />
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
.header-icon {
  cursor: pointer;
  margin-left: 0.5rem;
  background-color: var(--primary-button-clr);
  padding: 0.6rem;
  border-radius: 50%;
  border: 4px var(--main-bg-clr) solid;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.header-icon:hover {
  transform: translateY(-5px);
}
.header-icon:active {
  transform: translateY(2px);
}
</style>
