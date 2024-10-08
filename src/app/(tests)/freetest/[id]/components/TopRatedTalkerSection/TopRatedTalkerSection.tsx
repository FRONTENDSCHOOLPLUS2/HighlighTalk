import CirclePacking from '@/components/graph/CirclePacking';
import './_TopRatedTalkerSection.scss';
import TitleBox from '@/app/(tests)/components/AnalysisItem/TitleBox';

interface TopRatedTalkerSectionPropType {
  data: {
    [key: string]: number;
  };
}

function TopRatedTalkerSection({ data }: TopRatedTalkerSectionPropType) {
  const getPercentage = (data: { key: string; value: number }[], value: number) => {
    let sumValue = 0;
    data.forEach((d) => {
      sumValue += d.value;
    });

    return ((value / sumValue) * 100).toFixed(0);
  };

  const keys = Object.keys(data);
  const values = Object.values(data);
  const parsedData = keys.map((key, index) => ({ key: key, value: values[index] }));

  return (
    <section className="top-rated-talker">
      <TitleBox title="가장 많이 말한 사람" desc="채팅방 대화 지분 1위" />
      <div className="graph">
        <CirclePacking width={400} height={500} data={parsedData} />
        <ul className="rank-list">
          {parsedData
            .sort((a, b) => b.value - a.value)
            .map(({ key, value }, index) => (
              <li className="rank-item" key={`rank-${key}-${index}`}>
                <span className="rank">{index + 1}위</span>
                <span className="name">{key}</span>
                <span className="count">{value}회</span>
                <span className="percentage">{getPercentage(parsedData, value)}%</span>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

export default TopRatedTalkerSection;
