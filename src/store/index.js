import { createStore } from "vuex";

// create a new store instance
const store = createStore({
  state: {
    IsLoggedIn: sessionStorage.getItem("IsLoggedIn") === "true" ? true : false,
  },
  mutations: {
    login(state) {
      state.IsLoggedIn = true;
      sessionStorage.setItem("IsLoggedIn", true);
    },
    logout(state) {
      state.IsLoggedIn = false;
      sessionStorage.setItem("IsLoggedIn", false);
    },
  },
  actions: {
    login(context) {
      context.commit("login");
    },
    logout(context) {
      context.commit("logout");
    },
  },
  getters: {
    IsLoggedIn: (state) => state.IsLoggedIn,
  },
});

export default store;
