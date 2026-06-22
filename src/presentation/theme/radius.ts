import type {GenesisRadiusScale} from '../../core/types/theme';

/**
 * Genesis uses a binary radius system: sharp rectangles (0) or fully circular.
 * No intermediate corner radii on brand surfaces.
 */
export const radius: GenesisRadiusScale = {
  none: 0,
  full: 9999,
} as const;
