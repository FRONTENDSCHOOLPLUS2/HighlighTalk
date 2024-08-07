import o200k_base from 'gpt-tokenizer/encoding/o200k_base';

const getTokenLength = (text: string) => {
  const api = o200k_base;
  const encodedTokens = api.encode(text);

  return encodedTokens.length;
};

export default getTokenLength;
