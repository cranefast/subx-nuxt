<script setup>
  import * as yup from 'yup';

  const contactSchema = yup.object({
    name: yup.string().trim().required('담당자명을 입력해주세요.'),
    company: yup.string().trim().required('회사명을 입력해주세요.'),
    email: yup.string().trim().email('이메일 형식이 올바르지 않습니다.').nullable(),
    phone: yup
      .string()
      .trim()
      .required('연락처를 입력해주세요.')
      .test('phone', '연락처는 숫자 9~11자리로 입력해주세요.', (value) =>
        value ? value.replace(/[^0-9]/g, '').length >= 9 && value.replace(/[^0-9]/g, '').length <= 11 : false
      ),
  });

  const init = {
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  };

  const form = ref({ ...init });
  const errors = ref({});
  const isSubmitting = ref(false);
  const submitted = ref(false);

  const clearError = (name) => {
    errors.value[name] = '';
  };

  const resetForm = () => {
    Object.assign(form.value, init);
    errors.value = {};
  };

  const save = async () => {
    try {
      isSubmitting.value = true;
      errors.value = {};

      await contactSchema.validate(form.value, { abortEarly: false });

      await $fetch('/api/contact', {
        method: 'POST',
        body: {
          ...form.value,
          phone: form.value.phone.replace(/[^0-9]/g, ''),
        },
      });

      submitted.value = true;
      resetForm();
    } catch (validationError) {
      if (validationError?.name === 'ValidationError') {
        errors.value = validationError.inner.reduce((acc, current) => {
          acc[current.path] = current.message;
          return acc;
        }, {});

        return;
      }

      alert('문의 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      isSubmitting.value = false;
    }
  };
</script>

<template>
  <section class="contact-showcase">
    <div class="contact-showcase__intro">
      <span class="contact-showcase__eyebrow">Quick Contact</span>
      <h3 class="contact-showcase__title">현재 상황을 먼저 듣고 가장 현실적인 시작점을 제안합니다.</h3>
      <p class="contact-showcase__desc">
        기장만 필요한지, 경리 대행까지 필요한지, 담당자 공백 대응이 필요한지 먼저 듣고 가장 부담이 적은 범위부터
        안내합니다.
      </p>

      <div class="contact-showcase__support">
        <div class="contact-showcase__support-head">
          <strong>문의 전에 이것만 남겨주세요</strong>
          <p>긴 설명보다 현재 상태를 짧게 적어주셔도 충분합니다.</p>
        </div>
        <ul class="contact-showcase__support-list">
          <li>
            <strong>가장 급한 업무</strong>
            <p>월말 마감, 증빙 정리, 담당자 공백처럼 지금 가장 막힌 업무</p>
          </li>
          <li>
            <strong>원하는 지원 범위</strong>
            <p>기장, 경리 대행, 인수인계 대응 중 어디까지 필요한지</p>
          </li>
          <li>
            <strong>현재 자료 상태</strong>
            <p>정리된 자료가 있는지, 전달 방식이 정해져 있는지만 알려주세요</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="contact-showcase__panel">
      <div class="contact-showcase__panel-head">
        <span>Contact Form</span>
        <p>연락 가능한 정보와 필요한 범위만 남겨주시면 빠르게 안내드립니다.</p>
      </div>

      <div class="contact-showcase__panel-body">
        <aside class="contact-showcase__details">
          <article class="contact-detail-card">
            <div class="contact-detail-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21C12 21 18 15.6 18 10.5C18 7.46 15.31 5 12 5C8.69 5 6 7.46 6 10.5C6 15.6 12 21 12 21Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                />
                <circle cx="12" cy="10.5" r="2.3" stroke="currentColor" stroke-width="1.8" />
              </svg>
            </div>
            <div class="contact-detail-card__body">
              <span>Location</span>
              <p>서울시 송파구 오금로 551, 209동 2층 201호 A-17</p>
            </div>
          </article>

          <article class="contact-detail-card">
            <div class="contact-detail-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3.5" y="5.5" width="17" height="13" rx="3" stroke="currentColor" stroke-width="1.8" />
                <path
                  d="M5.5 8L12 12.8L18.5 8"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                />
              </svg>
            </div>
            <div class="contact-detail-card__body">
              <span>Email</span>
              <p>subxpartners@gamil.com</p>
            </div>
          </article>

          <article class="contact-detail-card">
            <div class="contact-detail-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M8.5 5.5H6.8C5.81 5.5 5 6.31 5 7.3C5 14.31 10.69 20 17.7 20C18.69 20 19.5 19.19 19.5 18.2V16.5C19.5 15.67 18.93 14.95 18.12 14.76L15.82 14.21C15.12 14.04 14.39 14.3 13.95 14.86L13.15 15.87C10.79 14.74 8.86 12.81 7.73 10.45L8.74 9.65C9.3 9.21 9.56 8.48 9.39 7.78L8.84 5.48C8.65 4.67 7.93 4.1 7.1 4.1H6.8"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                />
              </svg>
            </div>
            <div class="contact-detail-card__body">
              <span>Call</span>
              <p>010-2373-1696</p>
            </div>
          </article>
        </aside>

        <div class="contact-showcase__form-area">
          <div v-if="submitted" class="contact-showcase__success">
            <strong>문의가 접수되었습니다.</strong>
            <p>담당자 확인 후 순차적으로 연락드리겠습니다.</p>
          </div>

          <form class="contact-form" @submit.prevent="save">
            <div class="contact-form__grid">
              <label class="contact-form__field">
                <span>* 담당자명</span>
                <input v-model="form.name" type="text" placeholder="예: 홍길동" @input="clearError('name')" />
                <small v-if="errors.name" class="contact-form__error">{{ errors.name }}</small>
              </label>

              <label class="contact-form__field">
                <span>* 회사명</span>
                <input
                  v-model="form.company"
                  type="text"
                  placeholder="예: 주식회사 앱지"
                  @input="clearError('company')"
                />
                <small v-if="errors.company" class="contact-form__error">{{ errors.company }}</small>
              </label>
            </div>

            <div class="contact-form__grid">
              <label class="contact-form__field">
                <span>이메일</span>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="예: contact@company.com"
                  @input="clearError('email')"
                />
                <small v-if="errors.email" class="contact-form__error">{{ errors.email }}</small>
              </label>

              <label class="contact-form__field">
                <span>* 연락처</span>
                <input
                  v-model="form.phone"
                  type="tel"
                  maxlength="13"
                  placeholder="예: 010-1234-5678"
                  @input="clearError('phone')"
                />
                <small class="contact-form__hint">하이픈 포함/미포함 모두 가능하며 전송 시 숫자만 전달합니다.</small>
                <small v-if="errors.phone" class="contact-form__error">{{ errors.phone }}</small>
              </label>
            </div>

            <label class="contact-form__field">
              <span>문의 내용</span>
              <textarea
                v-model="form.message"
                maxlength="500"
                placeholder="현재 어떤 업무가 가장 부담스러운지 간단히 적어주세요."
              ></textarea>
            </label>

            <button type="submit" class="contact-form__submit" :disabled="isSubmitting">
              {{ isSubmitting ? '접수 중...' : '문의하기' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .contact-showcase {
    display: grid;
    grid-template-columns: minmax(30rem, 42rem) minmax(0, 1fr);
    gap: 2.4rem;
    align-items: start;
  }

  .contact-showcase__intro,
  .contact-showcase__panel {
    padding: 2.6rem;
    border-radius: 3rem;
    background: #ffffff;
    border: 1px solid rgba(14, 126, 247, 0.08);
    box-shadow: 0 24px 40px rgba(11, 39, 87, 0.07);
  }

  .contact-showcase__intro {
    background: linear-gradient(145deg, #f6fbff 0%, #ffffff 55%, #eef5ff 100%);
  }

  .contact-showcase__eyebrow,
  .contact-showcase__panel-head span {
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

  .contact-showcase__title {
    margin-top: 1.8rem;
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -0.04em;
    color: #111111;
    word-break: keep-all;
  }

  .contact-showcase__desc,
  .contact-showcase__panel-head p,
  .contact-showcase__support-head p,
  .contact-showcase__support-list p,
  .contact-detail-card__body p,
  .contact-showcase__success p {
    margin-top: 1.2rem;
    font-size: 1.5rem;
    line-height: 1.72;
    color: rgba(0, 0, 0, 0.62);
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  .contact-showcase__support {
    margin-top: 2.6rem;
    padding: 2rem;
    border-radius: 2.4rem;
    background: rgba(255, 255, 255, 0.82);
    border: 1px solid rgba(14, 126, 247, 0.08);
  }

  .contact-showcase__support-head strong,
  .contact-showcase__success strong {
    font-size: 1.7rem;
    font-weight: 700;
    color: #111111;
    letter-spacing: -0.03em;
  }

  .contact-showcase__support-list {
    display: grid;
    gap: 1rem;
    margin-top: 1.8rem;
    padding: 0;
    list-style: none;
  }

  .contact-showcase__support-list li {
    padding: 1.7rem 1.8rem;
    border-radius: 2rem;
    background: #ffffff;
    border: 1px solid rgba(14, 126, 247, 0.08);
  }

  .contact-showcase__support-list strong {
    display: block;
    font-size: 1.55rem;
    font-weight: 700;
    color: #111111;
    letter-spacing: -0.03em;
  }

  .contact-showcase__panel-body {
    display: grid;
    grid-template-columns: minmax(22rem, 24rem) minmax(0, 1fr);
    gap: 1.6rem;
    align-items: start;
    margin-top: 2rem;
  }

  .contact-showcase__details {
    display: grid;
    gap: 1rem;
  }

  .contact-detail-card {
    height: 100%;
    padding: 1.8rem;
    border-radius: 2.2rem;
    background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
    border: 1px solid rgba(14, 126, 247, 0.1);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
  }

  .contact-detail-card__icon {
    display: grid;
    place-items: center;
    width: 6.2rem;
    height: 6.2rem;
    border-radius: 1.8rem;
    background: linear-gradient(135deg, rgba(14, 126, 247, 0.14) 0%, rgba(14, 126, 247, 0.22) 100%);
    color: #0e7ef7;
  }

  .contact-detail-card__icon svg {
    width: 2.9rem;
    height: 2.9rem;
  }

  .contact-detail-card__body {
    margin-top: 1.5rem;
  }

  .contact-detail-card__body span {
    display: block;
    font-size: 1.3rem;
    font-weight: 700;
    color: #0e7ef7;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .contact-detail-card__body p {
    margin-top: 0.6rem;
  }

  .contact-showcase__form-area {
    min-width: 0;
  }

  .contact-showcase__success {
    margin-bottom: 1.6rem;
    padding: 1.8rem;
    border-radius: 2rem;
    background: #f6fbff;
    border: 1px solid rgba(14, 126, 247, 0.1);
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  }

  .contact-form__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.4rem;
  }

  .contact-form__field {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .contact-form__field span {
    font-size: 1.45rem;
    font-weight: 700;
    color: #111111;
  }

  .contact-form__field input,
  .contact-form__field textarea {
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

  .contact-form__field input:focus,
  .contact-form__field textarea:focus {
    border-color: rgba(14, 126, 247, 0.45);
    box-shadow: 0 0 0 0.4rem rgba(14, 126, 247, 0.08);
  }

  .contact-form__field textarea {
    min-height: 16rem;
    resize: vertical;
  }

  .contact-form__hint,
  .contact-form__error {
    font-size: 1.25rem;
    line-height: 1.5;
  }

  .contact-form__hint {
    color: rgba(0, 0, 0, 0.46);
  }

  .contact-form__error {
    color: #e25555;
  }

  .contact-form__submit {
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

  .contact-form__submit:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0 12px 24px rgba(14, 126, 247, 0.2);
  }

  .contact-form__submit:disabled {
    opacity: 0.7;
    cursor: wait;
  }

  @media (max-width: 1023px) {
    .contact-showcase {
      grid-template-columns: 1fr;
    }

    .contact-showcase__panel-body {
      grid-template-columns: 1fr;
    }

    .contact-showcase__details {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 767px) {
    .contact-showcase__intro,
    .contact-showcase__panel {
      padding: 1.8rem;
      border-radius: 2.4rem;
    }

    .contact-showcase__title {
      font-size: 2.4rem;
    }

    .contact-showcase__desc,
    .contact-showcase__panel-head p,
    .contact-showcase__support-head p,
    .contact-showcase__support-list p,
    .contact-detail-card__body p,
    .contact-showcase__success p {
      font-size: 1.4rem;
      line-height: 1.64;
    }

    .contact-showcase__support {
      padding: 1.8rem;
      border-radius: 2rem;
    }

    .contact-showcase__support-list li,
    .contact-detail-card {
      padding: 1.6rem;
      border-radius: 1.8rem;
    }

    .contact-showcase__details {
      grid-template-columns: 1fr;
    }

    .contact-detail-card__icon {
      width: 5.6rem;
      height: 5.6rem;
      border-radius: 1.6rem;
    }

    .contact-detail-card__icon svg {
      width: 2.6rem;
      height: 2.6rem;
    }

    .contact-form__grid {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }
  }
</style>
