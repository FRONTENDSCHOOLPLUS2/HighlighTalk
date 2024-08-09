// 필요없는 문자열 제거 함수
const removeDateTimeAndUserKey = (text: string): string => {
  const dateTimeRegex = /"Date":"\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}",?/g;
  const cleanedText = text.replace(dateTimeRegex, '').trim();
  return cleanedText.replace(/,}/g, '}').replace(/,]/g, ']').trim();
};

export default removeDateTimeAndUserKey;
