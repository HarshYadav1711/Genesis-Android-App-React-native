import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {FadeIn, FadeInDown, useReducedMotion} from 'react-native-reanimated';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';

import type {AppLanguage} from '../../../core/types/locale';
import type {Vehicle} from '../../../domain/vehicle';
import {withLocalizedTypography} from '../../i18n';
import {VehicleImage} from '../../ui/VehicleImage';
import {colors} from '../../theme';

import {ElectricLabelIcon} from './SpecBoardIcons';
import {specBoardStyles as styles} from './specBoardStyles';

type SpecBoardHeroPanelProps = {
  vehicle: Vehicle;
  language: AppLanguage;
  isArabic: boolean;
  isWideLayout: boolean;
};

function HeroGradients() {
  return (
    <>
      <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
        <Defs>
          <LinearGradient id="heroFadeRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={colors.brand.black} stopOpacity={0} />
            <Stop offset="100%" stopColor={colors.brand.black} stopOpacity={0.6} />
          </LinearGradient>
          <LinearGradient id="heroFadeBottom" x1="0%" y1="100%" x2="0%" y2="0%">
            <Stop offset="0%" stopColor={colors.brand.black} stopOpacity={0.7} />
            <Stop offset="45%" stopColor={colors.brand.black} stopOpacity={0} />
            <Stop offset="100%" stopColor={colors.brand.black} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#heroFadeRight)" />
        <Rect width="100%" height="100%" fill="url(#heroFadeBottom)" />
      </Svg>
    </>
  );
}

export function SpecBoardHeroPanel({
  vehicle,
  language,
  isArabic,
  isWideLayout,
}: SpecBoardHeroPanelProps) {
  const highlights = vehicle.highlights.slice(0, 3);
  const reducedMotion = useReducedMotion();

  return (
    <View
      style={[
        styles.heroPanel,
        isWideLayout ? styles.heroPanelWide : styles.heroPanelNarrow,
      ]}>
      <VehicleImage
        uri={vehicle.image}
        style={styles.heroImage}
        fallbackStyle={styles.heroImageFallback}
        accessibilityLabel={vehicle.name}
      />

      <HeroGradients />

      <View
        style={[
          styles.highlightsWrap,
          isArabic && styles.highlightsWrapRtl,
        ]}>
        {highlights.map((highlight, index) => (
          <Animated.View
            key={highlight}
            entering={
              reducedMotion
                ? undefined
                : FadeIn.duration(400).delay(index * 100 + 300)
            }
            style={styles.highlightPill}>
            <Text
              style={withLocalizedTypography(styles.highlightText, language)}>
              {highlight}
            </Text>
          </Animated.View>
        ))}
      </View>

      <Animated.View
        entering={reducedMotion ? undefined : FadeInDown.duration(600)}
        style={styles.heroInfo}>
        {vehicle.isElectric ? (
          <View style={[styles.electricRow, isArabic && styles.electricRowRtl]}>
            <ElectricLabelIcon />
            <Text
              style={withLocalizedTypography(styles.electricLabel, language, {
                textAlign: isArabic ? 'right' : 'left',
              })}>
              {isArabic ? 'كهربائي بالكامل' : 'Fully Electric'}
            </Text>
          </View>
        ) : null}

        <Text
          style={withLocalizedTypography(styles.vehicleName, language, {
            textAlign: isArabic ? 'right' : 'left',
          })}>
          {vehicle.name}
        </Text>
        <Text
          style={withLocalizedTypography(styles.vehicleType, language, {
            textAlign: isArabic ? 'right' : 'left',
          })}>
          {vehicle.type}
        </Text>
        <Text
          style={withLocalizedTypography(styles.vehicleTagline, language, {
            textAlign: isArabic ? 'right' : 'left',
          })}>
          "{vehicle.tagline}"
        </Text>

        <View style={[styles.priceRow, isArabic && styles.priceRowRtl]}>
          <Text
            style={withLocalizedTypography(styles.priceEyebrow, language)}>
            {isArabic ? 'السعر يبدأ من' : 'Starting from'}
          </Text>
          <Text
            style={withLocalizedTypography(styles.priceValue, language)}>
            {vehicle.startingPrice}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}
