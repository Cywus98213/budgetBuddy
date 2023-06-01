<template>
  <div class="IncomeView-wrapper">
    <div class="header">
      <h1 class="header-title">Income.</h1>
    </div>
    <div class="planNav">
      <IncomeModal v-if="isAddIncome" @closeform="exitForm" />
      <Button :text="'Add Income'" @click="toggleIncomeForm" />
    </div>
  </div>
</template>
<script>
import IncomeModal from "../components/budget/budgetModal/Income/IncomeModal.vue";
import Button from "../components/common/Button.vue";
import axios from "axios";
export default {
  data() {
    return {
      haveIncomePlan: false,
      incomePlans: [],
      isAddIncome: false,
    };
  },
  components: {
    Button,
    IncomeModal,
  },
  methods: {
    getIncomePlan() {
      //get income plan from database
      axios
        .get(`http://localhost:3000/${this.$route.params.id}/income`)
        .then((res) => {
          console.log(res.data);
          this.incomePlans = res.data.IncomePlan;

          if (this.incomePlans.length > 0) {
            this.haveIncomePlan = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleIncomeForm() {
      this.isAddIncome = true;
    },
    exitForm() {
      this.isAddIncome = false;
      this.getIncomePlan();
    },
  },
};
</script>
<style scoped>
.IncomeView-wrapper {
  padding: 1rem;
}
.header-title {
  font-family: "ClashDisplay", sans-serif;
  font-size: 2rem;
}
.planNav {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
</style>
