// gpt => 데이터 요청
// temperature 수정금지
// max_token 수정금지

// key
const AI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
// token
const MAX_TOKEN = process.env.NEXT_PUBLIC_TOKEN_MAX;
// temperature
const TEMPERATURE_AI = process.env.NEXT_PUBLIC_TEMPERATURE_AI;

const FetchData = async (prompt: string, Question: string) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AI_API_KEY}`,
      },

      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: prompt }, // 프롬프팅
          { role: 'user', content: Question }, // 질문 보내기
        ],
        temperature: Number(TEMPERATURE_AI),
        max_tokens: Number(MAX_TOKEN),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // 데이터 반환
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default FetchData;
