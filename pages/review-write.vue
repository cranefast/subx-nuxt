<script setup></script>

<template>
  <main id="contaniner" class="ready_common ready05 review-write-page">
    <div class="sub_container">
      <section class="section01">
        <div class="page_title_box review-section-heading">
          <span class="review-section-heading__eyebrow">Write A Review</span>
          <h2 class="page_title">후기 작성</h2>
          <p class="review-section-heading__desc">
            실제로 좋았던 변화를 핵심만 남기면, 메인과 후기 페이지 카드에 더 또렷하게 노출됩니다.
          </p>
          <div class="review-section-heading__actions">
            <NuxtLink to="/review" class="review-section-heading__action review-section-heading__action--secondary">
              후기 페이지로 돌아가기
            </NuxtLink>
          </div>
        </div>

        <review-write-form />
      </section>
    </div>
  </main>
</template>

<style scoped>
  @import '@/assets/css/sub.css';
  @import '@/assets/css/sub_02.css';

  .review-write-page {
    padding-bottom: 12rem;
  }
</style>
