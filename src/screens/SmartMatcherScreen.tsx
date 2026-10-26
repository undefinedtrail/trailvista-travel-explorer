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
import { Destination } from '../models/Destination';
import { MOCK_DESTINATIONS } from '../constants/mockData';
import { ThemeColors, BorderRadius, Spacing } from '../constants/theme';

interface SmartMatcherScreenProps {
  onSelectDestination: (dest: Destination) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  theme: ThemeColors;
}

const TRAVEL_STYLES = [
  'Mountains',
  'Beach',
  'Heritage',
  'Adventure',
  'Nature',
  'Culture',
];

const PACE_OPTIONS = [
  { id: 'Relaxed', label: 'Relaxed', sub: 'Scenic & Serene' },
  { id: 'Curated', label: 'Curated', sub: 'Balanced Highlights' },
  { id: 'Immersive', label: 'Immersive', sub: 'Trails & Expeditions' },
];

const DURATION_OPTIONS = ['1–2 days', '3–4 days', '5+ days'];

export const SmartMatcherScreen: React.FC<SmartMatcherScreenProps> = ({
  onSelectDestination,
  wishlistIds,
  onToggleWishlist,
  theme,
}) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('Mountains');
  const [selectedPace, setSelectedPace] = useState<string>('Curated');
  const [selectedDuration, setSelectedDuration] = useState<string>('3–4 days');

  // Dynamically compute ranked matches
  const rankedDestinations = useMemo(() => {
    const list = MOCK_DESTINATIONS.map((dest) => {
      let score = 0;
      const reasons: string[] = [];

      // 1. Style Scoring (up to 45 pts)
      const catLower = dest.category.toLowerCase();
      const styleLower = selectedStyle.toLowerCase();
      const styleMatchesCat = catLower.includes(styleLower) ||
        (selectedStyle === 'Beach' && catLower.includes('beaches')) ||
        (selectedStyle === 'Mountains' && catLower.includes('mountains'));

      const tagMatch = dest.tags.some((t) => {
        const tl = t.toLowerCase();
        if (tl.includes(styleLower)) return true;
        if (selectedStyle === 'Nature' && ['wildlife', 'tea', 'spices', 'lake', 'river', 'forest', 'lagoon'].some(k => tl.includes(k))) return true;
        if (selectedStyle === 'Culture' && ['monastery', 'artisan', 'monks', 'craft', 'rituals', 'heritage'].some(k => tl.includes(k))) return true;
        if (selectedStyle === 'Adventure' && ['trek', 'safari', 'pass', 'high-pass', 'rafting', 'scuba', 'bactrian'].some(k => tl.includes(k))) return true;
        if (selectedStyle === 'Beach' && ['backwaters', 'lagoon', 'beach', 'coral', 'cove', 'shoreline'].some(k => tl.includes(k))) return true;
        return false;
      });

      if (styleMatchesCat) {
        score += 45;
        reasons.push(`${selectedStyle} Spot`);
      } else if (tagMatch) {
        score += 36;
        reasons.push(`${selectedStyle} Experience`);
      } else {
        score += 15;
      }

      // 2. Pace & Experience Scoring (up to 30 pts)
      if (selectedPace === 'Relaxed') {
        if (
          dest.category === 'Beaches' ||
          dest.tags.some((t) =>
            ['Backwaters', 'Tea Plantations', 'Lakes', 'Spiritual'].includes(t)
          )
        ) {
          score += 30;
          reasons.push('Relaxed Pace');
        } else {
          score += 15;
        }
      } else if (selectedPace === 'Curated') {
        if (dest.category === 'Heritage' || dest.rating >= 4.7) {
          score += 30;
          reasons.push('Curated Highlights');
        } else {
          score += 20;
        }
      } else if (selectedPace === 'Immersive') {
        if (
          dest.category === 'Adventure' ||
          dest.category === 'Mountains' ||
          dest.tags.some((t) =>
            ['High Passes', 'Safaris', 'Caving', 'White Water'].includes(t)
          )
        ) {
          score += 30;
          reasons.push('Expedition Match');
        } else {
          score += 15;
        }
      }

      // 3. Duration Scoring (up to 25 pts)
      const days = parseInt(dest.duration.split(' ')[0], 10) || 3;
      if (selectedDuration === '1–2 days') {
        if (days <= 3) {
          score += 25;
          reasons.push('Short Trip');
        } else {
          score += 12;
        }
      } else if (selectedDuration === '3–4 days') {
        if (days === 3 || days === 4) {
          score += 25;
          reasons.push('Ideal Days');
        } else {
          score += 14;
        }
      } else if (selectedDuration === '5+ days') {
        if (days >= 5) {
          score += 25;
          reasons.push('Deep Itinerary');
        } else if (days === 4) {
          score += 18;
        } else {
          score += 10;
        }
      }

      // 4. Rating Bonus (up to 5 pts)
      const ratingBonus = Math.round((dest.rating / 5.0) * 5);
      score += ratingBonus;

      // Normalize match percentage
      const matchPercent = Math.min(98, Math.max(68, score));
      return {
        destination: dest,
        matchPercent,
        reasons: reasons.slice(0, 3),
      };
    });

    // Sort descending by match score
    return list.sort((a, b) => b.matchPercent - a.matchPercent);
  }, [selectedStyle, selectedPace, selectedDuration]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={rankedDestinations}
        keyExtractor={(item) => item.destination.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerArea}>
            {/* Smart Destination Matcher Title */}
            <View style={styles.titleBadgeRow}>
              <View style={[styles.sparkleCircle, { backgroundColor: theme.primary }]}>
                <MaterialIcons name="tune" size={16} color="#FFFFFF" />
              </View>
              <Text style={[styles.pageTitle, { color: theme.text }]}>
                Find My Trip
              </Text>
            </View>
            <Text style={[styles.pageSubtitle, { color: theme.textMuted }]}>
              Personalized destination recommendations calculated in real time.
            </Text>

            {/* Travel Style Selector */}
            <View style={styles.controlGroup}>
              <Text style={[styles.groupLabel, { color: theme.textSecondary }]}>
                TRAVEL STYLE
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsRow}
              >
                {TRAVEL_STYLES.map((style) => {
                  const isSelected = selectedStyle === style;
                  return (
                    <TouchableOpacity
                      key={style}
                      activeOpacity={0.7}
                      onPress={() => setSelectedStyle(style)}
                      style={[
                        styles.chip,
                        {
                          backgroundColor: isSelected ? theme.primary : theme.chipIdle,
                          borderColor: isSelected ? theme.primary : theme.cardBorder,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          { color: isSelected ? '#FFFFFF' : theme.textMuted },
                        ]}
                      >
                        {style}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Travel Pace Selector */}
            <View style={styles.controlGroup}>
              <Text style={[styles.groupLabel, { color: theme.textSecondary }]}>
                TRAVEL PACE
              </Text>
              <View style={styles.budgetRow}>
                {PACE_OPTIONS.map((item) => {
                  const isSelected = selectedPace === item.id;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.7}
                      onPress={() => setSelectedPace(item.id)}
                      style={[
                        styles.budgetCard,
                        {
                          backgroundColor: isSelected ? 'rgba(194, 81, 45, 0.15)' : theme.card,
                          borderColor: isSelected ? theme.primary : theme.cardBorder,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.budgetLabel,
                          { color: isSelected ? theme.primaryLight : theme.text },
                        ]}
                      >
                        {item.label}
                      </Text>
                      <Text style={[styles.budgetSub, { color: theme.textMuted }]}>
                        {item.sub}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Duration Selector */}
            <View style={styles.controlGroup}>
              <Text style={[styles.groupLabel, { color: theme.textSecondary }]}>
                DURATION
              </Text>
              <View style={styles.durationRow}>
                {DURATION_OPTIONS.map((dur) => {
                  const isSelected = selectedDuration === dur;
                  return (
                    <TouchableOpacity
                      key={dur}
                      activeOpacity={0.7}
                      onPress={() => setSelectedDuration(dur)}
                      style={[
                        styles.durationBtn,
                        {
                          backgroundColor: isSelected ? theme.primary : theme.chipIdle,
                          borderColor: isSelected ? theme.primary : theme.cardBorder,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.durationBtnText,
                          { color: isSelected ? '#FFFFFF' : theme.textSecondary },
                        ]}
                      >
                        {dur}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Results Header */}
            <View style={styles.resultsHeader}>
              <Text style={[styles.resultsTitle, { color: theme.text }]}>
                Top Matches ({rankedDestinations.length})
              </Text>
              <Text style={[styles.resultsHint, { color: theme.primaryLight }]}>
                Ranked by compatibility
              </Text>
            </View>
          </View>
        }
        renderItem={({ item, index }) => {
          const dest = item.destination;
          const isSaved = wishlistIds.includes(dest.id);
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onSelectDestination(dest)}
              style={[
                styles.matchCard,
                {
                  backgroundColor: theme.card,
                  borderColor: index === 0 ? theme.primary : theme.cardBorder,
                },
              ]}
            >
              <View style={styles.matchImageContainer}>
                <Image
                  source={{ uri: dest.image }}
                  style={styles.matchImage}
                  resizeMode="cover"
                />
                <View style={styles.imageOverlay} />

                {/* Score Banner: e.g. "96% Match" */}
                <View
                  style={[
                    styles.matchScoreBadge,
                    {
                      backgroundColor:
                        item.matchPercent >= 90
                          ? 'rgba(16, 185, 129, 0.92)'
                          : 'rgba(217, 142, 50, 0.92)',
                    },
                  ]}
                >
                  <MaterialIcons name="track-changes" size={12} color="#FFFFFF" />
                  <Text style={styles.matchScoreText}>
                    {item.matchPercent}% Match
                  </Text>
                </View>

                {/* Wishlist Bookmark Button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => onToggleWishlist(dest.id)}
                  style={styles.bookmarkBtn}
                >
                  <MaterialIcons
                    name={isSaved ? 'favorite' : 'favorite-border'}
                    size={18}
                    color={isSaved ? '#EF4444' : '#FFFFFF'}
                  />
                </TouchableOpacity>

                {/* Bottom Photo Gradient Info */}
                <View style={styles.imageBottomText}>
                  <Text style={styles.matchCardTitle} numberOfLines={1}>
                    {dest.name} — {item.matchPercent}% Match
                  </Text>
                  <Text style={styles.matchCardLocation} numberOfLines={1}>
                    {dest.location}
                  </Text>
                </View>
              </View>

              {/* Match Card Body */}
              <View style={styles.matchCardBody}>
                {/* Rationale Pills */}
                <View style={styles.reasonsRow}>
                  {item.reasons.map((r, i) => (
                    <View
                      key={i}
                      style={[
                        styles.reasonPill,
                        { backgroundColor: theme.chipIdle, borderColor: theme.chipBorder },
                      ]}
                    >
                      <Text style={[styles.reasonPillText, { color: theme.primaryLight }]}>
                        ✓ {r}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Metadata Row */}
                <View style={styles.metaRow}>
                  <View style={styles.metaLeft}>
                    <Text style={[styles.metaDuration, { color: theme.text }]}>
                      {dest.duration}
                    </Text>
                    <Text style={[styles.metaDurationSub, { color: theme.textMuted }]}>
                      • {dest.state}
                    </Text>
                  </View>

                  <View style={styles.viewLink}>
                    <Text style={[styles.viewLinkText, { color: theme.primaryLight }]}>
                      Explore Itinerary
                    </Text>
                    <MaterialIcons name="arrow-forward" size={14} color={theme.primaryLight} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
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
  headerArea: {
    marginBottom: Spacing.sm,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sparkleCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  pageSubtitle: {
    fontSize: 12,
    marginBottom: Spacing.md,
  },
  controlGroup: {
    marginBottom: Spacing.md,
  },
  groupLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  chipsRow: {
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  budgetRow: {
    flexDirection: 'row',
    gap: 8,
  },
  budgetCard: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  budgetLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  budgetSub: {
    fontSize: 10,
    marginTop: 2,
  },
  durationRow: {
    flexDirection: 'row',
    gap: 8,
  },
  durationBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  durationBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    marginTop: 4,
  },
  resultsTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  resultsHint: {
    fontSize: 11,
    fontWeight: '600',
  },
  matchCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  matchImageContainer: {
    width: '100%',
    height: 150,
    position: 'relative',
    backgroundColor: '#1E1E24',
  },
  matchImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  matchScoreBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  matchScoreText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  bookmarkBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBottomText: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    right: 12,
  },
  matchCardTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  matchCardLocation: {
    color: '#D1D5DB',
    fontSize: 11,
    marginTop: 2,
  },
  matchCardBody: {
    padding: Spacing.sm + 2,
  },
  reasonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  reasonPill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
    borderWidth: 1,
  },
  reasonPillText: {
    fontSize: 10,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  metaDuration: {
    fontSize: 14,
    fontWeight: '800',
  },
  metaDurationSub: {
    fontSize: 11,
  },
  viewLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewLinkText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
