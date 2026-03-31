<script setup>
  defineProps({
    addGnbClass: {
      type: String,
      default: '',
    },
  });
</script>

<template>
  <ul id="gnb" :class="`gnb ${addGnbClass}`">
    <li class="depth1">
      <router-link to="/service">서비스</router-link>
    </li>
    <li class="depth1">
      <router-link to="/review">후기</router-link>
    </li>
    <li class="depth1">
      <router-link to="/price">가격안내</router-link>
    </li>
    <li class="depth1">
      <router-link to="/faq">자주묻는질문</router-link>
    </li>
    <li class="depth1">
      <router-link to="/contact">문의</router-link>
    </li>
  </ul>
</template>
