'use client';

import FetchData from '@/components/fetchData';
import React, { useEffect, useState } from 'react';

function Page() {
  const [result, setResult] = useState('');

  const Question = ``;
  const prompt =
    "다음대화를읽고,배열안에'result'json 객체를 생성하여 반환하세요.'result'객체는다음과같은구조를가져야합니다topic:{summary:'대화내용요약'},mbti:{analysis:'인물별 MBTI분석및이유를배열로'},talkCount:{counts:'인물별말한횟수'number},mostWords:{topWords:'가장많이 사용된 단어 상위 3개를반환 다만 글자는 두글자 이상 사람이름제외 없으면없다해도됨'}}.모든필드를채워주세요.줄바꿈은하지마세요입력이없을때는빈문자를주세요";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchData(prompt, Question); // 수정된 FetchData 호출
        console.log(data); // 데이터 로그 출력
        setResult(data); // 결과를 상태에 저장
        console.log('called');
      } catch (error) {
        console.error('Error fetching data:', error);
        setResult('Error fetching data'); // 에러 상태 설정
      }
    };

    fetchData(); // 비동기 함수 호출
  }, [prompt]);

  return <div>{result ? JSON.stringify(result) : 'Loading...'}</div>;
}

export default Page;
