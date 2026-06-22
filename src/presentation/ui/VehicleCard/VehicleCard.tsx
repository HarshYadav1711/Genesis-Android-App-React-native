import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import Svg, {Defs, LinearGradient, Path, Rect, Stop} from 'react-native-svg';

import type {AppLanguage} from '../../../core/types/locale';
import type {Vehicle} from '../../../domain/vehicle';
import {withLocalizedTypography} from '../../i18n';
import {colors, fontFamilies, spacing, typography} from '../../theme';

export type VehicleCardProps = {
  vehicle: Vehicle;
  index: number;
  language: AppLanguage;
  width: number;
  onPress: (vehicle: Vehicle) => void;
};

type BadgeTone = {
  backgroundColor: string;
  color: string;
};

const BADGE_COLORS: Record<string, BadgeTone> = {
  Sport: {backgroundColor: '#7F1D1D', color: '#FCA5A5'},
  Executive: {backgroundColor: '#1E3A8A', color: '#93C5FD'},
  Flagship: {backgroundColor: '#713F12', color: '#FDE047'},
  Electric: {backgroundColor: '#14532D', color: '#86EFAC'},
  Popular: {backgroundColor: colors.brand.copper, color: colors.brand.black},
  Family: {backgroundColor: '#581C87', color: '#D8B4FE'},
  Coupe: {backgroundColor: '#7C2D12', color: '#FDBA74'},
};

const DEFAULT_BADGE: BadgeTone = {
  backgroundColor: colors.brand.copper,
  color: colors.brand.black,
};

