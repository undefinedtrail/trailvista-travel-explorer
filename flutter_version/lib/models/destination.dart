import 'attraction.dart';

enum DestinationCategory {
  all,
  beaches,
  mountains,
  heritage,
  adventure,
}

extension DestinationCategoryExtension on DestinationCategory {
  String get displayName {
    switch (this) {
      case DestinationCategory.all:
        return 'All Expeditions';
      case DestinationCategory.beaches:
        return 'Beaches';
      case DestinationCategory.mountains:
        return 'Mountains';
      case DestinationCategory.heritage:
        return 'Heritage';
      case DestinationCategory.adventure:
        return 'Adventure';
    }
  }

  static DestinationCategory fromString(String category) {
    switch (category.toLowerCase()) {
      case 'beaches':
        return DestinationCategory.beaches;
      case 'mountains':
        return DestinationCategory.mountains;
      case 'heritage':
        return DestinationCategory.heritage;
      case 'adventure':
        return DestinationCategory.adventure;
      default:
        return DestinationCategory.all;
    }
  }
}

class Destination {
  final String id;
  final String name;
  final String location;
  final String state;
  final DestinationCategory category;
  final String image;
  final double rating;
  final int reviewsCount;
  final int pricePerNight;
  final String description;
  final String bestTimeToVisit;
  final String duration;
  final String weather;
  final String curatorTip;
  final List<String> tags;
  final List<Attraction> attractions;
  final String? badge;

  const Destination({
    required this.id,
    required this.name,
    required this.location,
    required this.state,
    required this.category,
    required this.image,
    required this.rating,
    required this.reviewsCount,
    required this.pricePerNight,
    required this.description,
    required this.bestTimeToVisit,
    required this.duration,
    required this.weather,
    required this.curatorTip,
    required this.tags,
    required this.attractions,
    this.badge,
  });

  factory Destination.fromJson(Map<String, dynamic> json) {
    return Destination(
      id: json['id'] as String,
      name: json['name'] as String,
      location: json['location'] as String,
      state: json['state'] as String,
      category: DestinationCategoryExtension.fromString(json['category'] as String),
      image: json['image'] as String,
      rating: (json['rating'] as num).toDouble(),
      reviewsCount: json['reviewsCount'] as int,
      pricePerNight: json['pricePerNight'] as int,
      description: json['description'] as String,
      bestTimeToVisit: json['bestTimeToVisit'] as String,
      duration: json['duration'] as String,
      weather: json['weather'] as String,
      curatorTip: json['curatorTip'] as String,
      tags: List<String>.from(json['tags'] as List),
      attractions: (json['attractions'] as List)
          .map((a) => Attraction.fromJson(a as Map<String, dynamic>))
          .toList(),
      badge: json['badge'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'location': location,
      'state': state,
      'category': category.displayName,
      'image': image,
      'rating': rating,
      'reviewsCount': reviewsCount,
      'pricePerNight': pricePerNight,
      'description': description,
      'bestTimeToVisit': bestTimeToVisit,
      'duration': duration,
      'weather': weather,
      'curatorTip': curatorTip,
      'tags': tags,
      'attractions': attractions.map((a) => a.toJson()).toList(),
      'badge': badge,
    };
  }
}
