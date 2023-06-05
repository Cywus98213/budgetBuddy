<template>
  <div class="incomeplan-wrapper">
    <div class="income-header">
      <p class="incometype">Source:</p>
      <h1>{{ incomeSource }}</h1>
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
    <Button :text="'Delete'" @click="deleteIncomePlan" />
  </div>
</template>
<script>
import axios from "axios";
import Button from "../common/Button.vue";
export default {
  props: {
    incomeSource: {
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
    incomeId: {
      type: String,
      required: true,
    },
  },
  components: {
    Button,
  },
  methods: {
    deleteIncomePlan() {
      //delete income plan from database
      axios
        .delete(
          `http://localhost:3000/${this.$route.params.id}/income/${this.incomeId}`
        )
        .then((res) => {
          console.log(res.data);
          this.$emit("deleteIncomePlan");
        })
        .catch((err) => {
          console.log(err);
        });
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
.incomeplan-wrapper {
  display: flex;
  flex-direction: column;
  background-color: var(--primary-component-bg);
  border-radius: var(--radius);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

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
