'use client';

import { useEffect } from 'react';
import * as d3 from 'd3';
import d3Cloud, { Word } from 'd3-cloud';

// 워드 클라우드의 크기 설정
const width = 600;
const height = 300;

// 데이터 정의
const data = [
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

function WordCloud() {
  // 데이터 정렬
  const sortedData = data.sort((a, b) => b.value - a.value);

  useEffect(() => {
    const fontScale = d3.scaleLinear().domain([1, sortedData[0].value]).range([12, 60]);

    // 툴팁 생성
    const Tooltip = d3
      .select('body')
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('position', 'absolute') // 절대 위치 지정
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '5px')
      .style('padding', '5px');

    // 툴팁 관련 함수
    const mouseover = function (event, d) {
      Tooltip.style('opacity', 1);
    };
    const mousemove = function (event, d) {
      Tooltip.html('<u>' + d.text + '</u>' + '<br>' + d.value + ' 회')
        .style('left', event.pageX + 20 + 'px') // pageX로 좌표 조정
        .style('top', event.pageY - 30 + 'px');

      event.target.style;
    };
    const mouseleave = function (event, d) {
      Tooltip.style('opacity', 0);
    };

    // 워드 클라우드를 그리는 함수
    const drawCloud = (words: Word[]) => {
      const svg = d3
        .select('#word-cloud')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
      // .style('border', '1px solid black');

      const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

      // 워드 생성
      g.selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', (d) => `${d.size}px`)
        .style('font-family', 'Pretendard')
        .style('fill', '#333333')
        .style('font-weight', '700')
        .attr('text-anchor', 'middle')
        .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseleave', mouseleave)
        .text((d) => d.text);
    };

    // 워드 클라우드 생성 설정
    const cloud = d3Cloud()
      .size([width, height])
      .words(sortedData.map((d) => ({ text: d.key, size: fontScale(d.value), value: d.value })))
      .padding(15)
      .rotate(() => 0)
      .font('Pretendard')
      .fontSize((d) => d.size)
      .on('end', drawCloud)
      .start();
  }, [sortedData]);

  return <div id="word-cloud"></div>;
}

export default WordCloud;
