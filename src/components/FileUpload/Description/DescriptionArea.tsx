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
          내보내기 방법 PC 대화 내용을 확인하고 싶은 카카오톡 채팅방에 입장하세요. [채팅방 우측 상단
          메뉴 {'>'} 채팅방 설정 {'>'} 저장공간 관리 {'>'} 대화내용 저장]에서 대화내용을
          저장해주세요.
        </p>
      </div>
    </div>
  );
}

export default DescriptionArea;
