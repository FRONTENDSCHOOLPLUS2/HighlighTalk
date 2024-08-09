import CirclePacking from '@/components/graph/CirclePacking';
import TokenTest from '@/components/test/TokenTest';

function TestPage() {
  return (
    <>
      <h1>테스트 페이지</h1>
      <hr />
      <h2>토큰수 테스트</h2>
      <p>gpt-4o 기준, o200k_base 인코딩</p>
      <TokenTest />
      <hr />
      <h2>그래프 테스트</h2>
      <p></p>
      <CirclePacking />
    </>
  );
}

export default TestPage;
