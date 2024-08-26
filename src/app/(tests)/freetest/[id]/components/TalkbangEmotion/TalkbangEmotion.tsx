'use client';

import { Bar } from 'react-chartjs-2';
import './_TalkbangEmotion.scss';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

// 필요한 요소들을 Chart.js에 등록
// TODO: 예외처리 해야 할 듯
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

type EmotionData = {
  [key: string]: number;
};

interface TalkbangEmotionProps {
  data: EmotionData;
}

const TalkbangEmotion: React.FC<TalkbangEmotionProps> = ({ data }) => {
  const chartData = {
    labels: Object.keys(data), // 감정 종류
    datasets: [
      {
        label: '감정 분석', // 데이터셋 이름
        data: Object.values(data), // 각 감정의 값
        backgroundColor: ['#FF6381', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="TalkbangContainer">
      <h1>우리 톡방 감정 분포도</h1>
      <div className="TalkbangEmotionCover">
        <div className="TalkbangEmotion">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TalkbangEmotion;
