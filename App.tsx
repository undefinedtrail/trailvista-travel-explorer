import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Platform,
  BackHandler,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { Destination } from './src/models/Destination';
import { DarkTheme, LightTheme } from './src/constants/theme';
import { StorageService } from './src/services/storageService';
import { TopHeader } from './src/widgets/TopHeader';
import { BottomNavBar, TabType } from './src/widgets/BottomNavBar';
import { HomeScreen } from './src/screens/HomeScreen';
import { DetailsScreen } from './src/screens/DetailsScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { WishlistScreen } from './src/screens/WishlistScreen';
import { SmartMatcherScreen } from './src/screens/SmartMatcherScreen';

function MainApp() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastAnim] = useState(new Animated.Value(0));

  // First-launch splashscreen state & animations
  const [isAppReady, setIsAppReady] = useState(false);
  const splashOpacity = useState(new Animated.Value(1))[0];
  const splashScale = useState(new Animated.Value(0.94))[0];
  const pulseAnim = useState(new Animated.Value(0.5))[0];

  const theme = themeMode === 'dark' ? DarkTheme : LightTheme;

  // Show transient toast alert
  const showToast = useCallback(
    (message: string) => {
      setToastMessage(message);
      Animated.sequence([
        Animated.timing(toastAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.delay(2200),
        Animated.timing(toastAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start(() => {
        setToastMessage(null);
      });
    },
    [toastAnim]
  );

  // Load persisted state on startup
  useEffect(() => {
    async function loadInitialData() {
      try {
        const [savedWishlist, savedTheme] = await Promise.all([
          StorageService.getWishlist(),
          StorageService.getThemePreference(),
        ]);
        setWishlistIds(savedWishlist || []);
        setThemeMode(savedTheme || 'dark');
      } catch (err) {
        console.warn('Error loading initial data:', err);
      }
    }
    loadInitialData();
  }, []);

  // System back button & gesture navigation handler
  useEffect(() => {
    const handleSystemBack = () => {
      if (selectedDestination) {
        setSelectedDestination(null);
        return true; // Handled, close destination details
      }
      if (currentTab !== 'home') {
        setCurrentTab('home');
        return true; // Handled, navigate to Home tab
      }
      return false; // Allow default system behavior (minimize/exit app)
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleSystemBack
    );
    return () => subscription.remove();
  }, [selectedDestination, currentTab]);

  // Splash screen transition on initial launch
  useEffect(() => {
    // Pulsing beacon loop
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 650,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.45,
          duration: 650,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    );
    pulseLoop.start();

    // Subtle scale in of the splash card
    Animated.timing(splashScale, {
      toValue: 1,
      duration: 800,
      useNativeDriver: Platform.OS !== 'web',
    }).start();

    // After 1.6s, smoothly fade out the splash screen
    const splashTimer = setTimeout(() => {
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 450,
        useNativeDriver: Platform.OS !== 'web',
      }).start(() => {
        setIsAppReady(true);
        pulseLoop.stop();
      });
    }, 1600);

    return () => {
      clearTimeout(splashTimer);
      pulseLoop.stop();
    };
  }, []);

  // Theme toggle handler with persistence
  const handleToggleTheme = async () => {
    const nextTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextTheme);
    await StorageService.saveThemePreference(nextTheme);
  };

  // Toggle destination in wishlist with instant UI feedback & storage persistence
  const handleToggleWishlist = async (id: string) => {
    const { isInWishlist, wishlist } = await StorageService.toggleWishlist(id);
    setWishlistIds(wishlist);
    showToast(
      isInWishlist
        ? '✓ Expedition saved to local notebook'
        : '✕ Expedition archived from notebook'
    );
  };

  // Direct remove from wishlist with storage persistence
  const handleRemoveFromWishlist = async (id: string) => {
    const updated = await StorageService.removeFromWishlist(id);
    setWishlistIds(updated);
  };

  // Clear all saved destinations
  const handleClearWishlist = async () => {
    await StorageService.clearWishlist();
    setWishlistIds([]);
  };

  return (
    <SafeAreaView
      style={[
        styles.rootContainer,
        { backgroundColor: theme.background },
      ]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />

      {/* Top Header (shown on tab screens, hidden on details view for immersive hero) */}
      {!selectedDestination && (
        <TopHeader
          theme={theme}
          isDark={themeMode === 'dark'}
          onToggleTheme={handleToggleTheme}
          title="TrailVista"
          subtitle="Travel Explorer"
        />
      )}

      {/* Screen Router */}
      <View style={styles.screenWrapper}>
        {selectedDestination ? (
          <DetailsScreen
            destination={selectedDestination}
            onGoBack={() => setSelectedDestination(null)}
            isSaved={wishlistIds.includes(selectedDestination.id)}
            onToggleWishlist={() => handleToggleWishlist(selectedDestination.id)}
            theme={theme}
            onShowToast={showToast}
          />
        ) : currentTab === 'home' ? (
          <HomeScreen
            onSelectDestination={(dest) => setSelectedDestination(dest)}
            onNavigateToSearch={() => setCurrentTab('search')}
            onNavigateToWishlist={() => setCurrentTab('wishlist')}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            theme={theme}
            isDark={themeMode === 'dark'}
          />
        ) : currentTab === 'search' ? (
          <SearchScreen
            onSelectDestination={(dest) => setSelectedDestination(dest)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            theme={theme}
          />
        ) : currentTab === 'matcher' ? (
          <SmartMatcherScreen
            onSelectDestination={(dest) => setSelectedDestination(dest)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            theme={theme}
          />
        ) : (
          <WishlistScreen
            wishlistIds={wishlistIds}
            onSelectDestination={(dest) => setSelectedDestination(dest)}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onClearWishlist={handleClearWishlist}
            onNavigateToHome={() => setCurrentTab('home')}
            onShowToast={showToast}
            theme={theme}
          />
        )}
      </View>

      {/* Persistent Floating Bottom Nav Bar (visible on all tab views) */}
      {!selectedDestination && (
        <BottomNavBar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setSelectedDestination(null);
            setCurrentTab(tab);
          }}
          wishlistCount={wishlistIds.length}
          theme={theme}
        />
      )}

      {/* Toast Notification Pill */}
      {toastMessage && (
        <Animated.View
          style={[
            styles.toastContainer,
            {
              backgroundColor: theme.card,
              borderColor: theme.cardBorder,
              opacity: toastAnim,
              transform: [
                {
                  translateY: toastAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                },
              ],
            },
          ]}
          pointerEvents="none"
        >
          <MaterialIcons name="check-circle" size={16} color={theme.primaryLight} />
          <Text style={[styles.toastText, { color: theme.text }]}>
            {toastMessage}
          </Text>
        </Animated.View>
      )}

      {/* Elegant Launch Splash Screen */}
      {!isAppReady && (
        <Animated.View
          style={[
            styles.splashContainer,
            {
              backgroundColor: '#0E0F14',
              opacity: splashOpacity,
            },
          ]}
          pointerEvents="none"
        >
          <Animated.View
            style={[
              styles.splashCard,
              {
                transform: [{ scale: splashScale }],
              },
            ]}
          >
            {/* Logo Icon Badge with Ambient Coral Glow */}
            <View style={styles.splashIconWrapper}>
              <View style={styles.splashIconBadge}>
                <MaterialIcons name="explore" size={44} color="#FFFFFF" />
              </View>
            </View>

            {/* App Brand Name */}
            <Text style={styles.splashBrandTitle}>TrailVista</Text>

            {/* Tagline */}
            <Text style={styles.splashBrandTagline}>TRAVEL EXPLORER</Text>

            <View style={styles.splashBrandDivider} />

            <Text style={styles.splashBrandSubtitle}>
              Discover places worth remembering
            </Text>

            {/* Status Pulse Beacon */}
            <View style={styles.splashStatusRow}>
              <Animated.View
                style={[
                  styles.splashBeaconDot,
                  {
                    opacity: pulseAnim,
                  },
                ]}
              />
              <Text style={styles.splashStatusText}>Curating Indian expeditions...</Text>
            </View>
          </Animated.View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.providerContainer}>
      <View style={styles.webDesktopWrapper}>
        <View style={styles.phoneFrame}>
          <MainApp />
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  providerContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  webDesktopWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    ...(Platform.OS === 'web'
      ? {
          backgroundColor: '#090A0E',
          alignItems: 'center' as const,
          justifyContent: 'center' as const,
        }
      : {}),
  },
  phoneFrame: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    ...(Platform.OS === 'web'
      ? {
          maxWidth: 440,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: '#22252F',
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.6,
          shadowRadius: 30,
          elevation: 15,
        }
      : {}),
  },
  rootContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  screenWrapper: {
    flex: 1,
  },
  toastContainer: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 9999,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 999,
  },
  toastText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  splashContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: 99999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashCard: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  splashIconWrapper: {
    marginBottom: 20,
    shadowColor: '#E06D46',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 14,
  },
  splashIconBadge: {
    width: 86,
    height: 86,
    borderRadius: 28,
    backgroundColor: '#E06D46',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  splashBrandTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  splashBrandTagline: {
    fontSize: 11,
    fontWeight: '800',
    color: '#E06D46',
    letterSpacing: 3.5,
    marginTop: 5,
  },
  splashBrandDivider: {
    width: 52,
    height: 2.5,
    backgroundColor: 'rgba(224, 109, 70, 0.45)',
    marginVertical: 15,
    borderRadius: 2,
  },
  splashBrandSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  splashStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 38,
  },
  splashBeaconDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E06D46',
  },
  splashStatusText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
