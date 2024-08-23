import Link from 'next/link';
import React from 'react';

function MainItems() {
  return (
    <>
      <div className="main_items n1">
        <Link href="/freetest">
          <div className="item free_item">
            <div className="free_item_des des">
              <h1>우리 톡방 분석 서비스</h1>
              <div className="des-p">
                <p>AI가 우리 톡방 내용을 읽고 분석결과를 보여줍니다 AI가 우리 톡방 내용을 읽고</p>
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
                <p>AI가 우리 톡방 내용을 읽고 분석결과를 보여줍니다.</p>
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
