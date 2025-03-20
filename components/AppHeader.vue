<script setup>
  import { onBeforeUnmount } from 'vue';

  const isMobileMenu = ref(false);

  onBeforeUnmount(() => {
    isMobileMenu.value = false;
  });
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
          <ul id="gnb" class="gnb cf">
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
        </nav>
        <div class="serach_b_all">
          <div class="search_b f_b login_out">
            <!--            <a href="" class="login_btn">로그인/회원가입</a>-->
          </div>
        </div>
        <div class="btn_box">
          <button type="button" class="btn_call" @click="isMobileMenu = !isMobileMenu" :class="{ on: isMobileMenu }">
            <span></span>
            <!-- 230510 [수정표시] -->
          </button>
        </div>
        <div class="menu_mo" :class="{ on: isMobileMenu }">
          <div class="login_btn">
            <a href="l" class="login_btn">로그인/회원가입</a>
          </div>
          <div class="menu_mo_s">
            <nav class="menu_mo_nav">
              <ul class="gnb">
                <li class="depth1 acc_btn">
                  <router-link to="/" tag="a">메인</router-link>
                </li>
                <li class="depth1 acc_btn">
                  <router-link to="/service" tag="a">서비스</router-link>
                </li>
                <li class="depth1 acc_btn">
                  <router-link to="/review" tag="a">후기</router-link>
                </li>
                <li class="depth1 acc_btn">
                  <router-link to="/price" tag="a">가격안내</router-link>
                </li>
                <li class="depth1 acc_btn">
                  <router-link to="/faq" tag="a">자주묻는질문</router-link>
                </li>
                <li class="depth1 acc_btn">
                  <router-link to="/contact" tag="a">문의</router-link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
