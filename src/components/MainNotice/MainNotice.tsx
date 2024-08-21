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
          slidesPerView={3.5} // 한 번에 보여줄 슬라이드 개수
          autoplay={{
            delay: 2500,
            disableOnInteraction: false, // 사용자 상호작용 이후에도 자동 스크롤 유지
          }}
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
        >
          <SwiperSlide className="glass-effect-card">
            <h1>분석은 정확한가요?</h1>
            <p>다소 정확하지 않을 수 있어요</p>
            <p> 그래도 최선을 다하고 있습니다.</p>
            <div className="bubble">
              <Image src="/image/notice-icon/notice1.svg" width={50} height={50} alt="not" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="glass-effect-card">
            <h1>분석은 정확한가요?</h1>
            <p>다소 정확하지 않을 수 있어요</p>
            <p> 그래도 최선을 다하고 있습니다.</p>
            <div className="bubble">
              <Image src="/image/notice-icon/notice2.svg" width={50} height={50} alt="not" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="glass-effect-card">
            <h1>분석은 정확한가요?</h1>
            <p>다소 정확하지 않을 수 있어요</p>
            <p> 그래도 최선을 다하고 있습니다.</p>
            <div className="bubble">
              <Image src="/image/notice-icon/notice3.svg" width={50} height={50} alt="not" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="glass-effect-card">
            <h1>분석은 정확한가요?</h1>
            <p>다소 정확하지 않을 수 있어요</p>
            <p> 그래도 최선을 다하고 있습니다.</p>
            <div className="bubble">
              <Image src="/image/notice-icon/notice4.svg" width={50} height={50} alt="not" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="glass-effect-card">
            <h1>분석은 정확한가요?</h1>
            <p>다소 정확하지 않을 수 있어요</p>
            <p> 그래도 최선을 다하고 있습니다.</p>
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
