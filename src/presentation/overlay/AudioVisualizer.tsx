import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Circle, Defs, RadialGradient, Stop} from 'react-native-svg';

import type {AppLanguage} from '../../core/types/locale';
import type {VoiceState} from '../../domain/chat';
import {withLocalizedTypography} from '../i18n/localizedTypography';
import {MicIcon, SyncIcon, VolumeIcon} from './OverlayIcons';
import {overlayColors} from './overlayStyles';

type AudioVisualizerProps = {
  state: VoiceState;
  language: AppLanguage;
};

function stateLabel(state: VoiceState, isArabic: boolean): string {
  switch (state) {
    case 'IDLE':
      return isArabic ? 'اضغط للتحدث' : 'Tap to speak';
    case 'LISTENING':
      return isArabic ? 'يستمع...' : 'Listening...';
    case 'THINKING':
      return isArabic ? 'جاري المعالجة...' : 'Processing...';
    case 'SPEAKING':
      return isArabic ? 'Genesis AI يتحدث' : 'Genesis AI speaking';
    default:
      return '';
  }
}

function WaveformBars({light}: {light: boolean}) {
  const barCount = light ? 24 : 20;

  return (
    <View style={styles.waveformRow}>
      {Array.from({length: barCount}).map((_, index) => (
        <WaveformBar key={index} index={index} light={light} />
      ))}
    </View>
  );
}

function WaveformBar({index, light}: {index: number; light: boolean}) {
  const height = useSharedValue(8);

  useEffect(() => {
    height.value = withRepeat(
      withSequence(
        withTiming(8, {duration: 0}),
        withTiming(28 + (index % 5) * 4, {
          duration: 400 + (index % 4) * 100,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(8, {
          duration: 400 + (index % 4) * 100,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,
      false,
    );
  }, [height, index]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <Animated.View
      style={[
        styles.waveformBar,
        light ? styles.waveformBarLight : styles.waveformBarDark,
        animatedStyle,
      ]}
    />
  );
}

function ThinkingDots() {
  return (
    <View style={styles.thinkingDotsRow}>
      {[0, 1, 2].map(index => (
        <ThinkingDot key={index} index={index} />
      ))}
    </View>
  );
}

function ThinkingDot({index}: {index: number}) {
  const offsetY = useSharedValue(0);
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    const delay = index * 200;
    const timer = setTimeout(() => {
      offsetY.value = withRepeat(
        withSequence(
          withTiming(0, {duration: 0}),
          withTiming(-8, {duration: 400, easing: Easing.inOut(Easing.ease)}),
          withTiming(0, {duration: 400, easing: Easing.inOut(Easing.ease)}),
        ),
        -1,
        false,
      );
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.4, {duration: 0}),
          withTiming(1, {duration: 400}),
          withTiming(0.4, {duration: 400}),
        ),
        -1,
        false,
      );
    }, delay);
    return () => clearTimeout(timer);
  }, [index, offsetY, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: offsetY.value}],
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.thinkingDot, animatedStyle]} />;
}

function VoiceOrb({state}: {state: VoiceState}) {
  const scale = useSharedValue(1);

  useEffect(() => {
    const target =
      state === 'THINKING'
        ? 1.06
        : state === 'SPEAKING'
          ? 1.08
          : state === 'LISTENING'
            ? 1.05
            : 1.04;
    const duration =
      state === 'THINKING'
        ? 1200
        : state === 'SPEAKING'
          ? 800
          : state === 'LISTENING'
            ? 1000
            : 3000;

    scale.value = withRepeat(
      withSequence(
        withTiming(1, {duration: 0}),
        withTiming(target, {duration: duration / 2, easing: Easing.inOut(Easing.ease)}),
        withTiming(1, {duration: duration / 2, easing: Easing.inOut(Easing.ease)}),
      ),
      -1,
      false,
    );
  }, [scale, state]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const isListening = state === 'LISTENING';
  const innerColor = isListening ? 'rgba(255,255,255,0.95)' : 'rgba(196,149,106,0.9)';
  const outerColor = isListening ? 'rgba(200,200,220,0.7)' : 'rgba(140,90,50,0.7)';

  return (
    <Animated.View style={[styles.orbContainer, animatedStyle]}>
      <Svg width={100} height={100}>
        <Defs>
          <RadialGradient id="orbGradient" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={innerColor} />
            <Stop offset="100%" stopColor={outerColor} />
          </RadialGradient>
        </Defs>
        <Circle cx={50} cy={50} r={50} fill="url(#orbGradient)" />
      </Svg>
      <View style={styles.orbIcon}>
        {state === 'THINKING' ? (
          <SyncIcon color="rgba(13,13,13,0.7)" />
        ) : state === 'SPEAKING' ? (
          <VolumeIcon color="rgba(13,13,13,0.7)" />
        ) : (
          <MicIcon
            size={28}
            color={
              state === 'LISTENING'
                ? 'rgba(13,13,13,0.8)'
                : 'rgba(13,13,13,0.6)'
            }
          />
        )}
      </View>
    </Animated.View>
  );
}

export function AudioVisualizer({state, language}: AudioVisualizerProps) {
  const isArabic = language === 'ar';

  return (
    <View style={styles.container}>
      <View style={styles.orbSection}>
        <VoiceOrb state={state} />
      </View>

      {state === 'LISTENING' ? (
        <WaveformBars light />
      ) : state === 'SPEAKING' ? (
        <WaveformBars light={false} />
      ) : state === 'THINKING' ? (
        <ThinkingDots />
      ) : (
        <View style={styles.spacer} />
      )}

      <Text style={withLocalizedTypography(styles.stateLabel, language)}>
        {stateLabel(state, isArabic).toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 24,
  },
  orbSection: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    height: 40,
  },
  waveformBar: {
    width: 3,
    borderRadius: 2,
  },
  waveformBarLight: {
    backgroundColor: '#FFFFFF',
  },
  waveformBarDark: {
    backgroundColor: overlayColors.copper,
  },
  thinkingDotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 40,
  },
  thinkingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: overlayColors.copper,
  },
  spacer: {
    height: 40,
  },
  stateLabel: {
    fontSize: 12,
    letterSpacing: 2,
    color: overlayColors.muted,
  },
});
