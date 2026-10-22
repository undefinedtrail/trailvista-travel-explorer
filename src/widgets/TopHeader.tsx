import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeColors, Spacing } from '../constants/theme';

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
            source={require('../../assets/trailvista_logo.png')}
            style={styles.logoImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.titleColumn}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        </View>
      </View>

      {/* Right Controls: 100% Rounded Sun & Moon Capsule Switch (No Profile Icon) */}
      <View style={styles.rightControls}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onToggleTheme}
          style={[
            styles.roundedSwitchTrack,
            {
              backgroundColor: isDark ? '#181922' : '#EDE8DC',
              borderColor: isDark ? '#2E3142' : '#D6CFBF',
            },
          ]}
          accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {/* Background Sun Icon on Track */}
          <View style={styles.trackIconSlot}>
            <MaterialIcons
              name="wb-sunny"
              size={13}
              color={!isDark ? 'transparent' : '#55586D'}
            />
          </View>

          {/* Background Moon Icon on Track */}
          <View style={styles.trackIconSlot}>
            <MaterialIcons
              name="nights-stay"
              size={12}
              color={isDark ? 'transparent' : '#8A8D9B'}
            />
          </View>

          {/* Floating Perfectly Circular Thumb Knob */}
          <View
            style={[
              styles.circularKnob,
              isDark ? styles.knobRight : styles.knobLeft,
              {
                backgroundColor: isDark ? theme.primary : '#FFFFFF',
                shadowColor: isDark ? theme.primary : '#000',
              },
            ]}
          >
            <MaterialIcons
              name={isDark ? 'nights-stay' : 'wb-sunny'}
              size={13}
              color={isDark ? '#FFFFFF' : '#D97706'}
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
  roundedSwitchTrack: {
    width: 58,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  trackIconSlot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularKnob: {
    position: 'absolute',
    top: 2,
    width: 23,
    height: 23,
    borderRadius: 11.5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.35,
    shadowRadius: 2.5,
  },
  knobLeft: {
    left: 3,
  },
  knobRight: {
    right: 3,
  },
});
