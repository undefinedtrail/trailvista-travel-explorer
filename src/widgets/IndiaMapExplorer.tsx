import React, { useMemo } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path, G, Rect } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
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

  // Active state display name
  const activeStateName = useMemo(() => {
    if (selectedState === 'all') return 'Showing All';
    const found = INDIA_STATE_PATHS.find((s) => s.id === selectedState);
    return found ? found.name : selectedState.charAt(0).toUpperCase() + selectedState.slice(1);
  }, [selectedState]);

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
      {/* Map Header */}
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
          onPress={() => onSelectState('all')}
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

      {/* Interactive Vector SVG Map Stage (Pure Vector - Zero Dot Pins) */}
      <View style={styles.stageWrapper}>
        <View style={[styles.mapStage, { width: MAP_WIDTH, height: MAP_HEIGHT }]}>
          <Svg
            viewBox={INDIA_MAP_VIEWBOX}
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            style={styles.svgContainer}
          >
            {/* 1. Base Non-selected States: Available states darker interior, clean subtle outlines */}
            <G>
              {normalPaths.map((state) => {
                const isAvailable = availableSet.has(state.id);
                return (
                  <Path
                    key={state.id}
                    d={state.d}
                    fill={
                      isAvailable
                        ? isDark
                          ? '#1E212D'
                          : '#EBE7DE'
                        : isDark
                        ? '#14151C'
                        : 'transparent'
                    }
                    stroke={
                      isAvailable
                        ? isDark
                          ? '#8E98B4'
                          : '#4E5568'
                        : isDark
                        ? '#4E556E'
                        : '#CAD0DE'
                    }
                    strokeWidth={isAvailable ? 1.2 : 0.85}
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
                strokeWidth={2.0}
                strokeLinejoin="round"
                strokeLinecap="round"
                onPress={() => onSelectState('all')}
              />
            )}

            {/* 3. Andaman & Nicobar generous touch hit target: archipelago islands are slender, so this ensures effortless tap detection */}
            <Rect
              x={480}
              y={520}
              width={80}
              height={180}
              fill="transparent"
              onPress={() => {
                if (selectedState === 'andaman') {
                  onSelectState('all');
                } else if (availableSet.has('andaman')) {
                  onSelectState('andaman');
                }
              }}
            />
          </Svg>
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
