<template>
  <div class="login-wrapper">
    <Transition>
      <ErrorBanner v-if="toggleError" :Msg="Msg" />
    </Transition>
    <Transition>
      <messageBanner v-if="toggleMessage" :Msg="Msg" />
    </Transition>

    <form action="POST" class="form" @submit.prevent="submitForm">
      <h1 class="form-header">Login.</h1>

      <label>Username:</label>
      <input
        type="text"
        v-model="usernameInput"
        class="input"
        required
        autocomplete="username"
        :disabled="isButtonDisabled"
      />
      <label>Password:</label>
      <input
        type="password"
        v-model="passwordInput"
        class="input"
        required
        autocomplete="current-password"
        :disabled="isButtonDisabled"
      />
      <p>
        Don't have an Account?
        <span @click="$router.push({ name: 'register' })">Sign up</span>
      </p>

      <div class="demoSection">
        <p>Demo Account:</p>
        <p>username: test123</p>
        <p>password: test123</p>
      </div>

      <Button :text="'Login'" class="formSubmit" />
    </form>
  </div>
</template>
<script>
import axios from "axios";
import messageBanner from "../components/common/messageBanner.vue";
import ErrorBanner from "../components/common/ErrorBanner.vue";
import Button from "../components/common/Button.vue";
export default {
  components: {
    Button,
    ErrorBanner,
    messageBanner,
  },
  data() {
    return {
      isButtonDisabled: false,
      toggleError: false,
      toggleMessage: false,
      Msg: "",
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
          console.log(res);
          if (res.status === 200) {
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("userId", res.data.userId);
            this.toggleMessage = true;
            this.Msg = res.data.message;
            this.$store.dispatch("login");
            setTimeout(() => {
              this.toggleMessage = false;
              this.$router.push({
                name: "dashboard",
                params: { id: res.data.userId },
              });
            }, 1000);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.isButtonDisabled = false;
            this.toggleError = true;
            this.Msg = err.response.data.error;
            setTimeout(() => {
              this.toggleError = false;
            }, 2000);
          }
          if (err.response.status === 500) {
            this.isButtonDisabled = false;
            this.toggleError = true;
            this.Msg = err.response.data.error;
            setTimeout(() => {
              this.toggleError = false;
            }, 2000);
          }
        });
    },
    submitForm() {
      this.isButtonDisabled = true;
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
