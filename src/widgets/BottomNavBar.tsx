import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeColors, BorderRadius, Spacing } from '../constants/theme';

export type TabType = 'home' | 'search' | 'matcher' | 'wishlist';

interface BottomNavBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  wishlistCount: number;
  theme: ThemeColors;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
  wishlistCount,
  theme,
}) => {
  return (
    <View style={styles.outerContainer} pointerEvents="box-none">
      <View
        style={[
          styles.pillBar,
          {
            backgroundColor: theme.bottomBarBg,
            borderColor: theme.cardBorder,
          },
        ]}
      >
        {/* Home Tab */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelectTab('home')}
          style={[
            styles.tabItem,
            currentTab === 'home' && [
              styles.activeTabItem,
              { backgroundColor: theme.primary },
            ],
          ]}
        >
          <MaterialIcons
            name="explore"
            size={18}
            color={currentTab === 'home' ? '#FFFFFF' : theme.textMuted}
          />
          {currentTab === 'home' && (
            <Text style={styles.activeTabText}>Explore</Text>
          )}
        </TouchableOpacity>

        {/* Search Tab */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelectTab('search')}
          style={[
            styles.tabItem,
            currentTab === 'search' && [
              styles.activeTabItem,
              { backgroundColor: theme.primary },
            ],
          ]}
        >
          <MaterialIcons
            name="search"
            size={18}
            color={currentTab === 'search' ? '#FFFFFF' : theme.textMuted}
          />
          {currentTab === 'search' && (
            <Text style={styles.activeTabText}>Search</Text>
          )}
        </TouchableOpacity>

        {/* Find My Trip / Smart Matcher Tab */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelectTab('matcher')}
          style={[
            styles.tabItem,
            currentTab === 'matcher' && [
              styles.activeTabItem,
              { backgroundColor: theme.primary },
            ],
          ]}
        >
          <MaterialIcons
            name="tune"
            size={18}
            color={currentTab === 'matcher' ? '#FFFFFF' : theme.textMuted}
          />
          {currentTab === 'matcher' && (
            <Text style={styles.activeTabText}>Match</Text>
          )}
        </TouchableOpacity>

        {/* Wishlist Tab with Badge */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelectTab('wishlist')}
          style={[
            styles.tabItem,
            currentTab === 'wishlist' && [
              styles.activeTabItem,
              { backgroundColor: theme.primary },
            ],
          ]}
        >
          <View style={styles.iconWithBadge}>
            <MaterialIcons
              name={currentTab === 'wishlist' ? 'favorite' : 'favorite-border'}
              size={18}
              color={currentTab === 'wishlist' ? '#FFFFFF' : theme.textMuted}
            />
            {wishlistCount > 0 && (
              <View
                style={[
                  styles.badgeCircle,
                  {
                    backgroundColor:
                      currentTab === 'wishlist' ? '#FFFFFF' : theme.primary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    {
                      color:
                        currentTab === 'wishlist' ? theme.primary : '#FFFFFF',
                    },
                  ]}
                >
                  {wishlistCount}
                </Text>
              </View>
            )}
          </View>
          {currentTab === 'wishlist' && (
            <Text style={styles.activeTabText}>Wishlist</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  pillBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    gap: 6,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
  },
  activeTabItem: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
    letterSpacing: 0.3,
  },
  iconWithBadge: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCircle: {
    position: 'absolute',
    top: -6,
    right: -8,
    minWidth: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: '800',
  },
});
