<template>
  <div class="wrapper">
    <form action="POST" class="form" @submit.prevent="submitForm">
      <h1 class="form-header">Register.</h1>

      <label>Email:</label>
      <input type="email" v-model="email" class="input" required />
      <label>Username:</label>
      <input type="text" v-model="username" class="input" required />
      <label>Password:</label>
      <input type="password" v-model="password" class="input" required />
      <label>Confrim Password:</label>
      <input type="password" v-model="confirmPassword" class="input" required />

      <Button :text="'Register'" class="formSubmit" />
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
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    registerUser() {
      axios
        .post("http://localhost:3000/register", {
          Email: this.email,
          Username: this.username,
          Password: this.password,
        })
        .then((res) => {
          if (res.status === 200) {
            this.$router.push({ name: "login" });
          } else {
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitForm() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      this.registerUser();
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
