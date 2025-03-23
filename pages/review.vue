<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';
  import { onMounted } from 'vue';

  const reviews = ref([]);
  const swiperRef = ref(null);

  onMounted(async () => {
    reviews.value = [
      {
        company: '주식회사 앱지',
        industry: 'IT 서비스',
        logo: '/img/review/appg_logo.png',
        content: '내용 테스트',
      },
      {
        company: '엔제이소프트',
        industry: '마케팅 에이전시',
        logo: '/img/review/njsoft_logo.png',
        content: '효과적인 마케팅 전략으로 매출이 30% 이상 증가했어요. 강력 추천합니다.',
      },
      {
        company: '테스트 업체 1',
        industry: '인테리어 디자인',
        logo: '/img/review/appg_logo.png',
        content: '디자인과 시공이 모두 훌륭했어요. 너무 만족스럽습니다.',
      },
      {
        company: '테스트 업체 2',
        industry: '인테리어 디자인',
        logo: '/img/review/njsoft_logo.png',
        content: '디자인과 시공이 모두 훌륭했어요. 너무 만족스럽습니다.',
      },
      {
        company: '테스트 업체 3',
        industry: '인테리어 디자인',
        logo: '/img/review/appg_logo.png',
        content: '디자인과 시공이 모두 훌륭했어요. 너무 만족스럽습니다.',
      },
    ];
  });
</script>

<template>
  <client-only>
    <main id="contaniner" class="ready_common ready05">
      <div class="sub_container">
        <section class="section01">
          <div class="page_title_box">
            <h2 class="page_title">후기</h2>
            <!--          <p class="page_sub_desc02">디스크립션</p>-->
          </div>

          <swiper
            ref="swiperRef"
            :slides-per-view="'auto'"
            :space-between="20"
            :autoplay="{
              delay: 3000,
              disableOnInteraction: false,
            }"
            :pagination="{ clickable: true }"
            navigation
            class="review-container"
          >
            <swiper-slide v-for="(review, index) in reviews" :key="index" class="review-card">
              <div class="review-header">
                <img :src="review.logo" alt="업체 로고" class="review-logo" />
                <div class="review-info">
                  <h3 class="review-company">{{ review.company }}</h3>
                  <p class="review-industry">{{ review.industry }}</p>
                </div>
              </div>
              <p class="review-content">{{ review.content }}</p>
            </swiper-slide>
          </swiper>
        </section>
      </div>
    </main>
  </client-only>
</template>

<style scoped>
  @import '@/assets/css/sub.css';
  @import '@/assets/css/sub_02.css';

  .review-container {
    padding: 20px 10px;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .review-card {
    flex: 0 0 auto;
    max-width: 320px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s;
  }

  .review-card:hover {
    transform: translateY(-5px);
  }

  .review-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .review-logo {
    width: 60px; /* 로고 크기 확대 */
    height: 60px;
    border-radius: 50%;
    margin-right: 15px;
  }

  .review-info {
    display: flex;
    flex-direction: column;
  }

  .review-company {
    font-weight: bold;
    font-size: 1.3rem; /* 회사명 폰트 크기 확대 */
    margin: 0;
  }

  .review-industry {
    font-size: 1rem;
    color: #777;
    margin: 0;
  }

  .review-content {
    color: #444;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #4caf50;
  }

  .swiper-pagination-bullet-active {
    background-color: #4caf50;
  }

  /* 복제 슬라이드 강제 스타일 추가 */
  .swiper-slide-duplicate .review-card {
    flex: 0 0 auto;
    max-width: 300px;
    background-color: #fff; /* 백그라운드 색상 유지 */
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
</style>
