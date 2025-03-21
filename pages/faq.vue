<script setup>
  import { useSlideAnimation } from '@/composables/useSlideAnimation.js';

  const { onEnter, onLeave } = useSlideAnimation();

  const faqList = ref([
    {
      question: 'Nuxt.js란 무엇인가요?',
      answer: 'Nuxt.js는 Vue.js 기반의 프레임워크로, SSR 및 정적 사이트 생성에 최적화되어 있습니다.',
    },
    { question: 'SEO 최적화는 어떻게 하나요?', answer: 'Nuxt는 메타 태그 관리를 지원하여 SEO에 강점을 가집니다.' },
    {
      question: 'Nuxt에서 데이터를 어떻게 로드하나요?',
      answer: 'asyncData와 useFetch 등을 통해 비동기 데이터를 쉽게 불러올 수 있습니다.',
    },
  ]);

  const toggleItem = (item) => {
    item.isShow = !item.isShow;
  };
</script>

<template>
  <main id="contaniner">
    <div class="sub_container">
      <section class="section01">
        <div class="page_title_box">
          <h2 class="page_title">자주묻는질문</h2>
        </div>
        <div class="faq-container">
          <div v-for="(item, index) in faqList" :key="index" class="faq-item" @click="toggleItem(item)">
            <div class="faq-question">
              {{ item.question }}
              <span :class="{ rotated: item.isShow }">▼</span>
            </div>
            <transition name="slide-fade" @enter="onEnter" @leave="onLeave">
              <div v-if="item.isShow" class="faq-answer">
                {{ item.answer }}
              </div>
            </transition>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
  @import '@/assets/css/sub.css';
  @import '@/assets/css/sub_02.css';
</style>
