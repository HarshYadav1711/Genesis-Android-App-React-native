import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import type {AppLanguage} from '../../core/types/locale';
import {withLocalizedTypography} from '../i18n/localizedTypography';
import {InfoIcon} from './OverlayIcons';
import {overlayColors} from './overlayStyles';

type VehicleContextBarProps = {
  vehicleName: string;
  language: AppLanguage;
};

export function VehicleContextBar({vehicleName, language}: VehicleContextBarProps) {
  const isArabic = language === 'ar';

  return (
    <View style={styles.bar}>
      <InfoIcon />
      <Text style={withLocalizedTypography(styles.prefix, language)}>
        {isArabic ? 'تتصفح ' : 'Currently viewing: '}
      </Text>
      <Text style={withLocalizedTypography(styles.vehicleName, language)}>
        {vehicleName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(13, 13, 13, 0.4)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: overlayColors.border,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  prefix: {
    fontSize: 12,
    color: overlayColors.muted,
  },
  vehicleName: {
    fontSize: 12,
    fontWeight: '500',
    color: overlayColors.copper,
  },
});
