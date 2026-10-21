import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeColors, BorderRadius, Spacing } from '../constants/theme';

interface TopHeaderProps {
  theme: ThemeColors;
  isDark: boolean;
  onToggleTheme: () => void;
  title?: string;
  subtitle?: string;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  theme,
  isDark,
  onToggleTheme,
  title = 'TrailVista',
  subtitle = 'Travel Explorer',
}) => {
  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: theme.headerBg,
          borderBottomColor: theme.cardBorder,
        },
      ]}
    >
      {/* Brand & Logo Row */}
      <View style={styles.brandRow}>
        <View
          style={[
            styles.logoContainer,
            {
              backgroundColor: isDark ? '#1C1D25' : '#EFEBE2',
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <Image
            source={require('../../assets/yatra_logo.png')}
            style={styles.logoImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.titleColumn}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        </View>
      </View>

      {/* Right Controls: Futuristic Sun & Moon Theme Toggle (No Profile Icon) */}
      <View style={styles.rightControls}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onToggleTheme}
          style={[
            styles.futuristicToggle,
            {
              backgroundColor: isDark ? '#1C1D26' : '#EDE8DC',
              borderColor: isDark ? '#2E3142' : '#D6CFBF',
            },
          ]}
          accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {/* Sun Slot */}
          <View
            style={[
              styles.toggleIconSlot,
              !isDark && [
                styles.toggleActiveSlot,
                { backgroundColor: '#FFFFFF', shadowColor: '#D97706' },
              ],
            ]}
          >
            <MaterialIcons
              name="wb-sunny"
              size={13.5}
              color={!isDark ? '#D97706' : isDark ? '#52556A' : '#8A8D9B'}
            />
          </View>

          {/* Moon Slot */}
          <View
            style={[
              styles.toggleIconSlot,
              isDark && [
                styles.toggleActiveSlot,
                { backgroundColor: theme.primary, shadowColor: theme.primary },
              ],
            ]}
          >
            <MaterialIcons
              name="nights-stay"
              size={13}
              color={isDark ? '#FFFFFF' : '#8A8D9B'}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xs + 2,
    paddingBottom: Spacing.xs + 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  titleColumn: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  futuristicToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    gap: 3,
  },
  toggleIconSlot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleActiveSlot: {
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
  },
});
