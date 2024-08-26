'use client';

import './_SummarySection.scss';
import TitleBox from '@/app/(tests)/components/AnalysisItem/TitleBox';

interface SummarySectionPropType {
  names: string;
  summary: string;
}

function SummarySection({ names, summary }: SummarySectionPropType) {
  const firstParagraph = summary.split('. ', 1);
  const paragraphArr = summary.split('. ');
  return (
    <section className="summary">
      <TitleBox title={`우리 잘 될 수 있을까?`} desc={`${names}의 대화 내용 AI 분석 결과`} />
      <div className="text">
        <p>{firstParagraph}.</p>
        <p>{paragraphArr.slice(1, -1).join('. ')}.</p>
      </div>
    </section>
  );
}

export default SummarySection;
