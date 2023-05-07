<template>
  <div class="card-wrapper">
    <p>{{ formattedDate }}</p>
    <p>{{ category }}</p>
    <p>${{ amount }}</p>
  </div>
</template>
<script>
export default {
  props: {
    amount: {
      required: true,
      type: String,
    },
    date: {
      required: true,
      type: Date,
    },
    category: {
      required: true,
      type: String,
    },
    note: {
      type: String,
    },
  },
  computed: {
    formattedDate() {
      return this.date.toLocaleDateString();
    },
  },
};
</script>
<style scoped>
.card-wrapper {
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  background-color: var(--primary-component-bg);
  padding: 1rem;
  margin-bottom: 0.3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media screen and (min-width: 424px) {
  .card-wrapper {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
