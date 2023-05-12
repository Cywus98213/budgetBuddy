<template>
  <div class="wrapper">
    <form action="POST" class="form" @submit.prevent="submitForm">
      <h1 class="form-header">Login.</h1>

      <label>Username:</label>
      <input type="text" v-model="username" class="input" required />
      <label>Password:</label>
      <input type="password" v-model="password" class="input" required />

      <Button :text="'Login'" class="formSubmit" />
    </form>
  </div>
</template>
<script>
import axios from "axios";
import Button from "../components/common/Button.vue";
export default {
  components: {
    Button,
  },
  methods: {
    loginUser() {
      axios
        .post("http://localhost:3000/login", {
          Username: this.username,
          Password: this.password,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            this.$store.dispatch("login");
            this.$router.push({ name: "home" });
          } else {
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitForm() {
      this.loginUser();
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: 100vh;
  padding: 1rem;
  display: grid;
  place-items: center;
}
.form {
  height: 600px;
  width: 80%;
  max-width: 600px;
  padding: 1rem;
  border-radius: var(--radius);
  background-color: var(--primary-component-bg);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-header {
  text-align: center;
  font-size: 1.5rem;
}
.input {
  border-radius: var(--radius);
  padding: 0.5rem 0.2rem;
  background-color: var(--main-bg-clr);
  border: none;
}
.formSubmit {
  margin-top: auto;
}
</style>
