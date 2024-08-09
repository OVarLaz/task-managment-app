import React from 'react';

interface AddIconProps {
  size?: number;
  color?: string;
}
const AddIcon: React.FC<AddIconProps> = ({ size = 14, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z" fill={color} />
  </svg>
);

export default AddIcon;
