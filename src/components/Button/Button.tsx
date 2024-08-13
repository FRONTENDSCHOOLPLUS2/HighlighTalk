import Image from 'next/image';
import './_Button.scss';

type SizeType = 'sm' | 'md' | 'full';
type ThemeType = 'primary' | 'secondary' | 'black';
type ButtonType = 'default' | 'tonal' | 'outlined' | 'text';

interface ButtonPropType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  iconSrc?: string;
  theme?: ThemeType;
  size?: SizeType;
  styleType?: ButtonType;
  rounded?: boolean;
  disabled?: boolean;
  onClick?: () => void; // 클릭 핸들러 추가
}

function Button({
  children,
  iconSrc,
  theme = 'primary',
  size = 'md',
  styleType = 'default',
  rounded = false,
  disabled = false,
  ...rest
}: ButtonPropType) {
  const classList = [
    `size-${size}`,
    `type-${styleType}`,
    `theme-${theme}`,
    rounded ? 'rounded' : '',
    disabled ? 'disabled' : '',
  ];

  const iconSize: {
    [key in SizeType]: {
      width: number;
      height: number;
    };
  } = {
    sm: {
      width: 20,
      height: 20,
    },
    md: {
      width: 24,
      height: 24,
    },
    full: {
      width: 24,
      height: 24,
    },
  };

  return (
    <button className={`button ${classList.join(' ')}`} {...rest}>
      {iconSrc && (
        <Image
          width={iconSize[size].width}
          height={iconSize[size].height}
          src={iconSrc}
          alt=""
          className="icon-img"
        />
      )}
      <span className="label">{children}</span>
    </button>
  );
}

export default Button;
