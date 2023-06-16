<template>
  <div class="wrapper">
    <Transition>
      <ErrorBanner v-if="toggleError" :Msg="Msg" />
    </Transition>
    <div class="form-warpper">
      <form class="form" @submit.prevent="expenseFormHandler">
        <div class="form-header">
          <h1>Expense Form:</h1>
          <img
            class="closeicon"
            src="../../../../assets/Icons/budget/closeicon.svg"
            alt="Close Form"
            @click="exitForm"
          />
        </div>
        <label>Title:</label>
        <input
          class="input"
          type="text"
          v-model="title"
          required
          placeholder="Product Name"
        />

        <label>Amount:</label>
        <input
          class="input"
          type="number"
          v-model="amount"
          min="0"
          step="0.01"
          placeholder="Product Price"
          required
        />

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

        <label>Date:</label>
        <input
          v-model="date"
          class="input"
          type="date"
          placeholder="Date of Purchase"
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
  data() {
    return {
      title: "",
      amount: "",
      category: "",
      date: "",
      isButtonDisabled: false,
      toggleError: false,
      Msg: "",
    };
  },
  components: {
    Button,
    ErrorBanner,
  },
  methods: {
    exitForm() {
      this.$emit("closeform");
    },
    expenseFormHandler() {
      axios
        .post(
          `http://localhost:3000/${this.$route.params.id}/budget`,
          {
            Title: this.title,
            Amount: this.amount,
            Category: this.category,
            Date: this.date,
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
          if (err.response.status === 404) {
            this.Msg = err.response.data.error;
            this.toggleError = true;
            setTimeout(() => {
              this.toggleError = false;
            }, 3000);
          }
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
