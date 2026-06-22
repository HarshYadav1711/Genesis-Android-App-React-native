import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

import {useLanguage} from '../../../core/context';
import {withLocalizedTypography} from '../../i18n';
import {GenesisLogo} from '../../ui/GenesisLogo';
import {colors, fontFamilies, spacing, typography} from '../../theme';
import {WelcomeBackground} from './WelcomeBackground';

export type WelcomeScreenProps = {
  onExplore?: () => void;
  onChat?: () => void;
};

function MicIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill={colors.brand.copper}>
      <Circle cx={12} cy={12} r={3} />
      <Path d="M12 1C7.03 1 3 5.03 3 10v1a1 1 0 002 0v-1c0-3.86 3.14-7 7-7s7 3.14 7 7v1a1 1 0 002 0v-1c0-4.97-4.03-9-9-9z" />
    </Svg>
  );
}

function CopperGradientText({children}: {children: string}) {
  return (
    <View style={styles.gradientTextWrap}>
      <Svg height={44} width={320}>
        <Defs>
          <LinearGradient id="copperHeadline" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colors.brand.copper} />
            <Stop offset="100%" stopColor={colors.brand.gold} />
          </LinearGradient>
        </Defs>
        <SvgText
          fill="url(#copperHeadline)"
          fontSize={36}
          fontStyle="italic"
          fontWeight="600"
          x="50%"
          y={34}
          textAnchor="middle">
          {children}
        </SvgText>
      </Svg>
    </View>
  );
}

const copy = {
  en: {
    headlineLine1: 'Your Personal',
    headlineLine2: 'Genesis Experience',
    headlineSingle: '',
    subtitle: 'Crafted for the exceptional',
    explore: 'Explore Our Vehicles',
    chat: 'Talk to Genesis AI',
    availability: 'Available in Dubai • Abu Dhabi • Sharjah',
  },
  ar: {
    headlineLine1: 'تجربة Genesis الشخصية',
    headlineLine2: '',
    headlineSingle: 'تجربة Genesis الشخصية',
    subtitle: 'صُنع للاستثنائي',
    explore: 'استعرض سياراتنا',
    chat: 'تحدث مع Genesis AI',
    availability: 'متاح في دبي • أبوظبي • الشارقة',
  },
} as const;

function FooterDot({delayMs}: {delayMs: number}) {
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, {duration: 0}),
        withTiming(1, {duration: 1000}),
        withTiming(0.3, {duration: 1000}),
      ),
      -1,
      false,
    );
  }, [delayMs, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.footerDot, animatedStyle]} />;
}

export function WelcomeScreen({onExplore, onChat}: WelcomeScreenProps) {
  const {language, isArabic} = useLanguage();
  const text = copy[language];
  const reducedMotion = useReducedMotion();

  return (
    <View style={styles.root}>
      <WelcomeBackground />

      <View style={styles.content}>
        <Animated.View
          entering={reducedMotion ? undefined : FadeInDown.duration(800).delay(0)}
          style={styles.logoBlock}>
          <GenesisLogo />
        </Animated.View>

        <Animated.View
          entering={FadeIn.duration(800).delay(300)}
          style={styles.dividerWrap}>
          <Svg width={96} height={1}>
            <Defs>
              <LinearGradient id="welcomeDivider" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor="transparent" />
                <Stop offset="50%" stopColor={colors.brand.copper} />
                <Stop offset="100%" stopColor="transparent" />
              </LinearGradient>
            </Defs>
            <Rect width={96} height={1} fill="url(#welcomeDivider)" />
          </Svg>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(800).delay(400)}
          style={styles.headlineBlock}>
          {isArabic ? (
            <Text
              style={withLocalizedTypography(styles.headline, language, {
                textAlign: 'center',
              })}>
              {text.headlineSingle}
            </Text>
          ) : (
            <>
              <Text style={styles.headline}>{text.headlineLine1}</Text>
              <CopperGradientText>{text.headlineLine2}</CopperGradientText>
            </>
          )}
        </Animated.View>

        <Animated.Text
          entering={FadeIn.duration(800).delay(600)}
          style={withLocalizedTypography(styles.subtitle, language, {
            textAlign: 'center',
          })}>
          {text.subtitle}
        </Animated.Text>

        <Animated.View
          entering={FadeInDown.duration(800).delay(800)}
          style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={onExplore}
            style={({pressed}) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}>
            <Text
              style={withLocalizedTypography(styles.primaryButtonLabel, language, {
                textAlign: 'center',
              })}>
              {text.explore}
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={onChat}
            style={({pressed}) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}>
            <MicIcon />
            <Text
              style={withLocalizedTypography(styles.secondaryButtonLabel, language, {
                textAlign: 'center',
              })}>
              {text.chat}
            </Text>
          </Pressable>
        </Animated.View>

        <Animated.View
          entering={FadeIn.duration(1000).delay(1200)}
          style={styles.footer}>
          <Text
            style={withLocalizedTypography(styles.availability, language, {
              textAlign: 'center',
            })}>
            {text.availability}
          </Text>
          <View style={styles.footerDots}>
            {reducedMotion ? (
              <>
                <View style={styles.footerDot} />
                <View style={styles.footerDot} />
                <View style={styles.footerDot} />
              </>
            ) : (
              <>
                <FooterDot delayMs={0} />
                <FooterDot delayMs={400} />
                <FooterDot delayMs={800} />
              </>
            )}
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.brand.black,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    zIndex: 10,
  },
  logoBlock: {
    marginBottom: spacing.sm,
  },
  dividerWrap: {
    marginBottom: spacing.xl,
  },
  headlineBlock: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headline: {
    ...typography.headline2,
    fontFamily: fontFamilies.heading,
    fontWeight: '300',
    color: colors.ink.primary,
    textAlign: 'center',
    lineHeight: 42,
  },
  gradientTextWrap: {
    marginTop: -4,
    alignItems: 'center',
  },
  subtitle: {
    ...typography.overline,
    color: colors.ink.muted,
    marginBottom: spacing.section,
    fontWeight: '300',
  },
  actions: {
    width: '100%',
    maxWidth: 320,
    gap: spacing.md,
    alignItems: 'center',
  },
  primaryButton: {
    minWidth: 220,
    width: '100%',
    backgroundColor: colors.brand.copper,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  primaryButtonLabel: {
    ...typography.button,
    color: colors.brand.black,
    fontWeight: '600',
    letterSpacing: 3,
  },
  secondaryButton: {
    minWidth: 220,
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.brand.copper,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    borderRadius: 2,
  },
  secondaryButtonLabel: {
    ...typography.button,
    color: colors.brand.copper,
    letterSpacing: 2,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  footer: {
    marginTop: 80,
    alignItems: 'center',
    gap: spacing.xs,
  },
  availability: {
    ...typography.caption,
    color: colors.ink.muted,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  footerDots: {
    flexDirection: 'row',
    gap: 4,
    marginTop: spacing.xs,
  },
  footerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.brand.copper,
    opacity: 0.7,
  },
});
