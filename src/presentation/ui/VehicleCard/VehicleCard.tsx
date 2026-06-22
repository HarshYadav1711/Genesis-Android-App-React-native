import React, {useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';

import {useLanguage} from '../../../core/context';
import type {AppLanguage} from '../../../core/types/locale';
import type {Vehicle} from '../../../domain/vehicle';
import {withLocalizedTypography} from '../../i18n';
import {colors} from '../../theme';

import {ElectricBoltIcon, ViewArrowIcon} from './VehicleCardIcons';
import {
  resolveBadgeTone,
  vehicleCardMetrics,
  vehicleCardStyles as styles,
} from './vehicleCardStyles';

export type VehicleCardProps = {
  vehicle: Vehicle;
  onPress: (vehicle: Vehicle) => void;
  language?: AppLanguage;
  width?: number | `${number}%`;
  index?: number;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

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

type VehicleCardBadgeProps = {
  badge: string;
  isElectric: boolean;
  isArabic: boolean;
};

function VehicleCardBadge({badge, isElectric, isArabic}: VehicleCardBadgeProps) {
  const tone = resolveBadgeTone(badge);
  const showBolt = isElectric && badge === 'Electric';

  return (
    <View
      style={[
        styles.badge,
        isArabic ? styles.badgeLeft : styles.badgeRight,
        isArabic && styles.badgeRtl,
        {backgroundColor: tone.backgroundColor},
      ]}>
      {showBolt ? <ElectricBoltIcon color={tone.color} size={10} /> : null}
      <Text style={[styles.badgeLabel, {color: tone.color}]}>{badge}</Text>
    </View>
  );
}

type VehicleCardImageProps = {
  vehicle: Vehicle;
  isArabic: boolean;
};

function VehicleCardImage({vehicle, isArabic}: VehicleCardImageProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <View style={styles.imageWrap}>
      {!imageFailed ? (
        <Image
          source={{uri: vehicle.image}}
          style={styles.image}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
          onError={() => setImageFailed(true)}
        />
      ) : (
        <View style={styles.imageFallback} />
      )}

      {vehicle.badge ? (
        <VehicleCardBadge
          badge={vehicle.badge}
          isElectric={vehicle.isElectric}
          isArabic={isArabic}
        />
      ) : null}

      <ImageGradientOverlay />
    </View>
  );
}

type VehicleCardContentProps = {
  vehicle: Vehicle;
  language: AppLanguage;
  isArabic: boolean;
};

function VehicleCardContent({vehicle, language, isArabic}: VehicleCardContentProps) {
  const highlights = vehicle.highlights.slice(0, 2);

  return (
    <View style={styles.content}>
      <View style={[styles.titleRow, isArabic && styles.titleRowRtl]}>
        <View style={[styles.titleBlock, isArabic && styles.titleBlockRtl]}>
          <Text
            style={withLocalizedTypography(styles.name, language, {
              textAlign: isArabic ? 'right' : 'left',
            })}>
            {vehicle.name}
          </Text>
          <Text
            style={withLocalizedTypography(styles.category, language, {
              textAlign: isArabic ? 'right' : 'left',
            })}>
            {vehicle.type}
          </Text>
        </View>

        <View style={[styles.priceBlock, isArabic && styles.priceBlockRtl]}>
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
          {highlights.map(highlight => (
            <Text
              key={highlight}
              numberOfLines={1}
              style={withLocalizedTypography(styles.highlight, language)}>
              {highlight}
            </Text>
          ))}
        </View>

        <View style={[styles.cta, isArabic && styles.ctaRtl]}>
          <Text style={withLocalizedTypography(styles.ctaLabel, language)}>
            {isArabic ? 'عرض' : 'View'}
          </Text>
          <ViewArrowIcon />
        </View>
      </View>
    </View>
  );
}

export function VehicleCard({
  vehicle,
  onPress,
  language: languageProp,
  width = '100%',
  index = 0,
  animated = true,
  style,
  accessibilityLabel,
}: VehicleCardProps) {
  const {language: contextLanguage} = useLanguage();
  const language = languageProp ?? contextLanguage;
  const isArabic = language === 'ar';

  const cardBody = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? vehicle.name}
      android_ripple={
        Platform.OS === 'android'
          ? {color: 'rgba(196, 149, 106, 0.16)', foreground: true}
          : undefined
      }
      onPress={() => onPress(vehicle)}
      style={({pressed}) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}>
      <VehicleCardImage vehicle={vehicle} isArabic={isArabic} />
      <VehicleCardContent vehicle={vehicle} language={language} isArabic={isArabic} />
    </Pressable>
  );

  const wrapStyle = [styles.cardWrap, {width}, style];

  if (!animated) {
    return <View style={wrapStyle}>{cardBody}</View>;
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(500).delay(
        index * vehicleCardMetrics.animationStaggerMs,
      )}
      style={wrapStyle}>
      {cardBody}
    </Animated.View>
  );
}
