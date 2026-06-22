import {StyleSheet} from 'react-native';

import {colors, fontFamilies, spacing, typography} from '../../theme';

export const vehicleCardMetrics = {
  imageHeight: 176,
  borderRadius: 8,
  highlightMaxWidth: 80,
  badgePaddingHorizontal: 10,
  badgeIconGap: 4,
  animationStaggerMs: 70,
} as const;

export type BadgeTone = {
  backgroundColor: string;
  color: string;
};

export const BADGE_COLORS: Record<string, BadgeTone> = {
  Sport: {backgroundColor: '#7F1D1D', color: '#FCA5A5'},
  Executive: {backgroundColor: '#1E3A8A', color: '#93C5FD'},
  Flagship: {backgroundColor: '#713F12', color: '#FDE047'},
  Electric: {backgroundColor: '#14532D', color: '#86EFAC'},
  Popular: {backgroundColor: colors.brand.copper, color: colors.brand.black},
  Family: {backgroundColor: '#581C87', color: '#D8B4FE'},
  Coupe: {backgroundColor: '#7C2D12', color: '#FDBA74'},
};

export const DEFAULT_BADGE_TONE: BadgeTone = {
  backgroundColor: colors.brand.copper,
  color: colors.brand.black,
};

export function resolveBadgeTone(badge?: string): BadgeTone {
  if (!badge) {
    return DEFAULT_BADGE_TONE;
  }
  return BADGE_COLORS[badge] ?? DEFAULT_BADGE_TONE;
}

export const vehicleCardStyles = StyleSheet.create({
  cardWrap: {
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.brand.charcoal,
    borderWidth: 1,
    borderColor: colors.brand.border,
    borderRadius: vehicleCardMetrics.borderRadius,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.94,
    borderColor: 'rgba(196, 149, 106, 0.5)',
  },
  imageWrap: {
    height: vehicleCardMetrics.imageHeight,
    backgroundColor: '#111111',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  imageFallback: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    borderRadius: 9999,
    paddingHorizontal: vehicleCardMetrics.badgePaddingHorizontal,
    paddingVertical: spacing.xxs,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: vehicleCardMetrics.badgeIconGap,
  },
  badgeRight: {
    right: spacing.sm,
  },
  badgeLeft: {
    left: spacing.sm,
  },
  badgeRtl: {
    flexDirection: 'row-reverse',
  },
  badgeLabel: {
    ...typography.caption,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  content: {
    padding: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.xxs,
  },
  titleRowRtl: {
    flexDirection: 'row-reverse',
  },
  titleBlock: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  titleBlockRtl: {
    paddingRight: 0,
    paddingLeft: spacing.sm,
  },
  name: {
    ...typography.body,
    fontFamily: fontFamilies.heading,
    fontWeight: '600',
    color: colors.ink.primary,
  },
  category: {
    ...typography.caption,
    color: colors.brand.muted,
    marginTop: 2,
    letterSpacing: 1,
  },
  priceBlock: {
    alignItems: 'flex-end',
  },
  priceBlockRtl: {
    alignItems: 'flex-start',
  },
  fromLabel: {
    ...typography.caption,
    color: colors.brand.copper,
    fontWeight: '500',
  },
  price: {
    ...typography.bodySmall,
    color: colors.ink.primary,
    fontWeight: '600',
  },
  tagline: {
    ...typography.caption,
    color: colors.brand.silver,
    fontStyle: 'italic',
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
    opacity: 0.7,
  },
  divider: {
    height: 1,
    backgroundColor: colors.brand.border,
    marginBottom: spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  footerRowRtl: {
    flexDirection: 'row-reverse',
  },
  highlights: {
    flexDirection: 'row',
    gap: 6,
    flex: 1,
  },
  highlightsRtl: {
    flexDirection: 'row-reverse',
  },
  highlight: {
    ...typography.caption,
    color: colors.brand.muted,
    backgroundColor: '#111111',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 9999,
    maxWidth: vehicleCardMetrics.highlightMaxWidth,
    overflow: 'hidden',
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  ctaRtl: {
    flexDirection: 'row-reverse',
  },
  ctaLabel: {
    ...typography.caption,
    color: colors.brand.copper,
    fontWeight: '500',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
