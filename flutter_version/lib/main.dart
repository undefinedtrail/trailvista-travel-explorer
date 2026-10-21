import 'package:flutter/material.dart';
import 'constants/theme.dart';
import 'models/destination.dart';
import 'screens/details_screen.dart';
import 'screens/home_screen.dart';
import 'screens/search_screen.dart';
import 'screens/wishlist_screen.dart';
import 'services/storage_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const YatraTravelApp());
}

class YatraTravelApp extends StatefulWidget {
  const YatraTravelApp({Key? key}) : super(key: key);

  @override
  State<YatraTravelApp> createState() => _YatraTravelAppState();
}

class _YatraTravelAppState extends State<YatraTravelApp> {
  bool _isDark = true;
  int _currentIndex = 0;
  List<String> _wishlistIds = [];

  @override
  void initState() {
    super.initState();
    _loadState();
  }

  Future<void> _loadState() async {
    final wishlist = await StorageService.getWishlist();
    final isDark = await StorageService.isDarkMode();
    setState(() {
      _wishlistIds = wishlist;
      _isDark = isDark;
    });
  }

  void _toggleTheme() async {
    final nextDark = !_isDark;
    setState(() {
      _isDark = nextDark;
    });
    await StorageService.saveThemeMode(nextDark);
  }

  void _toggleWishlist(String id) async {
    final res = await StorageService.toggleWishlist(id);
    final isSaved = res['isInWishlist'] as bool;
    final updated = res['wishlist'] as List<String>;
    setState(() {
      _wishlistIds = updated;
    });
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          isSaved
              ? '✓ Expedition saved to local notebook'
              : '✕ Expedition archived from notebook',
        ),
        backgroundColor: AppTheme.primary,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _removeFromWishlist(String id) async {
    final updated = await StorageService.removeFromWishlist(id);
    setState(() {
      _wishlistIds = updated;
    });
  }

  void _clearWishlist() async {
    await StorageService.clearWishlist();
    setState(() {
      _wishlistIds = [];
    });
  }

