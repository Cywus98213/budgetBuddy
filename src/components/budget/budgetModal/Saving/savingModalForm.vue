<template>
  <div class="wrapper">
    <div class="form-warpper">
      <form class="form" @submit.prevent="createPlanHandler">
        <div class="form-header">
          <h1>Create Saving Plan:</h1>
          <img
            class="closeicon"
            src="../../../../assets/Icons/budget/closeicon.svg"
            alt="Close Form"
            @click="exitForm"
          />
        </div>
        <label for="savingGoalName">Name: </label>
        <input
          type="text"
          required
          v-model="savingGoalName"
          class="input"
          placeholder="Saving Purpose"
        />

        <label for="savingGoalAmount">Target Amount:</label>
        <input
          type="number"
          required
          v-model="savingGoalTarget"
          class="input"
          placeholder="Saving Goal Amount"
        />

        <Button :text="'Submit'" class="formSubmit" />
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
      savingGoalName: "",
      savingGoalTarget: "",
    };
  },
  methods: {
    exitForm() {
      this.$emit("closeform");
    },
    createPlanHandler() {
      axios
        .post(
          `http://localhost:3000/${this.$route.params.id}/savingplan`,
          {
            SavingGoalName: this.savingGoalName,
            SavingGoalTarget: this.savingGoalTarget,
            userId: sessionStorage.getItem("userId"),
          },
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
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
