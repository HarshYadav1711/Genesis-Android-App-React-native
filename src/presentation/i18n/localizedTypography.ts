import type {TextStyle} from 'react-native';

import type {AppLanguage} from '../../core/types/locale';
import {isRtlLanguage} from '../../core/types/locale';
import {fontFamilies} from '../theme/typography';

export function getBodyFontFamily(language: AppLanguage): string {
  return isRtlLanguage(language) ? fontFamilies.arabic : fontFamilies.body;
}

export function getHeadingFontFamily(language: AppLanguage): string {
  return isRtlLanguage(language) ? fontFamilies.arabic : fontFamilies.heading;
}

export function withLocalizedTypography(
  style: TextStyle,
  language: AppLanguage,
  options?: {textAlign?: TextStyle['textAlign']},
): TextStyle {
  const isArabic = isRtlLanguage(language);

  return {
    ...style,
    fontFamily: isArabic
      ? fontFamilies.arabic
      : (style.fontFamily ?? fontFamilies.body),
    writingDirection: isArabic ? 'rtl' : 'ltr',
    textAlign: options?.textAlign ?? style.textAlign,
    textTransform: isArabic ? undefined : style.textTransform,
    letterSpacing: isArabic ? 0 : style.letterSpacing,
  };
}

export function localizedTextStyle(
  language: AppLanguage,
  options?: {
    textAlign?: TextStyle['textAlign'];
    variant?: 'body' | 'heading';
  },
): TextStyle {
  const isArabic = isRtlLanguage(language);
  const variant = options?.variant ?? 'body';

  return {
    fontFamily:
      variant === 'heading'
        ? getHeadingFontFamily(language)
        : getBodyFontFamily(language),
    writingDirection: isArabic ? 'rtl' : 'ltr',
    textAlign: options?.textAlign,
  };
}
