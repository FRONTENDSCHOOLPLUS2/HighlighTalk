'use client';

import TitleBox from '@/app/(tests)/components/AnalysisItem/TitleBox';
import './_PersonalInterestSection.scss';
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { axisTop } from 'd3';

type AxisType = 'happy' | 'unrest' | 'trust' | 'love' | 'stress' | 'interested';

interface InterestInfo {
  person: string;
  interests: {
    [key in AxisType]: number;
  };
}

interface PersonalInterestSectionPropType {
  interestedAbout: InterestInfo[];
}

function PersonalInterestSection({ interestedAbout }: PersonalInterestSectionPropType) {
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const colors = ['rgb(43, 193, 107)', 'rgb(255, 76, 191)'];
  const bgColors = ['rgba(43, 193, 108, 0.2)', 'rgba(255, 76, 192, 0.2)'];
  const labels = ['happy', 'unrest', 'trust', 'love', 'stress', 'interested'];
  const korLabels = ['행복', '불편', '신뢰', '사랑', '스트레스', '흥미'];
  const mostPresentedEmotionByPerson = interestedAbout.map((person) => {
    const keys = Object.keys(person.interests);
    const values = Object.values(person.interests);
    console.log(`keys: ${keys}`);
    console.log(`values: ${values}`);
    const mostPresentedIndex = values.indexOf(Math.max(...values));
    console.log(`mostPresentedIndex: ${mostPresentedIndex}`);
    console.log(`mostPresented: ${keys[mostPresentedIndex]}`);
    console.log(`mostPresented: ${korLabels[mostPresentedIndex]}`);
    return {
      name: person.person,
      emotion: {
        key: korLabels[mostPresentedIndex],
        value: values[mostPresentedIndex],
      },
    };
  });

  const drawChart = (data: InterestInfo[]) => {
    const chartData = {
      labels: Array.from(korLabels),
      datasets: data.map((person, i) => ({
        label: person.person,
        data: Object.values(person.interests),
        backgroundColor: bgColors[i],
        borderColor: colors[i],
        borderWidth: 3,
        hoverBorderWidth: 12,
        tension: 0.3,
      })),
    };

    if (canvasRef.current && !Chart.getChart('interset-chart')) {
      new Chart<'radar'>(canvasRef.current, {
        type: 'radar',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            r: {
              ticks: {
                font: {
                  size: 16, // 폰트 크기 설정
                },
                color: '#aaa',
                stepSize: 20,
              },
            },
          },
          plugins: {
            tooltip: {
              enabled: true,
              titleFont: {
                size: 14,
              },
              padding: 10,
              titleSpacing: 5,
              callbacks: {
                label: (tooltipItem) => {
                  const datasetLabel = tooltipItem.dataset.label || '';
                  const value = tooltipItem.raw; // 값 가져오기
                  return `${datasetLabel}:  ${value}`; // 원하는 형식으로 반환
                },
              },
            },
          },
          interaction: {
            mode: 'nearest',
            intersect: false, // 마우스가 데이터 포인트에 정확히 위치해야 툴팁이 표시됨
          },
        },
      });
    }
  };

  useEffect(() => {
    drawChart(interestedAbout);
  }, []);

  return (
    <section className="interest">
      <TitleBox title={`많이 표현한 감정들`} desc={'우린 서로에게 어떤 감정을 표현했을까?'} />
      <div className="content">
        <div className="cont-canvas" style={{ width: canvasSize.width, height: canvasSize.height }}>
          <canvas className="graph" id="interset-chart" ref={canvasRef}></canvas>
        </div>
        <div className="emotion">
          {mostPresentedEmotionByPerson[0].emotion.key ===
          mostPresentedEmotionByPerson[1].emotion.key ? (
            <p>
              <span className="name" style={{ color: colors[0] }}>
                {mostPresentedEmotionByPerson[0].name}
              </span>
              님과&nbsp;
              <span className="name" style={{ color: colors[1] }}>
                {mostPresentedEmotionByPerson[1].name}
              </span>
              님은&nbsp;
              {mostPresentedEmotionByPerson[0].emotion.key} 표현이 가장 많아요.
            </p>
          ) : (
            <>
              <p>
                <span className="name" style={{ color: colors[0] }}>
                  {mostPresentedEmotionByPerson[0].name}
                </span>
                님은&nbsp;
                {mostPresentedEmotionByPerson[0].emotion.key},&nbsp;
                <span className="name" style={{ color: colors[1] }}>
                  {mostPresentedEmotionByPerson[1].name}
                </span>
                님은&nbsp;
                {mostPresentedEmotionByPerson[1].emotion.key}을(를) 가장 많이 표현해요.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default PersonalInterestSection;
