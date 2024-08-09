'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';

const chartColors = ['#FF6F41', '#BCD426', '#4CBE83', '#FECE5E', '#FF6F78', '#FF9D9D', '#FF89D4'];

const CirclePacking = () => {
  interface DataNode {
    key: string;
    value: number;
  }

  const canvasRef = useRef(null);
  const width = 600;
  const height = 600;
  let data: DataNode[] = [
    { key: '김설하', value: 15 },
    { key: '윤우중', value: 30 },
    { key: '여다희', value: 25 },
    { key: '정길용', value: 10 },
    { key: '정현주', value: 9 },
  ];

  const drawGraph = () => {
    data.sort((a, b) => b.value - a.value);
    data = data.slice(0, 4);

    const createLinks = (data: DataNode[]) => {
      return data.map((d, index) => ({
        source: data[index],
        target: index !== data.length - 1 ? data[index + 1] : data[0],
      }));
    };

    const links = createLinks(data);

    const svg = d3.select(canvasRef.current).attr('width', width).attr('height', height);
    const scale = d3.scaleLinear().domain([0, data[0].value]).range([5, 100]);

    // 노드 드래그 함수
    const dragstarted = (event, d) => {
      if (!event.active) simulation.alphaTarget(0.5).restart();
      d.fx = d.x;
      d.fy = d.y;
    };
    const dragged = (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    };
    const dragended = (event, d) => {
      if (!event.active) simulation.alphaTarget(0.01);
      d.fx = null;
      d.fy = null;
    };

    // 노드 생성
    const nodes = svg
      .append('g')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', (d) => scale(d.value))
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('fill', (d, i) => chartColors[i % chartColors.length])
      .on('mouseover', mouseover) // What to do when hovered
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave)
      .call(
        d3
          .drag() // call specific function when circle is dragged
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      );

    // 이름 라벨 생성
    const texts = svg
      .append('g')
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('x', (d) => width / 2)
      .attr('y', (d) => height / 2)
      .attr('dy', '.35em') // 수직 정렬
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Pretendard')
      .attr('font-weight', '700')
      .attr('font-size', (d, i) => (i === 0 ? '4rem' : '2rem'))
      .attr('fill', '#fff')
      .text((d) => d.key);

    const simulation = d3
      .forceSimulation()
      .force('center', d3.forceCenter(width / 2, height / 2)) // Attraction to the center of the svg area
      .force('charge', d3.forceManyBody().strength(5)) // Nodes are attracted one each other
      .force(
        'link',
        d3
          .forceLink()
          .id((d) => d.key)
          .links(links)
      )
      .force(
        'collide',
        d3
          .forceCollide()
          .strength(1)
          .radius((d) => scale(d.value) + 5)
          .iterations(1)
      );

    // force 강도 설정
    simulation.alpha(0.1).alphaTarget(0.01).restart();

    simulation.nodes(data).on('tick', (d) => {
      nodes.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      texts.attr('x', (d) => d.x).attr('y', (d) => d.y);
      if (simulation.alpha() < 0.01) {
        simulation.stop();
      }
    });

    return;
  };

  useEffect(() => {
    drawGraph();
  }, [data]);

  return <svg id="circle-packing" ref={canvasRef}></svg>;
};

export default CirclePacking;
