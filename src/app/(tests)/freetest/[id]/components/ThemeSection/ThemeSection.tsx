import './_ThemeSection.scss';

interface ThemeSectionPropType {
  data: {
    title: string;
    content: string;
  }[];
}

function ThemeSection({ data }: ThemeSectionPropType) {
  const getSlicedData = (data: { title: string; content: string }[]) => {
    if (data.length > 3) {
      return [...data].slice(0, 3);
    } else {
      return [...data];
    }
  };

  return (
    <section className="theme">
      <h2 className="heading-2">대화 분석 결과</h2>
      <h3 className="heading-3">대화 주제 TOP3</h3>
      <ul className="bubble-list">
        {data &&
          getSlicedData(data).map(({ title, content }, i) => (
            <li className="bubble-item" key={`bubble-${i}`}>
              <p className="bubble-title">{title}</p>
              <p className="bubble-text">{content}</p>
            </li>
          ))}
      </ul>
    </section>
  );
}

export default ThemeSection;
