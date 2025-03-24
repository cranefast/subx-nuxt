<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/effect-coverflow';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';
  import { onMounted } from 'vue';

  const reviews = ref([]);
  const swiperRef = ref(null);

  const modules = [Autoplay, Navigation, EffectCoverflow];

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
    <swiper
      ref="swiperRef"
      :effect="'coverflow'"
      :modules="modules"
      :slides-per-view="3"
      :space-between="30"
      :centered-slides="true"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :coverflowEffect="{
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false,
      }"
      :pagination="{ clickable: true }"
      :breakpoints="{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 1 },
        1024: { slidesPerView: 3 },
      }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
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

      <!-- 네비게이션 버튼 추가 -->
      <!--              <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>-->
    </swiper>
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

  .review-container .swiper-slide {
    flex: 0 0 calc((100% - 60px) / 3); /* 3개 기준 너비 고정 */
    max-width: 33.33%; /* 강제 설정 */
    box-sizing: border-box; /* 패딩 포함 크기 고정 */
  }
</style>
