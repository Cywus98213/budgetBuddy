<script setup>
import { RouterView } from "vue-router";
import Sidebar from "./components/common/sidebar.vue";
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
  overflow-y: auto;
  overflow-x: hidden;
}
.content {
  flex-grow: 1;
  padding-left: 5rem;
}
</style>
