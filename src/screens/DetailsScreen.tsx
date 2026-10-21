import React, { useEffect, useState, useMemo } from 'react';
import {
  Image,
  Linking,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Destination } from '../models/Destination';
import { ThemeColors, Spacing, BorderRadius } from '../constants/theme';
import { AttractionCard } from '../widgets/AttractionCard';
import { WeatherService, WeatherData } from '../services/weatherService';

interface DetailsScreenProps {
  destination: Destination;
  onGoBack: () => void;
  isSaved: boolean;
  onToggleWishlist: () => void;
  theme: ThemeColors;
  onShowToast: (message: string) => void;
}

export const DetailsScreen: React.FC<DetailsScreenProps> = ({
  destination,
  onGoBack,
  isSaved,
  onToggleWishlist,
  theme,
  onShowToast,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: destination.weather.split(' ')[0] || '24°C',
    condition: destination.weather,
    iconName: 'wb-sunny',
    isLive: false,
  });

  useEffect(() => {
    let isMounted = true;
    WeatherService.getLiveWeather(destination.id, destination.weather).then((res) => {
      if (isMounted) setWeatherData(res);
    });
    return () => {
      isMounted = false;
    };
  }, [destination.id, destination.weather]);

  // Gesture back swipe: horizontal rightward swipe seamlessly triggers onGoBack
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          // Trigger when swipe is predominantly horizontal from left to right
          return (
            gestureState.dx > 25 &&
            Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.5 &&
            gestureState.vx > 0.2
          );
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx > 60 || gestureState.vx > 0.45) {
            onGoBack();
          }
        },
      }),
    [onGoBack]
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background }]}
      {...panResponder.panHandlers}
    >
      {/* Scrollable Dossier View */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cinematic Hero Header */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: destination.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroGradientOverlay} />

          {/* Top Navigation Row */}
          <View style={styles.topNavRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onGoBack}
              style={[
                styles.navButton,
                { backgroundColor: 'rgba(18, 19, 22, 0.85)' },
              ]}
              accessibilityLabel="Go back"
            >
              <MaterialIcons name="arrow-back" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={{ flex: 1 }} />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onToggleWishlist}
              style={[
                styles.navButton,
                { backgroundColor: 'rgba(18, 19, 22, 0.85)' },
              ]}
              accessibilityLabel="Toggle wishlist bookmark"
            >
              <MaterialIcons
                name={isSaved ? 'favorite' : 'favorite-border'}
                size={20}
                color={isSaved ? '#E06D46' : '#FFFFFF'}
              />
            </TouchableOpacity>
          </View>

          {/* Hero Bottom Info Overlay */}
          <View style={styles.heroBottomRow}>
            <View style={{ flex: 1, paddingRight: Spacing.sm }}>
              <View style={styles.seasonBadge}>
                <MaterialIcons name="calendar-month" size={13} color="#FBBF24" />
                <Text style={styles.seasonText}>{destination.bestTimeToVisit}</Text>
              </View>
              <Text style={styles.heroTitle}>{destination.name}</Text>
              <View style={styles.heroLocationRow}>
                <MaterialIcons name="location-on" size={14} color={theme.primaryLight} />
                <Text style={styles.heroLocationText}>{destination.location}</Text>
              </View>
            </View>

            <View style={styles.heroRatingBox}>
              <View style={styles.starRow}>
                <MaterialIcons name="star" size={14} color={theme.gold} />
                <Text style={styles.ratingNumber}>
                  {destination.rating.toFixed(2)}
                </Text>
              </View>
              <Text style={styles.ratingReviews}>
                {destination.reviewsCount} logs
              </Text>
            </View>
          </View>
        </View>

        {/* Key Quick Facts Grid */}
        <View style={styles.bodyContent}>
          <View style={styles.keyFactsGrid}>
            <View
              style={[
                styles.factCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <MaterialIcons
                name="schedule"
                size={20}
                color={theme.primaryLight}
              />
              <Text style={[styles.factLabel, { color: theme.textMuted }]}>
                DURATION
              </Text>
              <Text style={[styles.factValue, { color: theme.text }]}>
                {destination.duration}
              </Text>
            </View>

            <View
              style={[
                styles.factCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <MaterialIcons
                name={(weatherData.iconName as any) || 'wb-sunny'}
                size={20}
                color={weatherData.isLive ? '#10B981' : theme.gold}
              />
              <Text style={[styles.factLabel, { color: theme.textMuted }]}>
                {weatherData.isLive ? 'WEATHER • LIVE' : 'WEATHER'}
              </Text>
              <Text style={[styles.factValue, { color: theme.text }]}>
                {weatherData.temperature}
              </Text>
            </View>

            <View
              style={[
                styles.factCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <MaterialIcons
                name="category"
                size={20}
                color={theme.secondary}
              />
              <Text style={[styles.factLabel, { color: theme.textMuted }]}>
                CATEGORY
              </Text>
              <Text style={[styles.factValue, { color: theme.text }]}>
                {destination.category}
              </Text>
            </View>
          </View>

          {/* Live Weather Indicator Bar */}
          {weatherData.isLive && (
            <View
              style={[
                styles.liveWeatherBanner,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <View style={styles.liveWeatherLeft}>
                <View style={[styles.liveWeatherDot, { backgroundColor: '#10B981' }]} />
                <Text style={[styles.liveWeatherCondition, { color: theme.textSecondary }]}>
                  {weatherData.condition}
                </Text>
              </View>
              <View style={styles.liveWeatherMetrics}>
                {weatherData.humidity && (
                  <View style={styles.liveMetricPill}>
                    <MaterialIcons name="water-drop" size={11} color="#60A5FA" />
                    <Text style={[styles.liveMetricText, { color: theme.textMuted }]}>
                      {weatherData.humidity}
                    </Text>
                  </View>
                )}
                {weatherData.windSpeed && (
                  <View style={styles.liveMetricPill}>
                    <MaterialIcons name="air" size={11} color="#34D399" />
                    <Text style={[styles.liveMetricText, { color: theme.textMuted }]}>
                      {weatherData.windSpeed}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Prominent Google Maps Navigation Card */}
          <TouchableOpacity
            style={[
              styles.googleMapsCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.primary,
              },
            ]}
            activeOpacity={0.75}
            onPress={() => {
              const query = encodeURIComponent(`${destination.name}, ${destination.location}`);
              Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
            }}
          >
            <View style={styles.googleMapsLeft}>
              <View style={[styles.mapIconCircle, { backgroundColor: theme.primary }]}>
                <MaterialIcons name="navigation" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.googleMapsTextCol}>
                <View style={styles.googleMapsTitleRow}>
                  <Text style={[styles.googleMapsTitle, { color: theme.text }]}>
                    Open in Google Maps
                  </Text>
                  <View style={[styles.navPillBadge, { backgroundColor: 'rgba(194, 81, 45, 0.18)' }]}>
                    <Text style={[styles.navPillBadgeText, { color: theme.primaryLight }]}>
                      LIVE ROUTE
                    </Text>
                  </View>
                </View>
                <Text style={[styles.googleMapsSubtitle, { color: theme.textMuted }]} numberOfLines={1}>
                  {destination.name} • {destination.location}
                </Text>
              </View>
            </View>
            <MaterialIcons name="open-in-new" size={18} color={theme.primary} />
          </TouchableOpacity>

          {/* Overview Description Section */}
          <View
            style={[
              styles.overviewCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <View style={styles.sectionHeaderRow}>
              <View
                style={[styles.sectionIndicator, { backgroundColor: theme.primary }]}
              />
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                OVERVIEW
              </Text>
            </View>
            <Text
              style={[styles.descriptionText, { color: theme.textSecondary }]}
            >
              {destination.description}
            </Text>

            {/* Tags Pills */}
            <View style={styles.tagsWrapper}>
              {destination.tags.map((t) => (
                <View
                  key={t}
                  style={[
                    styles.tagPill,
                    {
                      backgroundColor: theme.chipIdle,
                      borderColor: theme.chipBorder,
                    },
                  ]}
                >
                  <Text style={[styles.tagPillText, { color: theme.textMuted }]}>
                    #{t}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Best Time To Visit Editorial Card */}
          <View
            style={[
              styles.seasonHighlightCard,
              {
                backgroundColor: 'rgba(217, 142, 50, 0.12)',
                borderColor: 'rgba(217, 142, 50, 0.35)',
              },
            ]}
          >
            <View style={styles.tipHeader}>
              <MaterialIcons name="wb-twilight" size={18} color="#F59E0B" />
              <Text style={styles.seasonHighlightTitle}>BEST TIME TO VISIT</Text>
            </View>
            <Text style={[styles.seasonHighlightText, { color: theme.textSecondary }]}>
              {destination.bestTimeToVisit}. Clear skies, comfortable walking temperatures, and vibrant local cultural rituals make this period optimal for travelers.
            </Text>
          </View>

          {/* Curated Highlights / Attractions Section */}
          <View style={styles.attractionsHeaderRow}>
            <View style={styles.sectionHeaderRow}>
              <View
                style={[styles.sectionIndicator, { backgroundColor: theme.primary }]}
              />
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                CURATED HIGHLIGHTS
              </Text>
              <View
                style={[
                  styles.attractionCountCircle,
                  { backgroundColor: theme.chipIdle },
                ]}
              >
                <Text
                  style={[
                    styles.attractionCountNumber,
                    { color: theme.primaryLight },
                  ]}
                >
                  {destination.attractions.length}
                </Text>
              </View>
            </View>
            <Text style={[styles.mustVisitText, { color: theme.primaryLight }]}>
              Must-Visit Sights
            </Text>
          </View>

          {/* Attraction Cards */}
          {destination.attractions.map((attraction) => (
            <AttractionCard
              key={attraction.id}
              attraction={attraction}
              theme={theme}
            />
          ))}

          {/* Day-by-Day Expedition Itinerary Blueprint (A to Z) */}
          {destination.itineraryPlan && destination.itineraryPlan.length > 0 && (
            <View style={styles.itinerarySection}>
              <View style={styles.sectionHeaderRow}>
                <View style={[styles.sectionIndicator, { backgroundColor: theme.primary }]} />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  ITINERARY ({destination.duration.toUpperCase()})
                </Text>
              </View>

              {destination.itineraryPlan.map((item) => (
                <View
                  key={item.day}
                  style={[
                    styles.dayCard,
                    {
                      backgroundColor: theme.card,
                      borderColor: theme.cardBorder,
                    },
                  ]}
                >
                  <View style={styles.dayCardHeader}>
                    <View style={[styles.dayBadge, { backgroundColor: theme.primary }]}>
                      <Text style={styles.dayBadgeText}>{item.day}</Text>
                    </View>
                    <Text style={[styles.dayTitle, { color: theme.text }]}>
                      {item.title}
                    </Text>
                  </View>

                  <View style={styles.milestonesList}>
                    <View style={styles.milestoneRow}>
                      <MaterialIcons name="wb-sunny" size={14} color="#F59E0B" style={styles.milestoneIcon} />
                      <Text style={[styles.milestoneText, { color: theme.textSecondary }]}>
                        <Text style={[styles.milestonePeriod, { color: theme.text }]}>Morning: </Text>
                        {item.morning}
                      </Text>
                    </View>

                    <View style={styles.milestoneRow}>
                      <MaterialIcons name="wb-cloudy" size={14} color={theme.primaryLight} style={styles.milestoneIcon} />
                      <Text style={[styles.milestoneText, { color: theme.textSecondary }]}>
                        <Text style={[styles.milestonePeriod, { color: theme.text }]}>Afternoon: </Text>
                        {item.afternoon}
                      </Text>
                    </View>

                    <View style={styles.milestoneRow}>
                      <MaterialIcons name="nights-stay" size={14} color="#818CF8" style={styles.milestoneIcon} />
                      <Text style={[styles.milestoneText, { color: theme.textSecondary }]}>
                        <Text style={[styles.milestonePeriod, { color: theme.text }]}>Evening: </Text>
                        {item.evening}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Curator's Insider Tip */}
          <View
            style={[
              styles.tipCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <View style={styles.tipHeader}>
              <MaterialIcons name="lightbulb" size={18} color="#FBBF24" />
              <Text style={styles.tipTitle}>CURATOR'S FIELD NOTE</Text>
            </View>
            <Text style={[styles.tipText, { color: theme.textSecondary }]}>
              {destination.curatorTip}
            </Text>
          </View>

          {/* Expanded Curator's Field Dossier */}
          {destination.fieldNotes && (
            <View style={styles.fieldNotesSection}>
              <View style={styles.sectionHeaderRow}>
                <View style={[styles.sectionIndicator, { backgroundColor: '#F59E0B' }]} />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  LOCAL INSIGHTS & GUIDE
                </Text>
              </View>

              {/* Culinary Notes */}
              <View
                style={[
                  styles.dossierCard,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.cardBorder,
                  },
                ]}
              >
                <View style={styles.dossierHeader}>
                  <MaterialIcons name="restaurant" size={16} color="#F59E0B" />
                  <Text style={[styles.dossierTitle, { color: theme.text }]}>
                    LOCAL GASTRONOMY & SPECIALTIES
                  </Text>
                </View>
                <Text style={[styles.dossierText, { color: theme.textSecondary }]}>
                  {destination.fieldNotes.culinary}
                </Text>
              </View>

              {/* Logistics & Route Notes */}
              <View
                style={[
                  styles.dossierCard,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.cardBorder,
                  },
                ]}
              >
                <View style={styles.dossierHeader}>
                  <MaterialIcons name="navigation" size={16} color={theme.primary} />
                  <Text style={[styles.dossierTitle, { color: theme.text }]}>
                    TRANSIT & ROUTE NAVIGATION
                  </Text>
                </View>
                <Text style={[styles.dossierText, { color: theme.textSecondary }]}>
                  {destination.fieldNotes.logistics}
                </Text>
              </View>

              {/* Packing & Gear Notes */}
              <View
                style={[
                  styles.dossierCard,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.cardBorder,
                  },
                ]}
              >
                <View style={styles.dossierHeader}>
                  <MaterialIcons name="backpack" size={16} color="#10B981" />
                  <Text style={[styles.dossierTitle, { color: theme.text }]}>
                    PACKING & ESSENTIAL GEAR
                  </Text>
                </View>
                <Text style={[styles.dossierText, { color: theme.textSecondary }]}>
                  {destination.fieldNotes.gear}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Bottom spacing for sticky bar */}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: theme.bottomBarBg,
            borderTopColor: theme.cardBorder,
          },
        ]}
      >
        <View style={styles.priceColumn}>
          <View style={styles.bottomPriceRow}>
            <Text style={[styles.bottomCurrency, { color: theme.text }]}>₹</Text>
            <Text style={[styles.bottomAmount, { color: theme.text }]}>
              {destination.pricePerNight.toLocaleString('en-IN')}
            </Text>
            <Text style={[styles.bottomUnit, { color: theme.textMuted }]}>
              / night
            </Text>
          </View>
          <View style={styles.stayBadgeRow}>
            <View style={[styles.greenDot, { backgroundColor: '#10B981' }]} />
            <Text style={styles.stayBadgeText}>Heritage Stay Included</Text>
          </View>
        </View>

        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onToggleWishlist}
            style={[
              styles.wishlistBarButton,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}
            accessibilityLabel="Toggle wishlist"
          >
            <MaterialIcons
              name={isSaved ? 'favorite' : 'favorite-border'}
              size={22}
              color={isSaved ? '#E06D46' : theme.text}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              onShowToast(
                `Journey reserved for ${destination.name}! Booking details saved.`
              )
            }
            style={[styles.bookButton, { backgroundColor: theme.primary }]}
          >
            <MaterialIcons name="flight-takeoff" size={16} color="#FFFFFF" />
            <Text style={styles.bookButtonText}>Book Expedition</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  heroContainer: {
    width: '100%',
    height: 340,
    position: 'relative',
    backgroundColor: '#1E1E24',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  topNavRow: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  navButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTopBadges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dispatchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 19, 22, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dispatchText: {
    color: '#EDE9E1',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  heroBottomRow: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  seasonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  seasonText: {
    color: '#FBBF24',
    fontSize: 11,
    fontWeight: '700',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
    lineHeight: 28,
  },
  heroLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  heroLocationText: {
    color: '#EDE9E1',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 3,
  },
  heroRatingBox: {
    backgroundColor: 'rgba(18, 19, 22, 0.9)',
    borderRadius: BorderRadius.md,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingNumber: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  ratingReviews: {
    color: '#A0A0AB',
    fontSize: 9,
    marginTop: 1,
  },
  bodyContent: {
    padding: Spacing.md,
  },
  keyFactsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  factCard: {
    flex: 1,
    padding: Spacing.sm + 2,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  factLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: 4,
  },
  factValue: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  liveWeatherBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  liveWeatherLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveWeatherDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  liveWeatherCondition: {
    fontSize: 11,
    fontWeight: '700',
  },
  liveWeatherMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveMetricPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  liveMetricText: {
    fontSize: 10,
    fontWeight: '600',
  },
  googleMapsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.sm + 2,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  googleMapsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginRight: 8,
  },
  mapIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleMapsTextCol: {
    flex: 1,
  },
  googleMapsTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  googleMapsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navPillBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: BorderRadius.xs,
  },
  navPillBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  googleMapsSubtitle: {
    fontSize: 11,
    marginTop: 1,
  },
  overviewCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  sectionIndicator: {
    width: 4,
    height: 14,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.xs,
    borderWidth: 1,
  },
  tagPillText: {
    fontSize: 10,
    fontWeight: '600',
  },
  seasonHighlightCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  seasonHighlightTitle: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginLeft: 6,
  },
  seasonHighlightText: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  attractionsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  attractionCountCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attractionCountNumber: {
    fontSize: 11,
    fontWeight: '800',
  },
  mustVisitText: {
    fontSize: 11,
    fontWeight: '700',
  },
  tipCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
    marginBottom: Spacing.md,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  tipTitle: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginLeft: 6,
  },
  tipText: {
    fontSize: 12,
    lineHeight: 18,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceColumn: {
    justifyContent: 'center',
  },
  bottomPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  bottomCurrency: {
    fontSize: 13,
    fontWeight: '700',
    marginRight: 1,
  },
  bottomAmount: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  bottomUnit: {
    fontSize: 11,
    marginLeft: 2,
  },
  stayBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  stayBadgeText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '600',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  wishlistBarButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    height: 44,
    borderRadius: BorderRadius.md,
    shadowColor: '#C2512D',
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  itinerarySection: {
    marginBottom: Spacing.md,
  },
  dayCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.sm + 2,
  },
  dayCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  dayBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.xs,
  },
  dayBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  dayTitle: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  milestonesList: {
    gap: 8,
    paddingLeft: 4,
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  milestoneIcon: {
    marginTop: 2,
  },
  milestoneText: {
    fontSize: 11.5,
    lineHeight: 16.5,
    flex: 1,
  },
  milestonePeriod: {
    fontWeight: '700',
  },
  fieldNotesSection: {
    marginBottom: Spacing.md,
  },
  dossierCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  dossierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  dossierTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  dossierText: {
    fontSize: 11.5,
    lineHeight: 17,
  },
});
