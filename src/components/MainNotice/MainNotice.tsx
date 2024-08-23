'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

function MainNotice() {
  return (
    <div className="main-notice">
      <div className="main-notice-bg">
        <Swiper
          spaceBetween={50} // 슬라이드 간의 간격
          slidesPerView={3.5} // 기본적으로 한 번에 보여줄 슬라이드 개수
          autoplay={{
            delay: 2500,
            disableOnInteraction: false, // 사용자 상호작용 이후에도 자동 스크롤 유지
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3.5,
            },
            768: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 1.5,
            },
            0: {
              slidesPerView: 1,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
        >
          <SwiperSlide className="glass-effect-card">
            <h1>대화 분석이란?📈</h1>
            <p>우리 톡방 내용을 AI를 통해 분석해요🧐</p>
            <p>분석이 완료되면 여러분께 분석 결과를 보여 줍니다.</p>
            <div className="bubble">
              <Image src="/image/notice-icon/notice1.svg" width={50} height={50} alt="not" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="glass-effect-card">
            <h1>대화 내용이 노출 되지 않나요?</h1>
            <p>톡방 내용이 외부로 노출 되는 일은 없습니다❗️.</p>
            <p>대화 내용은 분석 이 후 재사용 없이 제거됩니다.</p>
            <div className="bubble">
              <Image src="/image/notice-icon/notice2.svg" width={50} height={50} alt="not" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="glass-effect-card">
            <h1>CSV 파일이란?</h1>
            <p>몇 가지 필드를 쉼표(,)로 구분한 텍스트 파일이에요📂</p>
            <p>카톡에서 대화내용 내보내기를 통해 저장 할 수 있어요</p>
            <div className="bubble">
              <Image src="/image/notice-icon/notice3.svg" width={50} height={50} alt="not" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="glass-effect-card">
            <h1>분석은 신뢰 할 수 있나요?</h1>
            <p>어느정도 정확성을 가지고 있습니다</p>
            <p>하지만 재미로 보시는 걸 추천드립니다!😂</p>
            <div className="bubble">
              <Image src="/image/notice-icon/notice4.svg" width={50} height={50} alt="not" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="glass-effect-card">
            <h1>코인이란?</h1>
            <p>결제 이 후 다양한 테스트에서 사용합니다.</p>
            <p>테스트마다 금액은 상이 합니다.</p>
            <div className="bubble">
              <Image src="/image/coin.svg" width={50} height={50} alt="not" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default MainNotice;
