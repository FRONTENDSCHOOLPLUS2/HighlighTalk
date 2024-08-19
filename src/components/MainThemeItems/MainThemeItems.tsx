import React from 'react';
import MainThemes from './MainThemes';

function MainThemeItems() {
  const data = [
    {
      title: '테스트 A',
      content: '밌삼요 이대문을열어라 열두시가되면 문이닫힌다 땡땡땡학교종이땡땡땨ㅐㅇ',
      coin: 100,
    },
    {
      title: '테스트 B',
      content: '밌삼요 이대문을열어라 열두시가되면 문이닫힌다 땡땡땡학교종이땡땡땨ㅐㅇ',
      coin: 110,
    },
    { title: '테스트 C', content: '테스트 C 설명입니다', coin: 120 },
  ];

  return (
    <div>
      <div>
        <h1>테마 별 상품</h1>
      </div>
      <div className="MainThemeItems">
        {data.map((item, index) => {
          return <MainThemes key={index} data={item} />;
        })}
      </div>
    </div>
  );
}

export default MainThemeItems;
