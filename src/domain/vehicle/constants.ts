import type {AppLanguage} from '../../core/types/locale';

import type {VehicleFilterId} from './types';

export type VehicleFilter = {
  id: VehicleFilterId;
  label: Record<AppLanguage, string>;
};

export const VEHICLE_FILTERS: VehicleFilter[] = [
  {id: 'all', label: {en: 'All Models', ar: 'جميع الموديلات'}},
  {id: 'sedan', label: {en: 'Sedans', ar: 'سيدان'}},
  {id: 'suv', label: {en: 'SUVs', ar: 'دفع رباعي'}},
  {id: 'electric', label: {en: 'Electric', ar: 'كهربائي'}},
];

export const VEHICLE_LINEUP_STATS = {
  models: 9,
  electric: 3,
  warranty: '5yr',
} as const;
