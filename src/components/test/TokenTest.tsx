'use client';

import { useEffect, useState } from 'react';
import getTokenLength from '@/utils/getTokenLength';

// 토큰 수 계산하는 예시가 될 컴포넌트입니다.
function TokenTest() {
  const [inputText, setInputText] = useState('hello world');
  const [tokenLength, setTokenLength] = useState(0);

  const STR_1 = 'hello world';
  const STR_2 = '안녕하세요 세상';

  useEffect(() => {
    // getTokenLength() 유틸 함수를 통해 얻을 수 있음
    setTokenLength(getTokenLength(inputText));
  }, [inputText]);

  return (
    <div>
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <div>토큰 수: {tokenLength}</div>
      <hr />
      <p>
        {/* 이렇게 정적으로 계산할 수도 있음 */}
        {STR_1} - 토큰 수: {getTokenLength(STR_1)}
      </p>
      <p>
        {STR_2} - 토큰 수: {getTokenLength(STR_2)}
      </p>
    </div>
  );
}

export default TokenTest;
