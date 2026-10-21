import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StateInfo } from '../constants/mockData';
import { ThemeColors, BorderRadius, Spacing } from '../constants/theme';

interface StateTelemetryCardProps {
  stateInfo: StateInfo;
  expeditionsCount: number;
  theme: ThemeColors;
  isDark: boolean;
}

export const StateTelemetryCard: React.FC<StateTelemetryCardProps> = ({
  stateInfo,
  expeditionsCount,
  theme,
  isDark,
}) => {
  return (
    <View
      style={[
        styles.hudCard,
        {
          backgroundColor: isDark ? '#191B24' : '#FFFFFF',
          borderColor: isDark ? '#262732' : '#E5E1D5',
        },
      ]}
    >
      {/* Top Telemetry Header */}
      <View style={styles.topRow}>
        <View style={[styles.seasonTag, { backgroundColor: 'rgba(194, 81, 45, 0.15)' }]}>
          <MaterialIcons name="event-available" size={12} color={theme.primaryLight} />
          <Text style={[styles.seasonTagText, { color: theme.primaryLight }]}>
            {stateInfo.season.toUpperCase()}
          </Text>
        </View>

        <View style={styles.weatherBadgeRow}>
          <View style={[styles.weatherPill, { backgroundColor: theme.chipIdle }]}>
            <MaterialIcons name="thermostat" size={12} color="#FBBF24" />
            <Text style={[styles.weatherPillText, { color: theme.text }]}>
              {stateInfo.temp}
            </Text>
          </View>
          <View style={[styles.weatherPill, { backgroundColor: theme.chipIdle }]}>
            <MaterialIcons name="wb-twilight" size={12} color={theme.primaryLight} />
            <Text style={[styles.weatherPillText, { color: theme.textMuted }]}>
              {stateInfo.sunset}
            </Text>
          </View>
        </View>
      </View>

      {/* State Name & Subtitle */}
      <View style={styles.titleSection}>
        <View style={styles.titleRow}>
          <Text style={[styles.stateName, { color: theme.text }]}>{stateInfo.name}</Text>
          <Text style={[styles.stateSubtitle, { color: theme.primaryLight }]}>
            {stateInfo.subtitle}
          </Text>
        </View>
        <Text style={[styles.stateDesc, { color: theme.textMuted }]}>
          {stateInfo.desc}
        </Text>
      </View>

      {/* Bottom Dispatch Info Bar */}
      <View style={[styles.bottomInfoBar, { borderTopColor: isDark ? '#262732' : '#EFEBE2' }]}>
        <View style={styles.dispatchCounter}>
          <MaterialIcons name="explore" size={13} color={theme.primary} />
          <Text style={[styles.counterText, { color: theme.text }]}>
            {expeditionsCount} {expeditionsCount === 1 ? 'Curated Stay' : 'Curated Stays'} in {stateInfo.name}
          </Text>
        </View>
        <View style={styles.verifiedBadge}>
          <MaterialIcons name="verified" size={12} color="#10B981" />
          <Text style={styles.verifiedText}>Curated & Verified</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hudCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md - 2,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  seasonTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  seasonTagText: {
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  weatherBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  weatherPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  weatherPillText: {
    fontSize: 10,
    fontWeight: '600',
  },
  titleSection: {
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  stateName: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  stateSubtitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  stateDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  bottomInfoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
  },
  dispatchCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  counterText: {
    fontSize: 11,
    fontWeight: '700',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10B981',
  },
});
