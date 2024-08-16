import './_mypage.scss';

function MyPage({ params }: { params: { id: string } }) {
  console.log(params.id);
  return (
    <main className="mypage-container">
      <section className="mypage-section">
        <h2 className="profile-title">내 프로필 정보</h2>
      </section>
      <section className="mypage-section">
        <h2>내 분석 기록</h2>
      </section>
      <section className="mypage-section">
        <h2> 내 코인 </h2>
      </section>
      <section className="mypage-section">
        <h2>기타 </h2>
      </section>
    </main>
  );
}
export default MyPage;
