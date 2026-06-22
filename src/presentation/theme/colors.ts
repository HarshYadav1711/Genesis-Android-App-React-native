import type {GenesisColorPalette} from '../../core/types/theme';

/**
 * Genesis digital palette — derived from genesis.com marketing surfaces.
 * Athletic Elegance: near-monochrome canvases with sparing magma accent.
 */
export const colors: GenesisColorPalette = {
  canvas: '#000000',

  surface: {
    primary: '#111111',
    secondary: '#1A1A1A',
    elevated: '#262626',
    tertiary: '#333333',
    light: '#FFFFFF',
  },

  ink: {
    primary: '#FFFFFF',
    muted: '#CCCCCC',
    secondary: '#BBBBBB',
    inverse: '#000000',
    inverseMuted: '#4D4D4D',
  },

  hairline: {
    strong: '#000000',
    default: '#4D4D4D',
    subtle: '#333333',
    onLight: '#CCCCCC',
  },

  accent: {
    magma: '#FF6B00',
    magmaMuted: 'rgba(255, 107, 0, 0.16)',
  },

  brand: {
    uyuniWhite: '#F5F5F0',
    matterhornWhite: '#E8E8E3',
    craneWhite: '#F0F0EB',
    vikBlack: '#0A0A0A',
    maunaRed: '#8B2332',
    tasmanBlue: '#1E3A5F',
    barossaBurgundy: '#4A1C28',
    dancheongOrange: '#E85D2C',
  },

  semantic: {
    success: '#2E7D5A',
    warning: '#C9A227',
    error: '#B83232',
    info: '#3D6B8E',
  },

  overlay: {
    scrim: 'rgba(0, 0, 0, 0.72)',
    scrimLight: 'rgba(0, 0, 0, 0.40)',
  },
} as const;

export type ColorScheme = 'dark' | 'light';

export const colorSchemes = {
  dark: {
    background: colors.canvas,
    surface: colors.surface.primary,
    surfaceAlt: colors.surface.secondary,
    text: colors.ink.primary,
    textMuted: colors.ink.muted,
    textSecondary: colors.ink.secondary,
    border: colors.hairline.subtle,
    borderStrong: colors.hairline.default,
  },
  light: {
    background: colors.surface.light,
    surface: colors.surface.light,
    surfaceAlt: colors.brand.uyuniWhite,
    text: colors.ink.inverse,
    textMuted: colors.ink.inverseMuted,
    textSecondary: colors.hairline.default,
    border: colors.hairline.onLight,
    borderStrong: colors.hairline.default,
  },
} as const;
