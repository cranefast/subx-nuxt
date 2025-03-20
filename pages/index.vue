<script setup>
  import { onMounted } from 'vue';

  const baseLine = 200;
  const posArr = [];

  let scroll = ref(0);
  const mainContent = ref([]);

  onMounted(() => {
    setSectionPos();
    window.addEventListener('scroll', handleScroll);
  });

  const setSectionPos = () => {
    mainContent.value = document.querySelectorAll('.section');

    for (let i = 0; i < mainContent.value.length; i++) {
      posArr.push(mainContent.value[i].offsetTop);
    }

    handleScroll();
  };

  const activateSection = (scroll) => {
    const wid = window.innerWidth;

    for (let i = 0; i < mainContent.value.length; i++) {
      if (scroll >= posArr[i] - baseLine) {
        mainContent.value[i].classList.add('on');
      }
    }

    if (wid <= 500) {
      for (let i = 0; i < mainContent.value.length; i++) {
        if (scroll >= posArr[i] - baseLine * 4) {
          mainContent.value[i].classList.add('on');
        }
      }
    }
  };

  const handleScroll = () => {
    scroll.value = document.documentElement.scrollTop || document.body.scrollTop;
    if (scroll.value >= 0) {
      activateSection(scroll.value);
    }
  };

  const moveScrollElement = (name) => {
    const element = document.getElementById(name);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  const save = () => {
    console.log('save!');
  };
</script>

<template>
  <main id="contaniner" class="main">
    <!-- notice layer -->

    <!-- visual layer -->

    <!-- sec01 -->
    <section class="section sec01 on">
      <div class="inner">
        <div class="left-txt-box">
          <p>기장/신고만 대신해주는 경리대행을 찾으신다면, 나가셔도 좋습니다.</p>
          <h2>
            <span class="marin_tit_bold">Sub X</span>
            는
            <br />
            경리입니다.
          </h2>

          <a class="start-btn" href="javascript:void(0)" @click="moveScrollElement('sec02')">fine out more</a>
        </div>
        <div class="visual-mobile">
          <p class="mobile-img"><img src="~/assets/img/main/mv_img.png" alt="이미지" /></p>
        </div>
        <ul class="visual-circle circle-on">
          <li class="Vcircle circle01"></li>
          <li class="Vcircle circle02"></li>
          <li class="Vcircle circle03"></li>
          <li class="Vcircle circle04"></li>
        </ul>
      </div>
    </section>
    <!-- sec02 -->
    <section class="section sec02" id="sec02">
      <div>
        <h2 class="tit img_ani bottom_top">
          Who Need SubX
          <p class="sub_tit img_ani bottom_top">
            경리업무 아직도 직접하고계신가요?
            <br />
            경리의 갑작스러운 퇴사로 고민이신가요?
            <br class="only_m" />
            경리 인건비가 부담이신가요?
            <br />
            경리대행이 아닌 진짜 경리가 필요하신가요?
            <br class="only_m" />
            그렇다면, SubX를 경리로 채용하세요.
          </p>
        </h2>
      </div>
      <div class="inner sec02_swiper">
        <ul class="service_list swiper-wrapper">
          <li class="service n0 swiper-slide">
            <a href="javascript:void(0)">
              <span class="img_b f_c">
                <img src="~/assets/img/main/m1_icon1.png" alt="콘텐츠사진" />
              </span>
              <span class="txt_b">
                <strong>비용절감이 필요한 업체</strong>
                <span>
                  NO 급여, NO 사대보험,
                  <br />
                  NO 퇴직금, NO 복지
                  <br />
                  부가세 감소 (계산서 발행)
                  <br />
                  최저임금 보다 저렴한 이용료
                </span>
              </span>
            </a>
          </li>
          <li class="service n1 swiper-slide">
            <a class="n1_link" href="javascript:void(0)">
              <span class="img_b f_c">
                <img src="~/assets/img/main/m1_icon2.png" alt="콘텐츠사진" />
              </span>
              <span class="txt_b">
                <strong>
                  업무집중도를
                  <br />
                  높이고싶으신 대표님
                </strong>
                <span>
                  전반적인 경리 서비스 이용으로
                  <br />
                  주된 업무에 집중>효율 및 매출 상승
                </span>
              </span>
            </a>
          </li>
          <li class="service n2 swiper-slide">
            <a href="javascript:void(0)">
              <span class="img_b f_c">
                <img src="~/assets/img/main/m1_icon3.png" alt="콘텐츠사진" />
              </span>
              <span class="txt_b">
                <strong>퇴사/휴직이 걱정인 대표님</strong>
                <span>
                  퇴사/휴직 걱정 없는
                  <br />
                  지속적인 경리 서비스,
                  <br />
                  계약 해지 리스크가 없는 서비스
                </span>
              </span>
            </a>
          </li>
          <li class="service n3 swiper-slide">
            <a href="javascript:void(0)">
              <span class="img_b f_c">
                <img src="~/assets/img/main/m1_icon4.png" alt="콘텐츠사진" />
              </span>
              <span class="txt_b">
                <strong>인수인계가 필요한 대표님</strong>
                <span>
                  갑작스런 퇴사
                  <br />
                  혹은 휴직으로 인한
                  <br />
                  인수인계가 필요한 대표님
                </span>
              </span>
            </a>
          </li>
          <li class="service n4 swiper-slide">
            <a href="javascript:void(0)">
              <span class="img_b f_c">
                <img src="~/assets/img/main/m1_icon5.png" alt="콘텐츠사진" />
              </span>
              <span class="txt_b">
                <strong>
                  문서작업이 막막한
                  <br />
                  스타트업 대표님
                </strong>
                <span>
                  경영관리에 필요한
                  <br />
                  문서 작업 서비스
                </span>
              </span>
            </a>
          </li>
        </ul>
        <div class="swiper-pagination"></div>
      </div>
    </section>
    <!-- sec03 -->
    <section class="sec03">
      <section class="sub_container">
        <section class="section01">
          <div class="page_title_box">
            <h2 class="tit">
              월 급여 250만원 기준
              <br />
              매년 대략 2,000만원 이상 절감 효과
            </h2>
            <p class="sub_tit">경리업무 아직도 직접하고계신가요? 경리에서 제공하는 서비스를 알아보세요.</p>
          </div>
        </section>

        <section class="section02">
          <div class="ready_plan_box">
            <ul class="content_box planning_box">
              <li class="con_box_desc n1">
                <a>
                  <span class="m_tit_box">
                    <span class="img_b n1">01</span>
                    <span class="txt">최저임금 보다 낮은 업무대행비용(年 최소 1,200만원 save)</span>
                  </span>
                </a>
              </li>
              <li class="con_box_desc n2">
                <a>
                  <span class="m_tit_box">
                    <span class="img_b n2">02</span>
                    <span class="txt">4대보험 가입 의무가 없습니다. (年 270만원 save)</span>
                  </span>
                </a>
              </li>
              <li class="con_box_desc n3">
                <a>
                  <span class="m_tit_box">
                    <span class="img_b n3">03</span>
                    <span class="txt">퇴직금을 지불하실 의무가 없습니다. (年 300만원 save)</span>
                  </span>
                </a>
              </li>
              <li class="con_box_desc n4">
                <a>
                  <span class="m_tit_box">
                    <span class="img_b n4">04</span>
                    <span class="txt">명절, 휴가등 복지를 신경쓰실 필요 없습니다. (年 80만원 save)</span>
                  </span>
                </a>
              </li>
              <li class="con_box_desc n5">
                <a>
                  <span class="m_tit_box">
                    <span class="img_b n5">05</span>
                    <span class="txt">매입세금계산서 발행으로 부가세 감소효과 (年 최대 240만원 save)</span>
                  </span>
                </a>
              </li>
              <li class="con_box_desc n6">
                <a>
                  <span class="m_tit_box">
                    <span class="img_b n6">06</span>
                    <span class="txt">
                      서비스 비용 min 50만원 – max 200만원 (매출 규모에 따라 다르게 적용됨),
                      <br />
                      매출규모 뿐만 아니라 루틴적인 업무량에 따라 조절 가능.
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </section>
    </section>
    <!-- sec04 -->
    <section class="sub_container sec04">
      <section class="section01">
        <div class="page_title_box">
          <h2 class="tit">What can do SubX</h2>
        </div>
      </section>
      <section class="section02">
        <ul class="content_box">
          <li class="con_box_desc n1">
            <a href="">
              <div class="m_tit_box">
                <span class="img_b n1">
                  <img src="~/assets/img/main/sec4_icon1.png" alt="" class="pos_c" />
                </span>
                <span class="tit">영업지원</span>
              </div>
              <span class="txt">
                발주, 입고, 판매 전표입력
                <br />
                및 자료정리 및 ERP 관리
              </span>
            </a>
          </li>
          <li class="con_box_desc n2">
            <a href="">
              <div class="m_tit_box">
                <span class="img_b n2">
                  <img src="~/assets/img/main/sec4_icon2.png" alt="" class="pos_c" />
                </span>
                <span class="tit">경리업무</span>
              </div>
              <span class="txt">
                세금계산서 발행, 부가세신고자료정리, 수익 정리,
                <br />
                원가 정리, 주기적 지출/수입 보고 등
              </span>
            </a>
          </li>
          <li class="con_box_desc n3">
            <a href="">
              <div class="m_tit_box">
                <span class="img_b n3">
                  <img src="~/assets/img/main/sec4_icon3.png" alt="" class="pos_c" />
                </span>
                <span class="tit">무역업무</span>
              </div>
              <span class="txt">
                수입/수출 서류업무, L/C 발행, T/T송금,
                <br />
                스케쥴관리, 커뮤니케이션 업무 등
              </span>
            </a>
          </li>
          <li class="con_box_desc n3">
            <a href="">
              <div class="m_tit_box">
                <span class="img_b n3">
                  <img src="~/assets/img/main/sec4_icon4.png" alt="" class="pos_c" />
                </span>
                <span class="tit">루틴적인 업무</span>
              </div>
              <span class="txt">
                전화응대, 팩스 수발신, 메일 수신
                <br />
                확인 및 전달, 비품구입 등
              </span>
            </a>
          </li>
          <li class="con_box_desc n3">
            <a href="">
              <div class="m_tit_box">
                <span class="img_b n3">
                  <img src="~/assets/img/main/sec4_icon5.png" alt="" class="pos_c" />
                </span>
                <span class="tit">업무대체 / 인수인계</span>
              </div>
              <span class="txt">
                갑작스런 퇴사로 인한
                <br />
                인수인계 혹은 대체자 역할
              </span>
            </a>
          </li>
          <li class="con_box_desc n3">
            <a href="">
              <div class="m_tit_box">
                <span class="img_b n3">
                  <img src="~/assets/img/main/sec4_icon6.png" alt="" class="pos_c" />
                </span>
                <span class="tit">Start up 문서작업</span>
              </div>
              <span class="txt">
                Start up 회사를 위한
                <br />
                전반적인 문서 작업
              </span>
            </a>
          </li>
        </ul>
      </section>
    </section>
    <!-- sec05 -->
    <section class="section sec05 img_ani bottom_top img_aniload on">
      <div class="page_title_box">
        <h2 class="tit">Contact Us</h2>
      </div>
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
                  <p class="txt2">경기도 수원시 팔달구 000번길 9-99 9층</p>
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
                    <input type="text" id="name" name="name" size="10" />
                  </li>
                  <li>
                    <label for="name">* 회사명</label>
                    <input type="text" id="company" name="company" size="10" />
                  </li>
                </ul>
              </div>
              <div class="form2">
                <label for="name">이메일</label>
                <input type="text" id="email" name="email" />
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
                />
              </div>
              <div class="form3">
                <label for="name">문의내용</label>
                <textarea id="message" name="message"></textarea>
              </div>
            </form>
            <button type="button" id="btnContact" @click="save">문의하기</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
  @import '@/assets/css/main_respon.css';
  /*main sticky header*/
  .header {
    background: #f8f8f8;
    transition: all 0.3s;
  }
  .sticky .header {
    background: #fff;
    transition: all 0.3s;
  }
</style>
