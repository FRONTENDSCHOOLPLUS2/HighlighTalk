// 'use client';

// import { Doughnut } from 'react-chartjs-2';
// import './_TalkbangEmotion.scss';
// import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Chart.register(ArcElement, Tooltip, Legend);

// type EmotionData = {
//   [key: string]: number;
// };

// interface TalkbangEmotionProps {
//   data: EmotionData;
// }

// const TalkbangEmotion: React.FC<TalkbangEmotionProps> = ({ data }) => {
//   // Doughnut 차트 데이터 구성
//   const chartData = {
//     labels: Object.keys(data), // 감정 종류
//     datasets: [
//       {
//         data: Object.values(data), // 각 감정의 값
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
//       },
//     ],
//   };

//   return (
//     <div className="TalkbangEmotionCover">
//       <div className="TalkbangEmotion">
//         <Doughnut data={chartData} />
//       </div>
//     </div>
//   );
// };

// export default TalkbangEmotion;

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
