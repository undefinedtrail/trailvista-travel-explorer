import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { STATE_PINS, StatePin } from '../constants/mockData';
import { ThemeColors, BorderRadius, Spacing } from '../constants/theme';

interface IndiaMapExplorerProps {
  selectedState: string;
  onSelectState: (stateKey: string) => void;
  theme: ThemeColors;
  isDark: boolean;
  stateCounts?: Record<string, number>;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Calculate optimal map dimensions based on the 315x350 asset aspect ratio
const MAP_WIDTH = Math.min(SCREEN_WIDTH - 56, 290);
const MAP_HEIGHT = Math.round(MAP_WIDTH * (350 / 315)); // ~322px

export const IndiaMapExplorer: React.FC<IndiaMapExplorerProps> = ({
  selectedState,
  onSelectState,
  theme,
  isDark,
  stateCounts = {},
}) => {
  // Beacon ripple pulse animation for active pin
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    );
    pulseLoop.start();

    return () => pulseLoop.stop();
  }, [pulseAnim]);

  // Halo scale from 1.0 to 2.4, opacity from 0.85 to 0.0
  const haloScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 2.5],
  });

  const haloOpacity = pulseAnim.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0.85, 0.4, 0],
  });

  const pinKeys = Object.keys(STATE_PINS);

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: isDark ? '#14151C' : '#F6F3EB',
          borderColor: isDark ? '#262732' : '#E5E1D5',
        },
      ]}
    >
      {/* Map Header with Live Guidance */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={[styles.beaconIndicator, { backgroundColor: theme.primary }]} />
          <Text style={[styles.headerTitle, { color: theme.textMuted }]}>
            REGIONAL MAP
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onSelectState(selectedState === 'all' ? 'kerala' : 'all')}
          style={[styles.activeStateBadge, { backgroundColor: theme.chipIdle }]}
        >
          <MaterialIcons name="my-location" size={11} color={theme.primary} />
          <Text
            style={[styles.activeStateBadgeText, { color: theme.primaryLight }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {selectedState === 'all'
              ? 'Showing All'
              : STATE_PINS[selectedState]?.name || 'State View'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Interactive Map Stage */}
      <View style={styles.stageWrapper}>
        <View style={[styles.mapStage, { width: MAP_WIDTH, height: MAP_HEIGHT }]}>
          {/* Base India Vector Map Outline */}
          <Image
            source={require('../../assets/india_map.png')}
            style={[
              styles.mapImage,
              {
                tintColor: isDark ? '#8A8D9B' : '#6A6D7C',
                opacity: isDark ? 0.75 : 0.85,
              },
            ]}
            resizeMode="contain"
          />

          {/* Calibrated Pinpoints for all 10 States */}
          {pinKeys.map((key) => {
            const pin: StatePin = STATE_PINS[key];
            const isSelected = selectedState === key;
            const count = stateCounts[key] || 0;

            return (
              <TouchableOpacity
                key={pin.id}
                activeOpacity={0.7}
                onPress={() => onSelectState(pin.id)}
                style={[
                  styles.pinTouchable,
                  {
                    top: `${pin.top}%`,
                    left: `${pin.left}%`,
                  },
                ]}
                accessibilityLabel={`Select ${pin.name}`}
              >
                {/* Active Pulsing Halo Ring */}
                {isSelected && (
                  <Animated.View
                    style={[
                      styles.activeHalo,
                      {
                        backgroundColor: 'rgba(194, 81, 45, 0.45)',
                        transform: [{ scale: haloScale }],
                        opacity: haloOpacity,
                      },
                    ]}
                  />
                )}

                {/* Pin Dot Beacon */}
                <View
                  style={[
                    styles.pinDot,
                    isSelected
                      ? [
                          styles.pinDotActive,
                          {
                            backgroundColor: theme.primary,
                            borderColor: '#FFFFFF',
                            shadowColor: theme.primary,
                          },
                        ]
                      : [
                          styles.pinDotInactive,
                          {
                            backgroundColor: theme.primaryDark,
                            borderColor: isDark ? '#121316' : '#FFFFFF',
                          },
                        ],
                  ]}
                >
                  {isSelected && <View style={styles.pinInnerGlow} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Bottom Map Footnote */}
      <View style={styles.footerRow}>
        <Text style={[styles.footerText, { color: theme.textMuted }]}>
          {selectedState === 'all'
            ? 'Interactive Map • 10 States'
            : `Active: ${STATE_PINS[selectedState]?.name || selectedState}`}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onSelectState('all')}
          style={[styles.allStatesButton, { borderColor: theme.cardBorder }]}
        >
          <Text
            style={[
              styles.allStatesButtonText,
              { color: selectedState === 'all' ? theme.primaryLight : theme.textMuted },
            ]}
          >
            {selectedState === 'all' ? 'All States' : 'Reset View'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.sm + 2,
    marginVertical: Spacing.xs,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  beaconIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  headerTitle: {
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  activeStateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  activeStateBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  stageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  mapStage: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  pinTouchable: {
    position: 'absolute',
    width: 36,
    height: 36,
    marginLeft: -18,
    marginTop: -18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  activeHalo: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  pinDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinDotActive: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    borderWidth: 2,
    elevation: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    transform: [{ scale: 1.15 }],
  },
  pinDotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    opacity: 0.85,
  },
  pinInnerGlow: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#FFFFFF',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  footerText: {
    fontSize: 9.5,
    fontWeight: '500',
  },
  allStatesButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  allStatesButtonText: {
    fontSize: 9.5,
    fontWeight: '700',
  },
});
