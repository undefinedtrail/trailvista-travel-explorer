import React, { useState, useMemo } from 'react';
import {
  Alert,
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
import { CategoryChip } from '../widgets/CategoryChip';

interface WishlistScreenProps {
  wishlistIds: string[];
  onSelectDestination: (destination: Destination) => void;
  onRemoveFromWishlist: (id: string) => void;
  onClearWishlist: () => void;
  onNavigateToHome: () => void;
  onShowToast: (message: string) => void;
  theme: ThemeColors;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  wishlistIds,
  onSelectDestination,
  onRemoveFromWishlist,
  onClearWishlist,
  onNavigateToHome,
  onShowToast,
  theme,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<DestinationCategory>('All');

  // Match saved IDs with mock destinations
  const savedDestinations = useMemo(() => {
    return MOCK_DESTINATIONS.filter((item) => wishlistIds.includes(item.id));
  }, [wishlistIds]);

  // Filter within wishlist by category
  const filteredSaved = useMemo(() => {
    if (selectedFilter === 'All') return savedDestinations;
    return savedDestinations.filter((d) => d.category === selectedFilter);
  }, [savedDestinations, selectedFilter]);

  const handleExportItinerary = () => {
    onShowToast(`Compiling ${savedDestinations.length} saved destinations into field journal JSON...`);
    setTimeout(() => {
      onShowToast('✓ Itinerary exported & ready for offline travel!');
    }, 1200);
  };

  const handlePromptClear = () => {
    Alert.alert(
      'Clear All Saved Journeys',
      'Are you sure you want to remove all saved destinations from your wishlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            onClearWishlist();
            onShowToast('Wishlist cleared.');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={filteredSaved}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerSection}>
            <View style={styles.headerTitleRow}>
              <View style={styles.headerTitleLeft}>
                <Text style={[styles.mainTitle, { color: theme.text }]}>
                  Saved Journeys
                </Text>
                <View style={[styles.savedCountBadge, { backgroundColor: theme.chipIdle }]}>
                  <Text style={[styles.savedCountText, { color: theme.primaryLight }]}>
                    {savedDestinations.length}
                  </Text>
                </View>
              </View>

              {savedDestinations.length > 0 && (
                <TouchableOpacity
                  onPress={handlePromptClear}
                  style={styles.clearHeaderBtn}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="delete-outline" size={15} color="#EF4444" />
                  <Text style={styles.clearHeaderBtnText}>Clear All</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Category Filter Chips */}
            {savedDestinations.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterChipsRow}
              >
                {CATEGORIES.map((cat) => {
                  const count =
                    cat === 'All'
                      ? savedDestinations.length
                      : savedDestinations.filter((d) => d.category === cat).length;
                  if (cat !== 'All' && count === 0) return null;
                  return (
                    <CategoryChip
                      key={cat}
                      label={cat === 'All' ? `All Saved (${count})` : `${cat} (${count})`}
                      isSelected={selectedFilter === cat}
                      onPress={() => setSelectedFilter(cat)}
                      theme={theme}
                    />
                  );
                })}
              </ScrollView>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onSelectDestination(item)}
            style={[
              styles.wishlistCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            {/* Top Image Preview */}
            <View style={styles.cardImageContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.cardImageOverlay} />

              {/* Category Badge */}
              <View style={styles.cardCategoryPill}>
                <Text style={styles.cardCategoryText}>{item.category}</Text>
              </View>

              {/* Delete / Remove Action Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  onRemoveFromWishlist(item.id);
                  onShowToast(`Removed ${item.name} from wishlist`);
                }}
                style={styles.removeButton}
                accessibilityLabel={`Remove ${item.name} from wishlist`}
              >
                <MaterialIcons name="delete" size={17} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Rating & Timestamp inside Image */}
              <View style={styles.cardBottomOverlayRow}>
                <View style={styles.ratingBox}>
                  <MaterialIcons name="star" size={13} color={theme.gold} />
                  <Text style={styles.ratingBoxText}>{item.rating.toFixed(2)}</Text>
                </View>
                <Text style={styles.savedTimestampText}>Saved to Storage</Text>
              </View>
            </View>

            {/* Card Body */}
            <View style={styles.cardBody}>
              <View style={styles.cardTitleRow}>
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <Text style={[styles.cardTitle, { color: theme.text }]}>
                    {item.name}
                  </Text>
                  <View style={styles.cardLocationRow}>
                    <MaterialIcons
                      name="location-on"
                      size={13}
                      color={theme.primaryLight}
                    />
                    <Text
                      style={[styles.cardLocationText, { color: theme.textMuted }]}
                    >
                      {item.location}
                    </Text>
                  </View>
                </View>
                <View style={[styles.cardDurationBadge, { backgroundColor: theme.chipIdle }]}>
                  <MaterialIcons name="schedule" size={11} color={theme.primary} />
                  <Text style={[styles.cardDurationText, { color: theme.text }]}>
                    {item.duration}
                  </Text>
                </View>
              </View>

              <Text
                style={[styles.cardExcerpt, { color: theme.textSecondary }]}
                numberOfLines={2}
              >
                {item.description}
              </Text>

              {/* Card Footer with View Dossier */}
              <View
                style={[styles.cardActionFooter, { borderTopColor: theme.cardBorder }]}
              >
                <Text style={[styles.highlightsTag, { color: theme.secondary }]}>
                  {item.attractions.length} Curated Attractions
                </Text>
                <View style={styles.viewDossierLink}>
                  <Text
                    style={[styles.viewDossierText, { color: theme.primaryLight }]}
                  >
                    View Details
                  </Text>
                  <MaterialIcons
                    name="arrow-forward"
                    size={15}
                    color={theme.primaryLight}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View
            style={[
              styles.emptyNotebookCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <View
              style={[
                styles.emptyNotebookIconWrap,
                { backgroundColor: 'rgba(194, 81, 45, 0.15)' },
              ]}
            >
              <MaterialIcons
                name="bookmark-border"
                size={34}
                color={theme.primaryLight}
              />
            </View>
            <Text style={[styles.emptyNotebookTitle, { color: theme.text }]}>
              Your Wishlist is Empty
            </Text>
            <Text
              style={[styles.emptyNotebookDesc, { color: theme.textMuted }]}
            >
              Save journeys from Explore or Search to plan your adventures here. Tap the heart or bookmark icon on any destination card to add it to your wishlist.
            </Text>
            <TouchableOpacity
              onPress={onNavigateToHome}
              style={[styles.exploreButton, { backgroundColor: theme.primary }]}
            >
              <MaterialIcons name="explore" size={16} color="#FFFFFF" />
              <Text style={styles.exploreButtonText}>Discover Destinations</Text>
            </TouchableOpacity>
          </View>
        }
        ListFooterComponent={
          savedDestinations.length > 0 ? (
            <View style={styles.footerActionsArea}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleExportItinerary}
                style={[styles.exportButton, { backgroundColor: theme.primary }]}
              >
                <MaterialIcons name="file-download" size={17} color="#FFFFFF" />
                <Text style={styles.exportButtonText}>
                  Export Itinerary (JSON / PDF)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handlePromptClear}
                style={[styles.clearButton, { borderColor: theme.cardBorder }]}
              >
                <MaterialIcons name="delete-sweep" size={18} color="#EF4444" />
                <Text style={styles.clearButtonText}>Clear Entire Wishlist</Text>
              </TouchableOpacity>

              <View style={{ height: 100 }} />
            </View>
          ) : (
            <View style={{ height: 100 }} />
          )
        }
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
    marginBottom: Spacing.md,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  headerTitleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clearHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.xs,
  },
  clearHeaderBtnText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '700',
  },
  savedCountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  savedCountText: {
    fontSize: 12,
    fontWeight: '700',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  filterChipsRow: {
    paddingVertical: 6,
  },
  wishlistCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImageContainer: {
    width: '100%',
    height: 160,
    position: 'relative',
    backgroundColor: '#1E1E24',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardCategoryPill: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.xs,
  },
  cardCategoryText: {
    color: '#EDE9E1',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(186, 26, 26, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBottomOverlayRow: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: BorderRadius.xs,
    gap: 3,
  },
  ratingBoxText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  savedTimestampText: {
    color: '#D1D1D8',
    fontSize: 10,
    fontWeight: '500',
  },
  cardBody: {
    padding: Spacing.md,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  cardLocationText: {
    fontSize: 11,
    marginLeft: 2,
  },
  cardDurationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3.5,
    borderRadius: BorderRadius.xs,
  },
  cardDurationText: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  cardExcerpt: {
    fontSize: 12,
    lineHeight: 18,
    marginVertical: 6,
  },
  cardActionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    marginTop: 4,
  },
  highlightsTag: {
    fontSize: 11,
    fontWeight: '600',
  },
  viewDossierLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewDossierText: {
    fontSize: 12,
    fontWeight: '700',
  },
  emptyNotebookCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  emptyNotebookIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  emptyNotebookTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptyNotebookDesc: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    maxWidth: 260,
    marginBottom: Spacing.lg,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footerActionsArea: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
  },
  exportButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  clearButtonText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
});
