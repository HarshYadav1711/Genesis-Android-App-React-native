import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

import type {AppLanguage} from '../../../core/types/locale';
import {SPEC_TABS, type SpecTabId} from '../../../domain/vehicle';
import {withLocalizedTypography} from '../../i18n';

import {SpecTabIcon} from './SpecBoardIcons';
import {specBoardStyles as styles} from './specBoardStyles';

type SpecBoardTabsProps = {
  activeTab: SpecTabId;
  language: AppLanguage;
  isArabic: boolean;
  onTabChange: (tabId: SpecTabId) => void;
};

export function SpecBoardTabs({
  activeTab,
  language,
  isArabic,
  onTabChange,
}: SpecBoardTabsProps) {
  return (
    <View style={styles.tabBar}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBarContent}>
        {SPEC_TABS.map(tab => {
          const isActive = activeTab === tab.id;
          const iconColor = isActive
            ? styles.tabLabelActive.color
            : styles.tabLabelInactive.color;

          return (
            <Pressable
              key={tab.id}
              accessibilityRole="tab"
              accessibilityState={{selected: isActive}}
              onPress={() => onTabChange(tab.id)}
              style={[
                styles.tabButton,
                isArabic && styles.tabButtonRtl,
                isActive ? styles.tabButtonActive : styles.tabButtonInactive,
              ]}>
              <SpecTabIcon tabId={tab.id} color={iconColor} size={14} />
              <Text
                style={withLocalizedTypography(
                  isActive ? styles.tabLabelActive : styles.tabLabelInactive,
                  language,
                )}>
                {tab.label[language]}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
