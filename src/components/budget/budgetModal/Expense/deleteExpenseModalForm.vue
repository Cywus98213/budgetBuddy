<template>
  <div class="wrapper">
    <Transition>
      <ErrorBanner v-if="toggleError" :Msg="Msg" />
    </Transition>
    <div class="form-warpper">
      <form class="form" @submit.prevent="deleteExpense">
        <div class="form-header">
          <h1>Delete Expense: {{ expenseId }}</h1>
          <img
            class="closeicon"
            src="../../../../assets/Icons/budget/closeicon.svg"
            alt="Close Form"
            @click="exitForm"
          />
        </div>

        <p class="warning">This action cannot be undo.</p>

        <p class="warning">Are you sure you want to delete this plan?</p>

        <Button :text="'Yes, I understand !'" class="formSubmit" />
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
  props: {
    expenseId: {
      type: String,
      required: true,
    },
  },
  components: {
    Button,
    ErrorBanner,
  },
  methods: {
    exitForm() {
      this.$emit("closeform");
    },
    deleteExpense() {
      //delete expense
      axios
        .delete(
          `http://localhost:3000/${this.$route.params.id}/budgetplan/${this.$route.params.budgetplanid}/expense/${this.expenseId}`,
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            this.$emit("closeform");
            this.$emit("renderExpenses");
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.warning {
  color: var(--warning-clr);
}
</style>
