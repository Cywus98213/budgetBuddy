<template>
  <div class="wrapper">
    <div class="form-warpper">
      <form class="form" @submit.prevent="updateBudgetPlanHandler">
        <div class="form-header">
          <h1>Edit Plan:</h1>
          <img
            class="closeicon"
            src="../../../assets/Icons/budget/closeicon.svg"
            alt="Close Form"
            @click="exitForm"
          />
        </div>

        <label for="expense-amount">LimitAmount:</label>
        <input
          v-model="UpdateLimitAmount"
          class="input"
          type="number"
          id="expense-amount"
          name="expense-amount"
          min="0"
          step="0.01"
          placeholder=" Limit Amount"
          required
        />

        <Button :text="'Update'" class="formSubmit" />
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Button from "../../../components/common/Button.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      UpdateCategory: "",
      UpdateLimitAmount: "",
    };
  },
  methods: {
    updateBudgetPlanHandler() {
      axios
        .put(
          `https://budgetbuddyproject-8ca78d75eded.herokuapp.com/${this.$route.params.id}/budgetplan/${this.$route.params.budgetplanid}`,
          {
            LimitAmount: this.UpdateLimitAmount,
          },
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$emit("closeform");
            this.$emit("successful", res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.wrapper {
  z-index: 7;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}
.form-warpper {
  border-radius: var(--radius);
  background-color: var(--main-bg-clr);
  width: 80%;
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.form-header {
  display: flex;

  justify-content: space-between;
}
.form-header h1 {
  font-family: "ClashDisplay", sans-serif;
  font-size: 1.3rem;
}
.closeicon {
  cursor: pointer;
}
.form {
  color: var(--main-bg-clr);
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
.input {
  padding: 0.5rem;
  border-radius: var(--radius);
  background-color: var(--primary-component-bg);
  border: none;
}
</style>
