import CirclePacking from '@/components/graph/CirclePacking';
import './_TopRatedTalkerSection.scss';

interface TopRatedTalkerSectionPropType {
  data: {
    key: string;
    value: number;
  }[];
}

function TopRatedTalkerSection({ data }: TopRatedTalkerSectionPropType) {
  const getPercentage = (data: { key: string; value: number }[], value: number) => {
    let sumValue = 0;
    data.forEach((d) => {
      sumValue += d.value;
    });

    return ((value / sumValue) * 100).toFixed(0);
  };

  return (
    <section className="top-rated-talker">
      <h3 className="heading-3">가장 많이 말한 사람</h3>
      <p className="heading-desc">우리 대화방 참여자들의 MBTI 예측</p>
      <div className="graph">
        <CirclePacking width={400} height={500} data={data} />
        <ul className="rank-list">
          {data
            .sort((a, b) => b.value - a.value)
            .map(({ key, value }, index) => (
              <li className="rank-item" key={`rank-${key}-${index}`}>
                <span className="rank">{index + 1}위</span>
                <span className="name">{key}</span>
                <span className="count">{value}회</span>
                <span className="percentage">{getPercentage(data, value)}%</span>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

export default TopRatedTalkerSection;
