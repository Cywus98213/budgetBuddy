<template>
  <div class="homepage-wrapper">
    <div class="homeSection">
      <img
        class="homeImage"
        src="../assets/Icons/home/home-image1.svg"
        alt="invest graph"
      />
      <h1 class="homeTitle">The easy way to manage your expenses every day</h1>
      <p class="homeSubtitle">
        Easily monitor your income and expenses to gain a clear understanding of
        where your money is going.
      </p>
      <div class="homeNav">
        <Button
          class="homeButton"
          text="Sign Up"
          @click="$router.push({ name: 'register' })"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Button from "../components/common/Button.vue";
export default {
  components: {
    Button,
  },
  methods: {},
};
</script>
<style scoped>
.homepage-wrapper {
  height: 100vh;
  padding: 1rem;
  width: 100%;
  margin: auto;
  display: grid;
  place-items: center;
  overflow: hidden;
}
.homeSection {
  display: flex;
  flex-direction: column;
  align-items: left;
  max-width: 480px;
  gap: 1rem;
}
.homeNav {
  align-self: flex-start;
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}
.homeImage {
  width: 100%;
  height: 100%;
  max-width: 400px;
}
.homeTitle {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.homeSubtitle {
  font-weight: 100;
}
</style>
