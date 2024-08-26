// 프로필 src를 랜덤으로 반환해줌

import { getImageSrc } from './getImageSrc';

const MBTI_ARR = [
  'INTJ',
  'INTP',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
  'DEFAULT',
];

const randomProfile = () => {
  const randomIndex = Math.floor(Math.random() * MBTI_ARR.length);

  return getImageSrc(MBTI_ARR[randomIndex]);
};

export default randomProfile;
