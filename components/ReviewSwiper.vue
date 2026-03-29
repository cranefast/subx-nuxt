<script setup>
  import { ref } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { A11y, Autoplay, Pagination } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/pagination';

  const fallbackReviews = [
    {
      id: 'seed-1',
      company: '주식회사 앱지',
      industry: 'IT 서비스',
      logo: '/img/review/appg_logo.png',
      focus: '월말 마감',
      title: '월말 확인 포인트가 훨씬 선명해졌습니다.',
      content: '자료 요청 순서가 정리돼 대표가 직접 챙기는 시간이 줄었습니다.',
      theme: 'sky',
    },
    {
      id: 'seed-2',
      company: '엔제이소프트',
      industry: '마케팅 에이전시',
      logo: '/img/review/njsoft_logo.png',
      focus: '인수인계',
      title: '담당자 공백이 생겨도 흐름이 끊기지 않았어요.',
      content: '비용 정리와 증빙 대응이 안정적으로 이어져 팀이 본업에 집중하기 쉬워졌습니다.',
      theme: 'mint',
    },
    {
      id: 'seed-3',
      company: '도소매 유통 고객사',
      industry: '도소매 · 유통',
      logo: '',
      focus: '자료 정리',
      title: '증빙과 거래처 자료가 한 번에 맞물리기 시작했습니다.',
      content: '입출금과 세금계산서를 맞추는 시간이 줄어 운영 판단이 빨라졌습니다.',
      theme: 'sand',
    },
    {
      id: 'seed-4',
      company: '수출입 운영 고객사',
      industry: '무역 · 수출입',
      logo: '',
      focus: '서류 대응',
      title: '복잡한 문서 대응을 대표가 계속 붙잡고 있지 않아도 됐습니다.',
      content: '반복 서류의 순서가 정리돼 급하게 확인할 일이 확실히 줄었습니다.',
      theme: 'lavender',
    },
    {
      id: 'seed-5',
      company: '오프라인 매장 운영 고객사',
      industry: '리테일 · 오프라인 매장',
      logo: '',
      focus: '운영 안정성',
      title: '현장 운영과 숫자 관리 사이의 간격이 많이 줄었습니다.',
      content: '매입과 정산 현황을 더 빨리 파악할 수 있어 의사결정이 수월해졌습니다.',
      theme: 'peach',
    },
  ];

  const modules = [A11y, Autoplay, Pagination];
  const reviews = ref([...fallbackReviews]);
  const swiperInstance = ref(null);
  const currentIndex = ref(1);

  const formatCounter = (value) => String(value).padStart(2, '0');

  const getReviewMark = (company = '') => {
    const cleaned = company.replace(/주식회사|유한회사|고객사|\s+/g, '').trim();

    return cleaned.slice(0, 2) || '후기';
  };

  const handleSwiper = (swiper) => {
    swiperInstance.value = swiper;
    currentIndex.value = swiper.realIndex + 1;
  };

  const handleSlideChange = (swiper) => {
    currentIndex.value = swiper.realIndex + 1;
  };

  const slidePrev = () => {
    swiperInstance.value?.slidePrev();
  };

  const slideNext = () => {
    swiperInstance.value?.slideNext();
  };
</script>

