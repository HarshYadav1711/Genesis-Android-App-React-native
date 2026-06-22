import type {ViewStyle} from 'react-native';

import type {GenesisCanvasVariant, GenesisCardVariant} from '../../core/types/theme';

import {colors, colorSchemes} from './colors';
import {elevation, hairlineBorder, hairlineBorderOnLight} from './elevation';
import {radius} from './radius';
import {spacing} from './spacing';

type CardStyleSet = {
  container: ViewStyle;
  content: ViewStyle;
  header: ViewStyle;
  footer: ViewStyle;
};

function variantContainer(
  variant: GenesisCardVariant,
  canvas: GenesisCanvasVariant,
): ViewStyle {
  const scheme = colorSchemes[canvas];
  const border =
    canvas === 'light' ? hairlineBorderOnLight : hairlineBorder;

  switch (variant) {
    case 'elevated':
      return {
        backgroundColor: scheme.surfaceAlt,
        borderRadius: radius.none,
        borderWidth: 0,
        ...elevation.raised,
      };

    case 'outlined':
      return {
        backgroundColor: 'transparent',
        borderRadius: radius.none,
        borderWidth: border.width,
        borderColor: border.color,
      };

    case 'filled':
      return {
        backgroundColor: scheme.surfaceAlt,
        borderRadius: radius.none,
        borderWidth: 0,
      };

    case 'editorial':
      return {
        backgroundColor: scheme.surface,
        borderRadius: radius.none,
        borderTopWidth: border.width,
        borderTopColor: colors.accent.magma,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
      };

    default:
      return variantContainer('filled', canvas);
  }
}

export function createCardStyles(
  variant: GenesisCardVariant = 'filled',
  canvas: GenesisCanvasVariant = 'dark',
): CardStyleSet {
  return {
    container: variantContainer(variant, canvas),
    content: {
      padding: spacing.lg,
      gap: spacing.md,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.sm,
      gap: spacing.xs,
    },
    footer: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      paddingBottom: spacing.lg,
      gap: spacing.sm,
      borderTopWidth: 1,
      borderTopColor:
        canvas === 'light'
          ? colors.hairline.onLight
          : colors.hairline.subtle,
    },
  };
}

export const cardStyles = {
  dark: {
    elevated: createCardStyles('elevated', 'dark'),
    outlined: createCardStyles('outlined', 'dark'),
    filled: createCardStyles('filled', 'dark'),
    editorial: createCardStyles('editorial', 'dark'),
  },
  light: {
    elevated: createCardStyles('elevated', 'light'),
    outlined: createCardStyles('outlined', 'light'),
    filled: createCardStyles('filled', 'light'),
    editorial: createCardStyles('editorial', 'light'),
  },
} as const;
