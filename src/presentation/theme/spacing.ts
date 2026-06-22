import type {GenesisSpacingScale} from '../../core/types/theme';

/**
 * 4px base grid with editorial section rhythm matching genesis.com layouts.
 */
export const spacing: GenesisSpacingScale = {
  hairline: 1,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
  section: 64,
  hero: 96,
} as const;

export const layout = {
  screenPaddingHorizontal: spacing.lg,
  screenPaddingVertical: spacing.xl,
  contentMaxWidth: 720,
  gutter: spacing.md,
  stackGap: spacing.md,
  sectionGap: spacing.section,
} as const;
