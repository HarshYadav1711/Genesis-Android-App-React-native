import {Platform, type TextStyle} from 'react-native';

import type {GenesisFontFamily, GenesisTypographyScale} from '../../core/types/theme';

/**
 * Genesis bespoke families: genesis-head-office-light (headings) and
 * genesis-text-office (body). Link custom font files to activate; until then
 * platform fallbacks preserve the light editorial weight hierarchy.
 */
export const fontFamilies: GenesisFontFamily = {
  heading: Platform.select({
    ios: 'GenesisHeadOffice-Light',
    android: 'GenesisHeadOffice-Light',
    default: 'System',
  }) as string,
  body: Platform.select({
    ios: 'GenesisTextOffice-Regular',
    android: 'GenesisTextOffice-Regular',
    default: 'System',
  }) as string,
  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    default: 'monospace',
  }) as string,
};

const headingBase: TextStyle = {
  fontFamily: fontFamilies.heading,
  fontWeight: '400',
  color: undefined,
};

const bodyBase: TextStyle = {
  fontFamily: fontFamilies.body,
  fontWeight: '400',
  color: undefined,
};

/**
 * Type scale aligned with genesis.com: weight-400 display headlines,
 * negative tracking at large sizes, generous line heights for editorial rhythm.
 */
export const typography: GenesisTypographyScale = {
  display: {
    ...headingBase,
    fontSize: 60,
    lineHeight: 64,
    letterSpacing: -1.5,
  },
  headline1: {
    ...headingBase,
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -1,
  },
  headline2: {
    ...headingBase,
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  headline3: {
    ...headingBase,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.25,
  },
  title: {
    ...headingBase,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
  },
  bodyLarge: {
    ...bodyBase,
    fontSize: 18,
    lineHeight: 28,
  },
  body: {
    ...bodyBase,
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    ...bodyBase,
    fontSize: 14,
    lineHeight: 22,
  },
  label: {
    ...bodyBase,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  caption: {
    ...bodyBase,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.25,
  },
  overline: {
    ...bodyBase,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  button: {
    ...bodyBase,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  link: {
    ...bodyBase,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
    textDecorationLine: 'underline',
  },
} as const;

export const fontSize = {
  display: 60,
  h1: 48,
  h2: 36,
  h3: 28,
  title: 20,
  bodyLg: 18,
  body: 16,
  bodySm: 14,
  label: 12,
  caption: 12,
  overline: 11,
} as const;

export const lineHeight = {
  display: 64,
  h1: 52,
  h2: 42,
  h3: 34,
  title: 28,
  bodyLg: 28,
  body: 24,
  bodySm: 22,
  label: 16,
  caption: 18,
  overline: 14,
} as const;

export const letterSpacing = {
  display: -1.5,
  h1: -1,
  h2: -0.5,
  h3: -0.25,
  title: 0,
  label: 2,
  overline: 3,
  button: 2.5,
} as const;
