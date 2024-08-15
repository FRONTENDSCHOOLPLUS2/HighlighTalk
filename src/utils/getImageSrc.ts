export const getImageSrc = (mbtiValue: string) => {
  switch (mbtiValue) {
    case 'INTJ':
      return '/image/intj.svg';
    case 'INTP':
      return '/image/intp.svg';
    case 'ENTJ':
      return '/image/entj.svg';
    case 'ENTP':
      return '/image/entp.svg';
    case 'INFJ':
      return '/image/infj.svg';
    case 'INFP':
      return '/image/infp.svg';
    case 'ENFJ':
      return '/image/enfj.svg';
    case 'ENFP':
      return '/image/default.svg';
    case 'ISTJ':
      return '/image/istj.svg';
    case 'ISFJ':
      return '/image/isfj.svg';
    case 'ESTJ':
      return '/image/estj.svg';
    case 'ESFJ':
      return '/image/esfj.svg';
    case 'ISTP':
      return '/image/istp.svg';
    case 'ISFP':
      return '/image/isfp.svg';
    case 'ESTP':
      return '/image/estp.svg';
    case 'ESFP':
      return '/image/esfp.svg';
    default:
      return '/image/default.svg'; // 매칭되지 않는 경우 기본 이미지
  }
};
