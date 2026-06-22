import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {ZoomIn} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useLanguage} from '../../../core/context';
import {withLocalizedTypography} from '../../i18n';
import {colors, elevation, spacing, typography} from '../../theme';

export type FloatingChatButtonProps = {
  onPress: () => void;
};

function ChatBubbleIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill={colors.brand.black}>
      <Path d="M12 1C7.03 1 3 5.03 3 10C3 11.74 3.5 13.36 4.37 14.73L3 19L7.27 17.63C8.64 18.5 10.26 19 12 19C16.97 19 21 14.97 21 10C21 5.03 16.97 1 12 1Z" />
    </Svg>
  );
}

export function FloatingChatButton({onPress}: FloatingChatButtonProps) {
  const {language, isArabic} = useLanguage();
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      entering={ZoomIn.duration(300).springify().damping(18)}
      style={[
        styles.host,
        {
          bottom: insets.bottom + spacing.xl,
          right: insets.right + spacing.xl,
        },
      ]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          isArabic ? 'تحدث مع Genesis AI' : 'Ask Genesis AI'
        }
        onPress={onPress}
        android_ripple={
          Platform.OS === 'android'
            ? {color: 'rgba(0, 0, 0, 0.12)', foreground: true}
            : undefined
        }
        style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}>
        <View style={[styles.content, isArabic && styles.contentRtl]}>
          <ChatBubbleIcon />
          <Text style={withLocalizedTypography(styles.label, language)}>
            {isArabic ? 'تحدث مع Genesis AI' : 'Ask Genesis AI'}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    zIndex: 40,
  },
  button: {
    backgroundColor: colors.brand.copper,
    borderRadius: 9999,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    ...elevation.floating,
  },
  buttonPressed: {
    opacity: 0.92,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  contentRtl: {
    flexDirection: 'row-reverse',
  },
  label: {
    ...typography.bodySmall,
    color: colors.brand.black,
    fontWeight: '500',
    letterSpacing: 1,
  },
});
