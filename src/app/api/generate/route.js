import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  organization: 'org-u126irXm15UJrQrMV6eRalSp',
  project: 'proj_e92wMh7LPTMMm6J0wtmVl02x',
});

export async function GET(request) {
  const url = new URL(request.url);
  const prompt = url.searchParams.get('prompt') || '';

  try {
    // OpenAI API 호출
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system', content: "다음 대화를 읽고, 'result' 객체를 생성하여 반환하세요. 'result' 객체는 다음과 같은 구조를 가져야 합니다 topic: { summary: '대화 내용 요약' }, mbti: { analysis: '인물별 MBTI 분석 및 이유를 배열로 ' }, talkCount: { counts: '인물별 말한 횟수' }, mostWords: { topWords: '가장 많이 사용된 단어 상위 3개' }}. 모든 필드를 채워주세요. 줄바꿈은 하지마세요 입력이 없을 때 는 빈문자를 주세요"
        }, { role: 'user', content: prompt }],
      stream: true,
      max_tokens: 1000,
    });

    let resultText = '';
    for await (const chunk of stream) {
      resultText += chunk.choices[0]?.delta?.content || '';
    }

    // 결과를 객체 형태로 반환
    return NextResponse.json({ result: resultText, status: 'success' });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 'error' }, { status: 500 });
  }
}
