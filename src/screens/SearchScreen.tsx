import React, { useState, useMemo } from 'react';
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
import { CATEGORIES, MOCK_DESTINATIONS } from '../constants/mockData';
import { ThemeColors, Spacing, BorderRadius } from '../constants/theme';
import { SearchBar } from '../widgets/SearchBar';
import { CategoryChip } from '../widgets/CategoryChip';
import { DestinationCard } from '../widgets/DestinationCard';

type SortOption = 'recommended' | 'rating-desc' | 'price-asc' | 'price-desc';

interface SearchScreenProps {
  onSelectDestination: (destination: Destination) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  theme: ThemeColors;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onSelectDestination,
  wishlistIds,
  onToggleWishlist,
  theme,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory>('All');
  const [sortOption, setSortOption] = useState<SortOption>('recommended');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Popular expeditions using stable popularity ranking
  const popularDestinations = useMemo(() => {
    return [...MOCK_DESTINATIONS]
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 6);
  }, []);

  // Real-time search and filter algorithm
  const filteredDestinations = useMemo(() => {
    let result = MOCK_DESTINATIONS.filter((item) => {
      // Category filter match
      const categoryMatch =
        selectedCategory === 'All' || item.category === selectedCategory;

      // Real-time search query match
      const query = searchQuery.trim().toLowerCase();
      const queryMatch =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.state.toLowerCase().includes(query) ||
        (item.stateKey && item.stateKey.toLowerCase().includes(query)) ||
        item.tags.some((t) => t.toLowerCase().includes(query));

      return categoryMatch && queryMatch;
    });

    // Apply sorting
    if (sortOption === 'rating-desc') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'price-asc') {
      result = [...result].sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortOption === 'price-desc') {
      result = [...result].sort((a, b) => b.pricePerNight - a.pricePerNight);
    }

    return result;
  }, [searchQuery, selectedCategory, sortOption]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortOption('recommended');
  };

  const getSortLabel = () => {
    switch (sortOption) {
      case 'rating-desc':
        return 'Rating: High to Low';
      case 'price-asc':
        return 'Price: Low to High';
      case 'price-desc':
        return 'Price: High to Low';
      default:
        return 'Recommended';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerSection}>
            <Text style={[styles.title, { color: theme.text }]}>
              Search Expeditions
            </Text>

            {/* Real-time Search Input */}
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={() => setSearchQuery('')}
              theme={theme}
            />

            {/* Popular Expeditions Incorporated Under Search */}
            <View style={styles.popularSection}>
              <View style={styles.popularHeaderRow}>
                <View style={styles.popularTitleWrap}>
                  <MaterialIcons name="trending-up" size={15} color={theme.primary} />
                  <Text style={[styles.popularTitle, { color: theme.text }]}>
                    POPULAR EXPEDITIONS
                  </Text>
                </View>
                <Text style={[styles.popularSubtitle, { color: theme.textMuted }]}>
                  Curated journeys
                </Text>
              </View>

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

            {/* Horizontal Travel Style Category Chips */}
            <View style={styles.categorySection}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsRow}
              >
                {CATEGORIES.map((category) => (
                  <CategoryChip
                    key={category}
                    label={category === 'All' ? 'All Expeditions' : category}
                    isSelected={selectedCategory === category}
                    onPress={() => setSelectedCategory(category)}
                    theme={theme}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Results Count and Sort Row */}
            <View style={styles.resultsBar}>
              <View style={styles.resultsBadgeRow}>
                <Text style={[styles.resultsTitle, { color: theme.text }]}>
                  {searchQuery ? `Search Results` : `All Expeditions`}
                </Text>
                <View
                  style={[
                    styles.resultsPill,
                    {
                      backgroundColor: 'rgba(194, 81, 45, 0.12)',
                      borderColor: 'rgba(194, 81, 45, 0.3)',
                    },
                  ]}
                >
                  <Text
                    style={[styles.resultsPillText, { color: theme.primaryLight }]}
                  >
                    {filteredDestinations.length}{' '}
                    {filteredDestinations.length === 1 ? 'place' : 'places'}
                  </Text>
                </View>
              </View>

              {/* Sort Toggle */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                style={[
                  styles.sortButton,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.cardBorder,
                  },
                ]}
              >
                <Text style={[styles.sortButtonText, { color: theme.textMuted }]}>
                  Sort: <Text style={{ color: theme.text, fontWeight: '700' }}>{getSortLabel()}</Text>
                </Text>
                <MaterialIcons
                  name={isSortDropdownOpen ? 'expand-less' : 'expand-more'}
                  size={16}
                  color={theme.primaryLight}
                />
              </TouchableOpacity>
            </View>

            {/* Sort Dropdown Options */}
            {isSortDropdownOpen && (
              <View
                style={[
                  styles.sortDropdown,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.cardBorder,
                  },
                ]}
              >
                {(
                  [
                    { id: 'recommended', label: 'Recommended' },
                    { id: 'rating-desc', label: 'Rating: High to Low' },
                    { id: 'price-asc', label: 'Price: Low to High' },
                    { id: 'price-desc', label: 'Price: High to Low' },
                  ] as { id: SortOption; label: string }[]
                ).map((opt) => (
                  <TouchableOpacity
                    key={opt.id}
                    onPress={() => {
                      setSortOption(opt.id);
                      setIsSortDropdownOpen(false);
                    }}
                    style={[
                      styles.sortOption,
                      sortOption === opt.id && {
                        backgroundColor: 'rgba(194, 81, 45, 0.15)',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.sortOptionText,
                        {
                          color:
                            sortOption === opt.id
                              ? theme.primaryLight
                              : theme.text,
                          fontWeight: sortOption === opt.id ? '700' : '400',
                        },
                      ]}
                    >
                      {opt.label}
                    </Text>
                    {sortOption === opt.id && (
                      <MaterialIcons
                        name="check"
                        size={14}
                        color={theme.primaryLight}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
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
          <View
            style={[
              styles.emptyState,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <MaterialIcons
              name="search-off"
              size={48}
              color={theme.textMuted}
            />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No destinations match your search
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.textMuted }]}>
              {searchQuery
                ? `No results found for "${searchQuery}". Try searching for another city, state, or style.`
                : 'No destinations match the selected filters.'}
            </Text>
            <TouchableOpacity
              onPress={handleResetFilters}
              style={[
                styles.resetButton,
                { backgroundColor: theme.primary },
              ]}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
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
  headerSection: {
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: Spacing.sm,
    paddingTop: 2,
  },
  popularSection: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  popularHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  popularTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  popularTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  popularSubtitle: {
    fontSize: 10,
    fontWeight: '600',
  },
  popularCardsScroll: {
    gap: 10,
    paddingBottom: 4,
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
  categorySection: {
    marginVertical: Spacing.xs + 2,
  },
  chipsRow: {
    gap: 6,
    paddingBottom: 2,
  },
  resultsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Spacing.xs + 2,
    paddingHorizontal: 2,
  },
  resultsBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  resultsTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  resultsPill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  resultsPillText: {
    fontSize: 10,
    fontWeight: '700',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  sortButtonText: {
    fontSize: 11,
  },
  sortDropdown: {
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  sortOptionText: {
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginTop: Spacing.lg,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 18,
  },
  resetButton: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: BorderRadius.full,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
