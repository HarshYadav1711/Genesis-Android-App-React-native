import {StyleSheet} from 'react-native';

import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

export const overlayColors = {
  panel: colors.brand.charcoal,
  panelDark: colors.surface.primary,
  border: colors.brand.border,
  copper: colors.brand.copper,
  gold: colors.brand.gold,
  silver: colors.brand.silver,
  muted: colors.brand.muted,
  black: colors.brand.black,
  scrim: colors.overlay.scrim,
} as const;

export const overlayMetrics = {
  profileSidebarWidth: 280,
  chatPanelMinWidth: 320,
  chatPanelMaxWidth: 480,
  expandedPanelMaxWidth: 780,
  micButtonSize: 64,
  sendButtonSize: 44,
} as const;

export const overlayStyles = StyleSheet.create({
  host: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
  },
  scrim: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: overlayColors.scrim,
  },
  panelRow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    maxWidth: '95%',
    minWidth: overlayMetrics.chatPanelMinWidth,
  },
  panelRowLtr: {
    right: 0,
  },
  panelRowRtl: {
    left: 0,
  },
  profileSidebar: {
    width: overlayMetrics.profileSidebarWidth,
    backgroundColor: overlayColors.panel,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: overlayColors.border,
    padding: spacing.md,
  },
  profileSidebarTitle: {
    fontSize: 10,
    letterSpacing: 2,
    color: overlayColors.copper,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
  },
  chatColumn: {
    flex: 1,
    minWidth: overlayMetrics.chatPanelMinWidth,
    maxWidth: overlayMetrics.chatPanelMaxWidth,
    backgroundColor: overlayColors.panel,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: overlayColors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: overlayColors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(196, 149, 106, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: overlayColors.silver,
  },
  headerSubtitle: {
    fontSize: 12,
    color: overlayColors.muted,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  profileToggle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: overlayColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileToggleActive: {
    borderColor: overlayColors.copper,
    backgroundColor: 'rgba(196, 149, 106, 0.1)',
  },
  visualizerSection: {
    backgroundColor: 'rgba(13, 13, 13, 0.3)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: overlayColors.border,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: spacing.md,
  },
  messageListContent: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  micErrorBanner: {
    backgroundColor: 'rgba(120, 53, 15, 0.2)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(180, 83, 9, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: spacing.xs,
  },
  micErrorText: {
    fontSize: 12,
    color: '#FCD34D',
  },
  inputSection: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: overlayColors.border,
    paddingHorizontal: 20,
    paddingVertical: spacing.md,
  },
  inputHint: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: overlayColors.muted,
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  textInput: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: overlayColors.black,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: overlayColors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 14,
    color: overlayColors.silver,
  },
  sendButton: {
    width: overlayMetrics.sendButtonSize,
    height: overlayMetrics.sendButtonSize,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: overlayColors.copper,
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(196, 149, 106, 0.4)',
  },
  endConversation: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: overlayColors.muted,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  micButton: {
    width: overlayMetrics.micButtonSize,
    height: overlayMetrics.micButtonSize,
    borderRadius: overlayMetrics.micButtonSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: overlayColors.copper,
    backgroundColor: 'rgba(196, 149, 106, 0.2)',
  },
  micButtonListening: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
  },
  micButtonSpeaking: {
    backgroundColor: overlayColors.copper,
    borderWidth: 0,
  },
});
