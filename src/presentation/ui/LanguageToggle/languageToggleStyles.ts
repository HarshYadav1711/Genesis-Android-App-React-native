import {StyleSheet, type TextStyle, type ViewStyle} from 'react-native';

import {colors, radius, spacing} from '../../theme';

export const languageToggleMetrics = {
  capsulePadding: 2,
  optionPaddingHorizontal: 12,
  optionPaddingVertical: 6,
  optionGap: 6,
  flagSize: 12,
  labelSize: 12,
} as const;

export const languageToggleStyles = StyleSheet.create({
  capsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand.charcoal,
    borderWidth: 1,
    borderColor: colors.brand.border,
    borderRadius: radius.full,
    padding: languageToggleMetrics.capsulePadding,
  } satisfies ViewStyle,
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: languageToggleMetrics.optionGap,
    paddingHorizontal: languageToggleMetrics.optionPaddingHorizontal,
    paddingVertical: languageToggleMetrics.optionPaddingVertical,
    borderRadius: radius.full,
  } satisfies ViewStyle,
  optionActive: {
    backgroundColor: colors.brand.copper,
  } satisfies ViewStyle,
  optionPressed: {
    opacity: 0.96,
    transform: [{scale: 0.96}],
  } satisfies ViewStyle,
  flag: {
    fontSize: languageToggleMetrics.flagSize,
  } satisfies TextStyle,
  label: {
    fontSize: languageToggleMetrics.labelSize,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: colors.brand.muted,
  } satisfies TextStyle,
  labelActive: {
    color: colors.brand.black,
  } satisfies TextStyle,
});
