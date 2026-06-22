export type SpecTabId =
  | 'performance'
  | 'dimensions'
  | 'interior'
  | 'safety'
  | 'wheels'
  | 'pricing';

export type VehicleSpecs = Record<SpecTabId, Record<string, string | number>>;

export type Vehicle = {
  id: string;
  name: string;
  type: string;
  tagline: string;
  image: string;
  startingPrice: string;
  badge?: string;
  isElectric: boolean;
  specs: VehicleSpecs;
  highlights: string[];
  competitors?: string[];
  bestFor?: string;
};

export type VehicleFilterId = 'all' | 'sedan' | 'suv' | 'electric';
