<template>
  <div v-if="expenses" class="wrapper">
    <div class="header">
      <h1>{{ category }}</h1>
      <div class="header-mod">
        <budgetPlanNavButton :iconSrc="NavEditIcon" />
        <budgetPlanNavButton :iconSrc="NavDeleteIcon" />
      </div>
    </div>
    <br />
    <div class="main">
      <p class="amount">
        ${{ currentAmount.toFixed(2) }}
        <span class="limitAmount">/ $1400.00</span>
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
  },
  data() {
    return {
      currentAmount: 0,
      NavEditIcon: NavEditIcon,
      NavDeleteIcon: NavDeleteIcon,
    };
  },
  methods: {},
  computed: {},
  mounted() {
    // loop through each expense and add the amount to the currentAmount
    if (this.expenses) {
      for (const expense of this.expenses) {
        this.currentAmount += expense.Amount;
      }
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
.amount {
  font-size: 1.4rem;
  font-weight: bold;
}

.limitAmount {
  font-size: 1.4rem;
  font-weight: 100;
}
</style>
