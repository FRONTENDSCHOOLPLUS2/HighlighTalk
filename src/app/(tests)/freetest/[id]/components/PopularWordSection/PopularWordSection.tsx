import WordCloud from '@/components/graph/WordCloud';
import './_PopularWordSection.scss';

interface PopularWordSectionPropType {
  data: { [key: string]: number };
}

function PopularWordSection({ data }: PopularWordSectionPropType) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const parsedData = keys.map((key, index) => ({ key: key, value: values[index] }));

  return (
    <section className="most-popular-word">
      <h3 className="heading-3">가장 많이 나온 단어</h3>
      <p className="heading-desc">우리 대화방에서 가장 많이 사용한 단어에요</p>
      {data ? (
        <div className="graph">
          <WordCloud data={parsedData} />
        </div>
      ) : (
        <div>데이터가 없어요</div>
      )}
    </section>
  );
}

export default PopularWordSection;
