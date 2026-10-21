import 'package:flutter/material.dart';

class AppTheme {
  // Brand pigment colors from Stitch Warm Editorial system
  static const Color primary = Color(0xFFC2512D); // Terracotta Spice
  static const Color primaryDark = Color(0xFFA13917);
  static const Color primaryLight = Color(0xFFFF8F6B);
  static const Color secondary = Color(0xFF44645F); // Forest Indigo
  static const Color gold = Color(0xFFF59E0B); // Marigold Ocre
  static const Color error = Color(0xFFBA1A1A);

  // Dark Theme Colors (Haveli Courtyard)
  static const Color darkBackground = Color(0xFF0F1014);
  static const Color darkSurface = Color(0xFF121316);
  static const Color darkCard = Color(0xFF1A1B22);
  static const Color darkCardBorder = Color(0xFF262732);
  static const Color darkChipIdle = Color(0xFF1C1D25);
  static const Color darkChipBorder = Color(0xFF2E303D);
  static const Color darkText = Color(0xFFFFFFFF);
  static const Color darkTextSecondary = Color(0xFFEDE9E1);
  static const Color darkTextMuted = Color(0xFFA0A0AB);

  // Light Theme Colors (Sunlit Linen)
  static const Color lightBackground = Color(0xFFF9F7F2);
  static const Color lightSurface = Color(0xFFF5F2FB);
  static const Color lightCard = Color(0xFFFFFFFF);
  static const Color lightCardBorder = Color(0xFFE6E3DA);
  static const Color lightChipIdle = Color(0xFFEDE9DF);
  static const Color lightChipBorder = Color(0xFFDED9CD);
  static const Color lightText = Color(0xFF1C1917);
  static const Color lightTextSecondary = Color(0xFF2D2A26);
  static const Color lightTextMuted = Color(0xFF6B665F);

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      primaryColor: primary,
      scaffoldBackgroundColor: darkBackground,
      colorScheme: const ColorScheme.dark(
        primary: primary,
        secondary: secondary,
        surface: darkCard,
        error: error,
      ),
      cardTheme: const CardThemeData(
        color: darkCard,
        elevation: 0,
        shape: RoundedRectangleBorder(
          side: BorderSide(color: darkCardBorder, width: 1),
          borderRadius: BorderRadius.all(Radius.circular(16)),
        ),
      ),
      useMaterial3: true,
    );
  }

  static ThemeData get lightTheme {
    return ThemeData(
      brightness: Brightness.light,
      primaryColor: primary,
      scaffoldBackgroundColor: lightBackground,
      colorScheme: const ColorScheme.light(
        primary: primary,
        secondary: secondary,
        surface: lightCard,
        error: error,
      ),
      cardTheme: const CardThemeData(
        color: lightCard,
        elevation: 0,
        shape: RoundedRectangleBorder(
          side: BorderSide(color: lightCardBorder, width: 1),
          borderRadius: BorderRadius.all(Radius.circular(16)),
        ),
      ),
      useMaterial3: true,
    );
  }
}
