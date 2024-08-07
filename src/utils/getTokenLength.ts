import { encode } from 'gpt-tokenizer/encoding/o200k_base';

const getTokenLength = (text: string) => {
  const encodedTokens = encode(text);

  return encodedTokens.length;
};

export default getTokenLength;
