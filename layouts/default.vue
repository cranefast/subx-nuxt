<template>
  <div>
    <app-header />

    <slot />

    <app-footer />
  </div>
</template>

<script setup lang="ts">
  import AppHeader from '~/components/AppHeader.vue';
  import AppFooter from '~/components/AppFooter.vue';
</script>
