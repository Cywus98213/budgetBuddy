<template>
  <div class="wrapper">
    <div class="header">
      <h1>{{ category }}</h1>
      <div class="header-mod">
        <budgetPlanNavButton :iconSrc="NavEditIcon" />
        <budgetPlanNavButton :iconSrc="NavDeleteIcon" />
      </div>
    </div>
    <br />
    <div class="main">
      <p>
        <span class="currentValue" :class="checkLimit"
          >${{ currentAmount.toFixed(2) }}</span
        >
        <span class="limitAmount"> / ${{ limitAmount }}</span>
      </p>
    </div>
    <br />
  </div>
</template>
<script>
import NavEditIcon from "../../assets/Icons/budget/edit.svg";
import NavDeleteIcon from "../../assets/Icons/budget/delete.svg";
import budgetPlanNavButton from "./budgetPlanNavButton.vue";

export default {
  components: { budgetPlanNavButton },
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
  },
  data() {
    return {
      currentAmount: 0,
      NavEditIcon: NavEditIcon,
      NavDeleteIcon: NavDeleteIcon,
    };
  },
  methods: {},
  computed: {
    checkLimit() {
      return {
        OverLimit: this.currentAmount > this.limitAmount,
        AlmostOverLimit: this.currentAmount > this.limitAmount * 0.8,
      };
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
.wrapper {
  border-radius: var(--radius);
  background-color: var(--primary-component-bg);
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header h1 {
  font-size: 1.1rem;
}

.main {
  display: flex;
}
.currentValue {
  font-size: 1.4rem;
  font-weight: bold;
}
.limitAmount {
  font-size: 1.4rem;
  font-weight: bold;
}

.AlmostOverLimit {
  color: var(--warning-clr);
}
.OverLimit {
  color: var(--danger-clr);
}
</style>
