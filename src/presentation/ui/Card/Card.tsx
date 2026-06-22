import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import type {GenesisCanvasVariant, GenesisCardVariant} from '../../../core/types/theme';
import {createCardStyles} from '../../theme';

export type CardProps = {
  children?: React.ReactNode;
  variant?: GenesisCardVariant;
  canvas?: GenesisCanvasVariant;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  headerStyle?: StyleProp<ViewStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

function CardContent({
  children,
  styles,
  contentStyle,
  header,
  footer,
  headerStyle,
  footerStyle,
}: {
  children?: React.ReactNode;
  styles: ReturnType<typeof createCardStyles>;
  contentStyle?: StyleProp<ViewStyle>;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  headerStyle?: StyleProp<ViewStyle>;
  footerStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <>
      {header ? <View style={[styles.header, headerStyle]}>{header}</View> : null}
      {children ? (
        <View style={[styles.content, contentStyle]}>{children}</View>
      ) : null}
      {footer ? <View style={[styles.footer, footerStyle]}>{footer}</View> : null}
    </>
  );
}

export function Card({
  children,
  variant = 'filled',
  canvas = 'dark',
  onPress,
  style,
  contentStyle,
  header,
  footer,
  headerStyle,
  footerStyle,
  accessibilityLabel,
}: CardProps) {
  const styles = createCardStyles(variant, canvas);

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        style={({pressed}) => [
          styles.container,
          pressed && cardInteraction.pressed,
          style,
        ]}>
        <CardContent
          styles={styles}
          contentStyle={contentStyle}
          header={header}
          footer={footer}
          headerStyle={headerStyle}
          footerStyle={footerStyle}>
          {children}
        </CardContent>
      </Pressable>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <CardContent
        styles={styles}
        contentStyle={contentStyle}
        header={header}
        footer={footer}
        headerStyle={headerStyle}
        footerStyle={footerStyle}>
        {children}
      </CardContent>
    </View>
  );
}

const cardInteraction = StyleSheet.create({
  pressed: {
    opacity: 0.92,
  },
});
