<script setup>
  const faqList = ref([
    {
      question: 'Sub X는 어떤 사업자에게 가장 잘 맞나요?',
      summary: '경리 공백, 월말 마감 부담, 대표 직접 처리 구간이 있는 경우',
      answer:
        '경리 인력이 없거나 담당자 퇴사 이후 인수인계가 필요한 사업자, 대표가 직접 증빙과 정산을 챙기느라 본업 집중이 어려운 사업자에게 특히 잘 맞습니다.',
      isShow: true,
    },
    {
      question: '기장대행과 무엇이 다른가요?',
      summary: '세무 신고만이 아니라 실제 경리 실무 흐름까지 함께 봅니다',
      answer:
        '기장대행이 세무 신고와 장부 정리에 가깝다면, Sub X는 증빙 수집, 비용 정리, 자료 전달, 월말 마감 준비처럼 실제 운영에서 자주 막히는 경리 실무 흐름까지 함께 정리합니다.',
      isShow: false,
    },
    {
      question: '자료는 어떤 방식으로 전달하면 되나요?',
      summary: '현재 쓰고 있는 방식에 맞춰 가장 부담 없는 전달 루틴을 만듭니다',
      answer:
        '이메일, 메신저, 드라이브, 기존 사내 폴더 등 현재 사용 중인 방식에서 크게 벗어나지 않도록 조정합니다. 처음에는 가장 부담 없는 전달 루틴부터 잡는 것을 우선합니다.',
      isShow: false,
    },
    {
      question: '담당자 변경이나 인수인계 상황도 대응 가능한가요?',
      summary: '갑작스러운 공백 구간에서도 끊기지 않는 흐름이 중요합니다',
      answer:
        '네, 갑작스러운 퇴사나 휴직처럼 공백이 생긴 경우에도 현재 자료 상태를 먼저 점검하고, 꼭 필요한 정산·증빙 흐름부터 이어받을 수 있도록 인수인계 성격의 대응도 가능합니다.',
      isShow: false,
    },
    {
      question: '요금은 어떤 기준으로 정해지나요?',
      summary: '업무 범위와 자료 난이도 기준으로 맞춤 안내됩니다',
      answer:
        '거래량, 자료 정리 상태, 필요한 업무 범위, 응답 빈도 등을 함께 보고 결정합니다. 처음 문의에서는 현재 상황과 원하는 범위를 듣고 가장 현실적인 시작점을 기준으로 안내드립니다.',
      isShow: false,
    },
    {
      question: '문의 후 진행 절차는 어떻게 되나요?',
      summary: '현황 확인 후 필요한 범위를 먼저 제안합니다',
      answer:
        '문의 접수 후 현재 어떤 업무가 가장 부담스러운지 먼저 확인하고, 필요한 범위와 예상 진행 방식, 자료 전달 흐름을 정리한 뒤 순차적으로 도입 여부를 안내드립니다.',
      isShow: false,
    },
  ]);

  const toggleItem = (targetIndex) => {
    faqList.value = faqList.value.map((item, index) => ({
      ...item,
      isShow: index === targetIndex ? !item.isShow : false,
    }));
  };

  const getFaqItemStyle = (index) => ({
    '--faq-delay': `${(0.12 + index * 0.06).toFixed(2)}s`,
  });

  const getFaqAnswerId = (index) => `faq-answer-${index + 1}`;
</script>

