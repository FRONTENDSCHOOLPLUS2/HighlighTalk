import './_TitleBox.scss';

interface TitleBoxPropType {
  title: string;
  desc: string;
}

function TitleBox({ title, desc }: TitleBoxPropType) {
  return (
    <>
      <h3 className="heading-title">{title}</h3>
      <p className="heading-desc">{desc}</p>
    </>
  );
}

export default TitleBox;
