import 'package:flutter/material.dart';
import '../constants/mock_data.dart';
import '../constants/theme.dart';
import '../models/destination.dart';
import '../widgets/category_chip.dart';

class WishlistScreen extends StatefulWidget {
  final List<String> wishlistIds;
  final Function(Destination) onSelectDestination;
  final Function(String) onRemoveFromWishlist;
  final VoidCallback onClearWishlist;
  final VoidCallback onNavigateToHome;

  const WishlistScreen({
    Key? key,
    required this.wishlistIds,
    required this.onSelectDestination,
    required this.onRemoveFromWishlist,
    required this.onClearWishlist,
    required this.onNavigateToHome,
  }) : super(key: key);

  @override
  State<WishlistScreen> createState() => _WishlistScreenState();
}

class _WishlistScreenState extends State<WishlistScreen> {
  DestinationCategory _selectedFilter = DestinationCategory.all;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textHead = isDark ? AppTheme.darkText : AppTheme.lightText;
    final textMuted = isDark ? AppTheme.darkTextMuted : AppTheme.lightTextMuted;
    final cardBg = isDark ? AppTheme.darkCard : AppTheme.lightCard;
    final cardBorder = isDark ? AppTheme.darkCardBorder : AppTheme.lightCardBorder;

    final savedList = kMockDestinations.where((d) => widget.wishlistIds.contains(d.id)).toList();
    final filteredList = _selectedFilter == DestinationCategory.all
        ? savedList
        : savedList.where((d) => d.category == _selectedFilter).toList();

    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      children: [
        const Row(
          children: [
            Icon(Icons.bookmarks, size: 14, color: AppTheme.gold),
            SizedBox(width: 4),
            Text(
              'FIELD REPOSITORY & ARCHIVES',
              style: TextStyle(
                color: AppTheme.primaryLight,
                fontSize: 10,
                fontWeight: FontWeight.w800,
                letterSpacing: 1,
              ),
            ),
          ],
        ),
        const SizedBox(height: 4),
        Text(
          'Saved Journeys',
          style: TextStyle(
            color: textHead,
            fontSize: 26,
            fontWeight: FontWeight.w800,
            letterSpacing: -0.6,
          ),
        ),
        const SizedBox(height: 4),
        Row(
          children: [
            const CircleAvatar(radius: 3, backgroundColor: AppTheme.primary),
            const SizedBox(width: 6),
            Text(
              '${savedList.length} destinations persisted via SharedPreferences',
              style: TextStyle(color: textMuted, fontSize: 11),
            ),
          ],
        ),
        const SizedBox(height: 14),

        // Filter chips if saved list is not empty
        if (savedList.isNotEmpty) ...[
          SizedBox(
            height: 38,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: kCategories.length,
              itemBuilder: (context, index) {
                final cat = kCategories[index];
                final count = cat == DestinationCategory.all
                    ? savedList.length
                    : savedList.where((d) => d.category == cat).length;
                if (cat != DestinationCategory.all && count == 0) return const SizedBox.shrink();
                return CategoryChipWidget(
                  label: cat == DestinationCategory.all ? 'All Saved ($count)' : '${cat.displayName} ($count)',
                  isSelected: _selectedFilter == cat,
                  onTap: () {
                    setState(() {
                      _selectedFilter = cat;
                    });
                  },
                );
              },
            ),
          ),
          const SizedBox(height: 14),
        ],

