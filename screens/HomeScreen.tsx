import React, { useState, useMemo } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Destination, DestinationCategory } from '../models/Destination';
import {
  CATEGORIES,
  MOCK_DESTINATIONS,
  STATES_LIST,
  STATE_DATABASE,
  STATE_PINS,
} from '../constants/mockData';
import { ThemeColors, Spacing, BorderRadius } from '../constants/theme';
import { IndiaMapExplorer } from '../widgets/IndiaMapExplorer';
import { DestinationCard } from '../widgets/DestinationCard';
import { CategoryChip } from '../widgets/CategoryChip';

interface HomeScreenProps {
  onSelectDestination: (destination: Destination) => void;
  onNavigateToSearch: () => void;
  onNavigateToWishlist: () => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  theme: ThemeColors;
  isDark: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectDestination,
  onNavigateToSearch,
  onNavigateToWishlist,
  wishlistIds,
  onToggleWishlist,
  theme,
  isDark,
}) => {
  // State for map selection and travel style category (Default: 'all' to show all India expeditions)
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory>('All');

  // Destination counts per state for available state detection and badges
  const stateCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MOCK_DESTINATIONS.forEach((d) => {
      if (d.stateKey && d.stateKey !== 'all') {
        counts[d.stateKey] = (counts[d.stateKey] || 0) + 1;
      }
    });
    return counts;
  }, []);

  // Set of available state keys that contain at least one destination
  const availableStateIds = useMemo(() => {
    return Object.keys(stateCounts).filter((k) => stateCounts[k] > 0);
  }, [stateCounts]);

  // Combined filtering: Map State + Travel Style Category
  const filteredDestinations = useMemo(() => {
    return MOCK_DESTINATIONS.filter((d) => {
      // 1. Map State Filter
      const matchesState =
        selectedState === 'all' ||
        (d.stateKey && d.stateKey.toLowerCase() === selectedState.toLowerCase());

      // 2. Travel Style Category Filter
      const matchesCategory =
        selectedCategory === 'All' || d.category === selectedCategory;

      return matchesState && matchesCategory;
    });
  }, [selectedState, selectedCategory]);

  // Selected state display name
  const activeStateName = useMemo(() => {
    if (selectedState === 'all') return 'All States Selected';
    const pin = STATE_PINS[selectedState];
    if (pin) return pin.name;
    const db = STATE_DATABASE[selectedState];
    return db ? db.name : selectedState.charAt(0).toUpperCase() + selectedState.slice(1);
  }, [selectedState]);

  // Reset all active filters
  const handleResetFilters = () => {
    setSelectedState('all');
    setSelectedCategory('All');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerArea}>
            {/* 1. States Banner & Quick Selection Bar (Above Regional Map) */}
            <View
              style={[
                styles.stateBannerCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <View style={styles.bannerHeaderRow}>
                <View style={styles.bannerLeft}>
                  <View style={[styles.bannerIndicator, { backgroundColor: theme.primary }]} />
                  <Text style={[styles.bannerActiveLabel, { color: theme.text }]}>
                    {selectedState === 'all'
                      ? 'All States Selected'
                      : `Active: ${activeStateName}`}
                  </Text>
                  {selectedState !== 'all' && (
                    <View
                      style={[
                        styles.bannerCountBadge,
                        { backgroundColor: theme.chipIdle, borderColor: theme.cardBorder },
                      ]}
                    >
                      <Text style={[styles.bannerCountText, { color: theme.primaryLight }]}>
                        {stateCounts[selectedState] || 0}{' '}
                        {(stateCounts[selectedState] || 0) === 1 ? 'Stay' : 'Stays'}
                      </Text>
                    </View>
                  )}
                </View>

                {selectedState !== 'all' ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setSelectedState('all')}
                    style={styles.bannerResetBtn}
                  >
                    <MaterialIcons name="refresh" size={13} color={theme.primaryLight} />
                    <Text style={[styles.bannerResetText, { color: theme.primaryLight }]}>
                      All States
                    </Text>
                  </TouchableOpacity>
                ) : wishlistIds.length > 0 ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onNavigateToWishlist}
                    style={[
                      styles.savedHeaderChip,
                      {
                        backgroundColor: theme.chipIdle,
                        borderColor: theme.cardBorder,
                      },
                    ]}
                  >
                    <MaterialIcons name="bookmark" size={12} color={theme.gold} />
                    <Text style={[styles.savedHeaderText, { color: theme.textSecondary }]}>
                      {wishlistIds.length} Saved
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>

              {/* Horizontal Scroll of All States to Select */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.stateSelectorScroll}
              >
                {STATES_LIST.map((st) => {
                  const isSelected = selectedState === st.id;
                  const count = st.id === 'all' ? 0 : stateCounts[st.id] || 0;
                  return (
                    <TouchableOpacity
                      key={st.id}
                      activeOpacity={0.8}
                      onPress={() => setSelectedState(st.id)}
                      style={[
                        styles.stateSelectorChip,
                        isSelected
                          ? [
                              styles.stateSelectorChipActive,
                              {
                                backgroundColor: theme.primary,
                                borderColor: theme.primary,
                              },
                            ]
                          : [
                              styles.stateSelectorChipInactive,
                              {
                                backgroundColor: theme.chipIdle,
                                borderColor: theme.cardBorder,
                              },
                            ],
                      ]}
                    >
                      <Text
                        style={[
                          styles.stateSelectorChipText,
                          {
                            color: isSelected ? '#FFFFFF' : theme.chipText,
                            fontWeight: isSelected ? '700' : '500',
                          },
                        ]}
                      >
                        {st.name}
                      </Text>
                      {count > 0 && (
                        <View
                          style={[
                            styles.stateChipCountCircle,
                            {
                              backgroundColor: isSelected
                                ? 'rgba(255, 255, 255, 0.25)'
                                : 'rgba(194, 81, 45, 0.15)',
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.stateChipCountText,
                              { color: isSelected ? '#FFFFFF' : theme.primaryLight },
                            ]}
                          >
                            {count}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* 2. Interactive Regional SVG Map (Completely Uniform Highlights - Zero Dots) */}
            <IndiaMapExplorer
              selectedState={selectedState}
              onSelectState={setSelectedState}
              theme={theme}
              isDark={isDark}
              stateCounts={stateCounts}
              availableStateIds={availableStateIds}
            />

            {/* 3. Destination Results Section Header */}
            <View style={styles.resultsHeaderRow}>
              <View style={styles.resultsTitleWrap}>
                <MaterialIcons name="place" size={15} color={theme.primary} />
                <Text style={[styles.resultsTitle, { color: theme.text }]}>
                  {selectedState === 'all'
                    ? `All Expeditions`
                    : `${activeStateName}`}
                </Text>
                <View
                  style={[
                    styles.resultsCountBadge,
                    { backgroundColor: theme.chipIdle, borderColor: theme.cardBorder },
                  ]}
                >
                  <Text style={[styles.resultsCountText, { color: theme.primaryLight }]}>
                    {filteredDestinations.length}{' '}
                    {filteredDestinations.length === 1 ? 'place' : 'places'}
                  </Text>
                </View>
              </View>

              {/* Travel Style Category Chips */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScrollContent}
              >
                {CATEGORIES.map((cat) => (
                  <CategoryChip
                    key={cat}
                    label={cat === 'All' ? 'All Styles' : cat}
                    isSelected={selectedCategory === cat}
                    onPress={() => setSelectedCategory(cat)}
                    theme={theme}
                    iconName={
                      cat === 'Heritage'
                        ? 'account-balance'
                        : cat === 'Mountains'
                        ? 'terrain'
                        : cat === 'Beaches'
                        ? 'beach-access'
                        : cat === 'Adventure'
                        ? 'kayaking'
                        : 'explore'
                    }
                  />
                ))}
              </ScrollView>

              {(selectedState !== 'all' || selectedCategory !== 'All') && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleResetFilters}
                  style={styles.resetFilterButton}
                >
                  <Text style={[styles.resetFilterText, { color: theme.primaryLight }]}>
                    Reset Filter
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <DestinationCard
            destination={item}
            isSaved={wishlistIds.includes(item.id)}
            onPress={() => onSelectDestination(item)}
            onToggleWishlist={() => onToggleWishlist(item.id)}
            theme={theme}
          />
        )}
        ListEmptyComponent={
          <View style={[styles.emptyContainer, { borderColor: theme.cardBorder }]}>
            <MaterialIcons name="travel-explore" size={42} color={theme.textMuted} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No Expeditions Found
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.textMuted }]}>
              {selectedState !== 'all'
                ? `No current itineraries match "${selectedCategory}" in ${activeStateName}.`
                : 'Try adjusting your travel style filter or selecting another state on the map.'}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleResetFilters}
              style={[styles.emptyResetBtn, { backgroundColor: theme.primary }]}
            >
              <Text style={styles.emptyResetBtnText}>Show All Expeditions</Text>
            </TouchableOpacity>
          </View>
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xs,
  },
  headerArea: {
    marginBottom: Spacing.xs,
    paddingTop: 2,
  },
  stateBannerCard: {
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: Spacing.xs,
  },
  bannerHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  bannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bannerIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  bannerActiveLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  bannerCountBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  bannerCountText: {
    fontSize: 9.5,
    fontWeight: '700',
  },
  bannerResetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  bannerResetText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  savedHeaderChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  savedHeaderText: {
    fontSize: 10,
    fontWeight: '700',
  },
  stateSelectorScroll: {
    gap: 6,
    paddingBottom: 2,
  },
  stateSelectorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  stateSelectorChipActive: {
    elevation: 2,
  },
  stateSelectorChipInactive: {},
  stateSelectorChipText: {
    fontSize: 11,
  },
  stateChipCountCircle: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: BorderRadius.full,
  },
  stateChipCountText: {
    fontSize: 9,
    fontWeight: '800',
  },
  resultsHeaderRow: {
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 2,
    gap: 8,
  },
  resultsTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  resultsTitle: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  resultsCountBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  resultsCountText: {
    fontSize: 10,
    fontWeight: '700',
  },
  categoryScrollContent: {
    gap: 6,
    paddingVertical: 2,
  },
  resetFilterButton: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  resetFilterText: {
    fontSize: 11,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginTop: Spacing.md,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: Spacing.sm,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: 17,
  },
  emptyResetBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
  },
  emptyResetBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
