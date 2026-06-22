import React from 'react';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

import type {SpecTabId} from '../../../domain/vehicle';
import {colors} from '../../theme';

type IconProps = {
  color?: string;
  size?: number;
};

export function PerformanceTabIcon({
  color = colors.brand.copper,
  size = 14,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path
        d="M6.75 1.5L3 7h3.25L5.25 10.5 9 5H5.75L6.75 1.5Z"
        fill={color}
      />
    </Svg>
  );
}

export function DimensionsTabIcon({
  color = colors.brand.copper,
  size = 14,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path
        d="M2 10V4.5L6.5 2 11 4.5V10H2Z"
        stroke={color}
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      <Path d="M6.5 2V10" stroke={color} strokeWidth={1.1} />
    </Svg>
  );
}

export function InteriorTabIcon({
  color = colors.brand.copper,
  size = 14,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Rect
        x={2}
        y={4}
        width={8}
        height={5}
        rx={1}
        stroke={color}
        strokeWidth={1.1}
      />
      <Path
        d="M3.5 4V3a2.5 2.5 0 015 0v1"
        stroke={color}
        strokeWidth={1.1}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SafetyTabIcon({
  color = colors.brand.copper,
  size = 14,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path
        d="M6 1.5L10 3.25V6.25C10 8.7 8.35 10.8 6 11.5C3.65 10.8 2 8.7 2 6.25V3.25L6 1.5Z"
        stroke={color}
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function WheelsTabIcon({
  color = colors.brand.copper,
  size = 14,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Circle cx={6} cy={6} r={4.25} stroke={color} strokeWidth={1.1} />
      <Circle cx={6} cy={6} r={1.25} fill={color} />
      <Path
        d="M6 1.75V3.5M6 8.5V10.25M1.75 6H3.5M8.5 6H10.25"
        stroke={color}
        strokeWidth={1.1}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function PricingTabIcon({
  color = colors.brand.copper,
  size = 14,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path
        d="M6 1.5L7.6 4.7H10.8L8.4 6.8L9.2 10L6 8.1L2.8 10L3.6 6.8L1.2 4.7H4.4L6 1.5Z"
        stroke={color}
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ChatIcon({
  color = colors.brand.black,
  size = 18,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 1C7.03 1 3 5.03 3 10C3 11.74 3.5 13.36 4.37 14.73L3 19L7.27 17.63C8.64 18.5 10.26 19 12 19C16.97 19 21 14.97 21 10C21 5.03 16.97 1 12 1Z" />
    </Svg>
  );
}

export function TestDriveIcon({
  color = colors.brand.copper,
  size = 16,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ElectricLabelIcon({
  color = '#4ADE80',
  size = 12,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path
        d="M6.75 1.5L3 7h3.25L5.25 10.5 9 5H5.75L6.75 1.5Z"
        fill={color}
      />
    </Svg>
  );
}

const TAB_ICONS: Record<
  SpecTabId,
  React.ComponentType<IconProps>
> = {
  performance: PerformanceTabIcon,
  dimensions: DimensionsTabIcon,
  interior: InteriorTabIcon,
  safety: SafetyTabIcon,
  wheels: WheelsTabIcon,
  pricing: PricingTabIcon,
};

export function SpecTabIcon({
  tabId,
  color,
  size = 14,
}: IconProps & {tabId: SpecTabId}) {
  const Icon = TAB_ICONS[tabId];
  return <Icon color={color} size={size} />;
}
