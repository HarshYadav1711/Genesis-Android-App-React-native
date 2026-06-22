import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {useLanguage} from '../../../core/context';
import {withLocalizedTypography} from '../../i18n';
import {colors, spacing, typography} from '../../theme';

export type BackButtonProps = {
  onPress: () => void;
};

function BackChevron() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M10 3L5 8L10 13"
        stroke={colors.brand.silver}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BackButton({onPress}: BackButtonProps) {
  const {language, isArabic} = useLanguage();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isArabic ? 'رجوع' : 'Back'}
      onPress={onPress}
      hitSlop={8}
      style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}>
      <View style={[styles.row, isArabic && styles.rowRtl]}>
        <BackChevron />
        <Text style={withLocalizedTypography(styles.label, language)}>
          {isArabic ? 'رجوع' : 'Back'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.xxs,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  rowRtl: {
    flexDirection: 'row-reverse',
  },
  label: {
    ...typography.caption,
    color: colors.brand.silver,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
