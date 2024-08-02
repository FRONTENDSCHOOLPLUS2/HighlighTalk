

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  organization: 'org-u126irXm15UJrQrMV6eRalSp',
  project: 'proj_e92wMh7LPTMMm6J0wtmVl02x',
});



const MessageForAI = "다음대화를읽고,'result'json 객체를 생성하여 반환하세요.'result'객체는다음과같은구조를가져야합니다topic:{summary:'대화내용요약'},mbti:{analysis:'인물별 MBTI분석및이유를배열로'},talkCount:{counts:'인물별말한횟수'},mostWords:{topWords:'가장많이 사용된 단어 상위 3개를반환 다만 글자는 두글자 이상 사람이름제외 없으면없다해도됨'}}.모든필드를채워주세요.줄바꿈은하지마세요입력이없을때는빈문자를주세요"

export async function GET(request) {
  const url = new URL(request.url);
  const prompt = url.searchParams.get('prompt') || '';

  try {
    // OpenAI API 호출
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: MessageForAI }, { role: 'user', content: prompt }],
      stream: true,
      max_tokens: 1000,
      // response_format: { type: "json_object" },
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
