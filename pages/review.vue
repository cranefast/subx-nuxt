<script setup>
  const reviews = ref([
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
      company: 'HappyHouse Interior',
      industry: '인테리어 디자인',
      logo: '/img/review/appg_logo.png',
      content: '디자인과 시공이 모두 훌륭했어요. 너무 만족스럽습니다.',
    },
  ]);
</script>

<template>
  <main id="contaniner" class="ready_common ready05">
    <div class="sub_container">
      <section class="section01">
        <div class="page_title_box">
          <h2 class="page_title">후기</h2>
          <!--          <p class="page_sub_desc02">디스크립션</p>-->
        </div>

        <div class="review-container">
          <div v-for="(review, index) in reviews" :key="index" class="review-card">
            <div class="review-header">
              <img :src="review.logo" alt="업체 로고" class="review-logo" />
              <div class="review-info">
                <h3 class="review-company">{{ review.company }}</h3>
                <p class="review-industry">{{ review.industry }}</p>
              </div>
            </div>
            <p class="review-content">{{ review.content }}</p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
  @import '@/assets/css/sub.css';
  @import '@/assets/css/sub_02.css';

  .review-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    //flex-wrap: nowrap;
    overflow-x: auto;
    gap: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    //background: linear-gradient(135deg, #eef2f3 0%, #ffffff 100%);
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .review-card {
    flex: 0 0 auto;
    width: 320px; /* 카드 너비 확대 */
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 24px; /* 패딩 확장 */
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
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
    font-size: 1rem; /* 업종 폰트 크기 확대 */
    color: #777;
    margin: 0;
  }

  .review-content {
    margin-top: 15px;
    color: #333;
    font-size: 1.1rem; /* 본문 폰트 크기 확대 */
    line-height: 1.6; /* 가독성 향상을 위한 줄 간격 추가 */
  }
</style>
