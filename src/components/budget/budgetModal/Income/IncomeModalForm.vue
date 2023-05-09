<template>
  <div class="wrapper">
    <div class="form-warpper">
      <form class="form" @submit.prevent="">
        <div class="form-header">
          <h1>Income Form:</h1>
          <img
            class="closeicon"
            src="../../../../assets/Icons/budget/closeicon.svg"
            alt="Close Form"
            @click="exitForm"
          />
        </div>
        <label for="expense-name">Income Source:</label>
        <input
          class="input"
          type="text"
          id="expense-name"
          name="expense-name"
          required
          placeholder="Product Name"
        />

        <label for="expense-amount">Amount:</label>
        <input
          class="input"
          type="number"
          id="expense-amount"
          name="expense-amount"
          min="0"
          step="0.01"
          placeholder="Product Price"
          required
        />

        <label for="expense-Frequency">Income Frequency:</label>
        <select
          class="input"
          id="expense-Frequency"
          name="expense-Frequency"
          required
        >
          <option value="weekly">Weekly</option>
          <option value="bi-weekly">Bi-weekly</option>
          <option value="monthly">Monthly</option>
          <option value="annually">Annually</option>
        </select>

        <label for="expense-date">Income Date:</label>
        <input
          class="input"
          type="date"
          id="expense-date"
          name="expense-date"
          placeholder="Date of Purchase"
          required
        />

        <Button :text="'Add Income'" class="formSubmit" />
      </form>
    </div>
  </div>
</template>
<script>
import Button from "../../../common/Button.vue";
export default {
  components: {
    Button,
  },
  methods: {
    exitForm() {
      this.$emit("closeform");
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
