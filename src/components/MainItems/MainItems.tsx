import Link from 'next/link';
import React from 'react';

function MainItems() {
  return (
    <>
      <div className="main_items n1">
        <Link href="/freetest">
          <div className="item free_item">
            <div className="free_item_des des">
              <h1>우리 단톡방 분석 서비스</h1>
              <div className="des-p">
                <p>
                  GPT-4o-mini 모델을 사용하여 <br />
                  당신의 대화를 더 똑똑하게 해석해드립니다.
                </p>
              </div>
              <div className="free_tag">FREE</div>
            </div>
            <div className="free_items_img"></div>
          </div>
        </Link>
      </div>
      <div className="main_items n2">
        <Link href="/lovetest">
          <div className="item pay_item">
            <div className="pay_item_des des">
              <h1>우리는 얼마나 잘 어울릴까?</h1>
              <div className="des-p">
                <p>
                  대화 분석을 바탕으로 궁합 점수 <br /> 연인이 될 확률을 알려드립니다 ❤️
                </p>
              </div>
              <div className="payed_tag">
                <div className="payed_tagImage"></div>5
              </div>
            </div>
            <div className="free_items_img second"></div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default MainItems;
