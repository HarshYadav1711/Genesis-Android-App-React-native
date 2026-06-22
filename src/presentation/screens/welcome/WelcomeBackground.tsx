import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import Svg, {
  Circle,
  Defs,
  Line,
  LinearGradient,
  Pattern,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import {colors} from '../../theme';

const GRID_SIZE = 80;
const CORNER_SIZE = 128;

export function WelcomeBackground() {
  const {width, height} = useWindowDimensions();

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="ambientCanvas" cx="50%" cy="45%" rx="70%" ry="60%">
            <Stop offset="0%" stopColor="#1A1208" />
            <Stop offset="45%" stopColor={colors.brand.black} />
            <Stop offset="100%" stopColor={colors.canvas} />
          </RadialGradient>

          <RadialGradient id="ambientGlow" cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0%" stopColor="rgba(196, 149, 106, 0.08)" />
            <Stop offset="70%" stopColor="rgba(196, 149, 106, 0)" />
          </RadialGradient>

          <Pattern
            id="gridPattern"
            width={GRID_SIZE}
            height={GRID_SIZE}
            patternUnits="userSpaceOnUse">
            <Line
              x1={0}
              y1={0}
              x2={0}
              y2={GRID_SIZE}
              stroke="rgba(196, 149, 106, 0.3)"
              strokeWidth={1}
            />
            <Line
              x1={0}
              y1={0}
              x2={GRID_SIZE}
              y2={0}
              stroke="rgba(196, 149, 106, 0.3)"
              strokeWidth={1}
            />
          </Pattern>

          <LinearGradient id="cornerFade" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colors.brand.copper} stopOpacity={0.2} />
            <Stop offset="100%" stopColor={colors.brand.copper} stopOpacity={0} />
          </LinearGradient>
        </Defs>

        <Rect width={width} height={height} fill="url(#ambientCanvas)" />
        <Rect width={width} height={height} fill="url(#gridPattern)" opacity={0.05} />

        <Circle
          cx={width / 2}
          cy={height / 2}
          r={Math.min(width, height) * 0.42}
          fill="url(#ambientGlow)"
          opacity={0.8}
        />
      </Svg>

      <View style={[styles.corner, styles.cornerTopLeft]} />
      <View style={[styles.corner, styles.cornerBottomRight]} />
    </View>
  );
}

const styles = StyleSheet.create({
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: colors.brand.copper,
    opacity: 0.2,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
});
