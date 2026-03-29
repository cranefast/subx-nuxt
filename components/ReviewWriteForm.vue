<script setup>
  import * as yup from 'yup';
  import { computed, ref } from 'vue';

  const focusOptions = ['운영 안정성', '월말 마감', '자료 정리', '인수인계', '응답 속도', '서류 대응'];

  const reviewSchema = yup.object({
    company: yup.string().trim().required('회사명을 입력해주세요.').max(30, '회사명은 30자 이내로 입력해주세요.'),
    businessNumber: yup
      .string()
      .trim()
      .required('사업자번호를 입력해주세요.')
      .test('business-number', '사업자번호는 숫자 10자리로 입력해주세요.', (value) =>
        value ? value.replace(/[^0-9]/g, '').length === 10 : false
      ),
    industry: yup.string().trim().required('업종을 입력해주세요.').max(30, '업종은 30자 이내로 입력해주세요.'),
    focus: yup.string().trim().required('좋았던 포인트를 선택해주세요.'),
    title: yup.string().trim().required('후기 제목을 입력해주세요.').max(38, '제목은 38자 이내로 입력해주세요.'),
    content: yup
      .string()
      .trim()
      .required('후기 내용을 입력해주세요.')
      .min(20, '후기 내용은 20자 이상 입력해주세요.')
      .max(140, '후기 내용은 140자 이내로 입력해주세요.'),
    logo: yup
      .string()
      .trim()
      .test(
        'logo-url',
        '로고 URL은 http(s) 또는 / 경로 형식으로 입력해주세요.',
        (value) => !value || /^(https?:\/\/|\/)/i.test(value)
      ),
  });

  const initForm = {
    company: '',
    businessNumber: '',
    industry: '',
    focus: '운영 안정성',
    title: '',
    content: '',
    logo: '',
  };

  const form = ref({ ...initForm });
  const errors = ref({});
  const isSubmitting = ref(false);
  const createdReview = ref(null);

  const titleRemaining = computed(() => 38 - form.value.title.length);
  const contentRemaining = computed(() => 140 - form.value.content.length);

  const getReviewMark = (company = '') => {
    const cleaned = company.replace(/주식회사|유한회사|고객사|\s+/g, '').trim();

    return cleaned.slice(0, 2) || '후기';
  };

  const previewReview = computed(() => ({
    company: form.value.company || '회사명',
    industry: form.value.industry || '업종',
    focus: form.value.focus || '운영 안정성',
    title: form.value.title || '대표님이 실제로 느낀 변화를 한 문장으로 적어주세요.',
    content:
      form.value.content || '모바일에서도 한 번에 읽히도록 20자 이상 140자 이하로 핵심만 적는 구성을 권장합니다.',
    logo: form.value.logo,
  }));

  const clearError = (name) => {
    errors.value[name] = '';
  };

  const resetForm = () => {
    Object.assign(form.value, initForm);
    errors.value = {};
  };

  const clearSuccess = () => {
    createdReview.value = null;
  };

  const submit = async () => {
    try {
      isSubmitting.value = true;
      errors.value = {};

      await reviewSchema.validate(form.value, { abortEarly: false });

      const response = await $fetch('/api/review', {
        method: 'POST',
        body: {
          ...form.value,
          businessNumber: form.value.businessNumber.replace(/[^0-9]/g, ''),
        },
      });

      createdReview.value = {
        ...form.value,
        ...(response || {}),
      };
      resetForm();
    } catch (error) {
      if (error.name === 'ValidationError') {
        errors.value = error.inner.reduce((acc, current) => {
          acc[current.path] = current.message;
          return acc;
        }, {});

        return;
      }

      if (error?.data?.errors) {
        errors.value = error.data.errors;
        return;
      }

      alert('후기 등록 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      isSubmitting.value = false;
    }
  };
</script>

<template>
  <section class="review-write">
    <div class="review-write__intro">
      <div class="review-write__notice">
        <strong>작성 대상 안내</strong>
        <p>후기 작성은 실제로 Sub X를 이용했던 사업자만 가능합니다. 확인이 어려운 경우 노출이 보류될 수 있습니다.</p>
      </div>

      <div class="review-write__guide">
        <h3>작성 가이드</h3>
        <ul>
          <li>카드는 모바일 한 화면 안에서 읽히도록 제목 38자, 내용 140자 기준으로 설계했습니다.</li>
          <li>추가 정보는 고객이 빠르게 신뢰를 느낄 수 있는 "좋았던 포인트" 한 가지만 받습니다.</li>
          <li>로고 URL이 없으면 회사명 앞 두 글자를 로고 영역에 자동으로 보여줍니다.</li>
        </ul>
      </div>

      <article class="review-preview">
        <div class="review-preview__top">
          <div class="review-preview__logo">
            <img v-if="previewReview.logo" :src="previewReview.logo" :alt="`${previewReview.company} 로고`" />
            <span v-else>{{ getReviewMark(previewReview.company) }}</span>
          </div>

          <div class="review-preview__meta">
            <strong>{{ previewReview.company }}</strong>
            <span>{{ previewReview.industry }}</span>
          </div>
        </div>

        <div class="review-preview__body">
          <span class="review-preview__focus">{{ previewReview.focus }}</span>
          <h4>{{ previewReview.title }}</h4>
          <p>{{ previewReview.content }}</p>
        </div>
      </article>

      <div v-if="createdReview" class="review-write__success">
        <strong>{{ createdReview.company }} 후기가 등록되었습니다.</strong>
        <p>등록된 후기는 후기 페이지에서 바로 확인할 수 있습니다.</p>
        <div class="review-write__success-actions">
          <NuxtLink to="/review" class="review-write__link review-write__link--primary">후기 페이지 보기</NuxtLink>
          <button type="button" class="review-write__link review-write__link--secondary" @click="clearSuccess">
            계속 작성하기
          </button>
        </div>
      </div>
    </div>

    <div class="review-write__panel">
      <form class="review-form" @submit.prevent="submit">
        <div class="review-form__grid">
          <label class="review-form__field">
            <span>* 회사명</span>
            <input
              v-model="form.company"
              type="text"
              maxlength="30"
              placeholder="예: 주식회사 앱지"
              @input="clearError('company')"
            />
            <small v-if="errors.company" class="review-form__error">{{ errors.company }}</small>
          </label>

          <label class="review-form__field">
            <span>* 사업자번호</span>
            <input
              v-model="form.businessNumber"
              type="text"
              maxlength="12"
              placeholder="예: 123-45-67890"
              @input="clearError('businessNumber')"
            />
            <small class="review-form__hint">하이픈 포함/미포함 모두 가능하며 전송 시 숫자만 전달합니다.</small>
            <small v-if="errors.businessNumber" class="review-form__error">{{ errors.businessNumber }}</small>
          </label>
        </div>

        <div class="review-form__grid">
          <label class="review-form__field">
            <span>* 업종</span>
            <input
              v-model="form.industry"
              type="text"
              maxlength="30"
              placeholder="예: IT 서비스"
              @input="clearError('industry')"
            />
            <small v-if="errors.industry" class="review-form__error">{{ errors.industry }}</small>
          </label>

          <label class="review-form__field">
            <span>* 좋았던 포인트</span>
            <select v-model="form.focus" @change="clearError('focus')">
              <option v-for="option in focusOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <small v-if="errors.focus" class="review-form__error">{{ errors.focus }}</small>
          </label>

          <label class="review-form__field">
            <span>로고 이미지 URL</span>
            <input
              v-model="form.logo"
              type="text"
              placeholder="https:// 또는 /img/... 경로"
              @input="clearError('logo')"
            />
            <small class="review-form__hint">비워두면 회사명 앞 두 글자가 대신 노출됩니다.</small>
            <small v-if="errors.logo" class="review-form__error">{{ errors.logo }}</small>
          </label>
        </div>

        <label class="review-form__field">
          <span>* 후기 제목</span>
          <div class="review-form__counter">{{ titleRemaining }}자 남음</div>
          <input
            v-model="form.title"
            type="text"
            maxlength="38"
            placeholder="예: 월말 확인 포인트가 훨씬 선명해졌습니다."
            @input="clearError('title')"
          />
          <small v-if="errors.title" class="review-form__error">{{ errors.title }}</small>
        </label>

        <label class="review-form__field">
          <span>* 후기 내용</span>
          <div class="review-form__counter">{{ contentRemaining }}자 남음</div>
          <textarea
            v-model="form.content"
            maxlength="140"
            placeholder="실제로 어떤 점이 좋아졌는지 핵심만 적어주세요."
            @input="clearError('content')"
          ></textarea>
          <small class="review-form__hint">20자 이상, 140자 이하로 입력하면 카드 가독성이 가장 안정적입니다.</small>
          <small v-if="errors.content" class="review-form__error">{{ errors.content }}</small>
        </label>

        <button type="submit" class="review-form__submit" :disabled="isSubmitting">
          {{ isSubmitting ? '등록 중...' : '후기 등록하기' }}
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
  .review-write {
    display: grid;
    grid-template-columns: minmax(28rem, 40rem) minmax(0, 1fr);
    gap: 2.4rem;
    align-items: start;
  }

  .review-write__intro,
  .review-write__panel {
    padding: 2.4rem;
    border-radius: 2.8rem;
    background: #ffffff;
    border: 1px solid rgba(14, 126, 247, 0.08);
    box-shadow: 0 20px 38px rgba(11, 39, 87, 0.06);
  }

  .review-write__notice {
    padding: 1.8rem;
    border-radius: 2rem;
    background: #f6fbff;
    border: 1px solid rgba(14, 126, 247, 0.1);
  }

  .review-write__notice strong {
    display: block;
    font-size: 1.6rem;
    font-weight: 700;
    color: #111111;
  }

  .review-write__notice p {
    margin-top: 0.8rem;
    font-size: 1.4rem;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.62);
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  .review-write__guide h3 {
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #111111;
  }

  .review-write__guide ul {
    display: grid;
    gap: 1rem;
    margin-top: 1.6rem;
  }

  .review-write__guide li {
    position: relative;
    padding-left: 1.8rem;
    font-size: 1.45rem;
    line-height: 1.72;
    color: rgba(0, 0, 0, 0.64);
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  .review-write__guide li::before {
    content: '';
    position: absolute;
    top: 0.9rem;
    left: 0;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background: #0e7ef7;
  }

  .review-preview {
    margin-top: 2.4rem;
    padding: 2.2rem;
    border-radius: 2.4rem;
    background: linear-gradient(135deg, #f6faff 0%, #ffffff 54%, #eef5ff 100%);
    border: 1px solid rgba(14, 126, 247, 0.08);
  }

  .review-preview__top {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .review-preview__logo {
    display: grid;
    place-items: center;
    width: 5.4rem;
    height: 5.4rem;
    border-radius: 1.6rem;
    background: rgba(14, 126, 247, 0.1);
    overflow: hidden;
  }

  .review-preview__logo img {
    max-width: 72%;
    max-height: 72%;
    object-fit: contain;
  }

  .review-preview__logo span {
    font-size: 1.2rem;
    font-weight: 700;
    color: #0e7ef7;
  }

  .review-preview__meta strong {
    display: block;
    font-size: 1.8rem;
    font-weight: 700;
    color: #111111;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  .review-preview__meta span {
    display: block;
    margin-top: 0.4rem;
    font-size: 1.35rem;
    color: rgba(0, 0, 0, 0.52);
    overflow-wrap: anywhere;
  }

  .review-preview__body {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    margin-top: 1.8rem;
  }

  .review-preview__focus {
    display: inline-flex;
    align-self: flex-start;
    padding: 0.7rem 1rem;
    border-radius: 999px;
    background: rgba(14, 126, 247, 0.1);
    color: #0e7ef7;
    font-size: 1.2rem;
    font-weight: 700;
  }

  .review-preview__body h4 {
    font-size: 1.9rem;
    font-weight: 700;
    line-height: 1.45;
    color: #111111;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  .review-preview__body p {
    font-size: 1.45rem;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.66);
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  .review-write__success {
    margin-top: 2rem;
    padding: 2rem;
    border-radius: 2rem;
    background: #f6fbff;
    border: 1px solid rgba(14, 126, 247, 0.1);
  }

  .review-write__success strong {
    display: block;
    font-size: 1.7rem;
    font-weight: 700;
    color: #111111;
  }

  .review-write__success p {
    margin-top: 0.8rem;
    font-size: 1.4rem;
    line-height: 1.68;
    color: rgba(0, 0, 0, 0.6);
  }

  .review-write__success-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1.4rem;
  }

  .review-write__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 13rem;
    padding: 1rem 1.4rem;
    border-radius: 999px;
    font-size: 1.35rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
  }

  .review-write__link--primary {
    background: #0e7ef7;
    color: #ffffff;
  }

  .review-write__link--secondary {
    background: #ffffff;
    color: #0e7ef7;
    border: 1px solid rgba(14, 126, 247, 0.18);
  }

  .review-form {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  }

  .review-form__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.4rem;
  }

  .review-form__field {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .review-form__field span {
    font-size: 1.45rem;
    font-weight: 700;
    color: #111111;
  }

  .review-form__field input,
  .review-form__field select,
  .review-form__field textarea {
    width: 100%;
    padding: 1.4rem 1.6rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 1.6rem;
    font-size: 1.5rem;
    color: #111111;
    background: #ffffff;
    outline: none;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .review-form__field input:focus,
  .review-form__field select:focus,
  .review-form__field textarea:focus {
    border-color: rgba(14, 126, 247, 0.45);
    box-shadow: 0 0 0 0.4rem rgba(14, 126, 247, 0.08);
  }

  .review-form__field textarea {
    min-height: 16rem;
    resize: vertical;
  }

  .review-form__counter {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.25rem;
    color: rgba(0, 0, 0, 0.42);
  }

  .review-form__hint,
  .review-form__error {
    font-size: 1.25rem;
    line-height: 1.5;
  }

  .review-form__hint {
    color: rgba(0, 0, 0, 0.46);
  }

  .review-form__error {
    color: #e25555;
  }

  .review-form__submit {
    width: 100%;
    padding: 1.5rem 1.8rem;
    border: 0;
    border-radius: 999px;
    background: #0e7ef7;
    color: #ffffff;
    font-size: 1.6rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      opacity 0.2s ease;
  }

  .review-form__submit:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0 12px 24px rgba(14, 126, 247, 0.2);
  }

  .review-form__submit:disabled {
    opacity: 0.7;
    cursor: wait;
  }

  @media (max-width: 1023px) {
    .review-write {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 767px) {
    .review-write__intro,
    .review-write__panel {
      padding: 1.8rem;
      border-radius: 2.2rem;
    }

    .review-form__grid {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }

    .review-preview {
      padding: 1.8rem;
    }

    .review-write__notice p {
      font-size: 1.35rem;
    }

    .review-preview__body h4 {
      font-size: 1.75rem;
    }

    .review-preview__body p,
    .review-write__guide li,
    .review-write__success p {
      font-size: 1.35rem;
    }
  }
</style>
