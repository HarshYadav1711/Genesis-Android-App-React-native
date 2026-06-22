import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import type {GenesisCanvasVariant} from '../../../core/types/theme';
import {colorSchemes, layout, spacing} from '../../theme';
import {SafeAreaWrapper} from '../SafeAreaWrapper';

export type ScreenContainerProps = {
  children?: React.ReactNode;
  canvas?: GenesisCanvasVariant;
  scrollable?: boolean;
  centered?: boolean;
  padded?: boolean;
  safeArea?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollViewProps?: Omit<ScrollViewProps, 'style' | 'contentContainerStyle'>;
};

export function ScreenContainer({
  children,
  canvas = 'dark',
  scrollable = false,
  centered = false,
  padded = true,
  safeArea = true,
  style,
  contentContainerStyle,
  scrollViewProps,
}: ScreenContainerProps) {
  const scheme = colorSchemes[canvas];

  const contentStyles: StyleProp<ViewStyle> = [
    styles.content,
    padded && styles.padded,
    centered && styles.centered,
    contentContainerStyle,
  ];

  const body = scrollable ? (
    <ScrollView
      {...scrollViewProps}
      style={styles.scroll}
      contentContainerStyle={contentStyles}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  ) : (
    <View style={contentStyles}>{children}</View>
  );

  if (safeArea) {
    return (
      <SafeAreaWrapper canvas={canvas} style={style}>
        {body}
      </SafeAreaWrapper>
    );
  }

  return (
    <View style={[styles.root, {backgroundColor: scheme.background}, style]}>
      {body}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: layout.contentMaxWidth,
    alignSelf: 'center',
    gap: layout.stackGap,
  },
  padded: {
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingVertical: layout.screenPaddingVertical,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const screenContainerStyles = StyleSheet.create({
  section: {
    gap: spacing.section,
  },
  hero: {
    paddingVertical: spacing.hero,
    gap: spacing.lg,
  },
});
