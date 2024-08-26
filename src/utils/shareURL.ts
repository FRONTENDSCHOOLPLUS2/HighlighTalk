// 공유 함수 예외처리
export const shareURL = (text: string) => {
  const copyText = `[ 하이라이톡 - 우리는 어떻게 대화하고 있을까? ]\n${text}\n\nURL - ${location.href}`;

  //모바일
  if (navigator.share) {
    navigator
      .share({
        title: '하이라이톡 - AI 분석 결과',
        text: copyText,
        url: location.href,
      })
      .then(() => {
        console.log('공유 성공!');
      })
      .catch((error) => {
        console.error('공유 실패:', error);
      });
  } else if (navigator.clipboard) {
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        showToast('클립보드에 URL이 복사되었어요!');
      })
      .catch((error) => {
        alert('클립보드에 복사하는데 실패했어요. 직접 복사해 주세요: ' + copyText);
      });
  }
};

// 토스트 알림 함수
const showToast = (message: string) => {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  toast.style.color = 'white';
  toast.style.padding = '10px 20px';
  toast.style.borderRadius = '5px';
  toast.style.zIndex = '1000';
  toast.style.opacity = '1';
  toast.style.transition = 'opacity 0.5s ease-in-out';

  document.body.appendChild(toast);

  // 3초 후에 토스트 메시지 사라짐
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500); // 0.5초 후에 DOM에서 제거
  }, 3000); // 3초 동안 토스트 표시
};
