<template>
  <button class="button">
    <img class="buttonImg" :src="iconSrc" />
    <p class="text">{{ text }}</p>
  </button>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-button-clr);
  border-radius: var(--radius);
  border: none;
  outline: 3px var(--main-bg-clr) solid;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.button:hover {
  transform: translateY(-2px);
}
.button:active {
  transform: translateY(2px);
}
.text {
  font-size: 0.7rem;
  font-weight: 300;
}

@media screen and (min-width: 374px) {
  .text {
    font-size: 1rem;
  }
}

@media screen and (min-width: 767px) {
  .text {
    font-size: 1.05rem;
  }
}
</style>
