import React, {useCallback, useEffect, useState} from 'react';
import {BackHandler, useWindowDimensions, View} from 'react-native';

import {useLanguage} from '../../../core/context';
import type {SpecTabId, Vehicle} from '../../../domain/vehicle';
import {SafeAreaWrapper} from '../../ui/SafeAreaWrapper';

import {SpecBoardCtaBar} from './SpecBoardCtaBar';
import {SpecBoardHeroPanel} from './SpecBoardHeroPanel';
import {SpecBoardSpecContent} from './SpecBoardSpecContent';
import {SpecBoardTabs} from './SpecBoardTabs';
import {specBoardMetrics, specBoardStyles as styles} from './specBoardStyles';

export type SpecBoardScreenProps = {
  vehicle: Vehicle;
  onAskGenesisAI?: (vehicle: Vehicle) => void;
  onTestDrive?: (vehicle: Vehicle) => void;
  onBack?: () => void;
};

export function SpecBoardScreen({
  vehicle,
  onAskGenesisAI,
  onTestDrive,
  onBack,
}: SpecBoardScreenProps) {
  const {language, isArabic} = useLanguage();
  const {width} = useWindowDimensions();
  const [activeTab, setActiveTab] = useState<SpecTabId>('performance');
  const isWideLayout = width >= specBoardMetrics.wideLayoutMinWidth;

  const handleBack = useCallback(() => {
    onBack?.();
    return true;
  }, [onBack]);

  useEffect(() => {
    if (!onBack) {
      return undefined;
    }

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack,
    );

    return () => subscription.remove();
  }, [handleBack, onBack]);

  return (
    <SafeAreaWrapper style={styles.root}>
      <View style={[styles.root, isWideLayout ? styles.layoutRow : styles.layoutColumn]}>
        <SpecBoardHeroPanel
          vehicle={vehicle}
          language={language}
          isArabic={isArabic}
          isWideLayout={isWideLayout}
        />

        <View style={styles.specsPanel}>
          <SpecBoardTabs
            activeTab={activeTab}
            language={language}
            isArabic={isArabic}
            onTabChange={setActiveTab}
          />

          <SpecBoardSpecContent
            vehicle={vehicle}
            activeTab={activeTab}
            language={language}
            isArabic={isArabic}
          />

          <SpecBoardCtaBar
            language={language}
            isArabic={isArabic}
            onAskGenesisAI={() => onAskGenesisAI?.(vehicle)}
            onTestDrive={() => onTestDrive?.(vehicle)}
          />
        </View>
      </View>
    </SafeAreaWrapper>
  );
}
