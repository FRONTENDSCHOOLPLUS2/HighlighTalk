'use client';

import './_MbtiSection.scss';
import Image from 'next/image';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getImageSrc } from '@/utils/getImageSrc';

interface Ability {
  energy: number;
  social: number;
  intelligence: number;
}

interface MbtiAnalysisItem {
  names: string;
  value: string;
  reason: string;
  ability: { energy: number; social: number; intelligence: number }[];
  etc: string[];
}

interface MbtiSectionPropType {
  data: MbtiAnalysisItem[];
}

function MbtiSection({ data = [] }: MbtiSectionPropType) {
  console.log(data);

  return (
    <section className="mbti">
      <h3 className="heading-3">MBTI</h3>
      <p className="heading-desc">우리 대화방 참여자들의 MBTI 예측</p>

      <div className="Mbti-cover">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          loop={true}
          pagination={{
            clickable: true, // 클릭 가능하도록 설정
            renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>`,
          }}
          modules={[EffectCoverflow, Pagination]}
          breakpoints={{
            976: {
              slidesPerView: 2.5,
            },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div>
                <div className="card-header">
                  <h3>{item.value}</h3>
                  <h3>{item.names}</h3>
                  <div className="titles">
                    <p>{item.etc[0]}</p>
                    <p>{item.etc[1]}</p>
                  </div>
                </div>
                <div className="card-img">
                  <Image
                    priority
                    src={getImageSrc(item.value)} // MBTI 값에 따른 이미지 경로
                    width={200}
                    height={200}
                    alt="person"
                  />
                </div>
                <p className="mbti-reason">{item.reason}</p>
                <div className="progress-container">
                  {item.ability.map((ab, idx) => (
                    <div key={idx} className="progress-content">
                      <p>에너지</p>
                      <div className="progress-bar-wrapper">
                        <div className="progress-bar" style={{ width: `${ab.energy * 10}%` }}>
                          <div className="progress-bar-number">{ab.energy}</div>
                        </div>
                      </div>

                      <p>사회성</p>
                      <div className="progress-bar-wrapper">
                        <div className="progress-bar" style={{ width: `${ab.social * 10}%` }}>
                          <div className="progress-bar-number">{ab.social}</div>
                        </div>
                      </div>

                      <p>대처능력:</p>
                      <div className="progress-bar-wrapper">
                        <div className="progress-bar" style={{ width: `${ab.intelligence * 10}%` }}>
                          <div className="progress-bar-number">{ab.intelligence}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default MbtiSection;
