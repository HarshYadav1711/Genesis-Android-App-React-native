import React, {memo, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  type ImageStyle,
  type StyleProp,
} from 'react-native';

export type VehicleImageProps = {
  uri: string;
  style?: StyleProp<ImageStyle>;
  fallbackStyle?: StyleProp<ImageStyle>;
  accessibilityLabel?: string;
};

function VehicleImageComponent({
  uri,
  style,
  fallbackStyle,
  accessibilityLabel,
}: VehicleImageProps) {
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) {
    return <View style={[styles.fallback, fallbackStyle, style]} />;
  }

  return (
    <Image
      source={{uri}}
      style={style}
      resizeMode="cover"
      accessibilityLabel={accessibilityLabel}
      accessibilityIgnoresInvertColors
      fadeDuration={250}
      progressiveRenderingEnabled
      onError={() => setImageFailed(true)}
    />
  );
}

export const VehicleImage = memo(VehicleImageComponent);

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: '#1A1A1A',
  },
});
