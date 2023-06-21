<template>
  <div class="wrapper">
    <div class="form-warpper">
      <form class="form" @submit.prevent="deletePlanHandler">
        <div class="form-header">
          <h1>Delete: {{ savingplanId }}</h1>
          <img
            class="closeicon"
            src="../../../../assets/Icons/budget/closeicon.svg"
            alt="Close Form"
            @click="exitForm"
          />
        </div>

        <p class="warning">You Sure you want to delete this Saving Plan?</p>

        <p class="warning">
          The fund within the saving Plan will refund back to your balance.
        </p>

        <p class="warning">This Action cannot be undone !</p>

        <Button :text="'Yes, I Understand.'" class="formSubmit" />
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
  props: {
    savingplanId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    exitForm() {
      this.$emit("closeform");
    },
    deletePlanHandler() {
      axios
        .delete(
          `https://budgetbuddyproject-8ca78d75eded.herokuapp.com/${this.$route.params.id}/savingplan/${this.savingplanId}`,
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
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
.warning {
  color: var(--warning-clr);
}
</style>
