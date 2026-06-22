import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

const LOGO_WIDTH = 280;
const LOGO_HEIGHT = 56;

export function GenesisLogo() {
  return (
    <View style={styles.root} accessibilityRole="header">
      <Svg width={LOGO_WIDTH} height={LOGO_HEIGHT} viewBox={`0 0 ${LOGO_WIDTH} ${LOGO_HEIGHT}`}>
        <Defs>
          <LinearGradient id="genesisLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#C4956A" />
            <Stop offset="50%" stopColor="#D4AF37" />
            <Stop offset="100%" stopColor="#C4956A" />
          </LinearGradient>
        </Defs>
        <SvgText
          fill="url(#genesisLogoGradient)"
          fontSize={48}
          fontWeight="600"
          letterSpacing={12}
          x={LOGO_WIDTH / 2}
          y={42}
          textAnchor="middle">
          GENESIS
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
