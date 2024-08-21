'use client';

import WordCloud from '@/components/graph/WordCloud';
import './_PopularWordSection.scss';
import { useEffect, useRef, useState } from 'react';

interface PopularWordSectionPropType {
  data: { [key: string]: number };
}

function PopularWordSection({ data }: PopularWordSectionPropType) {
  const [graphSize, setGraphSize] = useState({ width: 600, height: 300 });
  const sectionRef = useRef<HTMLElement | null>(null);

  const keys = Object.keys(data);
  const values = Object.values(data);
  const parsedData = keys.map((key, index) => ({ key: key, value: values[index] }));

  const resizeGraph = (width: number, height: number) => {
    setGraphSize((prev) => ({
      width: width || prev.width,
      height: height || prev.height,
    }));
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        resizeGraph(entry.contentRect.width, 300);
      }
    });

    if (sectionRef.current) {
      resizeObserver.observe(sectionRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className="most-popular-word" ref={sectionRef}>
      <h3 className="heading-3">가장 많이 나온 단어</h3>
      <p className="heading-desc">우리 대화방에서 가장 많이 사용한 단어에요</p>
      {data ? (
        <div className="graph">
          <WordCloud data={parsedData} width={graphSize.width} height={graphSize.height} />
        </div>
      ) : (
        <div>데이터가 없어요</div>
      )}
    </section>
  );
}

export default PopularWordSection;