<template>
  <client-only>
    <section class="review-carousel" aria-label="고객 후기">
      <div class="review-carousel__top">
        <p class="review-carousel__note">&nbsp;</p>

        <div class="review-carousel__controls">
          <p class="review-carousel__fraction">
            <strong>{{ formatCounter(currentIndex) }}</strong>
            <span>/ {{ formatCounter(reviews.length) }}</span>
          </p>
          <div class="review-carousel__buttons">
            <button type="button" class="review-carousel__button" aria-label="이전 후기 보기" @click="slidePrev">
              &lt;
            </button>
            <button type="button" class="review-carousel__button" aria-label="다음 후기 보기" @click="slideNext">
              &gt;
            </button>
          </div>
        </div>
      </div>

      <swiper
        :modules="modules"
        :slides-per-view="1.02"
        :space-between="14"
        :speed="650"
        :loop="reviews.length > 1"
        :grab-cursor="true"
        :autoplay="
          reviews.length > 1
            ? {
                delay: 4800,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        "
        :pagination="{
          el: '.review-carousel__pagination',
          clickable: true,
        }"
        :breakpoints="{
          640: { slidesPerView: 1.15, spaceBetween: 18 },
          960: { slidesPerView: 1.55, spaceBetween: 20 },
          1200: { slidesPerView: 2.05, spaceBetween: 24 },
        }"
        class="review-carousel__slider"
        @swiper="handleSwiper"
        @slide-change="handleSlideChange"
      >
        <swiper-slide v-for="review in reviews" :key="review.id || review.company" class="review-carousel__slide">
          <article class="review-card" :class="`review-card--${review.theme || 'sky'}`">
            <div class="review-card__top">
              <div class="review-card__logo">
                <img v-if="review.logo" :src="review.logo" :alt="`${review.company} 로고`" />
                <span v-else class="review-card__logo--fallback">{{ getReviewMark(review.company) }}</span>
              </div>

              <div class="review-card__meta">
                <strong class="review-card__company">{{ review.company }}</strong>
                <span class="review-card__industry">{{ review.industry }}</span>
              </div>
            </div>

            <div class="review-card__body">
              <span class="review-card__focus">{{ review.focus }}</span>
              <h3 class="review-card__title">{{ review.title }}</h3>
              <p class="review-card__content">{{ review.content }}</p>
            </div>
          </article>
        </swiper-slide>
      </swiper>

      <div class="review-carousel__pagination"></div>
    </section>
  </client-only>
</template>