        // Empty state
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
                  child: const Icon(Icons.bookmark_border, color: AppTheme.primaryLight, size: 28),
                ),
                const SizedBox(height: 12),
                Text(
                  'Your Field Notebook is Empty',
                  style: TextStyle(color: textHead, fontSize: 17, fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 6),
                Text(
                  'No saved journeys found. Tap the heart button on any destination to save it for offline access.',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: textMuted, fontSize: 12, height: 1.4),
                ),
                const SizedBox(height: 16),
                ElevatedButton.icon(
                  onPressed: widget.onNavigateToHome,
                  icon: const Icon(Icons.explore, size: 16, color: Colors.white),
                  label: const Text(
                    'Discover Destinations',
                    style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w700),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.primary,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                ),
              ],
            ),
          )
        else
          ...filteredList.map(
            (destination) => Container(
              margin: const EdgeInsets.only(bottom: 16),
              decoration: BoxDecoration(
                color: cardBg,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: cardBorder),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(16),
                child: InkWell(
                  onTap: () => widget.onSelectDestination(destination),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Stack(
                        children: [
                          SizedBox(
                            height: 160,
                            width: double.infinity,
                            child: Image.network(
                              destination.image,
                              fit: BoxFit.cover,
                            ),
                          ),
                          Positioned.fill(
                            child: Container(
                              color: Colors.black.withOpacity(0.3),
                            ),
                          ),
                          Positioned(
                            top: 10,
                            left: 10,
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(
                                color: Colors.black54,
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: Text(
                                destination.category.displayName,
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 10,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ),
                          ),
                          Positioned(
                            top: 10,
                            right: 10,
                            child: GestureDetector(
                              onTap: () {
                                widget.onRemoveFromWishlist(destination.id);
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text('Archived ${destination.name} from notebook'),
                                    duration: const Duration(seconds: 2),
                                  ),
                                );
                              },
                              child: Container(
                                width: 32,
                                height: 32,
                                decoration: const BoxDecoration(
                                  color: Color(0xCCBA1A1A),
                                  shape: BoxShape.circle,
                                ),
                                child: const Icon(Icons.delete, color: Colors.white, size: 17),
                              ),
                            ),
                          ),
                        ],
                      ),
                      Padding(
                        padding: const EdgeInsets.all(14.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        destination.name,
                                        style: TextStyle(
                                          color: textHead,
                                          fontSize: 16,
                                          fontWeight: FontWeight.w700,
                                        ),
                                      ),
                                      const SizedBox(height: 2),
                                      Row(
                                        children: [
                                          const Icon(Icons.location_on, size: 12, color: AppTheme.primaryLight),
                                          const SizedBox(width: 2),
                                          Text(
                                            destination.location,
                                            style: TextStyle(color: textMuted, fontSize: 11),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                                Text(
                                  '₹${destination.pricePerNight}',
                                  style: const TextStyle(
                                    color: AppTheme.primaryLight,
                                    fontSize: 16,
                                    fontWeight: FontWeight.w800,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 6),
                            Text(
                              destination.description,
                              style: TextStyle(
                                color: isDark ? AppTheme.darkTextSecondary : AppTheme.lightTextSecondary,
                                fontSize: 12,
                                height: 1.4,
                              ),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),

        // Actions: Export & Clear
        if (savedList.isNotEmpty) ...[
          const SizedBox(height: 12),
          ElevatedButton.icon(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('✓ Compiling Itinerary into JSON & PDF... Ready!'),
                  backgroundColor: AppTheme.primary,
                ),
              );
            },
            icon: const Icon(Icons.file_download, size: 17, color: Colors.white),
            label: const Text(
              'Export Itinerary (JSON / PDF)',
              style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w700),
            ),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primary,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              padding: const EdgeInsets.symmetric(vertical: 12),
            ),
          ),
          const SizedBox(height: 8),
          OutlinedButton.icon(
            onPressed: () {
              showDialog(
                context: context,
                builder: (ctx) => AlertDialog(
                  title: const Text('Clear Wishlist'),
                  content: const Text('Are you sure you want to remove all saved items from SharedPreferences?'),
                  actions: [
                    TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Cancel')),
                    TextButton(
                      onPressed: () {
                        widget.onClearWishlist();
                        Navigator.pop(ctx);
                      },
                      child: const Text('Clear All', style: TextStyle(color: Colors.red)),
                    ),
                  ],
                ),
              );
            },
            icon: const Icon(Icons.delete_sweep, size: 18, color: Colors.redAccent),
            label: const Text(
              'Clear Entire Wishlist',
              style: TextStyle(color: Colors.redAccent, fontSize: 12, fontWeight: FontWeight.w600),
            ),
            style: OutlinedButton.styleFrom(
              side: BorderSide(color: cardBorder),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              padding: const EdgeInsets.symmetric(vertical: 10),
            ),
          ),
        ],

        const SizedBox(height: 80),
      ],
    );
  }
}
