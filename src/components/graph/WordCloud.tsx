'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import d3Cloud from 'd3-cloud';

interface WordCloudProps {
  data: Word[];
  width?: number;
  height?: number;
}

interface Word extends d3Cloud.Word {
  key: string;
  value: number;
}

const initialData: Word[] = [
  { key: '중우', value: 10 },
  { key: '짱이다', value: 15 },
  { key: '울랄라', value: 30 },
  { key: '얍', value: 100 },
  { key: '응', value: 80 },
  { key: '바빠', value: 41 },
  { key: '나가라', value: 10 },
  { key: '어떻게', value: 20 },
  { key: '되는거지', value: 10 },
  { key: '야', value: 40 },
  { key: '아니야', value: 30 },
  { key: '덤벼', value: 60 },
];

// 툴팁 생성 함수
const createTooltip = () => {
  return d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute')
    .style('background-color', 'white')
    .style('border', 'solid 2px')
    .style('border-radius', '5px')
    .style('padding', '5px');
};

function WordCloud({ data = initialData, width = 600, height = 300 }: WordCloudProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null); // SVG 요소를 재사용하기 위한 ref

  useEffect(() => {
    const sortedData = data.sort((a, b) => b.value - a.value);

    const fontScale = d3.scaleLinear().domain([1, sortedData[0].value]).range([12, 60]);

    const Tooltip = createTooltip();

    const handleMouseOver = () => Tooltip.style('opacity', 1);
    const handleMouseMove = (event: MouseEvent, d: Word) => {
      Tooltip.html(`<u>${d.text}</u><br>${d.value} 회`)
        .style('left', `${event.pageX + 20}px`)
        .style('top', `${event.pageY - 30}px`);
    };
    const handleMouseLeave = () => Tooltip.style('opacity', 0);

    if (!svgRef.current) {
      // SVG가 없을 때만 새로 생성
      svgRef.current = d3
        .select(canvasRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .node() as SVGSVGElement;
    }

    const g = d3
      .select(svgRef.current)
      .selectAll('g')
      .data([null])
      .join('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // 워드 클라우드 생성 및 렌더링
    d3Cloud()
      .size([width, height])
      .words(sortedData.map((d) => ({ text: d.key, size: fontScale(d.value), value: d.value })))
      .padding(15)
      .rotate(() => 0)
      .font('Pretendard')
      .fontSize((d) => d.size as number)
      .on('end', (words: Word[]) => {
        const textSelection = g
          .selectAll<SVGTextElement, Word>('text')
          .data(words, (d: Word) => d.text!);

        // Enter: 새로운 요소
        textSelection
          .enter()
          .append('text')
          .merge(textSelection)
          .style('font-size', (d) => `${d.size}px`)
          .style('font-family', 'Pretendard')
          .style('fill', '#333333')
          .style('font-weight', '700')
          .attr('text-anchor', 'middle')
          .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
          .on('mouseover', handleMouseOver)
          .on('mousemove', handleMouseMove)
          .on('mouseleave', handleMouseLeave)
          .text((d) => d.text as string);

        // Exit: 사라진 요소
        textSelection.exit().remove();
      })
      .start();

    return () => {
      Tooltip.remove();
    };
  }, [data, width, height]);

  return <div ref={canvasRef}></div>;
}

export default WordCloud;
