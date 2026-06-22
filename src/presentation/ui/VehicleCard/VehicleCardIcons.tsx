import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {colors} from '../../theme';

type IconProps = {
  color?: string;
  size?: number;
};

export function ViewArrowIcon({
  color = colors.brand.copper,
  size = 10,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <Path
        d="M2 5H8M8 5L5 2M8 5L5 8"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ElectricBoltIcon({
  color = '#86EFAC',
  size = 10,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path
        d="M6.75 1.5L3 7h3.25L5.25 10.5 9 5H5.75L6.75 1.5Z"
        fill={color}
        stroke={color}
        strokeWidth={0.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
