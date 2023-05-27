<template>
  <div class="income-sub-wrapper">
    <div class="income-header">
      <p class="incometype">Source:</p>
      <h1>{{ incomeName }}</h1>
    </div>
    <div class="income-main">
      <p class="incometype">Amount:</p>
      <p>${{ incomeAmount }}</p>
      <p class="incometype">Date:</p>
      <p>{{ convertDate }}</p>
    </div>
    <div class="income-footer">
      <p class="incometype">Frequency:</p>
      <p>{{ incomeFrequency }}</p>
      <p class="incometype">Status:</p>
      <p :class="checkincomeStatus">{{ incomeStatus }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    incomeName: {
      type: String,
      required: true,
    },
    incomeAmount: {
      type: Number,
      required: true,
    },
    incomeDate: {
      type: Date,
      required: true,
    },
    incomeFrequency: {
      type: String,
      required: true,
    },
    incomeStatus: {
      type: String,
      required: true,
    },
  },
  computed: {
    convertDate() {
      const date = new Date(this.incomeDate);
      const formattedDateString = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });
      return formattedDateString;
    },
    checkincomeStatus() {
      return {
        scheduled: this.incomeStatus === "scheduled" ? true : false,
        processed: this.incomeStatus === "processed" ? true : false,
      };
    },
  },
};
</script>
<style scoped>
.income-sub-wrapper {
  display: flex;
  flex-direction: column;
  background-color: var(--main-bg-clr);
  border-radius: var(--radius);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  gap: 1rem;
}
.incometype {
  font-weight: 100;
}

.scheduled {
  color: var(--safe-clr);
}

.processed {
  color: var(--danger-clr);
}
</style>
