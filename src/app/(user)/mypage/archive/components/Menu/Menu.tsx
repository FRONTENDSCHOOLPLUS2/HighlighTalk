'use client';

import { useState } from 'react';
import './_Menu.scss';

interface MenuPropType {
  _id: number;
  enterEditMode: () => void;
}

function Menu({ _id, enterEditMode }: MenuPropType) {
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);

  return (
    <div
      className={`menu-cont`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        className={`menu-btn`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsOptionsVisible((prev) => !prev);
        }}
      >
        메뉴
      </button>
      <div className={`menu-options ${isOptionsVisible ? 'visible' : ''}`}>
        <ul className="option-list">
          <li
            onClick={(e) => {
              e.stopPropagation();
              setIsOptionsVisible((prev) => !prev);
              enterEditMode();
            }}
          >
            이름 변경
          </li>
          <li
            onClick={(e) => {
              e.stopPropagation();
              setIsOptionsVisible((prev) => !prev);
            }}
          >
            삭제
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
