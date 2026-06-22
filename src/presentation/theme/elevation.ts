import {Platform, type ViewStyle} from 'react-native';

import type {
  GenesisElevationLevel,
  GenesisElevationStyle,
} from '../../core/types/theme';

import {colors} from './colors';

const createShadow = (
  offsetY: number,
  blur: number,
  opacity: number,
  elevation: number,
): ViewStyle =>
  Platform.select({
    ios: {
      shadowColor: colors.canvas,
      shadowOffset: {width: 0, height: offsetY},
      shadowOpacity: opacity,
      shadowRadius: blur,
    },
    android: {elevation},
    default: {},
  }) ?? {};

/**
 * Restrained elevation — luxury surfaces rely on canvas contrast, not heavy shadows.
 */
export const elevation: Record<GenesisElevationLevel, GenesisElevationStyle> = {
  none: {},
  subtle: createShadow(1, 3, 0.08, 1),
  raised: createShadow(4, 12, 0.12, 4),
  floating: createShadow(8, 24, 0.16, 8),
} as const;

export const hairlineBorder = {
  width: 1,
  color: colors.hairline.subtle,
} as const;

export const hairlineBorderOnLight = {
  width: 1,
  color: colors.hairline.onLight,
} as const;
