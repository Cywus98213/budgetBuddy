<template>
  <div class="wrapper">
    <div class="form-warpper">
      <form class="form" @submit.prevent="IncomeFormHandler">
        <div class="form-header">
          <h1>Income Form:</h1>
          <img
            class="closeicon"
            src="../../../../assets/Icons/budget/closeicon.svg"
            alt="Close Form"
            @click="exitForm"
          />
        </div>
        <label>Income Source:</label>
        <input
          v-model="IncomeSource"
          class="input"
          type="text"
          required
          placeholder="Income Source"
        />

        <label>Income Amount:</label>
        <input
          v-model="IncomeAmount"
          class="input"
          type="number"
          min="0"
          step="0.01"
          placeholder="Income Amount"
          required
        />

        <label>Income Category:</label>
        <select v-model="IncomeCategory" class="input" required>
          <option value="" disabled selected>Select a Category</option>
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
          <option value="Rental">Rental</option>
          <option value="Investment">Investment</option>
          <option value="Gifts">Gifts</option>
          <option value="Business">Business</option>
        </select>

        <label>Income Frequency:</label>
        <select v-model="IncomeFrequency" class="input" required>
          <option value="" disabled selected>Select a frequency</option>
          <option value="Weekly">Weekly</option>
          <option value="Bi-weekly">Bi-weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="One-time">One-time</option>
        </select>

        <label for="expense-date">Income Date:</label>
        <input
          v-model="IncomeDate"
          class="input"
          type="date"
          id="expense-date"
          name="expense-date"
          placeholder="Date of Income"
          required
        />

        <Button :text="'Submit'" class="formSubmit" />
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ErrorBanner from "../../../common/ErrorBanner.vue";
import Button from "../../../common/Button.vue";
export default {
  components: {
    Button,
    ErrorBanner,
  },
  data() {
    return {
      IncomeSource: "",
      IncomeAmount: "",
      IncomeFrequency: "",
      IncomeDate: "",
      IncomeCategory: "",
      Msg: "",
      toggleError: false,
    };
  },
  methods: {
    exitForm() {
      this.$emit("closeform");
    },
    IncomeFormHandler() {
      axios
        .post(
          `http://localhost:3000/${this.$route.params.id}/income`,
          {
            IncomeSource: this.IncomeSource,
            IncomeAmount: this.IncomeAmount,
            IncomeFrequency: this.IncomeFrequency,
            IncomeDate: this.IncomeDate,
            IncomeCategory: this.IncomeCategory,
          },
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
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
