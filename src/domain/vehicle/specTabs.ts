import type {AppLanguage} from '../../core/types/locale';

import type {SpecTabId} from './types';

export type SpecTabDefinition = {
  id: SpecTabId;
  label: Record<AppLanguage, string>;
};

export const SPEC_TABS: readonly SpecTabDefinition[] = [
  {id: 'performance', label: {en: 'Performance', ar: 'الأداء'}},
  {id: 'dimensions', label: {en: 'Dimensions', ar: 'الأبعاد'}},
  {id: 'interior', label: {en: 'Interior', ar: 'المقصورة'}},
  {id: 'safety', label: {en: 'Safety', ar: 'السلامة'}},
  {id: 'wheels', label: {en: 'Wheels', ar: 'العجلات'}},
  {id: 'pricing', label: {en: 'Pricing', ar: 'الأسعار'}},
] as const;
