import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class StorageService {
  static const String _wishlistKey = 'yatra_wishlist_ids_v1';
  static const String _themeKey = 'yatra_theme_preference_v1';

  static Future<List<String>> getWishlist() async {
    final prefs = await SharedPreferences.getInstance();
    final rawList = prefs.getStringList(_wishlistKey);
    if (rawList == null) {
      // Initial default items matching web & app preview
      const initial = ['varanasi', 'munnar'];
      await prefs.setStringList(_wishlistKey, initial);
      return initial;
    }
    return rawList;
  }

  static Future<List<String>> addToWishlist(String id) async {
    final prefs = await SharedPreferences.getInstance();
    final list = await getWishlist();
    if (!list.contains(id)) {
      final updated = List<String>.from(list)..add(id);
      await prefs.setStringList(_wishlistKey, updated);
      return updated;
    }
    return list;
  }

  static Future<List<String>> removeFromWishlist(String id) async {
    final prefs = await SharedPreferences.getInstance();
    final list = await getWishlist();
    final updated = list.where((item) => item != id).toList();
    await prefs.setStringList(_wishlistKey, updated);
    return updated;
  }

  static Future<Map<String, dynamic>> toggleWishlist(String id) async {
    final prefs = await SharedPreferences.getInstance();
    final list = await getWishlist();
    bool isInWishlist;
    List<String> updated;

    if (list.contains(id)) {
      updated = list.where((item) => item != id).toList();
      isInWishlist = false;
    } else {
      updated = List<String>.from(list)..add(id);
      isInWishlist = true;
    }

    await prefs.setStringList(_wishlistKey, updated);
    return {
      'isInWishlist': isInWishlist,
      'wishlist': updated,
    };
  }

  static Future<void> clearWishlist() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(_wishlistKey, []);
  }

  static Future<bool> isDarkMode() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(_themeKey) ?? true;
  }

  static Future<void> saveThemeMode(bool isDark) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_themeKey, isDark);
  }
}
