class Attraction {
  final String id;
  final String name;
  final String image;
  final String description;
  final String tag;
  final String? timing;
  final String? entryFee;

  const Attraction({
    required this.id,
    required this.name,
    required this.image,
    required this.description,
    required this.tag,
    this.timing,
    this.entryFee,
  });

  factory Attraction.fromJson(Map<String, dynamic> json) {
    return Attraction(
      id: json['id'] as String,
      name: json['name'] as String,
      image: json['image'] as String,
      description: json['description'] as String,
      tag: json['tag'] as String,
      timing: json['timing'] as String?,
      entryFee: json['entryFee'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'image': image,
      'description': description,
      'tag': tag,
      'timing': timing,
      'entryFee': entryFee,
    };
  }
}
