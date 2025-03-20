<script setup>
  const props = defineProps({
    addGnbClass: {
      type: String,
    },
  });
</script>

<template>
  <ul id="gnb" :class="`gnb ${addGnbClass}`">
    <li class="depth1">
      <router-link to="/service" tag="a">서비스</router-link>
    </li>
    <li class="depth1">
      <router-link to="/review" tag="a">후기</router-link>
    </li>
    <li class="depth1">
      <router-link to="/price" tag="a">가격안내</router-link>
    </li>
    <li class="depth1">
      <router-link to="/faq" tag="a">자주묻는질문</router-link>
    </li>
    <li class="depth1">
      <router-link to="/contact" tag="a">문의</router-link>
    </li>
  </ul>
</template>

<style scoped></style>
