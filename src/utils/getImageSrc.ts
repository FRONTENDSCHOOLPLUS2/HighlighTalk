export const getImageSrc = (mbtiValue: string) => {
  switch (mbtiValue) {
    case 'INTJ':
      return '/image/mbti/intj.svg';
    case 'INTP':
      return '/image/mbti/intp.svg';
    case 'ENTJ':
      return '/image/mbti/entj.svg';
    case 'ENTP':
      return '/image/mbti/entp.svg';
    case 'INFJ':
      return '/image/mbti/infj.svg';
    case 'INFP':
      return '/image/mbti/infp.svg';
    case 'ENFJ':
      return '/image/mbti/enfj.svg';
    case 'ENFP':
      return '/image/mbti/default.svg';
    case 'ISTJ':
      return '/image/mbti/istj.svg';
    case 'ISFJ':
      return '/image/mbti/isfj.svg';
    case 'ESTJ':
      return '/image/mbti/estj.svg';
    case 'ESFJ':
      return '/image/mbti/esfj.svg';
    case 'ISTP':
      return '/image/mbti/istp.svg';
    case 'ISFP':
      return '/image/mbti/isfp.svg';
    case 'ESTP':
      return '/image/mbti/estp.svg';
    case 'ESFP':
      return '/image/mbti/esfp.svg';
    default:
      return '/image/default.svg'; // 매칭되지 않는 경우 기본 이미지
  }
};
