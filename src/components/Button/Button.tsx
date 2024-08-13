import React from 'react';
import './_Button.scss';

interface ButtonPropType {
  label: string;
  iconSrc?: string;
  icon?: JSX.Element;
  theme?: 'primary' | 'secondary' | 'black';
  size?: 'sm' | 'md' | 'full';
  type?: 'default' | 'tonal' | 'outlined' | 'text';
  rounded?: boolean;
  disabled?: boolean;
  onClick?: () => void; // 클릭 핸들러 추가
}

function Button({
  label,
  iconSrc,
  theme = 'primary',
  size = 'md',
  type = 'default',
  rounded = false,
  disabled = false,
  onClick,
  ...rest
}: ButtonPropType) {
  const classList = [
    `size-${size}`,
    `type-${type}`,
    `theme-${theme}`,
    rounded ? 'rounded' : '',
    disabled ? 'disabled' : '',
  ];

  return (
    <button className={`button ${classList.join(' ')}`} onClick={onClick} disabled={disabled}>
      {iconSrc && <img src={iconSrc} alt="icon" className="icon" />}
      <span className="label">{label}</span>
    </button>
  );
}

export default Button;
