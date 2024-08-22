'use client';

import Button from '@/components/Button/Button';
import './_CategoryList.scss';
import React, { useState } from 'react';

function CategoryList() {
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const categories = ['전체', '내 분석', '공유됨'];

  const handleClick = (index: number) => {
    setFocusedIndex(index);
  };

  return (
    <ul className="list-categories">
      {categories.map((name, index) => (
        <li key={name}>
          <Button
            theme="black"
            styleType={index === focusedIndex ? 'default' : 'tonal'}
            rounded
            onClick={() => {
              handleClick(index);
            }}
          >
            {name}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
