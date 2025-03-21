<template>
  <NuxtLayout>
    <transition name="fade" mode="out-in">
      <div :key="route.params">
        <NuxtPage />
      </div>
    </transition>
  </NuxtLayout>
  <!--  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>-->
</template>
<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
<script setup>
  import { useRoute } from 'vue-router';

  const route = useRoute();
</script>