  void _navigateToDetails(BuildContext context, Destination destination) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (ctx) => DetailsScreen(
          destination: destination,
          isSaved: _wishlistIds.contains(destination.id),
          onToggleWishlist: () => _toggleWishlist(destination.id),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Yātrā Travel Explorer',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: _isDark ? ThemeMode.dark : ThemeMode.light,
      home: Builder(
        builder: (context) {
          final isDarkTheme = Theme.of(context).brightness == Brightness.dark;
          final cardBorder = isDarkTheme ? AppTheme.darkCardBorder : AppTheme.lightCardBorder;
          final cardBg = isDarkTheme ? AppTheme.darkCard : AppTheme.lightCard;
          final textHead = isDarkTheme ? AppTheme.darkText : AppTheme.lightText;

          return Scaffold(
            appBar: AppBar(
              backgroundColor: isDarkTheme ? AppTheme.darkSurface : AppTheme.lightSurface,
              elevation: 0,
              title: Row(
                children: [
                  Container(
                    width: 34,
                    height: 34,
                    decoration: BoxDecoration(
                      color: AppTheme.primary,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Icon(Icons.explore, color: Colors.white, size: 20),
                  ),
                  const SizedBox(width: 8),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(
                            'Yātrā',
                            style: TextStyle(
                              color: textHead,
                              fontSize: 18,
                              fontWeight: FontWeight.w800,
                            ),
                          ),
                          const SizedBox(width: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
                            decoration: BoxDecoration(
                              color: AppTheme.primary.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(4),
                              border: Border.all(color: AppTheme.primary.withOpacity(0.4)),
                            ),
                            child: const Text(
                              'Explorer',
                              style: TextStyle(
                                color: AppTheme.primaryLight,
                                fontSize: 9,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const Text(
                        'Field Notebook & Stays',
                        style: TextStyle(color: Color(0xFFA0A0AB), fontSize: 10),
                      ),
                    ],
                  ),
                ],
              ),
              actions: [
                // Day / Night Toggle Pill
                Container(
                  margin: const EdgeInsets.only(right: 12),
                  padding: const EdgeInsets.all(2),
                  decoration: BoxDecoration(
                    color: isDarkTheme ? AppTheme.darkChipIdle : AppTheme.lightChipIdle,
                    borderRadius: BorderRadius.circular(9999),
                    border: Border.all(color: cardBorder),
                  ),
                  child: Row(
                    children: [
                      GestureDetector(
                        onTap: () {
                          if (_isDark) _toggleTheme();
                        },
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 3),
                          decoration: BoxDecoration(
                            color: !_isDark ? cardBg : Colors.transparent,
                            borderRadius: BorderRadius.circular(9999),
                          ),
                          child: Text(
                            'Day',
                            style: TextStyle(
                              color: !_isDark ? textHead : AppTheme.darkTextMuted,
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                      ),
                      GestureDetector(
                        onTap: () {
                          if (!_isDark) _toggleTheme();
                        },
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 3),
                          decoration: BoxDecoration(
                            color: _isDark ? AppTheme.primary : Colors.transparent,
                            borderRadius: BorderRadius.circular(9999),
                          ),
                          child: Text(
                            'Night',
                            style: TextStyle(
                              color: _isDark ? Colors.white : AppTheme.lightTextMuted,
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            body: IndexedStack(
              index: _currentIndex,
              children: [
                HomeScreen(
                  wishlistIds: _wishlistIds,
                  onSelectDestination: (dest) => _navigateToDetails(context, dest),
                  onToggleWishlist: _toggleWishlist,
                  onNavigateToSearch: () => setState(() => _currentIndex = 1),
                  onNavigateToWishlist: () => setState(() => _currentIndex = 2),
                ),
                SearchScreen(
                  wishlistIds: _wishlistIds,
                  onSelectDestination: (dest) => _navigateToDetails(context, dest),
                  onToggleWishlist: _toggleWishlist,
                ),
                WishlistScreen(
                  wishlistIds: _wishlistIds,
                  onSelectDestination: (dest) => _navigateToDetails(context, dest),
                  onRemoveFromWishlist: _removeFromWishlist,
                  onClearWishlist: _clearWishlist,
                  onNavigateToHome: () => setState(() => _currentIndex = 0),
                ),
              ],
            ),
            bottomNavigationBar: Container(
              margin: const EdgeInsets.fromLTRB(20, 0, 20, 16),
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
              decoration: BoxDecoration(
                color: isDarkTheme ? const Color(0xF21A1B22) : const Color(0xF2FFFFFF),
                borderRadius: BorderRadius.circular(9999),
                border: Border.all(color: cardBorder),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.25),
                    blurRadius: 18,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildNavItem(
                    index: 0,
                    icon: Icons.explore,
                    label: 'Explore',
                  ),
                  _buildNavItem(
                    index: 1,
                    icon: Icons.search,
                    label: 'Search',
                  ),
                  _buildNavItem(
                    index: 2,
                    icon: _wishlistIds.isEmpty ? Icons.favorite_border : Icons.favorite,
                    label: 'Wishlist',
                    badgeCount: _wishlistIds.length,
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildNavItem({
    required int index,
    required IconData icon,
    required String label,
    int badgeCount = 0,
  }) {
    final isSelected = _currentIndex == index;
    return GestureDetector(
      onTap: () {
        setState(() {
          _currentIndex = index;
        });
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? AppTheme.primary : Colors.transparent,
          borderRadius: BorderRadius.circular(9999),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Stack(
              clipBehavior: Clip.none,
              children: [
                Icon(
                  icon,
                  size: 18,
                  color: isSelected ? Colors.white : const Color(0xFFA0A0AB),
                ),
                if (badgeCount > 0)
                  Positioned(
                    top: -6,
                    right: -8,
                    child: Container(
                      padding: const EdgeInsets.all(2),
                      constraints: const BoxConstraints(minWidth: 14, minHeight: 14),
                      decoration: BoxDecoration(
                        color: isSelected ? Colors.white : AppTheme.primary,
                        shape: BoxShape.circle,
                      ),
                      alignment: Alignment.center,
                      child: Text(
                        badgeCount.toString(),
                        style: TextStyle(
                          color: isSelected ? AppTheme.primary : Colors.white,
                          fontSize: 8,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
            if (isSelected) ...[
              const SizedBox(width: 6),
              Text(
                label,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
