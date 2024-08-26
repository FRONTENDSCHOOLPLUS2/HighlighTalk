'use client';

import './_ScoreSection.scss';
import TitleBox from '@/app/(tests)/components/AnalysisItem/TitleBox';

interface ScoreSectionPropType {
  names: string;
  score: number;
  reason: string;
  couple: number;
  marriage: number;
}

function ScoreSection({
  names = '',
  score = 0,
  reason = '',
  couple = 0,
  marriage = 0,
}: ScoreSectionPropType) {
  const breakPointAndTextMap = new Map([
    [10, '평생에 한 번도 찾아오기 힘든 사랑'],
    [9, '하늘이 이어준 반 쪽'],
    [8, '전생에도 연인이었나봐요'],
    [7, '말하지 않아도 알아요'],
    [6, '더 가까운 사이가 되어봐요'],
    [5, '밀어야 해, 당겨야해?'],
    [4, '서로의 노력이 필요해요'],
    [3, '연인인지, 웬수인지'],
    [2, '미운 정만 남은 우리'],
    [1, '잘못된 만남'],
    [0, '이루어져서는 안되는 만남'],
  ]);

  const MAX_SCORE = 100;
  const LINE_WIDTH = 20;
  const WIDTH = 250 + LINE_WIDTH;
  const HEIGHT = 250 + LINE_WIDTH;
  const r = (Math.min(WIDTH, HEIGHT) - LINE_WIDTH) / 2;
  const circleLength = 2 * Math.PI * r;
  const strokeDasharray = `${(score / MAX_SCORE) * circleLength} ${circleLength}`;

  return (
    <section className="score">
      <TitleBox title={`${names}의 연애 궁합 점수`} desc={'우리는 얼마나 잘 어울릴까?'} />
      <div className="container">
        <div className="score-cont">
          <div className="score-graph" style={{ width: WIDTH, height: HEIGHT }}>
            <svg
              className="score-svg"
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="score-bg"
                cx={WIDTH / 2}
                cy={HEIGHT / 2}
                r={r - LINE_WIDTH / 2}
                strokeWidth={LINE_WIDTH + LINE_WIDTH / 2}
              />
              <circle
                className="score-line"
                cx={WIDTH / 2}
                cy={HEIGHT / 2}
                r={r}
                strokeWidth={LINE_WIDTH}
                strokeDasharray={strokeDasharray}
                strokeDashoffset="0"
                style={{ transition: 'stroke-dasharray 0.5s ease-in-out' }}
              />
            </svg>
            <span className="score-text">
              <span className="score-label">궁합 점수</span>
              <span className="score-box">
                <span className="score-number">{score}</span>점
              </span>
            </span>
          </div>
          <p className="score-title">"{breakPointAndTextMap.get(Math.floor(score / 10)) || ''}"</p>
        </div>
        <div className="reason">
          <p className="reason-label"> 궁합 풀이 </p>
          <p className="reason-text">{reason}</p>
          <ul className="list">
            <li className="couple-item">
              <p className="title">연인이 될 확률</p>
              <div className="cont-wave">
                <div className="wave" style={{ top: `${100 - couple - 5}%` }}></div>
                <span className="percentage">{couple}%</span>
              </div>
            </li>
            <li className="marriage-item">
              <p className="title">결혼 할 확률</p>
              <div className="cont-wave">
                <div className="wave" style={{ top: `${100 - marriage - 5}%` }}></div>
                <span className="percentage">{marriage}%</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ScoreSection;
