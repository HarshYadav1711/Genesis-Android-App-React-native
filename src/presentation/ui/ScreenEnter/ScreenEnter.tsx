import React from 'react';
import {StyleSheet, type ViewStyle} from 'react-native';
import Animated, {FadeIn, SlideInRight} from 'react-native-reanimated';
import {useReducedMotion} from 'react-native-reanimated';

export type ScreenEnterProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function ScreenEnter({children, style}: ScreenEnterProps) {
  const reducedMotion = useReducedMotion();

  return (
    <Animated.View
      entering={
        reducedMotion
          ? FadeIn.duration(200)
          : SlideInRight.duration(400).springify().damping(22).stiffness(200)
      }
      style={[styles.screen, style]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
