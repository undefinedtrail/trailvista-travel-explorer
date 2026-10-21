import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  FlatList,
  Image,
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
  StateInfo,
} from '../constants/mockData';
import { ThemeColors, Spacing, BorderRadius } from '../constants/theme';
import { IndiaMapExplorer } from '../widgets/IndiaMapExplorer';
import { StateTelemetryCard } from '../widgets/StateTelemetryCard';
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
  // Initialize with Kerala active as per the Stitch design
  const [selectedState, setSelectedState] = useState<string>('kerala');
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory>('All');
  const stateChipsScrollRef = useRef<any>(null);

  // Calculate destination counts per state for badges
  const stateCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MOCK_DESTINATIONS.forEach((d) => {
      if (d.stateKey) {
        counts[d.stateKey] = (counts[d.stateKey] || 0) + 1;
      }
    });
    return counts;
  }, []);

  // Filtered destinations based on selected state and category
  const filteredDestinations = useMemo(() => {
    return MOCK_DESTINATIONS.filter((d) => {
      const matchesState =
        selectedState === 'all' || d.stateKey === selectedState;
      const matchesCategory =
        selectedCategory === 'All' || d.category === selectedCategory;
      return matchesState && matchesCategory;
    });
  }, [selectedState, selectedCategory]);

  // Current active state info
  const activeStateInfo: StateInfo =
    STATE_DATABASE[selectedState] || STATE_DATABASE['all'];

  // Trending / popular expeditions (highest rated destinations)
  const trendingDestinations = useMemo(() => {
    return [...MOCK_DESTINATIONS]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, []);

  // Handle state change with smooth scroll
  const handleSelectState = (stateId: string) => {
    setSelectedState(stateId);
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
            {/* Compact Editorial Hero */}
            <View style={styles.compactHero}>
              <View style={styles.heroTopRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.heroEyebrow, { color: theme.primaryLight }]}>
                    EXPLORE INDIA
                  </Text>
                  <Text style={[styles.heroHeadline, { color: theme.text }]}>
                    Discover places worth remembering.
                  </Text>
                </View>
                {wishlistIds.length > 0 && (
                  <TouchableOpacity
                    onPress={onNavigateToWishlist}
                    style={[
                      styles.savedHeaderChip,
                      {
                        backgroundColor: theme.chipIdle,
                        borderColor: theme.cardBorder,
                      },
                    ]}
                  >
                    <MaterialIcons name="bookmark" size={13} color={theme.gold} />
                    <Text style={[styles.savedHeaderText, { color: theme.textSecondary }]}>
                      {wishlistIds.length} Saved
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Obvious Search Bar Entry Point */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onNavigateToSearch}
                style={[
                  styles.heroSearchBar,
                  { backgroundColor: theme.card, borderColor: theme.cardBorder },
                ]}
              >
                <MaterialIcons name="search" size={18} color={theme.primary} />
                <Text style={[styles.heroSearchPlaceholder, { color: theme.textMuted }]}>
                  Search destinations, states, or styles...
                </Text>
                <MaterialIcons name="tune" size={16} color={theme.primaryLight} />
              </TouchableOpacity>
            </View>

            {/* Trending Destinations Carousel */}
            <View style={styles.trendingSection}>
              <View style={styles.trendingHeaderRow}>
                <View style={styles.sectionTitleWrap}>
                  <MaterialIcons name="trending-up" size={15} color={theme.primary} />
                  <Text style={[styles.sectionTitle, { color: theme.text }]}>
                    POPULAR EXPEDITIONS
                  </Text>
                </View>
                <Text style={[styles.trendingSub, { color: theme.textMuted }]}>
                  Top-rated journeys
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.trendingScrollContent}
              >
                {trendingDestinations.map((dest) => (
                  <TouchableOpacity
                    key={dest.id}
                    activeOpacity={0.88}
                    onPress={() => onSelectDestination(dest)}
                    style={[
                      styles.trendingCard,
                      { backgroundColor: theme.card, borderColor: theme.cardBorder },
                    ]}
                  >
                    <Image
                      source={{ uri: dest.image }}
                      style={styles.trendingImage}
                      resizeMode="cover"
                    />
                    <View style={styles.trendingRatingBadge}>
                      <MaterialIcons name="star" size={11} color="#FBBF24" />
                      <Text style={styles.trendingRatingText}>
                        {dest.rating.toFixed(2)}
                      </Text>
                    </View>
                    <View style={styles.trendingCardBody}>
                      <Text style={[styles.trendingCardTitle, { color: theme.text }]} numberOfLines={1}>
                        {dest.name}
                      </Text>
                      <Text style={[styles.trendingCardLocation, { color: theme.textMuted }]} numberOfLines={1}>
                        {dest.location}
                      </Text>
                      <View style={styles.trendingPriceRow}>
                        <Text style={[styles.trendingPriceText, { color: theme.primaryLight }]}>
                          ₹{dest.pricePerNight.toLocaleString('en-IN')}
                        </Text>
                        <Text style={[styles.trendingDurationText, { color: theme.textMuted }]}>
                          • {dest.duration.split(' ')[0]} {dest.duration.split(' ')[1]}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Horizontal State Chips Navigation Bar */}
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionTitleWrap}>
                <MaterialIcons name="place" size={14} color={theme.primary} />
                <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
                  REGIONS
                </Text>
              </View>
              {selectedState !== 'all' && (
                <TouchableOpacity
                  onPress={() => setSelectedState('all')}
                  style={styles.resetLink}
                >
                  <Text style={[styles.resetLinkText, { color: theme.primaryLight }]}>
                    View All
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <ScrollView
              ref={stateChipsScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.stateChipsScrollContent}
            >
              {STATES_LIST.map((st) => {
                const isSelected = selectedState === st.id;
                return (
                  <TouchableOpacity
                    key={st.id}
                    activeOpacity={0.8}
                    onPress={() => handleSelectState(st.id)}
                    style={[
                      styles.stateChip,
                      isSelected
                        ? [
                            styles.stateChipActive,
                            {
                              backgroundColor: theme.primary,
                              borderColor: theme.primary,
                              shadowColor: theme.primary,
                            },
                          ]
                        : [
                            styles.stateChipInactive,
                            {
                              backgroundColor: theme.chipIdle,
                              borderColor: theme.cardBorder,
                            },
                          ],
                    ]}
                  >
                    <Text
                      style={[
                        styles.stateChipText,
                        {
                          color: isSelected ? '#FFFFFF' : theme.chipText,
                          fontWeight: isSelected ? '700' : '500',
                        },
                      ]}
                    >
                      {st.name}
                    </Text>
                    {st.id !== 'all' && stateCounts[st.id] ? (
                      <View
                        style={[
                          styles.stateCountCircle,
                          {
                            backgroundColor: isSelected
                              ? 'rgba(255, 255, 255, 0.25)'
                              : 'rgba(194, 81, 45, 0.15)',
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.stateCountText,
                            { color: isSelected ? '#FFFFFF' : theme.primaryLight },
                          ]}
                        >
                          {stateCounts[st.id]}
                        </Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Interactive Vector Map Canvas */}
            <IndiaMapExplorer
              selectedState={selectedState}
              onSelectState={handleSelectState}
              theme={theme}
              isDark={isDark}
              stateCounts={stateCounts}
            />

            {/* Selected State Telemetry HUD Card */}
            <StateTelemetryCard
              stateInfo={activeStateInfo}
              expeditionsCount={filteredDestinations.length}
              theme={theme}
              isDark={isDark}
            />

            {/* Category Filter Chips Section */}
            <View style={styles.categoryHeaderRow}>
              <View style={styles.categoryTitleWrap}>
                <MaterialIcons name="filter-alt" size={14} color={theme.primary} />
                <Text style={[styles.categorySectionTitle, { color: theme.textMuted }]}>
                  TRAVEL STYLES
                </Text>
              </View>
              <Text style={[styles.categoryCountLabel, { color: theme.primaryLight }]}>
                {filteredDestinations.length} {filteredDestinations.length === 1 ? 'Stay' : 'Stays'}
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsScrollContent}
            >
              {CATEGORIES.map((cat) => (
                <CategoryChip
                  key={cat}
                  label={cat === 'All' ? 'All Expeditions' : cat}
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
            <MaterialIcons name="travel-explore" size={44} color={theme.textMuted} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No Expeditions in this Category
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.textMuted }]}>
              Try switching the travel category or selecting another state beacon.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedCategory('All');
                setSelectedState('all');
              }}
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
  },
  compactHero: {
    marginBottom: Spacing.sm,
    paddingTop: 2,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  heroEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  heroHeadline: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  heroSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: 8,
  },
  heroSearchPlaceholder: {
    flex: 1,
    fontSize: 12,
  },
  trendingSection: {
    marginBottom: Spacing.sm + 2,
  },
  trendingHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trendingSub: {
    fontSize: 10,
    fontWeight: '600',
  },
  trendingScrollContent: {
    gap: 10,
    paddingBottom: 2,
  },
  trendingCard: {
    width: 140,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  trendingImage: {
    width: '100%',
    height: 85,
    backgroundColor: '#1E1E24',
  },
  trendingRatingBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  trendingRatingText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '700',
  },
  trendingCardBody: {
    padding: 7,
  },
  trendingCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 1,
  },
  trendingCardLocation: {
    fontSize: 10,
    marginBottom: 4,
  },
  trendingPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  trendingPriceText: {
    fontSize: 11,
    fontWeight: '800',
  },
  trendingDurationText: {
    fontSize: 9.5,
    marginLeft: 2,
  },
  topDispatchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    marginTop: 4,
  },
  dispatchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dispatchText: {
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  savedHeaderChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  savedHeaderText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  mainHeadline: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.6,
    marginBottom: 3,
  },
  subHeadline: {
    fontSize: 12.5,
    lineHeight: 17,
    marginBottom: Spacing.sm + 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  resetLink: {
    paddingVertical: 2,
  },
  resetLinkText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  stateChipsScrollContent: {
    gap: 6,
    paddingBottom: 6,
  },
  stateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  stateChipActive: {
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  stateChipInactive: {},
  stateChipText: {
    fontSize: 11.5,
  },
  stateCountCircle: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: BorderRadius.full,
  },
  stateCountText: {
    fontSize: 9.5,
    fontWeight: '800',
  },
  categoryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 6,
  },
  categoryTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categorySectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  categoryCountLabel: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  chipsScrollContent: {
    gap: 6,
    paddingBottom: Spacing.sm,
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
