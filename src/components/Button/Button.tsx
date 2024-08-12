import './_Button.scss';

interface ButtonPropType {
  label: string;
  icon?: JSX.Element;
  color?: 'primary' | 'secondary' | 'black';
  size?: 'sm' | 'md' | 'full';
  type?: 'default' | 'tonal' | 'outlined' | 'text';
  rounded?: boolean;
  disabled?: boolean;
}

function Button({
  label,
  icon,
  color = 'primary',
  size = 'md',
  type = 'default',
  rounded = false,
  disabled = false,
  ...rest // event handler 전달 가능
}: ButtonPropType) {
  const classList = [
    `size-${size}`,
    `type-${type}`,
    `color-${color}`,
    rounded ? 'rounded' : '',
    disabled ? 'disabled' : '',
  ];

  return (
    <button className={`button ${classList.join(' ')}`} {...rest}>
      {icon && <span className="icon">{icon}</span>}
      <span className="label">{label}</span>
    </button>
  );
}

export default Button;
