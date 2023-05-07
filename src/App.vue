<script setup>
import { RouterView } from "vue-router";
import Sidebar from "./components/common/sidebar.vue";
</script>

<template>
  <main>
    <Sidebar />
    <transition name="slide" mode="in-out">
      <RouterView />
    </transition>
  </main>
</template>

<style scoped>
main {
  display: flex;
  background-color: var(--main-bg-clr);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-to {
  transform: translateX(0%);
}

.slide-leave-from {
  transform: translateX(0%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
