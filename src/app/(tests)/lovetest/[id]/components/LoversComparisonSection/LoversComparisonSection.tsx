import TitleBox from '@/app/(tests)/components/AnalysisItem/TitleBox';
import './_LoversComparisonSection.scss';

interface LoversComparisonSectionPropType {
  names: string;
  betterLover: {
    [key: string]: number;
  };
}

function LoversComparisonSection({ names, betterLover }: LoversComparisonSectionPropType) {
  const [nameA, nameB] = names.split(', ');
  const amountA = betterLover[nameA];
  const amountB = betterLover[nameB];

  return (
    <section className="lover">
      <div
        className="lover-background"
        style={{
          background: `linear-gradient(
        80deg,
        #a8edea ${0}%,
        #d6b0f4 ${amountA}%,
        #fed6e3 ${100 - amountB / 2}%
      )`,
        }}
      ></div>
      <div className="lover-title">
        <TitleBox title={`더 많이 좋아하는 사람`} desc={'상대를 더 좋아하는 건 누구?'} />
      </div>
      <div className="person-cont">
        <div className="person">
          <p className="person-name">{nameA}</p>
          <p className="person-score">{betterLover && betterLover[nameA]}</p>
        </div>
        <div className="person">
          <p className="person-name">{nameB}</p>
          <p className="person-score">{betterLover && betterLover[nameB]}</p>
        </div>
      </div>
    </section>
  );
}

export default LoversComparisonSection;