<style scoped>
  .review-carousel {
    position: relative;
    margin-top: 2.4rem;
    padding: clamp(1.8rem, 2.6vw, 3rem);
    border-radius: 3rem;
    background: linear-gradient(135deg, #f6faff 0%, #ffffff 48%, #eef5ff 100%);
    border: 1px solid rgba(14, 126, 247, 0.08);
    overflow: hidden;
  }

  .review-carousel::after {
    content: '';
    position: absolute;
    top: -10rem;
    right: -9rem;
    width: 24rem;
    height: 24rem;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(14, 126, 247, 0.12) 0%, rgba(14, 126, 247, 0) 72%);
    pointer-events: none;
  }

  .review-carousel__top {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .review-carousel__note {
    max-width: 42rem;
    margin: 0;
    font-size: 1.45rem;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.58);
    word-break: keep-all;
  }

  .review-carousel__controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;
  }

  .review-carousel__fraction {
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
    margin: 0;
    min-width: 7.4rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.42);
  }

  .review-carousel__fraction strong {
    font-size: 2.4rem;
    line-height: 1;
    color: #111111;
  }

  .review-carousel__buttons {
    display: flex;
    gap: 0.8rem;
  }

  .review-carousel__button {
    width: 4.2rem;
    height: 4.2rem;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.07);
    color: #111111;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      transform 0.25s ease,
      background-color 0.25s ease,
      border-color 0.25s ease,
      color 0.25s ease;
  }

  .review-carousel__button:hover {
    transform: translateY(-0.2rem);
    background: #0e7ef7;
    border-color: #0e7ef7;
    color: #ffffff;
  }

  .review-carousel__slider {
    position: relative;
    z-index: 1;
    overflow: visible;
    padding-bottom: 3.6rem;
  }

  .review-carousel__slider :deep(.swiper-wrapper) {
    align-items: stretch;
  }

  .review-carousel__slider :deep(.swiper-slide) {
    height: auto;
    opacity: 0.56;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .review-carousel__slider :deep(.swiper-slide-active),
  .review-carousel__slider :deep(.swiper-slide-next) {
    opacity: 1;
  }

  .review-card {
    --review-accent: #0e7ef7;
    --review-soft: #eef5ff;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    height: 100%;
    padding: 2.4rem;
    border-radius: 2.4rem;
    background: rgba(255, 255, 255, 0.96);
    border: 1px solid rgba(255, 255, 255, 0.75);
    box-shadow: 0 18px 32px rgba(11, 39, 87, 0.08);
    transition: transform 0.3s ease;
  }

  .review-carousel__slider :deep(.swiper-slide) .review-card {
    transform: translateY(0.8rem);
  }

  .review-carousel__slider :deep(.swiper-slide-active) .review-card,
  .review-carousel__slider :deep(.swiper-slide-next) .review-card {
    transform: translateY(0);
  }

  .review-card__top {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .review-card__logo {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 5.8rem;
    height: 5.8rem;
    border-radius: 1.6rem;
    background: var(--review-soft);
    overflow: hidden;
  }

  .review-card__logo img {
    max-width: 72%;
    max-height: 72%;
    object-fit: contain;
  }

  .review-card__logo--fallback {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--review-accent);
    letter-spacing: -0.04em;
  }

  .review-card__meta {
    min-width: 0;
  }

  .review-card__company {
    display: block;
    font-size: 1.9rem;
    font-weight: 700;
    line-height: 1.3;
    color: #111111;
    word-break: keep-all;
  }

  .review-card__industry {
    display: block;
    margin-top: 0.4rem;
    font-size: 1.35rem;
    color: rgba(0, 0, 0, 0.5);
  }

  .review-card__body {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .review-card__focus {
    display: inline-flex;
    align-self: flex-start;
    align-items: center;
    padding: 0.7rem 1rem;
    border-radius: 999px;
    background: var(--review-soft);
    color: var(--review-accent);
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .review-card__title {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.45;
    letter-spacing: -0.04em;
    color: #111111;
    word-break: keep-all;
  }

  .review-card__content {
    font-size: 1.48rem;
    line-height: 1.72;
    color: rgba(0, 0, 0, 0.68);
    word-break: keep-all;
  }

  .review-card--sky {
    --review-accent: #0e7ef7;
    --review-soft: #eef5ff;
  }

  .review-card--mint {
    --review-accent: #27a381;
    --review-soft: #ebf9f4;
  }

  .review-card--sand {
    --review-accent: #e79a23;
    --review-soft: #fff4e4;
  }

  .review-card--lavender {
    --review-accent: #8b6be8;
    --review-soft: #f3eeff;
  }

  .review-card--peach {
    --review-accent: #e57b58;
    --review-soft: #fff0ea;
  }

  :deep(.review-carousel__pagination .swiper-pagination-bullet) {
    width: 0.8rem;
    height: 0.8rem;
    margin: 0 0.35rem !important;
    background: rgba(14, 126, 247, 0.22);
    opacity: 1;
    transition:
      width 0.25s ease,
      background-color 0.25s ease;
  }

  :deep(.review-carousel__pagination .swiper-pagination-bullet-active) {
    width: 2.2rem;
    border-radius: 999px;
    background: #0e7ef7;
  }

  @media (max-width: 1023px) {
    .review-carousel__top {
      flex-direction: column;
      align-items: flex-start;
    }

    .review-carousel__controls {
      width: 100%;
      justify-content: space-between;
    }
  }

  @media (max-width: 767px) {
    .review-carousel {
      padding: 1.6rem;
      border-radius: 2.4rem;
    }

    .review-carousel__top {
      gap: 1.4rem;
      margin-bottom: 1.6rem;
    }

    .review-carousel__note {
      font-size: 1.35rem;
      line-height: 1.6;
    }

    .review-carousel__fraction strong {
      font-size: 2rem;
    }

    .review-carousel__button {
      width: 3.8rem;
      height: 3.8rem;
    }

    .review-card {
      padding: 2rem;
      border-radius: 2rem;
      gap: 1.4rem;
    }

    .review-card__company {
      font-size: 1.75rem;
    }

    .review-card__title {
      font-size: 1.75rem;
      line-height: 1.45;
    }

    .review-card__content {
      font-size: 1.4rem;
      line-height: 1.64;
    }
  }
</style>
