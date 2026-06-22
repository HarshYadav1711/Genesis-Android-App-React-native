import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {overlayColors} from './overlayStyles';

type IconProps = {
  size?: number;
  color?: string;
};

export function MicIcon({size = 24, color = overlayColors.copper}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 14a3 3 0 003-3V6a3 3 0 10-6 0v5a3 3 0 003 3z"
        fill={color}
      />
      <Path
        d="M19 11a1 1 0 10-2 0 5 5 0 01-10 0 1 1 0 10-2 0 7 7 0 006 6.92V20H9a1 1 0 100 2h6a1 1 0 100-2h-2v-2.08A7 7 0 0019 11z"
        fill={color}
      />
    </Svg>
  );
}

export function CloseIcon({size = 14, color = overlayColors.muted}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 6L6 18M6 6l12 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function PersonIcon({size = 14, color = overlayColors.muted}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 12a4 4 0 100-8 4 4 0 000 8zM6 20a6 6 0 0112 0"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SendIcon({size = 20, color = overlayColors.black}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function InfoIcon({size = 12, color = overlayColors.copper}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 16v-4M12 8h.01M22 12a10 10 0 11-20 0 10 10 0 0120 0z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function StopIcon({size = 24, color = overlayColors.black}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M8 8h8v8H8z" fill={color} />
    </Svg>
  );
}

export function VolumeIcon({size = 24, color = overlayColors.black}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11 5L6 9H3v6h3l5 4V5zM15.54 8.46a5 5 0 010 7.08M19.07 4.93a10 10 0 010 14.14"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CheckIcon({size = 20, color = overlayColors.copper}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17l-5-5"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SyncIcon({size = 24, color = overlayColors.black}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 12a8 8 0 0113.66-5.66M20 12a8 8 0 01-13.66 5.66M4 4v5h5M20 20v-5h-5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
