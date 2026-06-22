import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import {overlayColors} from './overlayStyles';

function ThinkingDot({delayMillis}: {delayMillis: number}) {
  const offsetY = useSharedValue(0);

  useEffect(() => {
    offsetY.value = withRepeat(
      withSequence(
        withTiming(0, {duration: 0}),
        withTiming(-5, {duration: 300}),
        withTiming(0, {duration: 300}),
      ),
      -1,
      false,
    );
  }, [delayMillis, offsetY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: offsetY.value}],
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

export function ThinkingBubble() {
  return (
    <View style={styles.row}>
      <View style={styles.bubble}>
        <ThinkingDot delayMillis={0} />
        <ThinkingDot delayMillis={150} />
        <ThinkingDot delayMillis={300} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    backgroundColor: overlayColors.panelDark,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: overlayColors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: overlayColors.copper,
  },
});
