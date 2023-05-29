<template>
  <div class="login-wrapper">
    <form action="POST" class="form" @submit.prevent="submitForm">
      <h1 class="form-header">Login.</h1>

      <label>Username:</label>
      <input
        type="text"
        v-model="usernameInput"
        class="input"
        required
        autocomplete="username"
      />
      <label>Password:</label>
      <input
        type="password"
        v-model="passwordInput"
        class="input"
        required
        autocomplete="current-password"
      />
      <p>
        Don't have an Account?
        <span @click="$router.push({ name: 'register' })">Sign up</span>
      </p>
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
  data() {
    return {
      usernameInput: "",
      passwordInput: "",
    };
  },
  methods: {
    loginUser() {
      axios
        .post("http://localhost:3000/login", {
          Username: this.usernameInput,
          Password: this.passwordInput,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            this.$store.dispatch("login");
            this.$router.push({
              name: "dashboard",
              params: { id: res.data.userId },
            });
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
.login-wrapper {
  height: 100vh;

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
.form p,
span {
  font-size: 0.9rem;
}
.form p {
  text-align: center;
}
.form span {
  color: var(--primary-button-clr);
  cursor: pointer;
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
