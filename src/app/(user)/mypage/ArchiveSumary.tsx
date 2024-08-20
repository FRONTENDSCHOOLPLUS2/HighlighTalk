// FIXME - 하드 코딩 상태 / 최신 분석 결과 가져오기

function ArchiveSumary() {
  return (
    <div className="contents result">
      <ul className="result-box">
        <li>
          <span className="result-title">
            <span>기본 분석 리포트</span>
            <span className="date">2024.08.18</span>
          </span>
          <span className="people">여다희, 김설하, 윤우중</span>
        </li>
        <li>
          <span className="result-title">
            <span>기본 분석 레포트</span>
            <span className="date">2024.08.18</span>
          </span>
          <span>피카츄, 라이츄, 파이리 외 3명</span>
        </li>
      </ul>
    </div>
  );
}
export default ArchiveSumary;
