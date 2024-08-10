'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useTooltip from '@/hooks/useTooltip';

const chartColors = ['#FF6F41', '#BCD426', '#4CBE83', '#FECE5E', '#FF6F78', '#FF9D9D', '#FF89D4'];

interface CirclePackingPropType {
  data: CirclePackingDataNode[];
  width?: number;
  height?: number;
}
interface CirclePackingDataNode {
  key: string;
  value: number;
  x?: number; // 나중에 x, y 좌표 추가됨
  y?: number;
  fx?: number | null; // 드래그
  fy?: number | null;
}
interface CirclePackingLink {
  source: CirclePackingDataNode;
  target: CirclePackingDataNode;
}

type SVGType = d3.Selection<SVGSVGElement, unknown, null, undefined>;

// 화면에 보이는 최대 Circle 갯수
const MAX_CIRCLE_NUM = 4;

const CirclePacking = ({ data = [], width = 600, height = 600 }: CirclePackingPropType) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  let isDragging = false;

  const { createTooltip, showTooltip, hideTooltip, setTooltipContent, setTooltipPosition } =
    useTooltip();

  // 노드 간 Link 생성하는 함수
  const createLinks = (data: CirclePackingDataNode[]): CirclePackingLink[] => {
    return data.map((d, index) => ({
      source: data[index],
      target: index !== data.length - 1 ? data[index + 1] : data[0],
    }));
  };

  // 이름 라벨 생성하는 함수
  const createLabel = (target: SVGType) => {
    return target
      .append('g')
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('x', () => width / 2)
      .attr('y', () => height / 2)
      .attr('dy', '.35em') // 수직 정렬
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Pretendard')
      .attr('font-weight', '700')
      .attr('font-size', (d, i) => (i === 0 ? '4rem' : '2rem'))
      .attr('fill', '#fff')
      .attr('style', 'user-select: none;') // 드래그로 텍스트 선택할 수 없도록 지정
      .text((d) => d.key);
  };

  // 노드 및 라벨 위치 변경
  const updateNodePositions = (
    nodes: d3.Selection<SVGCircleElement, CirclePackingDataNode, SVGGElement, unknown>,
    texts: d3.Selection<SVGTextElement, CirclePackingDataNode, SVGGElement, unknown>
  ) => {
    nodes.attr('cx', (d) => d.x!).attr('cy', (d) => d.y!);
    texts.attr('x', (d) => d.x!).attr('y', (d) => d.y!);
  };

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => b.value - a.value).slice(0, MAX_CIRCLE_NUM);

    const links = createLinks(sortedData);

    const svg = d3
      .select<SVGSVGElement, unknown>(svgRef.current!)
      .attr('width', width)
      .attr('height', height);
    const scale = d3.scaleLinear().domain([0, data[0].value]).range([5, 100]);

    // 툴팁 생성 및 이벤트 핸들러 정의
    const Tooltip = createTooltip();

    const mouseover = () => {
      if (!isDragging) {
        showTooltip(Tooltip);
      }
    };
    const mousemove = (event: MouseEvent, d: CirclePackingDataNode) => {
      setTooltipContent(Tooltip, d.key, d.value + '회');
      setTooltipPosition(Tooltip, event.pageX, event.pageY);
    };
    const mouseleave = () => {
      hideTooltip(Tooltip);
    };

    // 노드 드래그 이벤트 핸들러
    const dragstarted = (
      event: d3.D3DragEvent<SVGCircleElement, CirclePackingDataNode, CirclePackingDataNode>,
      d: CirclePackingDataNode
    ) => {
      isDragging = true;

      if (!event.active) simulation.alphaTarget(0.5).restart();
      d.fx = d.x;
      d.fy = d.y;
    };
    const dragged = (
      event: d3.D3DragEvent<SVGCircleElement, CirclePackingDataNode, CirclePackingDataNode>,
      d: CirclePackingDataNode
    ) => {
      d.fx = event.x;
      d.fy = event.y;
    };
    const dragended = (
      event: d3.D3DragEvent<SVGCircleElement, CirclePackingDataNode, CirclePackingDataNode>,
      d: CirclePackingDataNode
    ) => {
      isDragging = false;

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
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave)
      .call(
        d3
          .drag<SVGCircleElement, CirclePackingDataNode>() // 드래그 기능 추가
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      );

    // 이름 라벨 생성
    const texts = createLabel(svg);

    // 시뮬레이션 설정
    const simulation = d3
      .forceSimulation<CirclePackingDataNode>()
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('charge', d3.forceManyBody().strength(5))
      .force(
        'link',
        d3
          .forceLink<CirclePackingDataNode, CirclePackingLink>()
          .id((d) => d.key)
          .links(links)
      )
      .force(
        'collide',
        d3
          .forceCollide<CirclePackingDataNode>()
          .strength(1)
          .radius((d) => scale(d.value) + 5)
          .iterations(1)
      );

    simulation.nodes(data).on('tick', () => {
      updateNodePositions(nodes, texts);
      if (simulation.alpha() < 0.01) {
        simulation.stop();
      }
    });
  }, [data]);

  return <svg id="circle-packing" ref={svgRef}></svg>;
};

export default CirclePacking;
