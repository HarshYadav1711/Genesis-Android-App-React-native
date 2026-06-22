import type {TextStyle, ViewStyle} from 'react-native';

import type {
  GenesisButtonSize,
  GenesisButtonVariant,
  GenesisCanvasVariant,
} from '../../core/types/theme';

import {colors, colorSchemes} from './colors';
import {radius} from './radius';
import {spacing} from './spacing';
import {typography} from './typography';

type ButtonStyleSet = {
  container: ViewStyle;
  containerPressed: ViewStyle;
  containerDisabled: ViewStyle;
  label: TextStyle;
  labelDisabled: TextStyle;
};

const sizeStyles: Record<
  GenesisButtonSize,
  Pick<ViewStyle, 'minHeight' | 'paddingHorizontal' | 'paddingVertical'>
> = {
  sm: {
    minHeight: 40,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  md: {
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  lg: {
    minHeight: 56,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
};

const baseContainer: ViewStyle = {
  borderRadius: radius.none,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  gap: spacing.xs,
};

const baseLabel: TextStyle = {
  ...typography.button,
};

function variantStyles(
  variant: GenesisButtonVariant,
  canvas: GenesisCanvasVariant,
): Omit<ButtonStyleSet, 'containerPressed' | 'containerDisabled' | 'labelDisabled'> {
  const scheme = colorSchemes[canvas];

  switch (variant) {
    case 'primary':
      return {
        container: {
          backgroundColor: scheme.text,
          borderWidth: 1,
          borderColor: scheme.text,
        },
        label: {
          ...baseLabel,
          color: scheme.background,
        },
      };

    case 'secondary':
      return {
        container: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: scheme.text,
        },
        label: {
          ...baseLabel,
          color: scheme.text,
        },
      };

    case 'ghost':
      return {
        container: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: scheme.border,
        },
        label: {
          ...baseLabel,
          color: scheme.textMuted,
        },
      };

    case 'text':
      return {
        container: {
          backgroundColor: 'transparent',
          borderWidth: 0,
        },
        label: {
          ...typography.link,
          color: scheme.text,
          textDecorationLine: 'none',
        },
      };

    case 'accent':
      return {
        container: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.accent.magma,
        },
        label: {
          ...baseLabel,
          color: colors.accent.magma,
        },
      };

    default:
      return variantStyles('secondary', canvas);
  }
}

export function createButtonStyles(
  variant: GenesisButtonVariant = 'secondary',
  size: GenesisButtonSize = 'md',
  canvas: GenesisCanvasVariant = 'dark',
): ButtonStyleSet {
  const variantSet = variantStyles(variant, canvas);

  return {
    container: {
      ...baseContainer,
      ...sizeStyles[size],
      ...variantSet.container,
    },
    containerPressed: {
      opacity: 0.88,
    },
    containerDisabled: {
      opacity: 0.4,
    },
    label: variantSet.label,
    labelDisabled: {
      opacity: 0.6,
    },
  };
}

export const buttonStyles = {
  dark: {
    primary: createButtonStyles('primary', 'md', 'dark'),
    secondary: createButtonStyles('secondary', 'md', 'dark'),
    ghost: createButtonStyles('ghost', 'md', 'dark'),
    text: createButtonStyles('text', 'md', 'dark'),
    accent: createButtonStyles('accent', 'md', 'dark'),
  },
  light: {
    primary: createButtonStyles('primary', 'md', 'light'),
    secondary: createButtonStyles('secondary', 'md', 'light'),
    ghost: createButtonStyles('ghost', 'md', 'light'),
    text: createButtonStyles('text', 'md', 'light'),
    accent: createButtonStyles('accent', 'md', 'light'),
  },
} as const;
