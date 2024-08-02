// gpt => 데이터 요청

const AI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const FetchData = async (prompt: any, Question: any) => {
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
        temperature: 0.7,
        max_tokens: 1000,
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