<template>
  <main id="contaniner" class="faq-page">
    <div class="sub_container">
      <section class="section01">
        <div class="page_title_box modern-page-heading">
          <span class="modern-page-heading__eyebrow">FAQ</span>
          <h2 class="page_title">자주 묻는 질문</h2>
          <p class="modern-page-heading__desc">도입 전 가장 많이 확인하는 질문을 먼저 정리했습니다.</p>
        </div>

        <div class="faq-shell">
          <aside class="faq-shell__intro">
            <span class="faq-shell__eyebrow">Before You Ask</span>
            <h3>상담 전에 가장 많이 확인하는 포인트부터 읽어보세요.</h3>
            <p>
              서비스 범위, 자료 전달 방식, 요금 기준처럼 도입 전에 가장 자주 확인하는 질문을 실제 문의 흐름 기준으로
              정리했습니다.
            </p>
            <ul class="faq-shell__chips">
              <li>도입 범위</li>
              <li>자료 전달</li>
              <li>인수인계</li>
              <li>요금 기준</li>
            </ul>
          </aside>

          <div class="faq-accordion">
            <article
              v-for="(item, index) in faqList"
              :key="item.question"
              class="faq-accordion__item"
              :class="{ 'is-open': item.isShow }"
              :style="getFaqItemStyle(index)"
            >
              <button
                type="button"
                class="faq-accordion__question"
                :aria-expanded="item.isShow ? 'true' : 'false'"
                :aria-controls="getFaqAnswerId(index)"
                @click="toggleItem(index)"
              >
                <span class="faq-accordion__marker faq-accordion__marker--question">Q</span>
                <span class="faq-accordion__text">
                  <strong>{{ item.question }}</strong>
                  <small>{{ item.summary }}</small>
                </span>
                <span class="faq-accordion__icon" :class="{ 'is-open': item.isShow }" aria-hidden="true">
                  <span class="faq-accordion__icon-bar faq-accordion__icon-bar--horizontal"></span>
                  <span class="faq-accordion__icon-bar faq-accordion__icon-bar--vertical"></span>
                </span>
              </button>

              <div
                :id="getFaqAnswerId(index)"
                class="faq-accordion__panel"
                :class="{ 'is-open': item.isShow }"
                :aria-hidden="item.isShow ? 'false' : 'true'"
              >
                <div class="faq-accordion__panel-inner">
                  <div class="faq-accordion__answer">
                    <span class="faq-accordion__marker faq-accordion__marker--answer">A</span>
                    <div class="faq-accordion__answer-body">
                      <p>{{ item.answer }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
  @import '@/assets/css/sub.css';
  @import '@/assets/css/sub_02.css';

  .faq-page {
    padding-bottom: 12rem;
  }

  .modern-page-heading {
    animation: faq-drop-in 0.48s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .faq-shell {
    display: grid;
    grid-template-columns: minmax(28rem, 34rem) minmax(0, 1fr);
    gap: 2.4rem;
    align-items: start;
  }

  .faq-shell__intro,
  .faq-accordion__item {
    border-radius: 3rem;
    background: #ffffff;
    border: 1px solid rgba(14, 126, 247, 0.08);
    box-shadow: 0 22px 40px rgba(11, 39, 87, 0.06);
    animation: faq-drop-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: var(--faq-delay, 0s);
  }

  .faq-shell__intro {
    padding: 2.6rem;
    background: linear-gradient(145deg, #f6fbff 0%, #ffffff 54%, #eef5ff 100%);
    animation-delay: 0.05s;
  }

  .faq-shell__eyebrow {
    display: inline-flex;
    align-items: center;
    padding: 0.7rem 1.2rem;
    border-radius: 999px;
    background: rgba(14, 126, 247, 0.1);
    color: #0e7ef7;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .faq-shell__intro h3 {
    margin-top: 1.8rem;
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -0.04em;
    color: #111111;
    word-break: keep-all;
  }

  .faq-shell__intro p,
  .faq-accordion__text small,
  .faq-accordion__answer-body p {
    margin-top: 1.2rem;
    font-size: 1.5rem;
    line-height: 1.72;
    color: rgba(0, 0, 0, 0.62);
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  .faq-shell__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 2rem;
    padding: 0;
    list-style: none;
  }

  .faq-shell__chips li {
    padding: 0.8rem 1.2rem;
    border-radius: 999px;
    background: #ffffff;
    border: 1px solid rgba(14, 126, 247, 0.1);
    font-size: 1.35rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.72);
  }

  .faq-accordion {
    display: grid;
    gap: 1.2rem;
  }

  .faq-accordion__item {
    overflow: hidden;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .faq-accordion__item.is-open,
  .faq-accordion__item:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0 28px 48px rgba(11, 39, 87, 0.08);
  }

  .faq-accordion__question {
    display: flex;
    width: 100%;
    gap: 1.6rem;
    align-items: flex-start;
    padding: 2.2rem;
    border: 0;
    background: transparent;
    text-align: left;
    cursor: pointer;
  }

  .faq-accordion__marker {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 4.6rem;
    height: 4.6rem;
    border-radius: 1.4rem;
    font-size: 1.55rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: 0.02em;
    flex-shrink: 0;
  }

  .faq-accordion__marker--question {
    background: linear-gradient(180deg, rgba(14, 126, 247, 0.12) 0%, rgba(14, 126, 247, 0.18) 100%);
    color: #0e7ef7;
  }

  .faq-accordion__marker--answer {
    background: #0e7ef7;
    color: #ffffff;
  }

  .faq-accordion__text {
    flex: 1;
    min-width: 0;
  }

  .faq-accordion__text strong {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.45;
    color: #111111;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  .faq-accordion__text small {
    display: block;
  }

  .faq-accordion__icon {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.04);
    color: #111111;
    flex-shrink: 0;
    transition:
      transform 0.2s ease,
      background-color 0.2s ease,
      color 0.2s ease;
  }

  .faq-accordion__icon-bar {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1.6rem;
    height: 0.2rem;
    border-radius: 999px;
    background: currentColor;
    transform: translate(-50%, -50%);
    transition:
      transform 0.24s ease,
      opacity 0.2s ease;
  }

  .faq-accordion__icon-bar--vertical {
    transform: translate(-50%, -50%) rotate(90deg);
  }

  .faq-accordion__icon.is-open {
    transform: rotate(45deg);
    background: #0e7ef7;
    color: #ffffff;
  }

  .faq-accordion__answer {
    display: flex;
    gap: 1.4rem;
    align-items: flex-start;
    padding: 0 2.2rem 2.2rem 2.2rem;
    margin-top: -0.2rem;
    opacity: 0;
    transform: translateY(-0.8rem);
    transition:
      opacity 0.24s ease,
      transform 0.34s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .faq-accordion__answer-body {
    flex: 1;
    min-width: 0;
    padding: 1.8rem 2rem;
    border-radius: 2rem;
    background: linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%);
    border: 1px solid rgba(14, 126, 247, 0.1);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
  }

  .faq-accordion__panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.34s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .faq-accordion__panel-inner {
    min-height: 0;
    overflow: hidden;
  }

  .faq-accordion__panel.is-open {
    grid-template-rows: 1fr;
  }

  .faq-accordion__panel.is-open .faq-accordion__answer {
    opacity: 1;
    transform: translateY(0);
  }

  @keyframes faq-drop-in {
    0% {
      opacity: 0;
      transform: translateY(-2rem);
    }

    70% {
      opacity: 1;
      transform: translateY(0.35rem);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .modern-page-heading,
    .faq-shell__intro,
    .faq-accordion__item {
      animation: none;
    }

    .faq-accordion__item,
    .faq-accordion__icon,
    .faq-accordion__icon-bar,
    .faq-accordion__panel,
    .faq-accordion__answer {
      transition: none;
    }
  }

  @media (max-width: 1023px) {
    .faq-shell {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 767px) {
    .faq-page {
      padding-bottom: 8rem;
    }

    .faq-shell__intro,
    .faq-accordion__item {
      border-radius: 2.4rem;
    }

    .faq-shell__intro {
      padding: 1.8rem;
    }

    .faq-shell__intro h3 {
      font-size: 2.4rem;
    }

    .faq-shell__intro p,
    .faq-accordion__text small,
    .faq-accordion__answer-body p {
      font-size: 1.4rem;
      line-height: 1.66;
    }

    .faq-accordion__question {
      padding: 1.8rem;
      gap: 1.2rem;
    }

    .faq-accordion__text strong {
      font-size: 1.75rem;
    }

    .faq-accordion__marker {
      width: 4rem;
      height: 4rem;
      border-radius: 1.2rem;
      font-size: 1.35rem;
    }

    .faq-accordion__answer {
      flex-direction: column;
      gap: 1rem;
      padding: 0 1.8rem 1.8rem 1.8rem;
      margin-top: 0;
    }

    .faq-accordion__answer-body {
      width: 100%;
      padding: 1.6rem;
      border-radius: 1.8rem;
    }
  }
</style>
