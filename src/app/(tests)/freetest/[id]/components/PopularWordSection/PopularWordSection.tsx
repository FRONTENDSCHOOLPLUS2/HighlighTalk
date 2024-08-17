import WordCloud from '@/components/graph/WordCloud';
import './_PopularWordSection.scss';

interface PopularWordSectionPropType {
  data: {
    key: string;
    value: number;
  }[];
}

function PopularWordSection({ data = [] }: PopularWordSectionPropType) {
  return (
    <section className="most-popular-word">
      <h3 className="heading-3">가장 많이 나온 단어</h3>
      <p className="heading-desc">우리 대화방에서 가장 많이 사용한 단어에요</p>
      <div className="graph">
        <WordCloud data={data} />
      </div>
    </section>
  );
}

export default PopularWordSection;
