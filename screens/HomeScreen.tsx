import React, { useState, useMemo } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Destination, DestinationCategory } from '../models/Destination';
import {
  CATEGORIES,
  MOCK_DESTINATIONS,
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
  // State for map selection, category, and inline search query
  const [selectedState, setSelectedState] = useState<string>('kerala');
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  // Popular expeditions using stable popularity ranking
  const popularDestinations = useMemo(() => {
    return [...MOCK_DESTINATIONS]
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 6);
  }, []);

  // Combined filtering: Map State + Search Query + Travel Style Category
  const filteredDestinations = useMemo(() => {
    return MOCK_DESTINATIONS.filter((d) => {
      // 1. Map State Filter
      const matchesState =
        selectedState === 'all' ||
        (d.stateKey && d.stateKey.toLowerCase() === selectedState.toLowerCase());

      // 2. Travel Style Category Filter
      const matchesCategory =
        selectedCategory === 'All' || d.category === selectedCategory;

      // 3. Search Query Filter (name, city, state, category, tags)
      if (!searchQuery.trim()) {
        return matchesState && matchesCategory;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        d.name.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        (d.tags && d.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesState && matchesCategory && matchesSearch;
    });
  }, [selectedState, selectedCategory, searchQuery]);

  // Selected state display name
  const activeStateName = useMemo(() => {
    if (selectedState === 'all') return 'All India';
    const pin = STATE_PINS[selectedState];
    if (pin) return pin.name;
    const db = STATE_DATABASE[selectedState];
    return db ? db.name : selectedState.charAt(0).toUpperCase() + selectedState.slice(1);
  }, [selectedState]);

  // Reset all active filters
  const handleResetFilters = () => {
    setSelectedState('all');
    setSelectedCategory('All');
    setSearchQuery('');
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
            {/* 1. Clean Header */}
            <View style={styles.headerTop}>
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
                  <MaterialIcons name="bookmark" size={13} color={theme.gold} />
                  <Text style={[styles.savedHeaderText, { color: theme.textSecondary }]}>
                    {wishlistIds.length} Saved
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* 2. Fast Inline Search Bar */}
            <View
              style={[
                styles.searchBarContainer,
                { backgroundColor: theme.card, borderColor: theme.cardBorder },
              ]}
            >
              <MaterialIcons name="search" size={19} color={theme.primary} />
              <TextInput
                style={[styles.searchInput, { color: theme.text }]}
                placeholder="Search destinations, states, experiences..."
                placeholderTextColor={theme.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {searchQuery.length > 0 ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSearchQuery('')}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <MaterialIcons name="close" size={17} color={theme.textMuted} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onNavigateToSearch}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <MaterialIcons name="tune" size={16} color={theme.primaryLight} />
                </TouchableOpacity>
              )}
            </View>

            {/* 3. Popular Expeditions & Travel Styles Discovery */}
            <View style={styles.discoverySection}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.sectionTitleWrap}>
                  <MaterialIcons name="trending-up" size={15} color={theme.primary} />
                  <Text style={[styles.sectionTitle, { color: theme.text }]}>
                    POPULAR EXPEDITIONS
                  </Text>
                </View>
                <Text style={[styles.sectionSubtitle, { color: theme.textMuted }]}>
                  Curated journeys
                </Text>
              </View>

              {/* Compact Travel Style Filter Chips */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScrollContent}
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

              {/* Horizontal Row of Real Featured Expeditions */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.popularCardsScroll}
              >
                {popularDestinations.map((dest) => {
                  const isSaved = wishlistIds.includes(dest.id);
                  return (
                    <TouchableOpacity
                      key={dest.id}
                      activeOpacity={0.88}
                      onPress={() => onSelectDestination(dest)}
                      style={[
                        styles.popularCard,
                        { backgroundColor: theme.card, borderColor: theme.cardBorder },
                      ]}
                    >
                      <Image
                        source={{ uri: dest.image }}
                        style={styles.popularCardImage}
                        resizeMode="cover"
                      />
                      {/* Rating Badge */}
                      <View style={styles.popularRatingBadge}>
                        <MaterialIcons name="star" size={10.5} color="#FBBF24" />
                        <Text style={styles.popularRatingText}>
                          {dest.rating.toFixed(2)}
                        </Text>
                      </View>

                      {/* Wishlist Bookmark Button */}
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => onToggleWishlist(dest.id)}
                        style={[
                          styles.popularBookmarkBtn,
                          {
                            backgroundColor: isSaved
                              ? theme.primary
                              : 'rgba(0, 0, 0, 0.55)',
                          },
                        ]}
                        hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                      >
                        <MaterialIcons
                          name={isSaved ? 'bookmark' : 'bookmark-border'}
                          size={13}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>

                      {/* Card Content */}
                      <View style={styles.popularCardBody}>
                        <Text
                          style={[styles.popularCardTitle, { color: theme.text }]}
                          numberOfLines={1}
                        >
                          {dest.name}
                        </Text>
                        <Text
                          style={[styles.popularCardLocation, { color: theme.textMuted }]}
                          numberOfLines={1}
                        >
                          {dest.location}
                        </Text>
                        <View style={styles.popularPriceRow}>
                          <Text
                            style={[
                              styles.popularPriceText,
                              { color: theme.primaryLight },
                            ]}
                          >
                            ₹{dest.pricePerNight.toLocaleString('en-IN')}
                          </Text>
                          <Text
                            style={[
                              styles.popularDurationText,
                              { color: theme.textMuted },
                            ]}
                          >
                            • {dest.duration.split(' ')[0]} {dest.duration.split(' ')[1]}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* 4. Interactive Regional SVG Map Section */}
            <IndiaMapExplorer
              selectedState={selectedState}
              onSelectState={setSelectedState}
              theme={theme}
              isDark={isDark}
              stateCounts={stateCounts}
              availableStateIds={availableStateIds}
            />

            {/* 5. Destination Results Section Header */}
            <View style={styles.resultsHeaderRow}>
              <View style={styles.resultsTitleWrap}>
                <MaterialIcons name="place" size={15} color={theme.primary} />
                <Text style={[styles.resultsTitle, { color: theme.text }]}>
                  {selectedState === 'all'
                    ? searchQuery
                      ? `Search Results`
                      : `All Expeditions`
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

              {(selectedState !== 'all' ||
                selectedCategory !== 'All' ||
                searchQuery.length > 0) && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleResetFilters}
                  style={styles.resetFilterButton}
                >
                  <Text style={[styles.resetFilterText, { color: theme.primaryLight }]}>
                    Clear Filter
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
                ? `No current itineraries match "${searchQuery || selectedCategory}" in ${activeStateName}.`
                : 'Try adjusting your search terms or selecting another state on the map.'}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleResetFilters}
              style={[styles.emptyResetBtn, { backgroundColor: theme.primary }]}
            >
              <Text style={styles.emptyResetBtnText}>Reset All Filters</Text>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingTop: 2,
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: 8,
    marginBottom: Spacing.sm + 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 12.5,
    paddingVertical: 0,
  },
  discoverySection: {
    marginBottom: Spacing.sm,
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
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  sectionSubtitle: {
    fontSize: 10,
    fontWeight: '600',
  },
  categoryScrollContent: {
    gap: 6,
    paddingBottom: 8,
  },
  popularCardsScroll: {
    gap: 10,
    paddingBottom: 2,
  },
  popularCard: {
    width: 145,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  popularCardImage: {
    width: '100%',
    height: 88,
    backgroundColor: '#1E1E24',
  },
  popularRatingBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  popularRatingText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '700',
  },
  popularBookmarkBtn: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularCardBody: {
    padding: 7,
  },
  popularCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 1,
  },
  popularCardLocation: {
    fontSize: 10,
    marginBottom: 4,
  },
  popularPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  popularPriceText: {
    fontSize: 11,
    fontWeight: '800',
  },
  popularDurationText: {
    fontSize: 9.5,
    marginLeft: 2,
  },
  resultsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
    paddingHorizontal: 2,
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
  resetFilterButton: {
    paddingVertical: 3,
    paddingHorizontal: 6,
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
