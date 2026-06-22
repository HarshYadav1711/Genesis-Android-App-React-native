import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

import type {AppLanguage} from '../../../core/types/locale';
import type {SpecTabId, Vehicle} from '../../../domain/vehicle';
import {withLocalizedTypography} from '../../i18n';

import {specBoardStyles as styles} from './specBoardStyles';

type SpecBoardSpecContentProps = {
  vehicle: Vehicle;
  activeTab: SpecTabId;
  language: AppLanguage;
  isArabic: boolean;
};

type SpecRowProps = {
  label: string;
  value: string;
  isLast: boolean;
  language: AppLanguage;
  isArabic: boolean;
};

function SpecRow({label, value, isLast, language, isArabic}: SpecRowProps) {
  return (
    <View
      style={[
        styles.specRow,
        isArabic && styles.specRowRtl,
        isLast && styles.specRowLast,
      ]}>
      <Text
        style={withLocalizedTypography(styles.specLabel, language, {
          textAlign: isArabic ? 'right' : 'left',
        })}>
        {label}
      </Text>
      <Text
        style={withLocalizedTypography(
          {
            ...styles.specValue,
            ...(isArabic ? styles.specValueRtl : {}),
          },
          language,
        )}>
        {value}
      </Text>
    </View>
  );
}

export function SpecBoardSpecContent({
  vehicle,
  activeTab,
  language,
  isArabic,
}: SpecBoardSpecContentProps) {
  const currentSpecs = vehicle.specs[activeTab] ?? {};
  const entries = Object.entries(currentSpecs);

  return (
    <ScrollView
      style={styles.specScroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.specContent}>
      <Animated.View
        key={activeTab}
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(200)}>
        {entries.length > 0 ? (
          entries.map(([label, value], index) => (
            <SpecRow
              key={label}
              label={label}
              value={String(value)}
              isLast={index === entries.length - 1}
              language={language}
              isArabic={isArabic}
            />
          ))
        ) : (
          <View style={styles.specEmpty}>
            <Text
              style={withLocalizedTypography(styles.specEmptyText, language, {
                textAlign: 'center',
              })}>
              Specifications coming soon.
            </Text>
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
}
