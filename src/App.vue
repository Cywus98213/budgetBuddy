<script setup>
import { RouterView } from "vue-router";
import Sidebar from "./components/common/sidebar.vue";
localStorage.setItem("IsLoggedIn", "false");
</script>

<template>
  <main>
    <Sidebar />

    <div class="content"><RouterView /></div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  height: 100vh;
  background-color: var(--main-bg-clr);
}
.content {
  flex-grow: 1;
}
</style>
