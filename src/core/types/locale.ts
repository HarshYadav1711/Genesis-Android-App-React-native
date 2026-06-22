export type AppLanguage = 'en' | 'ar';

export type TextDirection = 'ltr' | 'rtl';

export function getTextDirection(language: AppLanguage): TextDirection {
  return language === 'ar' ? 'rtl' : 'ltr';
}

export function isRtlLanguage(language: AppLanguage): boolean {
  return language === 'ar';
}
