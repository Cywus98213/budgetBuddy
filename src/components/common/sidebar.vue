<template>
  <div class="sidebar-wrapper" :class="{ expanded: isToggle }">
    <p class="logo">BD.</p>

    <ul class="nav-lists">
      <div class="top">
        <transition>
          <RouterLink
            :class="{ active: $route.name === 'home' }"
            class="link-wrapper"
            :to="{ name: 'home' }"
          >
            <img
              class="nav-icon"
              src="../../assets/Icons/sidebar/home.svg"
              alt="Dashboard"
            />
            <p class="links" v-if="isToggle">Home</p>
          </RouterLink>
        </transition>
        <transition>
          <RouterLink
            v-if="IsLoggedIn"
            :class="{ active: $route.name === 'dashboard' }"
            class="link-wrapper"
            :to="{ name: 'dashboard' }"
          >
            <img
              class="nav-icon"
              src="../../assets/Icons/sidebar/Dashboard.svg"
              alt="Dashboard"
            />
            <p class="links" v-if="isToggle">Dashboard</p>
          </RouterLink>
        </transition>
        <transition>
          <RouterLink
            v-if="IsLoggedIn"
            class="link-wrapper"
            :to="{ name: 'history' }"
            :class="{ active: $route.name === 'history' }"
          >
            <img
              class="nav-icon"
              src="../../assets/Icons/sidebar/Transaction.svg"
              alt="Transactions"
            />
            <p class="links" v-if="isToggle">History</p>
          </RouterLink>
        </transition>
        <transition>
          <RouterLink
            v-if="IsLoggedIn"
            class="link-wrapper"
            :to="{ name: 'budget' }"
            :class="{ active: $route.name === 'budget' }"
          >
            <img
              class="nav-icon"
              src="../../assets/Icons/sidebar/Budget.svg"
              alt="Budget"
            />
            <p class="links" v-if="isToggle">Budget</p>
          </RouterLink>
        </transition>
        <!-- <transition>
          <RouterLink
            class="link-wrapper"
            :to="{ name: 'dashboard' }"
            :class="{ active: $route.name === 'dashboard' }"
          >
            <img
              class="nav-icon"
              src="../../assets/Icons/sidebar/Statistic.svg"
              alt="Statistic"
            />
            <p class="links" v-if="isToggle">Statistic</p>
          </RouterLink>
        </transition>
        <transition>
          <RouterLink
            class="link-wrapper"
            :to="{ name: 'dashboard' }"
            :class="{ active: $route.name === 'dashboard' }"
          >
            <img
              class="nav-icon"
              src="../../assets/Icons/sidebar/Setting.svg"
              alt="Setting"
            />
            <p class="links" v-if="isToggle">Setting</p>
          </RouterLink>
        </transition> -->
      </div>

      <div class="footer">
        <transition>
          <RouterLink
            v-if="!IsLoggedIn"
            class="link-wrapper"
            :to="{ name: 'login' }"
            :class="{ active: $route.name === 'login' }"
          >
            <img
              class="nav-icon"
              src="../../assets/Icons/sidebar/Login.svg"
              alt="login"
            />
            <p class="links" v-if="isToggle">Login</p>
          </RouterLink>
        </transition>
        <transition>
          <RouterLink
            v-if="!IsLoggedIn"
            class="link-wrapper"
            :to="{ name: 'register' }"
            :class="{ active: $route.name === 'register' }"
          >
            <img
              class="nav-icon"
              src="../../assets/Icons/sidebar/Register.svg"
              alt="register"
            />
            <p class="links" v-if="isToggle">Register</p>
          </RouterLink>
        </transition>
      </div>
    </ul>

    <div class="toggle" @click="togglehandler">
      <img
        v-if="!isToggle"
        class="toggle-image"
        src="../../assets/Icons/sidebar/expand.svg"
        alt="Expand Sidebar"
      />
      <img
        v-if="isToggle"
        class="toggle-image"
        src="../../assets/Icons/sidebar/minimize.svg"
        alt="minimize Sidebar"
      />
    </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
export default {
  data() {
    return {
      isToggle: false,
    };
  },
  methods: {
    togglehandler() {
      this.isToggle = !this.isToggle;
    },
  },
  computed: {
    IsLoggedIn() {
      return this.$store.getters.IsLoggedIn;
    },
  },
};
</script>
<style scoped>
.sidebar-wrapper {
  height: 100vh;
  display: flex;
  border-radius: 0 var(--radius) var(--radius) 0;
  flex-direction: column;
  align-items: center;
  background-color: var(--primary-component-bg);
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 5px 0 7px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.6rem;
  margin: 2rem 1rem;
  text-align: center;
}
.link-wrapper {
  display: flex;
  margin: 1.3rem;
  align-items: center;
}
.nav-lists {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.nav-icon {
  width: 1.3rem;
  margin: 1rem;
}
.links {
  margin: 0 1rem;
  font-family: "Poppins", sans-serif;
}
.link-wrapper {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: var(--radius);
}
.footer {
  margin-top: auto;
}
.active {
  background-color: var(--primary-button-clr);
  border-radius: var(--radius);
  outline: 4px var(--main-bg-clr) solid;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.link-wrapper:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  outline: 4px var(--main-bg-clr) solid;
  background-color: var(--primary-button-clr);
}
.toggle {
  padding: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateX(20%);
  background-color: var(--toggle-bg-clr);
  cursor: pointer;
}
.toggle-image {
  width: 1.3rem;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.sidebar-wrapper {
  width: 80px;
  transition: all 0.3s ease;
}

.sidebar-wrapper.expanded {
  width: 220px;
}
</style>
