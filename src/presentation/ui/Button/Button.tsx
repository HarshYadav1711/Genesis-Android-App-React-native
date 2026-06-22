import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import type {
  GenesisButtonSize,
  GenesisButtonVariant,
  GenesisCanvasVariant,
} from '../../../core/types/theme';
import {createButtonStyles} from '../../theme';

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: GenesisButtonVariant;
  size?: GenesisButtonSize;
  canvas?: GenesisCanvasVariant;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
};

export function Button({
  label,
  onPress,
  variant = 'secondary',
  size = 'md',
  canvas = 'dark',
  disabled = false,
  leadingIcon,
  trailingIcon,
  style,
  labelStyle,
  accessibilityLabel,
}: ButtonProps) {
  const styles = createButtonStyles(variant, size, canvas);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{disabled}}
      disabled={disabled || !onPress}
      onPress={onPress}
      style={({pressed}) => [
        styles.container,
        pressed && !disabled && styles.containerPressed,
        disabled && styles.containerDisabled,
        style,
      ]}>
      {leadingIcon}
      <Text
        style={[
          styles.label,
          disabled && styles.labelDisabled,
          labelStyle,
        ]}>
        {label}
      </Text>
      {trailingIcon}
    </Pressable>
  );
}

export const buttonPrimitives = StyleSheet.create({
  iconSlot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
