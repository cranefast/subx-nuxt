<script setup>
  import * as yup from 'yup';

  const contactSchema = yup.object({
    name: yup.string().required('이름을 입력해주세요'),
    company: yup.string().required('회사명을 입력해주세요'),
    phone: yup
      .string()
      .matches(
        /^(02|0[1-9][0-9])-\d{3,4}-\d{4}$|^(01[0-9])\d{3,4}\d{4}$|^(070)\d{3,4}\d{4}$|^(15|16|18)\d{2}-\d{4}$/,
        '올바른 연락처를 입력하세요.'
      )
      .required('연락처를 입력해주세요'),
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

  const clearError = (name) => {
    errors.value[name] = '';
  };

  const resetForm = () => {
    Object.assign(form.value, init);
  };

  const save = async () => {
    try {
      await contactSchema.validate(form.value, { abortEarly: false });

      const { error } = await useFetch('/api/contact', {
        method: 'POST',
        body: form.value,
      });
      if (error.value && error.value.data) {
        alert(error.value.data.message);
      } else {
        alert('문의가 접수되었습니다.\n담당자 확인 후 연락드리겠습니다.');
        resetForm();
      }
    } catch (validationError) {
      if (validationError) {
        errors.value = validationError.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
      }
    }
  };
</script>

<template>
  <div class="inner">
    <div class="left_con">
      <div class="txt_b">
        <h3>경리파트너 Sub X</h3>
        <h4>
          경리에 대한 고민경리에 대한
          <br />
          부담 더이상 고민하지마시고,
          <br />
          경리 파트너 Sux X에 문의하세요.
        </h4>
        <div class="cs-box">
          <div class="flex_con">
            <div class="icon_img">
              <img src="~/assets/img/main/db_icon_01.png" />
            </div>
            <div class="icon_txt">
              <p class="txt1">Location</p>
              <p class="txt2">서울시 송파구 오금로 551, 209동 2층 201호 A-17</p>
            </div>
          </div>
          <div class="flex_con">
            <div class="icon_img">
              <img src="~/assets/img/main/db_icon_02.png" />
            </div>
            <div class="icon_txt">
              <p class="txt1">Email</p>
              <p class="txt2">subxpartners@gamil.com</p>
            </div>
          </div>
          <div class="flex_con">
            <div class="icon_img">
              <img src="~/assets/img/main/db_icon_03.png" />
            </div>
            <div class="icon_txt">
              <p class="txt1">Call</p>
              <p class="txt2">010-2373-1696</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right_con">
      <div class="info_desc n1">
        <form id="contactForm">
          <div class="form">
            <ul>
              <li>
                <label for="name">* 담당자</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  size="10"
                  v-model.lazy="form.name"
                  @input="clearError('name')"
                />
                <span v-if="errors.name">{{ errors.name }}</span>
              </li>
              <li>
                <label for="name">* 회사명</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  size="10"
                  v-model="form.company"
                  @input="clearError('company')"
                />
                <span v-if="errors.company">{{ errors.company }}</span>
              </li>
            </ul>
          </div>
          <div class="form2">
            <label for="name">이메일</label>
            <input type="text" id="email" name="email" v-model="form.email" />
          </div>
          <div class="form2">
            <label for="name">* 연락처</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              maxlength="12"
              placeholder="- 제외 숫자만 입력해주세요."
              v-model="form.phone"
              @input="clearError('phone')"
            />
            <span v-if="errors.phone">{{ errors.phone }}</span>
          </div>
          <div class="form3">
            <label for="name">문의내용</label>
            <textarea id="message" name="message" v-model="form.message"></textarea>
          </div>
        </form>
        <button type="button" id="btnContact" @click="save">문의하기</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
