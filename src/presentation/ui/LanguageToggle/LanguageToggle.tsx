import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import type {AppLanguage} from '../../../core/types/locale';
import {colors} from '../../theme';

export type LanguageToggleProps = {
  language: AppLanguage;
  onChange: (language: AppLanguage) => void;
};

export function LanguageToggle({language, onChange}: LanguageToggleProps) {
  return (
    <View style={styles.root} accessibilityRole="tablist">
      <Pressable
        accessibilityRole="tab"
        accessibilityState={{selected: language === 'en'}}
        onPress={() => onChange('en')}
        style={[styles.option, language === 'en' && styles.optionActive]}>
        <Text style={styles.flag}>🇬🇧</Text>
        <Text style={[styles.label, language === 'en' && styles.labelActive]}>EN</Text>
      </Pressable>
      <Pressable
        accessibilityRole="tab"
        accessibilityState={{selected: language === 'ar'}}
        onPress={() => onChange('ar')}
        style={[styles.option, language === 'ar' && styles.optionActive]}>
        <Text style={styles.flag}>🇦🇪</Text>
        <Text style={[styles.label, language === 'ar' && styles.labelActive]}>AR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand.charcoal,
    borderWidth: 1,
    borderColor: colors.brand.border,
    borderRadius: 9999,
    padding: 2,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  optionActive: {
    backgroundColor: colors.brand.copper,
  },
  flag: {
    fontSize: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: colors.ink.muted,
  },
  labelActive: {
    color: colors.brand.black,
  },
});
