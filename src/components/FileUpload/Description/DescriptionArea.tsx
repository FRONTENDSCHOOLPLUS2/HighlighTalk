import React, { useState } from 'react';

function DescriptionArea() {
  // 'PC', 'IOS', 'Android' 중 하나의 값만 가질 수 있도록 타입을 정의
  const [selectedPlatform, setSelectedPlatform] = useState<'PC' | 'IOS' | 'Android'>('PC');

  const platformImages: { [key in 'PC' | 'IOS' | 'Android']: string } = {
    PC: '/image/pc_image.png',
    IOS: '/image/pc_image.png',
    Android: '/image/pc_image.png',
  };

  const platformTexts: { [key in 'PC' | 'IOS' | 'Android']: string } = {
    PC: 'PC 내보내기 방법: 대화 내용을 확인하고 싶은 카카오톡 채팅방에 입장하세요. [채팅방 우측 상단 메뉴 > 채팅방 설정 > 저장공간 관리 > 대화내용 저장]에서 대화내용을 저장해주세요.',
    IOS: 'iOS 내보내기 방법: 설정 메뉴에서 대화 내용을 백업할 수 있습니다. [설정 > 대화 백업]을 통해 데이터를 안전하게 보관하세요.',
    Android:
      'Android 내보내기 방법: Android에서는 설정 메뉴를 통해 대화 백업 및 내보내기를 수행할 수 있습니다. [설정 > 채팅 > 채팅 백업]에서 대화 내용을 관리하세요.',
  };

  const handlePlatformChange = (platform: 'PC' | 'IOS' | 'Android') => {
    setSelectedPlatform(platform);
  };

  return (
    <div className="description-area">
      <div className="des-heading">
        <div className="des_head_img"></div>
        <h1>내보내기 방법</h1>
      </div>
      <div className="des-btns">
        <button onClick={() => handlePlatformChange('PC')}>PC</button>
        <button onClick={() => handlePlatformChange('IOS')}>IOS</button>
        <button onClick={() => handlePlatformChange('Android')}>Android</button>
      </div>
      <div className="des-main">
        <div className="des-main-img">
          <img src={platformImages[selectedPlatform]} alt={selectedPlatform} />
        </div>
        <p>{platformTexts[selectedPlatform]}</p>
      </div>
    </div>
  );
}

export default DescriptionArea;
