'use client';

import './_RelationSection.scss';
import TitleBox from '@/app/(tests)/components/AnalysisItem/TitleBox';

interface RelationSectionPropType {
  couple: number;
  marriage: number;
}

function RelationSection({ couple, marriage }: RelationSectionPropType) {
  return (
    <section className="summary">
      <TitleBox title={`관계 발전의 가능성`} desc={`우린 연인 / 배우자가 될 수 있을까?`} />
      <ul>
        <li>
          <p>연인이 될 확률</p>
          <p>{couple}%</p>
        </li>
        <li>
          <p>결혼 할 확률</p>
          <p>{marriage}%</p>
        </li>
      </ul>
    </section>
  );
}

export default RelationSection;
