// NOTE 우중님 추후 개발 예정
import './_MbtiSection.scss';

function MbtiSection({ data }) {
  return (
    <section className="mbti">
      <h3 className="heading-3">MBTI</h3>
      <p className="heading-desc">우리 대화방 참여자들의 MBTI 예측</p>
      <ol className="mbti-list">
        <li className="mbti-item">
          <span>여다희</span>
        </li>
        <li>
          <span>INTP</span>
        </li>
      </ol>
    </section>
  );
}

export default MbtiSection;
