<template>
  <div class="budgetplanCard-wrapper">
    <div class="header">
      <h1>{{ category }}</h1>
      <div class="header-nav">
        <RouterLink
          :to="{ name: 'budgetplan', params: { budgetplanid: planid } }"
        >
          <Button :text="'View Detail'"
        /></RouterLink>
      </div>
    </div>
    <br />
    <div class="main">
      <p>
        <span class="currentValue" :class="checkLimit"
          >${{ roundedAmount }}</span
        >
        <span class="limitAmount"> / ${{ roundedLimitAmount }}</span>
      </p>
    </div>
    <br />
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
import Button from "../common/Button.vue";

export default {
  components: { Button },
  props: {
    expenses: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    limitAmount: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    planid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    checkLimit() {
      return {
        Safe: this.amount <= this.limitAmount * 0.8,
        OverLimit: this.amount > this.limitAmount,
        AlmostOverLimit: this.amount > this.limitAmount * 0.8,
      };
    },
    roundedLimitAmount() {
      return this.limitAmount.toFixed(2);
    },
    roundedAmount() {
      return this.amount.toFixed(2);
    },
  },
  mounted() {
    // loop through each expense and add the amount to the currentAmount
    if (this.expenses) {
      this.expenses.forEach((expense) => {
        this.currentAmount += expense.Amount;
      });
    }
  },
};
</script>
<style scoped>
.budgetplanCard-wrapper {
  padding: 1rem;
  border-radius: var(--radius);
  background-color: var(--primary-component-bg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
.header {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.header h1 {
  font-size: 1.1rem;
}

.main {
  display: flex;
}
.currentValue {
  font-size: 1.4rem;
  font-weight: 40000;
}
.limitAmount {
  font-size: 1.4rem;
  font-weight: 400;
}

.Safe {
  color: var(--safe-clr);
}
.AlmostOverLimit {
  color: var(--warning-clr);
}
.OverLimit {
  color: var(--danger-clr);
}

@media screen and (min-width: 767px) {
  .header {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
