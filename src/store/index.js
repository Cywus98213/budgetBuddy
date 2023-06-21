import { createStore } from "vuex";

// create a new store instance
const store = createStore({
  state: {
    IsLoggedIn: sessionStorage.getItem("IsLoggedIn") === "true" ? true : false,
    userId: "",
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

    setUserId(state, userId) {
      state.userId = userId;
    },
  },
  actions: {
    login(context) {
      context.commit("login");
    },
    logout(context) {
      context.commit("logout");
    },

    setUserId(context, userId) {
      context.commit("setUserId", userId);
    },
  },
  getters: {
    IsLoggedIn: (state) => state.IsLoggedIn,
    userId: (state) => state.userId,
  },
});

export default store;
