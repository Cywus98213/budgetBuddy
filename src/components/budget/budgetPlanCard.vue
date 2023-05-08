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
      <p class="amount">$0.00 / 1400</p>
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
    category: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      NavEditIcon: NavEditIcon,
      NavDeleteIcon: NavDeleteIcon,
    };
  },
  methods: {},
  computed: {},
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
}
</style>
