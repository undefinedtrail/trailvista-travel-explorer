import React, { useEffect, useRef, useMemo } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { STATE_PINS, StatePin } from '../constants/mockData';
import {
  INDIA_STATE_PATHS,
  INDIA_MAP_VIEWBOX,
  INDIA_MAP_WIDTH,
  INDIA_MAP_HEIGHT,
  StatePathData,
} from '../constants/indiaMapPaths';
import { ThemeColors, BorderRadius, Spacing } from '../constants/theme';

interface IndiaMapExplorerProps {
  selectedState: string;
  onSelectState: (stateKey: string) => void;
  theme: ThemeColors;
  isDark: boolean;
  stateCounts?: Record<string, number>;
  availableStateIds?: string[];
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Calculate optimal map dimensions based on the 630x700 aspect ratio (9:10)
const MAP_WIDTH = Math.min(SCREEN_WIDTH - 56, 290);
const MAP_HEIGHT = Math.round(MAP_WIDTH * (INDIA_MAP_HEIGHT / INDIA_MAP_WIDTH)); // ~322px

export const IndiaMapExplorer: React.FC<IndiaMapExplorerProps> = ({
  selectedState,
  onSelectState,
  theme,
  isDark,
  stateCounts = {},
  availableStateIds,
}) => {
  // Pulse animation for active pin beacon
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

  const haloScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 2.5],
  });

  const haloOpacity = pulseAnim.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0.85, 0.4, 0],
  });

  // Determine which states are available based on destination counts or explicit prop
  const availableSet = useMemo(() => {
    if (availableStateIds && availableStateIds.length > 0) {
      return new Set(availableStateIds.map((id) => id.toLowerCase()));
    }
    const set = new Set<string>();
    Object.keys(stateCounts).forEach((key) => {
      if (stateCounts[key] > 0 && key !== 'all') {
        set.add(key.toLowerCase());
      }
    });
    return set;
  }, [availableStateIds, stateCounts]);

  const pinKeys = Object.keys(STATE_PINS);

  // Active state display name
  const activePin = STATE_PINS[selectedState];
  const activeStateName = useMemo(() => {
    if (selectedState === 'all') return 'Showing All';
    if (activePin) return activePin.name;
    const found = INDIA_STATE_PATHS.find((s) => s.id === selectedState);
    return found ? found.name : selectedState;
  }, [selectedState, activePin]);

  // Separate non-selected paths from selected path to render selected path on top
  const { normalPaths, selectedPathData } = useMemo<{
    normalPaths: StatePathData[];
    selectedPathData: StatePathData | null;
  }>(() => {
    let selected: StatePathData | null = null;
    const normal: StatePathData[] = [];
    INDIA_STATE_PATHS.forEach((state) => {
      if (state.id === selectedState) {
        selected = state;
      } else {
        normal.push(state);
      }
    });
    return { normalPaths: normal, selectedPathData: selected };
  }, [selectedState]);

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
          <View>
            <Text style={[styles.headerTitle, { color: theme.textMuted }]}>
              REGIONAL MAP
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
              Explore by state
            </Text>
          </View>
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
            {activeStateName}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Interactive Vector SVG Map Stage */}
      <View style={styles.stageWrapper}>
        <View style={[styles.mapStage, { width: MAP_WIDTH, height: MAP_HEIGHT }]}>
          {/* Authentic SVG Map using vector paths */}
          <Svg
            viewBox={INDIA_MAP_VIEWBOX}
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            style={styles.svgContainer}
          >
            {/* 1. Base Non-selected States */}
            <G>
              {normalPaths.map((state) => {
                const isAvailable = availableSet.has(state.id);
                return (
                  <Path
                    key={state.id}
                    d={state.d}
                    fill={isAvailable ? 'rgba(255, 255, 255, 0.015)' : 'transparent'}
                    stroke={
                      isAvailable
                        ? isDark
                          ? '#8E93A6'
                          : '#565A6B'
                        : isDark
                        ? '#2E303B'
                        : '#D2D5E0'
                    }
                    strokeWidth={isAvailable ? 1.2 : 0.75}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    onPress={() => {
                      if (isAvailable) {
                        onSelectState(state.id);
                      }
                    }}
                  />
                );
              })}
            </G>

            {/* 2. Highlighted Selected State rendered on top with vivid orange fill */}
            {selectedPathData && (
              <Path
                d={selectedPathData.d}
                fill={theme.primary}
                fillOpacity={0.92}
                stroke="#FFA07A"
                strokeWidth={2.4}
                strokeLinejoin="round"
                strokeLinecap="round"
                onPress={() => onSelectState('all')}
              />
            )}
          </Svg>

          {/* Calibrated Destination Pinpoints */}
          {pinKeys.map((key) => {
            const pin: StatePin = STATE_PINS[key];
            const isSelected = selectedState === key;
            const isAnySelected = selectedState !== 'all';
            const pinOpacity = isSelected ? 1 : isAnySelected ? 0.35 : 0.95;

            return (
              <TouchableOpacity
                key={pin.id}
                activeOpacity={0.7}
                onPress={() => onSelectState(isSelected ? 'all' : pin.id)}
                style={[
                  styles.pinTouchable,
                  {
                    top: `${pin.top}%`,
                    left: `${pin.left}%`,
                    opacity: pinOpacity,
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
                        backgroundColor: 'rgba(217, 93, 50, 0.45)',
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
        <View style={styles.footerLeft}>
          <Text style={[styles.footerText, { color: theme.textMuted }]}>
            {selectedState === 'all'
              ? `Interactive Map • ${availableSet.size || 10} Available Regions`
              : `Active: ${activeStateName}${
                  stateCounts[selectedState]
                    ? ` • ${stateCounts[selectedState]} ${
                        stateCounts[selectedState] === 1 ? 'Destination' : 'Destinations'
                      }`
                    : ''
                }`}
          </Text>
        </View>
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
    gap: 8,
  },
  beaconIndicator: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  headerTitle: {
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
  },
  activeStateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: BorderRadius.full,
  },
  activeStateBadgeText: {
    fontSize: 10.5,
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
  svgContainer: {
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
    shadowOpacity: 0.45,
    shadowRadius: 4,
  },
  pinDotInactive: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    borderWidth: 1.5,
  },
  pinInnerGlow: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  footerLeft: {
    flex: 1,
    marginRight: 8,
  },
  footerText: {
    fontSize: 10.5,
    fontWeight: '500',
  },
  allStatesButton: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  allStatesButtonText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
