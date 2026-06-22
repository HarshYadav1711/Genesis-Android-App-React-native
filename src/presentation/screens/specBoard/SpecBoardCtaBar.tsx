import React from 'react';
import {Platform, Pressable, Text, View} from 'react-native';

import type {AppLanguage} from '../../../core/types/locale';
import {withLocalizedTypography} from '../../i18n';

import {ChatIcon, TestDriveIcon} from './SpecBoardIcons';
import {specBoardStyles as styles} from './specBoardStyles';

type SpecBoardCtaBarProps = {
  language: AppLanguage;
  isArabic: boolean;
  onAskGenesisAI?: () => void;
  onTestDrive?: () => void;
};

export function SpecBoardCtaBar({
  language,
  isArabic,
  onAskGenesisAI,
  onTestDrive,
}: SpecBoardCtaBarProps) {
  return (
    <View style={[styles.ctaBar, isArabic && styles.ctaBarRtl]}>
      <Pressable
        accessibilityRole="button"
        onPress={onAskGenesisAI}
        android_ripple={
          Platform.OS === 'android'
            ? {color: 'rgba(0, 0, 0, 0.12)', foreground: true}
            : undefined
        }
        style={({pressed}) => [
          styles.primaryCta,
          isArabic && styles.primaryCtaRtl,
          pressed && styles.primaryCtaPressed,
        ]}>
        <ChatIcon />
        <Text
          style={withLocalizedTypography(styles.primaryCtaLabel, language, {
            textAlign: 'center',
          })}>
          {isArabic
            ? 'اسأل Genesis AI عن هذه السيارة'
            : 'Ask Genesis AI About This Vehicle'}
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={onTestDrive}
        android_ripple={
          Platform.OS === 'android'
            ? {color: 'rgba(196, 149, 106, 0.16)', foreground: true}
            : undefined
        }
        style={({pressed}) => [
          styles.secondaryCta,
          isArabic && styles.secondaryCtaRtl,
          pressed && styles.secondaryCtaPressed,
        ]}>
        <TestDriveIcon />
        <Text
          style={withLocalizedTypography(styles.secondaryCtaLabel, language)}>
          {isArabic ? 'تجربة قيادة' : 'Test Drive'}
        </Text>
      </Pressable>
    </View>
  );
}
