import getTokenLength from './getTokenLength';
import { encode, decode } from 'gpt-tokenizer/encoding/o200k_base';

/**
 * 데이터가 최소/최대 토큰 개수 범위에 맞는지 유효성 검사를 진행하고,
 * 최대 토큰 수보다 토큰 수가 클 경우 최대 토큰 수만큼 자릅니다.
 */
const validateAndTrimData = (data: string): { status: 'ok' | 'error'; data?: string } => {
  const MIN = Number(process.env.NEXT_PUBLIC_TOKEN_MIN); // 최소 토큰 수
  const MAX = Number(process.env.NEXT_PUBLIC_TOKEN_MAX); // 최대 토큰 수
  const tokenLength = getTokenLength(data);

  const checkLength = (data: string): 'VALIDATE' | 'UNDER' | 'OVER' => {
    // 최소/최대 토큰 개수 유효성 검사
    if (tokenLength > MAX) {
      return 'OVER';
    } else if (tokenLength < MIN) {
      return 'UNDER';
    } else {
      return 'VALIDATE';
    }
  };

  const trimData = (data: string): string => {
    // 최근 데이터 기준으로, 최대 토큰 수만큼 자르기
    const trimedTokens = encode(data).slice(-MAX);
    return decode(trimedTokens);
  };

  const lengthValidation = checkLength(data);

  if (lengthValidation === 'UNDER') {
    return { status: 'error' };
  } else if (lengthValidation === 'OVER') {
    return { status: 'ok', data: trimData(data) };
  } else {
    return { status: 'ok', data: data };
  }
};

export default validateAndTrimData;
