import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useLanguage} from '../../../core/context';
import type {AppLanguage} from '../../../core/types/locale';
import {spacing} from '../../theme';
import {languageToggleStyles} from './languageToggleStyles';

export type LanguageToggleProps = {
  language?: AppLanguage;
  onChange?: (language: AppLanguage) => void;
};

type LanguageOptionProps = {
  flag: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
};

function LanguageOption({
  flag,
  label,
  isActive,
  onPress,
}: LanguageOptionProps) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{selected: isActive}}
      onPress={onPress}
      style={({pressed}) => [
        languageToggleStyles.option,
        isActive && languageToggleStyles.optionActive,
        pressed && languageToggleStyles.optionPressed,
      ]}>
      <Text style={languageToggleStyles.flag}>{flag}</Text>
      <Text
        style={[
          languageToggleStyles.label,
          isActive && languageToggleStyles.labelActive,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function LanguageToggle({
  language: languageProp,
  onChange,
}: LanguageToggleProps = {}) {
  const context = useLanguage();
  const language = languageProp ?? context.language;
  const setLanguage = onChange ?? context.setLanguage;

  return (
    <View style={languageToggleStyles.capsule} accessibilityRole="tablist">
      <LanguageOption
        flag="🇬🇧"
        label="EN"
        isActive={language === 'en'}
        onPress={() => setLanguage('en')}
      />
      <LanguageOption
        flag="🇦🇪"
        label="AR"
        isActive={language === 'ar'}
        onPress={() => setLanguage('ar')}
      />
    </View>
  );
}

export type LanguageToggleOverlayProps = {
  topOffset?: number;
  rightOffset?: number;
};

/**
 * Website placement: fixed top-right capsule, independent of RTL mirroring.
 */
export function LanguageToggleOverlay({
  topOffset = spacing.lg,
  rightOffset = spacing.lg,
}: LanguageToggleOverlayProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      style={[
        overlayStyles.host,
        {
          top: insets.top + topOffset,
          right: insets.right + rightOffset,
        },
      ]}>
      <LanguageToggle />
    </View>
  );
}

const overlayStyles = StyleSheet.create({
  host: {
    position: 'absolute',
    zIndex: 50,
  },
});
