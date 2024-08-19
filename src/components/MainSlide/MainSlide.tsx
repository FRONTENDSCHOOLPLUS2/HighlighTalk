'use client';
import Image from 'next/image';
import React from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function MainSlide() {
  return (
    <div className="main_slide">
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false, // 사용자 상호작용 이후에도 자동 스크롤 유지
        }}
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        pagination={{
          clickable: true, // 페이지네이션을 클릭할 수 있도록 설정
          dynamicBullets: true, // 동적 불릿 (현재 슬라이드가 중앙에 위치한 불릿)
        }}
      >
        <SwiperSlide>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/image/mainslide1.svg"
            alt="img"
            priority
          />
        </SwiperSlide>

        <SwiperSlide>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/image/mainslide2.svg"
            alt="img"
            priority
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default MainSlide;