function ViewArrowIcon() {
  return (
    <Svg width={10} height={10} viewBox="0 0 10 10" fill="none">
      <Path
        d="M2 5H8M8 5L5 2M8 5L5 8"
        stroke={colors.brand.copper}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function ImageGradientOverlay() {
  return (
    <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        <LinearGradient id="vehicleCardFade" x1="0%" y1="100%" x2="0%" y2="0%">
          <Stop offset="0%" stopColor={colors.brand.charcoal} stopOpacity={1} />
          <Stop offset="55%" stopColor={colors.brand.charcoal} stopOpacity={0} />
          <Stop offset="100%" stopColor={colors.brand.charcoal} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#vehicleCardFade)" />
    </Svg>
  );
}

export function VehicleCard({
  vehicle,
  index,
  language,
  width,
  onPress,
}: VehicleCardProps) {
  const isArabic = language === 'ar';
  const [imageFailed, setImageFailed] = useState(false);
  const badgeTone = vehicle.badge
    ? BADGE_COLORS[vehicle.badge] ?? DEFAULT_BADGE
    : DEFAULT_BADGE;

  return (
    <Animated.View
      entering={FadeInDown.duration(500).delay(index * 70)}
      style={[styles.cardWrap, {width}]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={vehicle.name}
        onPress={() => onPress(vehicle)}
        style={({pressed}) => [styles.card, pressed && styles.cardPressed]}>
        <View style={styles.imageWrap}>
          {!imageFailed ? (
            <Image
              source={{uri: vehicle.image}}
              style={styles.image}
              resizeMode="cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <View style={styles.imageFallback} />
          )}

          {vehicle.badge ? (
            <View
              style={[
                styles.badge,
                isArabic ? styles.badgeLeft : styles.badgeRight,
                {backgroundColor: badgeTone.backgroundColor},
              ]}>
              <Text
                style={[
                  styles.badgeLabel,
                  {color: badgeTone.color},
                ]}>
                {vehicle.isElectric && vehicle.badge === 'Electric' ? '⚡ ' : ''}
                {vehicle.badge}
              </Text>
            </View>
          ) : null}

          <ImageGradientOverlay />
        </View>

        <View style={styles.content}>
          <View style={[styles.titleRow, isArabic && styles.titleRowRtl]}>
            <View style={styles.titleBlock}>
              <Text
                style={withLocalizedTypography(styles.name, language, {
                  textAlign: isArabic ? 'right' : 'left',
                })}>
                {vehicle.name}
              </Text>
              <Text
                style={withLocalizedTypography(styles.type, language, {
                  textAlign: isArabic ? 'right' : 'left',
                })}>
                {vehicle.type}
              </Text>
            </View>

            <View style={styles.priceBlock}>
              <Text
                style={withLocalizedTypography(styles.fromLabel, language, {
                  textAlign: isArabic ? 'left' : 'right',
                })}>
                {isArabic ? 'من' : 'from'}
              </Text>
              <Text
                style={withLocalizedTypography(styles.price, language, {
                  textAlign: isArabic ? 'left' : 'right',
                })}>
                {vehicle.startingPrice}
              </Text>
            </View>
          </View>

          <Text
            numberOfLines={1}
            style={withLocalizedTypography(styles.tagline, language, {
              textAlign: isArabic ? 'right' : 'left',
            })}>
            "{vehicle.tagline}"
          </Text>

          <View style={styles.divider} />

          <View style={[styles.footerRow, isArabic && styles.footerRowRtl]}>
            <View style={[styles.highlights, isArabic && styles.highlightsRtl]}>
              {vehicle.highlights.slice(0, 2).map(highlight => (
                <Text
                  key={highlight}
                  numberOfLines={1}
                  style={withLocalizedTypography(styles.highlight, language)}>
                  {highlight}
                </Text>
              ))}
            </View>

            <View style={[styles.viewCta, isArabic && styles.viewCtaRtl]}>
              <Text
                style={withLocalizedTypography(styles.viewLabel, language)}>
                {isArabic ? 'عرض' : 'View'}
              </Text>
              <ViewArrowIcon />
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const IMAGE_HEIGHT = 176;

const styles = StyleSheet.create({
  cardWrap: {
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.brand.charcoal,
    borderWidth: 1,
    borderColor: colors.brand.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.94,
    borderColor: 'rgba(196, 149, 106, 0.5)',
  },
  imageWrap: {
    height: IMAGE_HEIGHT,
    backgroundColor: '#111111',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  imageFallback: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: spacing.xxs,
    zIndex: 2,
  },
  badgeRight: {
    right: spacing.sm,
  },
  badgeLeft: {
    left: spacing.sm,
  },
  badgeLabel: {
    ...typography.caption,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  content: {
    padding: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.xxs,
  },
  titleRowRtl: {
    flexDirection: 'row-reverse',
  },
  titleBlock: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  name: {
    ...typography.body,
    fontFamily: fontFamilies.heading,
    fontWeight: '600',
    color: colors.ink.primary,
  },
  type: {
    ...typography.caption,
    color: colors.brand.muted,
    marginTop: 2,
    letterSpacing: 1,
  },
  priceBlock: {
    alignItems: 'flex-end',
  },
  fromLabel: {
    ...typography.caption,
    color: colors.brand.copper,
    fontWeight: '500',
  },
  price: {
    ...typography.bodySmall,
    color: colors.ink.primary,
    fontWeight: '600',
  },
  tagline: {
    ...typography.caption,
    color: colors.brand.silver,
    fontStyle: 'italic',
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
    opacity: 0.7,
  },
  divider: {
    height: 1,
    backgroundColor: colors.brand.border,
    marginBottom: spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  footerRowRtl: {
    flexDirection: 'row-reverse',
  },
  highlights: {
    flexDirection: 'row',
    gap: 6,
    flex: 1,
  },
  highlightsRtl: {
    flexDirection: 'row-reverse',
  },
  highlight: {
    ...typography.caption,
    color: colors.brand.muted,
    backgroundColor: '#111111',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 9999,
    maxWidth: 80,
    overflow: 'hidden',
  },
  viewCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  viewCtaRtl: {
    flexDirection: 'row-reverse',
  },
  viewLabel: {
    ...typography.caption,
    color: colors.brand.copper,
    fontWeight: '500',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
