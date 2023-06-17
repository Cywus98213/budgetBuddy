<template>
  <button class="button">
    <img class="buttonImg" :src="iconSrc" />
  </button>
</template>
<script>
export default {
  props: {
    iconSrc: {
      type: String,
    },
  },
};
</script>
<style scoped>
.button {
  cursor: pointer;
  padding: 0.4rem;
  gap: 0.3rem;
  display: grid;
  place-items: center;
  background-color: var(--primary-button-clr);
  border-radius: 50%;
  border: none;
  outline: 3px var(--main-bg-clr) solid;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  filter: grayscale(0.3) opacity(0.7);
}
.buttonImg {
  width: 0.8rem;
}
.button:hover {
  filter: grayscale(0) opacity(1);
}
</style>
