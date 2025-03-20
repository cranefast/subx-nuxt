<template>
  <div>
    <app-header />

    <slot />

    <div id="footer">
      <div class="footer">
        <div class="inner">
          <div class="full-bg"></div>

          <div class="info_f">
            <div class="info_desc">
              <p class="copy">Copyright(C) ⓒ 2025 경리파트너 Sub X. all rights reserved.</p>
              <div class="info_f_link_box n1"></div>
              <p>
                <span>경리파트너 Sub X 대표이사 강지연</span>
                <span>서울시 송파구 송파대로</span>
                <span>사업자등록번호 000-000-0000000</span>
                <br />
                <span>고객상담 010-2373-1696</span>
                <span>subxpartners@gamil.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--      <link rel="stylesheet" type="text/css" href="./css/main_respon.css">

      <script src="./js/swiper.js"></script>
      <script src="./js/common.js"></script>-->
    </div>
  </div>
</template>

<style scoped></style>
<script setup lang="ts">
  import AppHeader from '~/components/AppHeader.vue';
</script>
