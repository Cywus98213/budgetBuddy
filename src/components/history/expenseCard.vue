<template>
  <div class="card-wrapper">
    <p>{{ date }}</p>
    <p>{{ title }}</p>
    <p>{{ category }}</p>
    <p>${{ amount }}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    amount: {
      required: true,
      type: Number,
    },
    date: {
      required: true,
      type: String,
    },
    category: {
      required: true,
      type: String,
    },
  },
  computed: {},
};
</script>
<style scoped>
.card-wrapper {
  border-radius: var(--radius);
  background-color: var(--primary-component-bg);
  padding: 1rem;
  margin-bottom: 0.3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.card-wrapper p {
  font-size: 0.8rem;
}

@media screen and (min-width: 767px) {
  .card-wrapper p {
    font-size: 1rem;
  }
  .card-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
@media screen and (min-width: 1022px) {
  .card-wrapper p {
    font-size: 1.2rem;
  }
}
</style>
