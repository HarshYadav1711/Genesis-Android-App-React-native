import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import type {CustomerProfile} from '../../domain/chat';
import {overlayColors} from './overlayStyles';

type CustomerProfilePanelProps = {
  profile: CustomerProfile | null;
};

type LeadScoreColors = {
  background: string;
  text: string;
  border: string;
  dot: string;
};

function leadScoreColors(score: string): LeadScoreColors {
  switch (score) {
    case 'warm':
      return {
        background: 'rgba(120, 53, 15, 0.3)',
        text: '#FCD34D',
        border: 'rgba(180, 83, 9, 0.4)',
        dot: '#FBBF24',
      };
    case 'hot':
      return {
        background: 'rgba(127, 29, 29, 0.3)',
        text: '#FCA5A5',
        border: 'rgba(185, 28, 28, 0.4)',
        dot: '#F87171',
      };
    default:
      return {
        background: 'rgba(30, 58, 138, 0.3)',
        text: '#93C5FD',
        border: 'rgba(29, 78, 216, 0.4)',
        dot: '#60A5FA',
      };
  }
}

function intentLabel(intent: string): {label: string; color: string} {
  switch (intent) {
    case 'comparing':
      return {label: 'Comparing', color: '#93C5FD'};
    case 'high_interest':
      return {label: 'High Interest', color: '#FCD34D'};
    case 'ready_to_buy':
      return {label: 'Ready to Buy', color: '#86EFAC'};
    default:
      return {label: 'Browsing', color: overlayColors.muted};
  }
}

function ProfileLabel({text}: {text: string}) {
  return <Text style={styles.fieldLabel}>{text.toUpperCase()}</Text>;
}

function ProfileChip({
  text,
  highlighted,
}: {
  text: string;
  highlighted: boolean;
}) {
  return (
    <Text
      style={[
        styles.chip,
        highlighted ? styles.chipHighlighted : styles.chipDefault,
      ]}>
      {text}
    </Text>
  );
}

function ProfileField({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor: string;
}) {
  return (
    <View style={styles.fieldGroup}>
      <ProfileLabel text={label} />
      <Text style={[styles.fieldValue, {color: valueColor}]}>{value}</Text>
    </View>
  );
}

export function CustomerProfilePanel({profile}: CustomerProfilePanelProps) {
  if (!profile) {
    return null;
  }

  const scoreColors = leadScoreColors(profile.leadScore);
  const intent = intentLabel(profile.intent);

  return (
    <View style={styles.panel}>
      <View style={styles.panelHeader}>
        <Text style={styles.panelTitle}>Customer Profile</Text>
        <View
          style={[
            styles.scoreBadge,
            {
              backgroundColor: scoreColors.background,
              borderColor: scoreColors.border,
            },
          ]}>
          <View style={[styles.scoreDot, {backgroundColor: scoreColors.dot}]} />
          <Text style={[styles.scoreText, {color: scoreColors.text}]}>
            {profile.leadScore.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.panelBody}>
        <ProfileField label="Intent" value={intent.label} valueColor={intent.color} />

        {profile.vehiclePreferences.length > 0 ? (
          <View style={styles.fieldGroup}>
            <ProfileLabel text="Interested In" />
            <View style={styles.chipRow}>
              {profile.vehiclePreferences.map(vehicle => (
                <ProfileChip key={vehicle} text={vehicle} highlighted={false} />
              ))}
            </View>
          </View>
        ) : null}

        {profile.priorities.length > 0 ? (
          <View style={styles.fieldGroup}>
            <ProfileLabel text="Priorities" />
            <View style={styles.chipRow}>
              {profile.priorities.map(priority => (
                <ProfileChip
                  key={priority}
                  text={priority.charAt(0).toUpperCase() + priority.slice(1)}
                  highlighted
                />
              ))}
            </View>
          </View>
        ) : null}

        {profile.budgetLevel ? (
          <ProfileField
            label="Budget Range"
            value={`${profile.budgetLevel.charAt(0).toUpperCase() + profile.budgetLevel.slice(1)} tier`}
            valueColor={overlayColors.silver}
          />
        ) : null}

        {profile.recommendedAction ? (
          <View style={styles.suggestedAction}>
            <ProfileLabel text="Suggested Action" />
            <Text style={styles.suggestedActionValue}>
              {profile.recommendedAction.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}
            </Text>
          </View>
        ) : null}

        {profile.conversationInsights ? (
          <Text style={styles.insightsQuote}>
            &ldquo;{profile.conversationInsights}&rdquo;
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: 8,
    backgroundColor: overlayColors.panelDark,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: overlayColors.border,
    overflow: 'hidden',
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: overlayColors.border,
  },
  panelTitle: {
    fontSize: 10,
    letterSpacing: 2,
    color: overlayColors.copper,
    fontWeight: '500',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  scoreDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  scoreText: {
    fontSize: 10,
    fontWeight: '600',
  },
  panelBody: {
    padding: 16,
    gap: 16,
  },
  fieldGroup: {
    gap: 4,
  },
  fieldLabel: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: overlayColors.muted,
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  chip: {
    fontSize: 10,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  chipDefault: {
    backgroundColor: overlayColors.black,
    borderColor: overlayColors.border,
    color: overlayColors.silver,
  },
  chipHighlighted: {
    backgroundColor: 'rgba(196, 149, 106, 0.1)',
    borderColor: 'rgba(196, 149, 106, 0.2)',
    color: overlayColors.copper,
  },
  suggestedAction: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: overlayColors.border,
    paddingTop: 12,
    gap: 4,
  },
  suggestedActionValue: {
    fontSize: 12,
    fontWeight: '500',
    color: overlayColors.copper,
  },
  insightsQuote: {
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
    color: overlayColors.muted,
    backgroundColor: overlayColors.black,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
