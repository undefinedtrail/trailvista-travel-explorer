import 'package:flutter/material.dart';
import '../constants/theme.dart';
import '../models/destination.dart';
import '../widgets/attraction_card.dart';

class DetailsScreen extends StatelessWidget {
  final Destination destination;
  final bool isSaved;
  final VoidCallback onToggleWishlist;

  const DetailsScreen({
    Key? key,
    required this.destination,
    required this.isSaved,
    required this.onToggleWishlist,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? AppTheme.darkCard : AppTheme.lightCard;
    final cardBorder = isDark ? AppTheme.darkCardBorder : AppTheme.lightCardBorder;
    final textHead = isDark ? AppTheme.darkText : AppTheme.lightText;
    final textMuted = isDark ? AppTheme.darkTextMuted : AppTheme.lightTextMuted;

    return Scaffold(
      body: Stack(
        children: [
          // Scrollable Content
          SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Hero Image
                Stack(
                  children: [
                    SizedBox(
                      height: 340,
                      width: double.infinity,
                      child: Image.network(
                        destination.image,
                        fit: BoxFit.cover,
                      ),
                    ),
                    Positioned.fill(
                      child: Container(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [
                              Colors.black.withOpacity(0.5),
                              Colors.transparent,
                              Colors.black.withOpacity(0.8),
                            ],
                          ),
                        ),
                      ),
                    ),
                    // Top App Bar Icons
                    SafeArea(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            GestureDetector(
                              onTap: () => Navigator.of(context).pop(),
                              child: Container(
                                width: 38,
                                height: 38,
                                decoration: BoxDecoration(
                                  color: Colors.black54,
                                  shape: BoxShape.circle,
                                  border: Border.all(color: Colors.white24),
                                ),
                                child: const Icon(Icons.arrow_back, color: Colors.white, size: 20),
                              ),
                            ),
                            const SizedBox.shrink(),
                            GestureDetector(
                              onTap: onToggleWishlist,
                              child: Container(
                                width: 38,
                                height: 38,
                                decoration: BoxDecoration(
                                  color: Colors.black54,
                                  shape: BoxShape.circle,
                                  border: Border.all(color: Colors.white24),
                                ),
                                child: Icon(
                                  isSaved ? Icons.favorite : Icons.favorite_border,
                                  color: isSaved ? AppTheme.primaryLight : Colors.white,
                                  size: 20,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    // Bottom Hero Information
                    Positioned(
                      bottom: 16,
                      left: 16,
                      right: 16,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    const Icon(Icons.calendar_month, size: 13, color: Color(0xFFFBBF24)),
                                    const SizedBox(width: 4),
                                    Text(
                                      destination.bestTimeToVisit,
                                      style: const TextStyle(
                                        color: Color(0xFFFBBF24),
                                        fontSize: 11,
                                        fontWeight: FontWeight.w700,
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  destination.name,
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 22,
                                    fontWeight: FontWeight.w800,
                                    letterSpacing: -0.4,
                                  ),
                                ),
                                const SizedBox(height: 3),
                                Row(
                                  children: [
                                    const Icon(Icons.location_on, size: 14, color: AppTheme.primaryLight),
                                    const SizedBox(width: 3),
                                    Text(
                                      destination.location,
                                      style: const TextStyle(
                                        color: Color(0xFFEDE9E1),
                                        fontSize: 12,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                            decoration: BoxDecoration(
                              color: Colors.black54,
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: Colors.white24),
                            ),
                            child: Column(
                              children: [
                                Row(
                                  children: [
                                    const Icon(Icons.star, size: 14, color: AppTheme.gold),
                                    const SizedBox(width: 3),
                                    Text(
                                      destination.rating.toStringAsFixed(2),
                                      style: const TextStyle(
                                        color: Colors.white,
                                        fontSize: 13,
                                        fontWeight: FontWeight.w700,
                                      ),
                                    ),
                                  ],
                                ),
                                Text(
                                  '${destination.reviewsCount} logs',
                                  style: const TextStyle(
                                    color: Color(0xFFA0A0AB),
                                    fontSize: 9,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),

                // Main Body Content
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Quick Facts Row
                      Row(
                        children: [
                          Expanded(
                            child: Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: cardBg,
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: cardBorder),
                              ),
                              child: Column(
                                children: [
                                  const Icon(Icons.schedule, color: AppTheme.primaryLight, size: 20),
                                  const SizedBox(height: 4),
                                  Text(
                                    'DURATION',
                                    style: TextStyle(
                                      color: textMuted,
                                      fontSize: 9,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                  Text(
                                    destination.duration,
                                    style: TextStyle(
                                      color: textHead,
                                      fontSize: 12,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: cardBg,
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: cardBorder),
                              ),
                              child: Column(
                                children: [
                                  const Icon(Icons.wb_sunny, color: AppTheme.gold, size: 20),
                                  const SizedBox(height: 4),
                                  Text(
                                    'WEATHER',
                                    style: TextStyle(
                                      color: textMuted,
                                      fontSize: 9,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                  Text(
                                    destination.weather.split(' ')[0],
                                    style: TextStyle(
                                      color: textHead,
                                      fontSize: 12,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: cardBg,
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: cardBorder),
                              ),
                              child: Column(
                                children: [
                                  const Icon(Icons.category, color: AppTheme.secondary, size: 20),
                                  const SizedBox(height: 4),
                                  Text(
                                    'CATEGORY',
                                    style: TextStyle(
                                      color: textMuted,
                                      fontSize: 9,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                  Text(
                                    destination.category.displayName,
                                    style: TextStyle(
                                      color: textHead,
                                      fontSize: 12,
                                      fontWeight: FontWeight.w700,
                                    ),
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),

                      // Overview Description Card
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: cardBg,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: cardBorder),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Container(
                                  width: 4,
                                  height: 14,
                                  color: AppTheme.primary,
                                ),
                                const SizedBox(width: 6),
                                Text(
                                  'EXPEDITION OVERVIEW',
                                  style: TextStyle(
                                    color: textHead,
                                    fontSize: 12,
                                    fontWeight: FontWeight.w800,
                                    letterSpacing: 0.6,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 8),
                            Text(
                              destination.description,
                              style: TextStyle(
                                color: isDark ? AppTheme.darkTextSecondary : AppTheme.lightTextSecondary,
                                fontSize: 13,
                                height: 1.6,
                              ),
                            ),
                            const SizedBox(height: 12),
                            Wrap(
                              spacing: 6,
                              runSpacing: 6,
                              children: destination.tags
                                  .map(
                                    (tag) => Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                      decoration: BoxDecoration(
                                        color: isDark ? AppTheme.darkChipIdle : AppTheme.lightChipIdle,
                                        borderRadius: BorderRadius.circular(4),
                                        border: Border.all(
                                          color: isDark ? AppTheme.darkChipBorder : AppTheme.lightChipBorder,
                                        ),
                                      ),
                                      child: Text(
                                        '#$tag',
                                        style: TextStyle(
                                          color: textMuted,
                                          fontSize: 10,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                    ),
                                  )
                                  .toList(),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 16),

                      // Curated Highlights Section
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Container(
                                width: 4,
                                height: 14,
                                color: AppTheme.primary,
                              ),
                              const SizedBox(width: 6),
                              Text(
                                'CURATED HIGHLIGHTS',
                                style: TextStyle(
                                  color: textHead,
                                  fontSize: 12,
                                  fontWeight: FontWeight.w800,
                                  letterSpacing: 0.6,
                                ),
                              ),
                              const SizedBox(width: 6),
                              Container(
                                width: 20,
                                height: 20,
                                alignment: Alignment.center,
                                decoration: BoxDecoration(
                                  color: isDark ? AppTheme.darkChipIdle : AppTheme.lightChipIdle,
                                  shape: BoxShape.circle,
                                ),
                                child: Text(
                                  destination.attractions.length.toString(),
                                  style: const TextStyle(
                                    color: AppTheme.primaryLight,
                                    fontSize: 11,
                                    fontWeight: FontWeight.w800,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const Text(
                            'Must-Visit Sights',
                            style: TextStyle(
                              color: AppTheme.primaryLight,
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),

                      // Attraction Cards
                      ...destination.attractions.map(
                        (attraction) => AttractionCardWidget(attraction: attraction),
                      ),

                      // Curator's Field Note
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: cardBg,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: cardBorder),
                          borderLeft: const BorderSide(color: Color(0xFFF59E0B), width: 4),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Row(
                              children: [
                                Icon(Icons.lightbulb, color: Color(0xFFFBBF24), size: 18),
                                SizedBox(width: 6),
                                Text(
                                  "CURATOR'S FIELD NOTE",
                                  style: TextStyle(
                                    color: Color(0xFFF59E0B),
                                    fontSize: 11,
                                    fontWeight: FontWeight.w800,
                                    letterSpacing: 0.8,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 6),
                            Text(
                              destination.curatorTip,
                              style: TextStyle(
                                color: isDark ? AppTheme.darkTextSecondary : AppTheme.lightTextSecondary,
                                fontSize: 12,
                                height: 1.5,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 100),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Bottom Fixed Action Bar
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                color: isDark ? AppTheme.darkSurface : AppTheme.lightSurface,
                border: Border(top: BorderSide(color: cardBorder)),
              ),
              child: SafeArea(
                top: false,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.baseline,
                          textBaseline: TextBaseline.alphabetic,
                          children: [
                            Text('₹', style: TextStyle(color: textHead, fontSize: 13, fontWeight: FontWeight.w700)),
                            Text(
                              destination.pricePerNight.toString(),
                              style: TextStyle(color: textHead, fontSize: 20, fontWeight: FontWeight.w800),
                            ),
                            Text(' / night', style: TextStyle(color: textMuted, fontSize: 11)),
                          ],
                        ),
                        const Row(
                          children: [
                            CircleAvatar(radius: 3, backgroundColor: Color(0xFF10B981)),
                            SizedBox(width: 4),
                            Text(
                              'Heritage Stay Included',
                              style: TextStyle(color: Color(0xFF34D399), fontSize: 10, fontWeight: FontWeight.w600),
                            ),
                          ],
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        GestureDetector(
                          onTap: onToggleWishlist,
                          child: Container(
                            width: 44,
                            height: 44,
                            decoration: BoxDecoration(
                              color: cardBg,
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: cardBorder),
                            ),
                            child: Icon(
                              isSaved ? Icons.favorite : Icons.favorite_border,
                              color: isSaved ? AppTheme.primaryLight : textHead,
                              size: 22,
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        ElevatedButton.icon(
                          onPressed: () {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('Expedition reserved for ${destination.name}!'),
                                backgroundColor: AppTheme.primary,
                              ),
                            );
                          },
                          icon: const Icon(Icons.flight_takeoff, size: 16, color: Colors.white),
                          label: const Text(
                            'Book Expedition',
                            style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w700),
                          ),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppTheme.primary,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
