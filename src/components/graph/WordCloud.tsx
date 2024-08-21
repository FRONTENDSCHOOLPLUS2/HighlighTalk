'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import d3Cloud from 'd3-cloud';
import useTooltip from '@/hooks/useTooltip';

interface WordCloudProps {
  data: Word[];
  width?: number;
  height?: number;
}

interface Word extends d3Cloud.Word {
  key: string;
  value: number;
}

function WordCloud({ data = [], width = 600, height = 300 }: WordCloudProps) {
  const MIN_FONT_SCALE_PX = 16;
  const MAX_FONT_SCALE_PX = 100;

  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null); // SVG 요소를 재사용하기 위한 ref
  const { createTooltip, showTooltip, hideTooltip, setTooltipContent, setTooltipPosition } =
    useTooltip();

  useEffect(() => {
    const Tooltip = createTooltip();
    const sortedData = data.sort((a, b) => b.value - a.value);

    // 폰트 스케일 설정 함수
    const fontScale = d3
      .scaleLinear()
      .domain([1, sortedData[0]?.value || 10])
      .range([MIN_FONT_SCALE_PX, MAX_FONT_SCALE_PX]);

    // 글씨 색상 설정 함수
    const colorScale = d3
      .scaleLinear<string>()
      .domain([1, sortedData.length])
      .range(['#ddd', '#333']);

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
      .padding(20)
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
          .style('fill', (d) => colorScale(d.value))
          .style('font-weight', '700')
          .attr('text-anchor', 'middle')
          .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
          .on('mouseover', () => {
            showTooltip(Tooltip);
          })
          .on('mousemove', (event: MouseEvent, d: Word) => {
            setTooltipContent(Tooltip, d.text as string, d.value + '회');
            setTooltipPosition(Tooltip, event.pageX, event.pageY);
          })
          .on('mouseleave', () => {
            hideTooltip(Tooltip);
          })
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
