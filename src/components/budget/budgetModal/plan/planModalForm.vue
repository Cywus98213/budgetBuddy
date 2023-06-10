<template>
  <div class="wrapper">
    <div class="form-warpper">
      <form class="form" @submit.prevent="createPlanHandler">
        <div class="form-header">
          <h1>Create Plan:</h1>
          <img
            class="closeicon"
            src="../../../../assets/Icons/budget/closeicon.svg"
            alt="Close Form"
            @click="exitForm"
          />
        </div>

        <label>Category:</label>
        <select class="input" required v-model="category">
          <option value="" disabled selected>Select a category</option>
          <option value="Groceries">Groceries</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Transportation">Transportation</option>
          <option value="Housing">Housing</option>
          <option value="Utilities">Utilities</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>

        <label for="expense-amount">LimitAmount:</label>
        <input
          v-model="limitAmount"
          class="input"
          type="number"
          id="expense-amount"
          name="expense-amount"
          min="0"
          step="0.01"
          placeholder="Limit Amount "
          required
        />

        <Button :text="'Add BudgetPlan'" class="formSubmit" />
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Button from "../../../common/Button.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      category: "",
      limitAmount: "",
    };
  },
  methods: {
    exitForm() {
      this.$emit("closeform");
    },
    createPlanHandler() {
      axios
        .post(`http://localhost:3000/${this.$route.params.id}/budgetplan`, {
          Category: this.category,
          LimitAmount: this.limitAmount,
          userId: sessionStorage.getItem("userId"),
        })
        .then((res) => {
          console.log(res);
          this.$emit("closeform");
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
  z-index: 50;
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
