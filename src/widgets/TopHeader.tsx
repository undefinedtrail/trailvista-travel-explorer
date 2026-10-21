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
  title = 'Yātrā',
  subtitle = 'Explorer',
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
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: 'rgba(194, 81, 45, 0.15)',
                  borderColor: 'rgba(194, 81, 45, 0.4)',
                },
              ]}
            >
              <Text style={[styles.badgeText, { color: theme.primaryLight }]}>
                {subtitle}
              </Text>
            </View>
          </View>
          <Text style={[styles.tagline, { color: theme.textMuted }]}>
            India Journey Explorer
          </Text>
        </View>
      </View>

      {/* Right Controls: Day/Night Switch & Profile */}
      <View style={styles.rightControls}>
        <View
          style={[
            styles.themeToggleContainer,
            {
              backgroundColor: isDark ? '#1C1D25' : '#EDE9DF',
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => isDark && onToggleTheme()}
            style={[
              styles.toggleOption,
              !isDark && [styles.toggleActive, { backgroundColor: theme.card }],
            ]}
          >
            <Text
              style={[
                styles.toggleText,
                { color: !isDark ? theme.text : theme.textMuted },
              ]}
            >
              Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => !isDark && onToggleTheme()}
            style={[
              styles.toggleOption,
              isDark && [styles.toggleActive, { backgroundColor: theme.primary }],
            ]}
          >
            <Text
              style={[
                styles.toggleText,
                { color: isDark ? '#FFFFFF' : theme.textMuted },
              ]}
            >
              Night
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.profileButton,
            {
              backgroundColor: isDark ? '#1C1D25' : '#EDE9DF',
              borderColor: theme.cardBorder,
            },
          ]}
          accessibilityLabel="User Profile"
        >
          <MaterialIcons name="person" size={17} color={theme.text} />
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 10.5,
    fontWeight: '500',
    marginTop: 1,
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2.5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  toggleOption: {
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: BorderRadius.full,
  },
  toggleActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
