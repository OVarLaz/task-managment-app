import React from 'react';

interface CheckIconProps {
  size?: number;
  color?: string;
}
const CheckIcon: React.FC<CheckIconProps> = ({ size = 14, color = 'white' }) => (
  <svg
    width={size}
    height={size * (12 / 16)}
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5.917L5.724 10.5L15 1.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CheckIcon;
