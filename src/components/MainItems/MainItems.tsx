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
                  사용자의 대화 내용을 분석 해주는 서비스 입니다.
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
              <h1>우리 연애 이대로 괜찮을까?</h1>
              <div className="des-p">
                <p>
                  썸,연애,결혼 상대방의 대화 방식에서 <br /> 우리의 관계를 알아보세요❤️
                </p>
              </div>
              <div className="payed_tag">
                <div className="payed_tagImage"></div>
                100
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
