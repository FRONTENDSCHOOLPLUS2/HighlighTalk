'use client';

import { useEffect, useRef, useState } from 'react';
import './_TopicsSection.scss';
import TitleBox from '@/app/(tests)/components/AnalysisItem/TitleBox';
import * as d3 from 'd3';

type TopicType = 'money' | 'health' | 'love' | 'daily';

type PersonalFactors = {
  [key in TopicType]: number;
};

interface TopicParsedData {
  key: string;
  value: number;
}

interface TopicsSectionPropType {
  personalFactors: PersonalFactors;
}

function TopicsSection({ personalFactors }: TopicsSectionPropType) {
  const [graphSize, setGraphSize] = useState({ width: 700, height: 300 });
  const sectionRef = useRef<HTMLElement | null>(null);
  const graphRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const colorArr = ['#2bc16b', '#ff8e95', '#fe6e77', '#ff4cbf'];

  const topicMap = new Map([
    ['money', '돈'],
    ['health', '건강'],
    ['love', '사랑'],
    ['daily', '일상'],
  ]);
  const colorMap = new Map([
    ['돈', '#2bc16b'],
    ['건강', '#ff8e95'],
    ['사랑', '#fe6e77'],
    ['일상', '#ff4cbf'],
  ]);

  /** 데이터를 {key: string, value: number}[] 형태로 파싱하는 함수 */
  const getParsedData = (data: PersonalFactors): TopicParsedData[] => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    return keys.map((key, i) => ({ key: topicMap.get(key)!, value: values[i] }));
  };

  /** 그래프 그리는 함수 */
  const drawGraph = (data: TopicParsedData[]) => {
    const margin = { top: 40, right: 30, bottom: 30, left: 30 };
    const WIDTH = graphSize.width - margin.left - margin.right;
    const HEIGHT = graphSize.height - margin.bottom;

    // svg가 있을 경우 새로 추가하지 않음
    if (!svgRef.current) {
      svgRef.current = d3
        .select(graphRef.current)
        .append('svg')
        .attr('width', graphSize.width)
        .attr('height', graphSize.height)
        // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .node();
    } else {
      d3.select(svgRef.current)
        .attr('width', WIDTH + margin.left + margin.right)
        .attr('height', HEIGHT + margin.top + margin.bottom);
    }

    // 폰트 스케일 설정 함수
    const fontScale = d3
      .scaleLinear()
      .domain([1, Math.max(...data.map((d) => d.value))])
      .range([16, 40]);

    /** 컬러 지정 함수 */
    const colorFill = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d.key))
      .range(colorArr);

    // define X
    const x = d3
      .scaleBand()
      .range([0, WIDTH])
      .padding(1)
      .domain(data.map((d) => d.value));

    // define Y
    const y = d3.scaleLinear().range([HEIGHT, 0]);
    y.domain([0, 100]);

    const xAxis = d3
      .select(svgRef.current)
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${margin.left}, ${HEIGHT})`);
    xAxis
      .transition()
      .duration(1000)
      .delay((d, i) => i * 500)
      .call(d3.axisBottom(x).tickFormat((d) => d));

    const j = d3.select(svgRef.current).selectAll('.myLine').data(data);

    // update lines
    j.enter()
      .append('line')
      .attr('class', 'myLine')
      .merge(j)
      .attr('x1', (d) => {
        return x(d.value)! + margin.left;
      })
      .attr('x2', (d) => {
        return x(d.value)! + margin.left;
      })
      .attr('y1', y(0))
      .attr('y2', y(0))
      .transition()
      .duration(1000)
      .delay((d, i) => i * 500)
      .attr('y2', (d) => {
        return y(d.value / 2);
      })
      .attr('stroke', (d) => colorFill(d.key));

    // variable u: map data to existing circle
    const u = d3.select(svgRef.current).selectAll('circle').data(data);

    // update groups
    const groups = u.enter().append('g').attr('class', 'myCircleGroup').merge(u);

    // update circles
    groups
      .append('circle')
      .attr('class', 'myCircle')
      .attr('cx', (d) => x(d.value)! + margin.left)
      .attr('cy', (d) => y(d.value / 2) - 10)
      .attr('fill', (d) => colorFill(d.key))
      .transition()
      .duration(1000)
      .delay((d, i) => i * 500)
      .attr('r', (d) => d.value)
      .attr('filter', (d) => `drop-shadow(0px 0px 10px ${colorFill(d.key)})`);

    // update text
    groups
      .append('text')
      .attr('class', 'myCircleText')
      .attr('x', (d) => x(d.value)! + margin.left)
      .attr('y', (d) => y(0))
      .style('font-size', 0)
      .style('font-weight', 700)
      .style('line-height', (d) => d.value * 2)
      .style('opacity', 0.8)
      .style('fill', 'white')
      .attr('text-anchor', 'middle')
      .transition()
      .duration(1000)
      .delay((d, i) => i * 500)
      .style('font-size', (d) => fontScale(d.value) + 'px')
      .attr('y', (d) => y(d.value / 2) - 10 + fontScale(d.value) / 2)
      .text((d) => d.key);
  };

  const data = getParsedData(personalFactors);
  const topTopic = [...data].sort((a, b) => b.value - a.value)[0].key;

  useEffect(() => {
    drawGraph(data);
  }, [personalFactors]);

  return (
    <section className="topic" ref={sectionRef}>
      <TitleBox title={`대화 주제`} desc={'우리는 어떤 얘기를 나누고 있을까?'} />
      <div className="container">
        <div className="graph" ref={graphRef} style={{ height: graphSize.height }}></div>
        <p className="graph-text">
          <span className="keyword" style={{ color: colorMap.get(topTopic) }}>
            {topTopic}
          </span>
          에 관한 이야기를 가장 많이 했어요
        </p>
      </div>
    </section>
  );
}

export default TopicsSection;
