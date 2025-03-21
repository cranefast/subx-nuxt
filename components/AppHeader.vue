<script setup>
  import { useLayoutStore } from '~/stores/layout.js';
  import { computed } from 'vue';

  const layoutStore = useLayoutStore();

  const isMobileMenu = computed(() => layoutStore.isMobileMenu);

  // const isMobileMenu = ref(false);
  //
  // onBeforeUnmount(() => {
  //   isMobileMenu.value = false;
  // });
</script>

<template>
  <div id="header" class="sticky">
    <aside>
      <button type="button" class="top_btn on none">
        <img src="~/assets/img/main/btn_top.webp" alt="탑버튼" />
      </button>
    </aside>

    <div class="header">
      <div class="inner f_b">
        <h1>
          <router-link to="/" tag="a">
            <img src="~/assets/img/main/logo.png" alt="로고" class="pc_ver" />
            <img src="~/assets/img/main/logo.png" alt="로고" class="mo_ver" />
          </router-link>
        </h1>
        <nav class="menu_pc">
          <app-header-menu :add-gnb-class="'cf'" />
        </nav>
        <div class="serach_b_all">
          <div class="search_b f_b login_out">
            <!--            <a href="" class="login_btn">로그인/회원가입</a>-->
          </div>
        </div>
        <div class="btn_box">
          <button type="button" class="btn_call" @click="layoutStore.toggleMobileMenu()" :class="{ on: isMobileMenu }">
            <span></span>
            <!-- 230510 [수정표시] -->
          </button>
        </div>
        <div class="menu_mo" :class="{ on: isMobileMenu }">
          <!--          <div class="login_btn">
            <a href="l" class="login_btn">로그인/회원가입</a>
          </div>-->
          <div class="menu_mo_s">
            <nav class="menu_mo_nav">
              <app-header-menu />
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
