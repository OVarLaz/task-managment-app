import React from 'react';

interface ListIconProps {
  size?: number;
  color?: string;
}
const ListIcon: React.FC<ListIconProps> = ({ size = 18, color = '#94979A' }) => (
  <svg
    width={size}
    height={size * (16 / 18)}
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0H18V2H0V0ZM0 7H18V9H0V7ZM0 14H18V16H0V14Z" fill={color} />
  </svg>
);

export default ListIcon;
