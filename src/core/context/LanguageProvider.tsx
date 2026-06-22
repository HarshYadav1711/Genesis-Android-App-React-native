import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {StyleSheet, View, type ViewStyle} from 'react-native';

import type {AppLanguage, TextDirection} from '../types/locale';
import {getTextDirection, isRtlLanguage} from '../types/locale';

export type LanguageContextValue = {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  isArabic: boolean;
  isRtl: boolean;
  direction: TextDirection;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export type LanguageProviderProps = {
  children: React.ReactNode;
  initialLanguage?: AppLanguage;
  contentStyle?: ViewStyle;
};

export function LanguageProvider({
  children,
  initialLanguage = 'en',
  contentStyle,
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<AppLanguage>(initialLanguage);

  const setLanguage = useCallback((next: AppLanguage) => {
    setLanguageState(next);
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const isArabic = isRtlLanguage(language);
    return {
      language,
      setLanguage,
      isArabic,
      isRtl: isArabic,
      direction: getTextDirection(language),
    };
  }, [language, setLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      <View
        style={[
          styles.root,
          {direction: value.direction},
          contentStyle,
        ]}>
        {children}
      </View>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
