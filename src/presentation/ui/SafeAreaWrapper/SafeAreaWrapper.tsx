import React from 'react';
import {StyleSheet, View, type StyleProp, type ViewStyle} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
  type Edge,
} from 'react-native-safe-area-context';

import type {GenesisCanvasVariant} from '../../../core/types/theme';
import {colorSchemes} from '../../theme';

export type SafeAreaWrapperProps = {
  children?: React.ReactNode;
  edges?: Edge[];
  canvas?: GenesisCanvasVariant;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export function SafeAreaWrapper({
  children,
  edges = ['top', 'right', 'bottom', 'left'],
  canvas = 'dark',
  style,
  contentStyle,
}: SafeAreaWrapperProps) {
  const scheme = colorSchemes[canvas];

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.root, {backgroundColor: scheme.background}, style]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}

export type SafeAreaInsets = ReturnType<typeof useSafeAreaInsets>;

export function useGenesisSafeAreaInsets(): SafeAreaInsets {
  return useSafeAreaInsets();
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
