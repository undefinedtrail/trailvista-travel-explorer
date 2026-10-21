import 'package:flutter/material.dart';
import '../constants/mock_data.dart';
import '../constants/theme.dart';
import '../models/destination.dart';
import '../widgets/category_chip.dart';
import '../widgets/destination_card.dart';

class SearchScreen extends StatefulWidget {
  final List<String> wishlistIds;
  final Function(Destination) onSelectDestination;
  final Function(String) onToggleWishlist;

  const SearchScreen({
    Key? key,
    required this.wishlistIds,
    required this.onSelectDestination,
    required this.onToggleWishlist,
  }) : super(key: key);

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final TextEditingController _searchController = TextEditingController();
  DestinationCategory _selectedCategory = DestinationCategory.all;
  String _searchQuery = '';

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textHead = isDark ? AppTheme.darkText : AppTheme.lightText;
    final textMuted = isDark ? AppTheme.darkTextMuted : AppTheme.lightTextMuted;
    final cardBg = isDark ? AppTheme.darkCard : AppTheme.lightCard;
    final cardBorder = isDark ? AppTheme.darkCardBorder : AppTheme.lightCardBorder;

    final filteredList = kMockDestinations.where((d) {
      final categoryMatch = _selectedCategory == DestinationCategory.all || d.category == _selectedCategory;
      final q = _searchQuery.trim().toLowerCase();
      final queryMatch = q.isEmpty ||
          d.name.toLowerCase().contains(q) ||
          d.location.toLowerCase().contains(q) ||
          d.state.toLowerCase().contains(q) ||
          d.tags.any((t) => t.toLowerCase().contains(q));
      return categoryMatch && queryMatch;
    }).toList();

    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      children: [
        Text(
          'Search & Filter',
          style: TextStyle(
            color: textHead,
            fontSize: 24,
            fontWeight: FontWeight.w800,
            letterSpacing: -0.5,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          'Instant real-time search across destinations, states, and curated categories.',
          style: TextStyle(
            color: textMuted,
            fontSize: 12,
            height: 1.4,
          ),
        ),
        const SizedBox(height: 14),

        // Search Input
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12),
          decoration: BoxDecoration(
            color: cardBg,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: cardBorder),
          ),
          child: Row(
            children: [
              const Icon(Icons.search, color: AppTheme.primaryLight, size: 22),
              const SizedBox(width: 8),
              Expanded(
                child: TextField(
                  controller: _searchController,
                  onChanged: (val) {
                    setState(() {
                      _searchQuery = val;
                    });
                  },
                  style: TextStyle(color: textHead, fontSize: 14),
                  decoration: InputDecoration(
                    hintText: 'Search destinations by name or location...',
                    hintStyle: TextStyle(color: textMuted, fontSize: 13),
                    border: InputBorder.none,
                  ),
                ),
              ),
              if (_searchQuery.isNotEmpty)
                IconButton(
                  icon: Icon(Icons.close, color: textMuted, size: 18),
                  onPressed: () {
                    _searchController.clear();
                    setState(() {
                      _searchQuery = '';
                    });
                  },
                ),
            ],
          ),
        ),
        const SizedBox(height: 14),

        // Category Filter Chips
        Row(
          children: [
            const Icon(Icons.filter_list, size: 13, color: AppTheme.primaryLight),
            const SizedBox(width: 4),
            Text(
              'CATEGORY FILTER:',
              style: TextStyle(
                color: textMuted,
                fontSize: 10,
                fontWeight: FontWeight.w700,
                letterSpacing: 0.8,
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
                label: cat == DestinationCategory.all ? 'All Stays' : cat.displayName,
                isSelected: _selectedCategory == cat,
                onTap: () {
                  setState(() {
                    _selectedCategory = cat;
                  });
                },
              );
            },
          ),
        ),
        const SizedBox(height: 14),

        // Results Bar
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Curated Stays',
              style: TextStyle(
                color: textHead,
                fontSize: 15,
                fontWeight: FontWeight.w700,
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: AppTheme.primary.withOpacity(0.12),
                borderRadius: BorderRadius.circular(9999),
                border: Border.all(color: AppTheme.primary.withOpacity(0.3)),
              ),
              child: Text(
                '${filteredList.length} Dispatches',
                style: const TextStyle(
                  color: AppTheme.primaryLight,
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),

        // List of filtered results or empty state
        if (filteredList.isEmpty)
          Container(
            padding: const EdgeInsets.all(28),
            margin: const EdgeInsets.only(top: 16),
            decoration: BoxDecoration(
              color: cardBg,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: cardBorder),
            ),
            child: Column(
              children: [
                Container(
                  width: 56,
                  height: 56,
                  decoration: BoxDecoration(
                    color: AppTheme.primary.withOpacity(0.15),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.travel_explore, color: AppTheme.primaryLight, size: 28),
                ),
                const SizedBox(height: 12),
                Text(
                  'No Stays Found',
                  style: TextStyle(color: textHead, fontSize: 17, fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 6),
                Text(
                  'We couldn\'t find any destinations matching "$_searchQuery".',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: textMuted, fontSize: 12, height: 1.4),
                ),
                const SizedBox(height: 14),
                ElevatedButton(
                  onPressed: () {
                    _searchController.clear();
                    setState(() {
                      _searchQuery = '';
                      _selectedCategory = DestinationCategory.all;
                    });
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.primary,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                  child: const Text('Reset All Filters', style: TextStyle(color: Colors.white, fontSize: 12)),
                ),
              ],
            ),
          )
        else
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
