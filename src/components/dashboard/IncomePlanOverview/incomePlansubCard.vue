<template>
  <div class="income-sub-wrapper">
    <div class="income-header">
      <p class="incometype">Source:</p>
      <h1>{{ incomeName }}</h1>
    </div>
    <div class="income-main">
      <p class="incometype">Amount:</p>
      <p>${{ incomeAmount }}</p>
      <p class="incometype">Excute Date:</p>
      <p v-if="checkisOneTime">{{ convertOneTimeDate }}</p>
      <p v-else>{{ convertMonthDate }}</p>
      <p class="incometype grey" v-if="incomePerviousExcutedDate">
        Last Excuted Date:
      </p>
      <p class="grey" v-if="incomePerviousExcutedDate">
        {{ incomePerviousExcutedDate }}
      </p>
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
import moment from "moment-timezone";
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
      type: String,
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
    incomePerviousExcutedDate: {
      type: String,
    },
  },
  computed: {
    convertOneTimeDate() {
      const date = new Date(this.incomeDate);
      const formattedDateString = moment(date).format("YYYY-MM-DD");
      return formattedDateString;
    },
    convertMonthDate() {
      const date = new Date(this.incomeDate);
      const formattedDateString = moment(date).format("YYYY-MM-DD");
      return formattedDateString;
    },
    checkisOneTime() {
      return this.incomeFrequency === "One-time" ? true : false;
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
  display: grid;
  grid-template-rows: 1fr;
  background-color: var(--main-bg-clr);
  border-radius: var(--radius);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  gap: 1rem;
}
.incometype {
  font-weight: 300;
}

.scheduled {
  color: var(--safe-clr);
}

.processed {
  color: var(--danger-clr);
}
.grey {
  color: var(--grey-clr);
}
</style>
