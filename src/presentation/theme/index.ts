export {colors, colorSchemes, type ColorScheme} from './colors';
export {
  typography,
  fontFamilies,
  fontSize,
  lineHeight,
  letterSpacing,
} from './typography';
export {spacing, layout} from './spacing';
export {radius} from './radius';
export {elevation, hairlineBorder, hairlineBorderOnLight} from './elevation';
export {buttonStyles, createButtonStyles} from './buttonStyles';
export {cardStyles, createCardStyles} from './cardStyles';

import {colors} from './colors';
import {typography, fontFamilies} from './typography';
import {spacing, layout} from './spacing';
import {radius} from './radius';
import {elevation} from './elevation';
import {buttonStyles} from './buttonStyles';
import {cardStyles} from './cardStyles';

export const theme = {
  colors,
  typography,
  fontFamilies,
  spacing,
  layout,
  radius,
  elevation,
  buttonStyles,
  cardStyles,
} as const;

export type GenesisTheme = typeof theme;
