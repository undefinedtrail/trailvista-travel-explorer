import 'package:flutter/material.dart';
import '../constants/mock_data.dart';
import '../constants/theme.dart';
import '../models/destination.dart';
import '../widgets/category_chip.dart';
import '../widgets/destination_card.dart';

class HomeScreen extends StatefulWidget {
  final List<String> wishlistIds;
  final Function(Destination) onSelectDestination;
  final Function(String) onToggleWishlist;
  final VoidCallback onNavigateToSearch;
  final VoidCallback onNavigateToWishlist;

  const HomeScreen({
    Key? key,
    required this.wishlistIds,
    required this.onSelectDestination,
    required this.onToggleWishlist,
    required this.onNavigateToSearch,
    required this.onNavigateToWishlist,
  }) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  DestinationCategory _selectedCategory = DestinationCategory.all;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textHead = isDark ? AppTheme.darkText : AppTheme.lightText;
    final textMuted = isDark ? AppTheme.darkTextMuted : AppTheme.lightTextMuted;
    final cardBg = isDark ? AppTheme.darkCard : AppTheme.lightCard;
    final cardBorder = isDark ? AppTheme.darkCardBorder : AppTheme.lightCardBorder;

    final filteredList = _selectedCategory == DestinationCategory.all
        ? kMockDestinations
        : kMockDestinations.where((d) => d.category == _selectedCategory).toList();

    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      children: [
        // Top Field Dispatch Bar
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Row(
              children: [
                CircleAvatar(radius: 3.5, backgroundColor: AppTheme.primary),
                SizedBox(width: 6),
                Text(
                  'FIELD DISPATCH • VNRVJIET 2026',
                  style: TextStyle(
                    color: AppTheme.primaryLight,
                    fontSize: 10,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 1,
                  ),
                ),
              ],
            ),
            GestureDetector(
              onTap: widget.onNavigateToWishlist,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(9999),
                  border: Border.all(color: cardBorder),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.bookmarks, size: 13, color: AppTheme.gold),
                    const SizedBox(width: 4),
                    Text(
                      '${widget.wishlistIds.length} Saved',
                      style: TextStyle(
                        color: isDark ? AppTheme.darkTextSecondary : AppTheme.lightTextSecondary,
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),

        // Main Title
        Text(
          'Destination Discovery',
          style: TextStyle(
            color: textHead,
            fontSize: 26,
            fontWeight: FontWeight.w800,
            letterSpacing: -0.6,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          'Explore curated expeditions across ancient river ghats, misty tea terraces, and golden shores.',
          style: TextStyle(
            color: textMuted,
            fontSize: 13,
            height: 1.4,
          ),
        ),
        const SizedBox(height: 16),

        // Quick Search Bar Box
        GestureDetector(
          onTap: widget.onNavigateToSearch,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            decoration: BoxDecoration(
              color: cardBg,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: cardBorder),
            ),
            child: Row(
              children: [
                const Icon(Icons.search, size: 20, color: AppTheme.primaryLight),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'Search destinations, states, or experiences...',
                    style: TextStyle(color: textMuted, fontSize: 13),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(6),
                  decoration: BoxDecoration(
                    color: isDark ? AppTheme.darkChipIdle : AppTheme.lightChipIdle,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: const Icon(Icons.tune, size: 16, color: AppTheme.primaryLight),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),

        // Horizontal Category Filter Chips
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                const Icon(Icons.filter_alt, size: 14, color: AppTheme.primaryLight),
                const SizedBox(width: 4),
                Text(
                  'CATEGORIES (${kCategories.length - 1} TYPES)',
                  style: TextStyle(
                    color: textMuted,
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.8,
                  ),
                ),
              ],
            ),
            Text(
              '${filteredList.length} Stays',
              style: const TextStyle(
                color: AppTheme.primaryLight,
                fontSize: 11,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),

        SizedBox(
          height: 38,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: kCategories.length,
            itemBuilder: (context, index) {
              final cat = kCategories[index];
              return CategoryChipWidget(
                label: cat.displayName,
                isSelected: _selectedCategory == cat,
                onTap: () {
                  setState(() {
                    _selectedCategory = cat;
                  });
                },
                icon: cat == DestinationCategory.heritage
                    ? Icons.account_balance
                    : cat == DestinationCategory.mountains
                        ? Icons.terrain
                        : cat == DestinationCategory.beaches
                            ? Icons.beach_access
                            : cat == DestinationCategory.adventure
                                ? Icons.kayaking
                                : Icons.explore,
              );
            },
          ),
        ),
        const SizedBox(height: 16),

        // Destination Cards
        ...filteredList.map(
          (destination) => DestinationCardWidget(
            destination: destination,
            isSaved: widget.wishlistIds.contains(destination.id),
            onTap: () => widget.onSelectDestination(destination),
            onToggleWishlist: () => widget.onToggleWishlist(destination.id),
          ),
        ),
        const SizedBox(height: 80),
      ],
    );
  }
}
