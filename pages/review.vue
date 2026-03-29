<script setup></script>

<template>
  <main id="contaniner" class="ready_common ready05">
    <div class="sub_container">
      <section class="section01">
        <div class="page_title_box review-section-heading">
          <span class="review-section-heading__eyebrow">Client Stories</span>
          <h2 class="page_title">후기</h2>
          <p class="review-section-heading__desc">
            카드에는 로고 영역, 회사명, 업종, 제목, 내용과 좋았던 포인트 한 가지만 남겨 더 짧고 또렷하게 읽히도록
            정리했습니다.
          </p>
          <div class="review-section-heading__actions">
            <NuxtLink to="/review-write" class="review-section-heading__action">후기 작성하기</NuxtLink>
          </div>
        </div>

        <review-swiper />
      </section>
    </div>
  </main>
</template>

<style scoped>
  @import '@/assets/css/sub.css';
  @import '@/assets/css/sub_02.css';
</style>
