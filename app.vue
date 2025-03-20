<template>
  <NuxtLayout>
    <transition name="fade" mode="out-in">
      <NuxtPage />
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
