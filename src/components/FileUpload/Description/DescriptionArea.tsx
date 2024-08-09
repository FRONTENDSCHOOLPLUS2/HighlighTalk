import Image from 'next/image';
import React from 'react';

function DescriptionArea() {
  return (
    <div className="description-area">
      <div className="des-heading">
        <div className="des_head_img"></div>
        <h1>내보내기 방법</h1>
      </div>
      <div className="des-btns">
        <button>PC</button>
        <button>IOS</button>
        <button>Android</button>
      </div>
      <div className="des-main">
        <div className="des-main-img"></div>
        <p>
          법관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니하며, 징계처분에
          의하지 아니하고는 정직·감봉 기타 불리한 처분을 받지 아니한다
        </p>
      </div>
    </div>
  );
}

export default DescriptionArea;
