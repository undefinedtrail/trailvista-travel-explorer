import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Destination } from '../models/Destination';
import { ThemeColors, BorderRadius, Spacing } from '../constants/theme';

interface DestinationCardProps {
  destination: Destination;
  isSaved: boolean;
  onPress: () => void;
  onToggleWishlist: () => void;
  theme: ThemeColors;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  isSaved,
  onPress,
  onToggleWishlist,
  theme,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
        },
      ]}
    >
      {/* Top Image Banner */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: destination.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Gradient Overlay Simulation */}
        <View style={styles.imageOverlay} />

        {/* Category & Region Tags */}
        <View style={styles.tagBadgeRow}>
          <View style={[styles.categoryTag, { backgroundColor: theme.primary }]}>
            <Text style={styles.categoryTagText}>{destination.category}</Text>
          </View>
          {destination.duration && (
            <View style={styles.durationTag}>
              <MaterialIcons name="schedule" size={11} color="#FFFFFF" style={{ marginRight: 3 }} />
              <Text style={styles.durationTagText}>{destination.duration}</Text>
            </View>
          )}
        </View>

        {/* Heart Wishlist Action Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          style={[
            styles.wishlistButton,
            isSaved && { backgroundColor: 'rgba(194, 81, 45, 0.9)' },
          ]}
          accessibilityLabel={`Save ${destination.name} to wishlist`}
        >
          <MaterialIcons
            name={isSaved ? 'favorite' : 'favorite-border'}
            size={18}
            color={isSaved ? '#FFFFFF' : '#EDE7E1'}
          />
        </TouchableOpacity>

        {/* Bottom Image Stats (Rating & Weather) */}
        <View style={styles.imageBottomRow}>
          <View style={styles.ratingBadge}>
            <MaterialIcons name="star" size={13} color={theme.gold} />
            <Text style={styles.ratingText}>{destination.rating.toFixed(2)}</Text>
            <Text style={styles.reviewCountText}>({destination.reviewsCount})</Text>
          </View>
          <View style={styles.weatherBadge}>
            <MaterialIcons name="wb-sunny" size={12} color="#FBBF24" style={{ marginRight: 3 }} />
            <Text style={styles.weatherText}>{destination.weather}</Text>
          </View>
        </View>
      </View>

      {/* Card Body Content */}
      <View style={styles.content}>
        {/* Itinerary Code & Subtitle (Stitch Boutique Editorial) */}
        {destination.itineraryCode && (
          <View style={styles.itineraryCodeRow}>
            <Text style={[styles.itineraryCodeText, { color: theme.primaryLight }]}>
              {destination.itineraryCode}
            </Text>
            {destination.subtitle && (
              <Text style={[styles.itinerarySubtitleText, { color: theme.textMuted }]}>
                • {destination.subtitle}
              </Text>
            )}
          </View>
        )}

        {/* Location & Title */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1, paddingRight: Spacing.sm }}>
            <View style={styles.locationRow}>
              <MaterialIcons name="location-on" size={12} color={theme.primaryLight} />
              <Text style={[styles.locationText, { color: theme.primaryLight }]}>
                {destination.location}
              </Text>
            </View>
            <Text
              style={[styles.title, { color: theme.text }]}
              numberOfLines={2}
            >
              {destination.name}
            </Text>
          </View>

          {/* Duration Badge */}
          <View style={[styles.durationBadge, { backgroundColor: theme.chipIdle }]}>
            <MaterialIcons name="schedule" size={12} color={theme.primary} />
            <Text style={[styles.durationBadgeText, { color: theme.text }]}>
              {destination.duration}
            </Text>
          </View>
        </View>

        {/* Short Editorial Description */}
        <Text
          style={[styles.description, { color: theme.textSecondary }]}
          numberOfLines={2}
        >
          {destination.description}
        </Text>

        {/* Highlights List Preview */}
        {destination.highlights && destination.highlights.length > 0 && (
          <View style={[styles.highlightsContainer, { backgroundColor: theme.chipIdle }]}>
            {destination.highlights.slice(0, 2).map((h, i) => (
              <View key={i} style={styles.highlightItem}>
                <MaterialIcons name="check-circle" size={12} color={theme.primary} style={{ marginTop: 2 }} />
                <Text style={[styles.highlightText, { color: theme.text }]} numberOfLines={1}>
                  {h}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Inclusions Chips Preview */}
        {destination.includes && destination.includes.length > 0 && (
          <View style={styles.inclusionsRow}>
            {destination.includes.slice(0, 3).map((inc, i) => (
              <View key={i} style={[styles.inclusionPill, { borderColor: theme.cardBorder }]}>
                <Text style={[styles.inclusionText, { color: theme.textMuted }]}>
                  {inc}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Action Button & Best Time Footer */}
        <View style={[styles.cardFooter, { borderTopColor: theme.cardBorder }]}>
          <View style={styles.seasonRow}>
            <MaterialIcons name="event" size={13} color={theme.textMuted} />
            <Text style={[styles.seasonText, { color: theme.textMuted }]} numberOfLines={1}>
              {destination.bestTimeToVisit}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[styles.fieldNotesBtn, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.fieldNotesBtnText}>Field Notes</Text>
            <MaterialIcons name="arrow-forward" size={13} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  imageContainer: {
    height: 195,
    width: '100%',
    position: 'relative',
    backgroundColor: '#1E2028',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  tagBadgeRow: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    flexDirection: 'row',
    gap: 6,
    zIndex: 2,
  },
  categoryTag: {
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: BorderRadius.full,
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  durationTag: {
    backgroundColor: 'rgba(18, 19, 22, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: BorderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  durationTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  wishlistButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(18, 19, 22, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  imageBottomRow: {
    position: 'absolute',
    bottom: Spacing.xs + 4,
    left: Spacing.sm,
    right: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(18, 19, 22, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  reviewCountText: {
    fontSize: 9.5,
    color: '#A0A0AB',
  },
  weatherBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 19, 22, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  weatherText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    padding: Spacing.md - 2,
  },
  itineraryCodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  itineraryCodeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  itinerarySubtitleText: {
    fontSize: 10,
    fontWeight: '600',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 2,
  },
  locationText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
    lineHeight: 21,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.xs,
  },
  durationBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 8,
  },
  highlightsContainer: {
    borderRadius: BorderRadius.sm,
    padding: 8,
    gap: 4,
    marginBottom: 8,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  highlightText: {
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
  inclusionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 8,
  },
  inclusionPill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
    borderWidth: 1,
  },
  inclusionText: {
    fontSize: 9.5,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
  },
  seasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    marginRight: 8,
  },
  seasonText: {
    fontSize: 10.5,
    fontWeight: '500',
  },
  fieldNotesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
  },
  fieldNotesBtnText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
