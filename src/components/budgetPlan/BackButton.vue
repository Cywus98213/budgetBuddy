<template>
  <div class="image-wrapper" @click="goBack">
    <img src="../../assets/Icons/budgetPlan/Back.svg" alt="Back Button" />
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.image-wrapper {
  cursor: pointer;
  background-color: var(--primary-button-clr);
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
.image-wrapper:hover {
  transform: translateY(-2px);
}
.image-wrapper:active {
  transform: translateY(1px);
}
</style>
