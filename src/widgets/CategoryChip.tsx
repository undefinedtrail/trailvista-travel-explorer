import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeColors, BorderRadius, Spacing } from '../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

interface CategoryChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  theme: ThemeColors;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  isSelected,
  onPress,
  theme,
  iconName,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: isSelected ? theme.primary : theme.chipIdle,
          borderColor: isSelected ? theme.primary : theme.chipBorder,
        },
      ]}
    >
      {iconName && (
        <MaterialIcons
          name={iconName}
          size={14}
          color={isSelected ? '#FFFFFF' : theme.textMuted}
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.label,
          {
            color: isSelected ? '#FFFFFF' : theme.chipText,
            fontWeight: isSelected ? '700' : '500',
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    marginRight: Spacing.sm,
  },
  icon: {
    marginRight: 4,
  },
  label: {
    fontSize: 12,
    letterSpacing: 0.3,
  },
});
