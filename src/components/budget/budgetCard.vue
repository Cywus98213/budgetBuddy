<template>
  <div class="wrapper">
    <div class="main-section">
      <p class="budgetTitle">My Budget</p>
      <p class="budgetAmount">$1.550,00</p>
      <div class="button-section">
        <budgetButton :text="'Add Income'" :iconSrc="AddincomeIcon" />
        <budgetButton :text="'Add Expense'" :iconSrc="AddspendingIcon" />
      </div>
    </div>
  </div>
</template>
<script>
import AddincomeIcon from "../../assets/Icons/budget/Addincome.svg";
import AddspendingIcon from "../../assets/Icons/budget/Addspending.svg";
import budgetButton from "./budgetButton.vue";
export default {
  components: {
    budgetButton,
  },
  data() {
    return {
      AddincomeIcon: AddincomeIcon,
      AddspendingIcon: AddspendingIcon,
    };
  },
};
</script>
<style scoped>
.wrapper {
  border-radius: var(--radius);
  background-color: var(--primary-component-bg);
}
.main-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.budgetAmount {
  font-size: 2rem;
  font-weight: bold;
}
@media screen and (min-width: 424px) {
  .budgetAmount {
    font-size: 3rem;
  }
}
@media screen and (min-width: 767px) {
  .button-section {
    flex-direction: row;
  }
  .budgetAmount {
    font-size: 4rem;
  }
}
</style>
