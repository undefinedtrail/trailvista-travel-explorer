import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Platform,
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
          title="Yātrā"
          subtitle="Explorer"
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
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.providerContainer}>
      <MainApp />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  providerContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  rootContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
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
});
