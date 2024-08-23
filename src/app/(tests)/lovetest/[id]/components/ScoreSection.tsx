'use client';

import './_ScoreSection.scss';
import TitleBox from '@/app/(tests)/components/AnalysisItem/TitleBox';

interface ScoreSectionPropType {
  names: string;
  score: number;
  reason: string;
}

function ScoreSection({ names, score, reason }: ScoreSectionPropType) {
  const MAX_SCORE = 100;
  const LINE_WIDTH = 20;
  const WIDTH = 200 + LINE_WIDTH;
  const HEIGHT = 200 + LINE_WIDTH;
  const r = (Math.min(WIDTH, HEIGHT) - LINE_WIDTH) / 2;
  const circleLength = 2 * Math.PI * r;
  const strokeDasharray = `${(score / MAX_SCORE) * circleLength} ${circleLength}`;

  return (
    <section className="score">
      <TitleBox title={`${names}의 연애 궁합 점수`} desc={'우리는 얼마나 잘 어울릴까?'} />
      <div className="container">
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
        <div className="reason">
          <p className="reason-label"> 궁합 풀이 </p>
          <p className="reason-text">{reason}</p>
        </div>
      </div>
    </section>
  );
}

export default ScoreSection;
