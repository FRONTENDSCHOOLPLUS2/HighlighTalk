'use client';

import { useEffect, useState } from 'react';
import getTokenLength from '@/utils/getTokenLength';
import validateAndTrimData from '@/utils/validateAndTrimData';

// 토큰 수 계산하는 예시가 될 컴포넌트입니다.
function TokenTest() {
  const [inputText, setInputText] = useState('hello world');
  const [tokenLength, setTokenLength] = useState(0);
  const [status, setStatus] = useState('');

  const STR_1 = 'hello world';
  const STR_2 = '안녕하세요 세상';
  const STR_3 = '오늘은 고양이의 날입니다 모두들 고양이를 힘껏 사랑해주세요';

  useEffect(() => {
    setTokenLength(getTokenLength(inputText));
    const validatedText = validateAndTrimData(inputText);

    if (validatedText.status === 'error') {
      setStatus('error - 토큰 수 적음');
    } else {
      setStatus(`ok - ${validatedText.data}`);
    }
  }, [inputText]);

  return (
    <div>
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <div>토큰 수: {tokenLength}</div>
      <div>status: {status}</div>
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
