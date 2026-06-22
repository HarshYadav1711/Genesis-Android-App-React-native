import {StyleSheet} from 'react-native';

import {colors, fontFamilies, spacing, typography} from '../../theme';

export const specBoardMetrics = {
  heroWidthRatio: 0.45,
  wideLayoutMinWidth: 768,
  heroMinHeight: 300,
  tabBorderWidth: 2,
  specContentPadding: spacing.xl,
  ctaPaddingHorizontal: spacing.xl,
  ctaPaddingVertical: 20,
} as const;

export const specBoardStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.brand.black,
  },
  layoutRow: {
    flexDirection: 'row',
  },
  layoutColumn: {
    flexDirection: 'column',
  },
  heroPanel: {
    backgroundColor: '#111111',
    overflow: 'hidden',
  },
  heroPanelWide: {
    flex: 0.45,
  },
  heroPanelNarrow: {
    width: '100%',
    minHeight: specBoardMetrics.heroMinHeight,
    maxHeight: 360,
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  heroImageFallback: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#1A1A1A',
  },
  heroOverlayRight: {
    ...StyleSheet.absoluteFill,
  },
  highlightsWrap: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    gap: spacing.xs,
    zIndex: 2,
  },
  highlightsWrapRtl: {
    left: undefined,
    right: spacing.lg,
    alignItems: 'flex-end',
  },
  highlightPill: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(196, 149, 106, 0.3)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  highlightText: {
    ...typography.caption,
    color: colors.brand.silver,
  },
  heroInfo: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.xl,
    zIndex: 2,
  },
  electricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    marginBottom: spacing.xs,
  },
  electricRowRtl: {
    flexDirection: 'row-reverse',
  },
  electricLabel: {
    ...typography.overline,
    color: '#4ADE80',
    letterSpacing: 4,
  },
  vehicleName: {
    ...typography.headline2,
    fontFamily: fontFamilies.heading,
    fontWeight: '700',
    color: colors.ink.primary,
    marginBottom: spacing.xxs,
  },
  vehicleType: {
    ...typography.bodySmall,
    color: colors.brand.copper,
    letterSpacing: 2,
  },
  vehicleTagline: {
    ...typography.bodySmall,
    color: colors.brand.silver,
    fontStyle: 'italic',
    marginTop: spacing.xs,
    opacity: 0.7,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  priceRowRtl: {
    flexDirection: 'row-reverse',
  },
  priceEyebrow: {
    ...typography.caption,
    color: colors.brand.muted,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  priceValue: {
    ...typography.bodyLarge,
    color: colors.brand.gold,
    fontWeight: '600',
  },
  specsPanel: {
    flex: 1,
    backgroundColor: colors.brand.black,
    overflow: 'hidden',
  },
  tabBar: {
    flexShrink: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.brand.border,
  },
  tabBarContent: {
    paddingHorizontal: spacing.xs,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: spacing.md,
    borderBottomWidth: specBoardMetrics.tabBorderWidth,
  },
  tabButtonRtl: {
    flexDirection: 'row-reverse',
  },
  tabButtonActive: {
    borderBottomColor: colors.brand.copper,
  },
  tabButtonInactive: {
    borderBottomColor: 'transparent',
  },
  tabLabel: {
    ...typography.caption,
    fontWeight: '500',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  tabLabelActive: {
    color: colors.brand.copper,
  },
  tabLabelInactive: {
    color: colors.brand.muted,
  },
  specScroll: {
    flex: 1,
  },
  specContent: {
    padding: specBoardMetrics.specContentPadding,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(42, 42, 42, 0.5)',
    gap: spacing.md,
  },
  specRowRtl: {
    flexDirection: 'row-reverse',
  },
  specRowLast: {
    borderBottomWidth: 0,
  },
  specLabel: {
    ...typography.bodySmall,
    color: colors.brand.muted,
    flex: 1,
  },
  specValue: {
    ...typography.bodySmall,
    color: colors.ink.primary,
    fontWeight: '500',
    maxWidth: '55%',
    textAlign: 'right',
  },
  specValueRtl: {
    textAlign: 'left',
  },
  specEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.section,
  },
  specEmptyText: {
    ...typography.body,
    color: colors.brand.muted,
    textAlign: 'center',
  },
  ctaBar: {
    flexShrink: 0,
    borderTopWidth: 1,
    borderTopColor: colors.brand.border,
    paddingHorizontal: specBoardMetrics.ctaPaddingHorizontal,
    paddingVertical: specBoardMetrics.ctaPaddingVertical,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  ctaBarRtl: {
    flexDirection: 'row-reverse',
  },
  primaryCta: {
    flex: 1,
    backgroundColor: colors.brand.copper,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    borderRadius: 2,
  },
  primaryCtaRtl: {
    flexDirection: 'row-reverse',
  },
  primaryCtaPressed: {
    opacity: 0.9,
  },
  primaryCtaLabel: {
    ...typography.button,
    color: colors.brand.black,
    fontWeight: '600',
    letterSpacing: 2,
    textAlign: 'center',
    flexShrink: 1,
  },
  secondaryCta: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.brand.copper,
    paddingVertical: spacing.sm,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    borderRadius: 2,
  },
  secondaryCtaRtl: {
    flexDirection: 'row-reverse',
  },
  secondaryCtaPressed: {
    opacity: 0.9,
  },
  secondaryCtaLabel: {
    ...typography.button,
    color: colors.brand.copper,
    letterSpacing: 2,
  },
});
