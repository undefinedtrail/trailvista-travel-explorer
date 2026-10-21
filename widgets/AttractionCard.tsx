import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Attraction } from '../models/Attraction';
import { ThemeColors, BorderRadius, Spacing } from '../constants/theme';

interface AttractionCardProps {
  attraction: Attraction;
  theme: ThemeColors;
}

export const AttractionCard: React.FC<AttractionCardProps> = ({ attraction, theme }) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: attraction.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay} />

        {/* Top Badges */}
        <View style={styles.topBadgesRow}>
          <View style={[styles.tagBadge, { backgroundColor: theme.primary }]}>
            <Text style={styles.tagBadgeText}>{attraction.tag}</Text>
          </View>
          <TouchableOpacity
            style={styles.mapPill}
            activeOpacity={0.7}
            onPress={() => {
              const q = encodeURIComponent(attraction.name);
              Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${q}`);
            }}
          >
            <MaterialIcons name="directions" size={12} color="#FFFFFF" style={{ marginRight: 2 }} />
            <Text style={styles.mapPillText}>Maps</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Metadata inside Image */}
        <View style={styles.bottomMetaRow}>
          {attraction.timing && (
            <View style={styles.timingBadge}>
              <MaterialIcons name="schedule" size={12} color="#D1D1D8" style={{ marginRight: 3 }} />
              <Text style={styles.timingText}>{attraction.timing}</Text>
            </View>
          )}
          {attraction.entryFee && (
            <View style={styles.feeBadge}>
              <Text style={styles.feeText}>{attraction.entryFee}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.text }]}>
          {attraction.name}
        </Text>
        <Text style={[styles.description, { color: theme.textMuted }]}>
          {attraction.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
    backgroundColor: '#1E1E24',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  topBadgesRow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.xs,
  },
  mapPillText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.xs,
  },
  tagBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  bottomMetaRow: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: BorderRadius.xs,
  },
  timingText: {
    color: '#EDE9E1',
    fontSize: 10,
    fontWeight: '500',
  },
  feeBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  feeText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '700',
  },
  body: {
    padding: Spacing.sm + 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    lineHeight: 17,
  },
});
