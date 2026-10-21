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
              Search
            </Text>

            {/* Real-time Search Input */}
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={() => setSearchQuery('')}
              theme={theme}
            />

            {/* Horizontal Category Chips */}
            <View style={styles.categorySection}>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsRow}
              >
                {CATEGORIES.map((category) => (
                  <CategoryChip
                    key={category}
                    label={category === 'All' ? 'All Stays' : category}
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
                  Curated Stays
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
                    {filteredDestinations.length} Dispatches
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
                <TouchableOpacity
                  onPress={() => {
                    setSortOption('recommended');
                    setIsSortDropdownOpen(false);
                  }}
                  style={styles.sortOptionItem}
                >
                  <Text
                    style={[
                      styles.sortOptionText,
                      {
                        color:
                          sortOption === 'recommended'
                            ? theme.primaryLight
                            : theme.text,
                        fontWeight:
                          sortOption === 'recommended' ? '700' : '500',
                      },
                    ]}
                  >
                    Recommended
                  </Text>
                  {sortOption === 'recommended' && (
                    <MaterialIcons name="check" size={16} color={theme.primaryLight} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSortOption('rating-desc');
                    setIsSortDropdownOpen(false);
                  }}
                  style={styles.sortOptionItem}
                >
                  <Text
                    style={[
                      styles.sortOptionText,
                      {
                        color:
                          sortOption === 'rating-desc'
                            ? theme.primaryLight
                            : theme.text,
                        fontWeight:
                          sortOption === 'rating-desc' ? '700' : '500',
                      },
                    ]}
                  >
                    Rating: High to Low
                  </Text>
                  {sortOption === 'rating-desc' && (
                    <MaterialIcons name="check" size={16} color={theme.primaryLight} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSortOption('price-asc');
                    setIsSortDropdownOpen(false);
                  }}
                  style={styles.sortOptionItem}
                >
                  <Text
                    style={[
                      styles.sortOptionText,
                      {
                        color:
                          sortOption === 'price-asc'
                            ? theme.primaryLight
                            : theme.text,
                        fontWeight:
                          sortOption === 'price-asc' ? '700' : '500',
                      },
                    ]}
                  >
                    Price: Low to High
                  </Text>
                  {sortOption === 'price-asc' && (
                    <MaterialIcons name="check" size={16} color={theme.primaryLight} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSortOption('price-desc');
                    setIsSortDropdownOpen(false);
                  }}
                  style={styles.sortOptionItem}
                >
                  <Text
                    style={[
                      styles.sortOptionText,
                      {
                        color:
                          sortOption === 'price-desc'
                            ? theme.primaryLight
                            : theme.text,
                        fontWeight:
                          sortOption === 'price-desc' ? '700' : '500',
                      },
                    ]}
                  >
                    Price: High to Low
                  </Text>
                  {sortOption === 'price-desc' && (
                    <MaterialIcons name="check" size={16} color={theme.primaryLight} />
                  )}
                </TouchableOpacity>
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
              styles.emptyStateCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <View
              style={[
                styles.emptyIconCircle,
                { backgroundColor: 'rgba(194, 81, 45, 0.15)' },
              ]}
            >
              <MaterialIcons
                name="travel-explore"
                size={32}
                color={theme.primaryLight}
              />
            </View>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No Stays Found
            </Text>
            <Text style={[styles.emptyDescription, { color: theme.textMuted }]}>
              We couldn't find any destinations matching "{searchQuery}". Try adjusting your keywords or category filter.
            </Text>
            <TouchableOpacity
              onPress={handleResetFilters}
              style={[styles.resetButton, { backgroundColor: theme.primary }]}
            >
              <Text style={styles.resetButtonText}>Reset All Filters</Text>
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
    paddingTop: Spacing.sm,
  },
  headerSection: {
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: Spacing.md,
  },
  categorySection: {
    marginBottom: Spacing.sm,
  },
  categoryLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  categoryHeaderLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  chipsRow: {
    paddingVertical: 2,
    paddingBottom: 6,
  },
  resultsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  resultsBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultsTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  resultsPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  resultsPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    gap: 4,
  },
  sortButtonText: {
    fontSize: 11,
  },
  sortDropdown: {
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    paddingVertical: 4,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  sortOptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sortOptionText: {
    fontSize: 12,
  },
  emptyStateCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  emptyIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptyDescription: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: Spacing.md,
    maxWidth: 260,
  },
  resetButton: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: BorderRadius.md,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
