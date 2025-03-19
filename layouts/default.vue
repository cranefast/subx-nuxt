<template>
  <div>
    <div id="header" class="sticky">
      <aside>
        <button type="button" class="top_btn on none">
          <img src="~/assets/img/main/btn_top.webp" alt="탑버튼" />
        </button>
      </aside>

      <div class="header">
        <div class="inner f_b">
          <h1>
            <a href="javascript:void(0)">
              <img src="~/assets/img/main/logo.png" alt="로고" class="pc_ver" />
              <img src="~/assets/img/main/logo.png" alt="로고" class="mo_ver" />
            </a>
          </h1>
          <nav class="menu_pc">
            <ul id="gnb" class="gnb cf">
              <li class="depth1">
                <a href="/">회사소개</a>
              </li>
              <li class="depth1">
                <a href="/service">서비스</a>
              </li>
              <li class="depth1">
                <a href="/review">후기</a>
              </li>
              <li class="depth1">
                <a href="/price">가격안내</a>
              </li>
              <li class="depth1">
                <a href="/faq">자주묻는질문</a>
              </li>
              <li class="depth1">
                <a href="/contact">문의</a>
              </li>
            </ul>
          </nav>
          <div class="serach_b_all">
            <div class="search_b f_b login_out">
              <a href="" class="login_btn">로그인/회원가입</a>
            </div>
          </div>
          <div class="btn_box">
            <button type="button" class="btn_call">
              <span></span>
              <!-- 230510 [수정표시] -->
            </button>
          </div>
          <div class="menu_mo">
            <div class="login_btn">
              <a href="l" class="login_btn">로그인/회원가입</a>
            </div>
            <div class="menu_mo_s">
              <nav class="menu_mo_nav">
                <ul class="gnb">
                  <li class="depth1 acc_btn">
                    <a href="/">회사소개</a>
                  </li>
                  <li class="depth1 acc_btn">
                    <a href="/service">서비스</a>
                  </li>
                  <li class="depth1 acc_btn">
                    <a href="javascript:void(0);">후기</a>
                  </li>
                  <li class="depth1 acc_btn">
                    <a href="/price">가격안내</a>
                  </li>
                  <li class="depth1 acc_btn">
                    <a href="javascript:void(0);">자주묻는질문</a>
                  </li>
                  <li class="depth1 acc_btn">
                    <a href="javascript:void(0);">문의</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <slot />

    <div id="footer">

      <div class="footer">

        <div class="inner ">
          <div class="full-bg"></div>

          <div class="info_f">

            <div class="info_desc">
              <p class="copy">Copyright(C) ⓒ 2025 경리파트너 Sub X. all rights reserved.</p>
              <div class="info_f_link_box n1">
              </div>
              <p>
                <span>경리파트너 Sub X  대표이사 강지연</span>
                <span>서울시 송파구 송파대로</span>
                <span>사업자등록번호 000-000-0000000</span><br>
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
