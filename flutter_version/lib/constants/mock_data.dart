import '../models/attraction.dart';
import '../models/destination.dart';

const List<DestinationCategory> kCategories = [
  DestinationCategory.all,
  DestinationCategory.heritage,
  DestinationCategory.mountains,
  DestinationCategory.beaches,
  DestinationCategory.adventure,
];

const List<Destination> kMockDestinations = [
  Destination(
    id: 'varanasi',
    name: 'Varanasi Ancient Ghats',
    location: 'Ganga Riverfront, Uttar Pradesh',
    state: 'Uttar Pradesh',
    category: DestinationCategory.heritage,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    rating: 4.90,
    reviewsCount: 1840,
    pricePerNight: 3200,
    badge: 'Rare Gem',
    bestTimeToVisit: 'Oct – Mar (Ganga Dusk & Festivals)',
    duration: '3-4 Days',
    weather: '28°C Sunny',
    description:
        'At 05:30 AM, before daylight breaches the river horizon, slender wooden oars dip silently into the sacred Ganges. Pale ochre mist rises from the river as priests chant Vedic hymns along ancient terraced stone steps. Life, devotion, and centuries of living spiritual heritage flow unbroken together.',
    curatorTip:
        'Board your wooden boat at Assi Ghat precisely at 5:15 AM to witness the sun rise directly across the tranquil waters before motorized tour boats arrive.',
    tags: ['Ghats', 'Vedic Chants', 'Spiritual', 'UNESCO Heritage'],
    attractions: [
      Attraction(
        id: 'varanasi-1',
        name: 'Dashashwamedh Ghat Evening Aarti',
        image: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80',
        tag: 'RITUAL',
        timing: '06:45 PM Daily',
        entryFee: 'Free Entry',
        description:
            'Witness the iconic Grand Ganga Aarti with multi-tiered brass oil lamps, conch shells, and sacred incense floating across the river from stone steps or anchored wooden boats.',
      ),
      Attraction(
        id: 'varanasi-2',
        name: 'Assi Ghat Dawn Boat Expedition',
        image: 'https://images.unsplash.com/photo-1598977123418-454555ac189a?auto=format&fit=crop&w=800&q=80',
        tag: 'DAWN',
        timing: '05:15 AM Sunrise',
        entryFee: '₹400 / hr',
        description:
            'Embark on a traditional hand-rowed wooden boat toward Manikarnika. The panoramic sunrise illuminating century-old palaces along the river is unforgettable.',
      ),
      Attraction(
        id: 'varanasi-3',
        name: 'Sarnath Stupa & Deer Park',
        image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80',
        tag: 'HERITAGE',
        timing: '5th Century CE',
        entryFee: '₹50 Entry',
        description:
            'Where Gautama Buddha gave his first sermon. Home to the towering Dhamek Stupa, Ashoka Lion Capital museum, and meditative shaded parklands.',
      ),
    ],
  ),
  Destination(
    id: 'munnar',
    name: 'Munnar Mist & Tea Terraces',
    location: 'Idukki, Western Ghats, Kerala',
    state: 'Kerala',
    category: DestinationCategory.mountains,
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    rating: 4.92,
    reviewsCount: 2110,
    pricePerNight: 4200,
    badge: '1,600m Alt',
    bestTimeToVisit: 'Sep – May (Cool Mist & Emerald Spices)',
    duration: '3-4 Days',
    weather: '18°C Misty',
    description:
        'Colonial-era planter bungalow perched over contour-farmed tea slopes. Includes guided mountain mist walk, loose-leaf tasting, and cardamom fireplace lounge amidst 1,600m Western Ghats peaks.',
    curatorTip:
        'Head to Top Station at 06:00 AM for the rare Neelakurinji valley view floating high above a dramatic carpet of white clouds.',
    tags: ['Tea Estates', 'Western Ghats', 'Cloud Valley', 'Waterfalls'],
    attractions: [
      Attraction(
        id: 'munnar-1',
        name: 'Kolukkumalai Highest Tea Estate',
        image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
        tag: 'ESTATE',
        timing: '06:00 AM - 05:00 PM',
        entryFee: '₹150 Entry',
        description:
            'The worlds highest organic tea plantation accessible via rugged mountain jeeps, offering panoramic sunrise vistas above the cloud bank.',
      ),
      Attraction(
        id: 'munnar-2',
        name: 'Eravikulam National Park & Anamudi',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
        tag: 'WILDLIFE',
        timing: '07:30 AM - 04:00 PM',
        entryFee: '₹200 Entry',
        description:
            'Sanctuary for the endangered Nilgiri Tahr against rolling shola grasslands and the highest mountain peak in South India.',
      ),
      Attraction(
        id: 'munnar-3',
        name: 'Mattupetty Dam & Lake',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tag: 'NATURE',
        timing: '09:00 AM - 05:00 PM',
        entryFee: '₹50 Entry',
        description:
            'Scenic masonry dam nestled between verdant hills, famous for tranquil speed boating and wild elephant sightings on the banks.',
      ),
    ],
  ),
  Destination(
    id: 'gokarna',
    name: 'Gokarna Om Beach & Coastal Cliffs',
    location: 'Uttara Kannada, Karnataka',
    state: 'Karnataka',
    category: DestinationCategory.beaches,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    rating: 4.86,
    reviewsCount: 1620,
    pricePerNight: 2500,
    badge: 'Arabian Sea',
    bestTimeToVisit: 'Oct – Mar (Golden Sunsets & Gentle Swells)',
    duration: '2-3 Days',
    weather: '29°C Coastal Breeze',
    description:
        'Where the Western Ghats tumble directly into the Arabian Sea. Golden crescent beaches shaped naturally like the sacred Om symbol, fringed with coconut groves, dramatic clifftop trails, and serene beach shacks.',
    curatorTip:
        'Trek the coastal trail from Kudle to Half Moon Beach at 4:30 PM to catch sunset from the rocky promontory with dolphins surfing the break.',
    tags: ['Om Beach', 'Coastal Trek', 'Sunsets', 'Cliff Shacks'],
    attractions: [
      Attraction(
        id: 'gokarna-1',
        name: 'Kudle Beach Clifftop Trail',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        tag: 'TREK',
        timing: 'Open 24 Hours',
        entryFee: 'Free',
        description:
            'Panoramic hiking trail connecting rocky headlands with peaceful bohemian cafes overlooking dramatic Arabian sea tides.',
      ),
      Attraction(
        id: 'gokarna-2',
        name: 'Om Beach Sacred Coves',
        image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
        tag: 'OCEAN',
        timing: 'Sunrise to Sunset',
        entryFee: 'Free',
        description:
            'Naturally sculpted coastal rocks where two semi-circular coves join together, perfect for ocean kayaking, paddleboarding, and dolphin spotting.',
      ),
      Attraction(
        id: 'gokarna-3',
        name: 'Half Moon & Paradise Beach Trek',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        tag: 'SECRET COVE',
        timing: 'Daylight Hours',
        entryFee: 'Free',
        description:
            'Secluded wild beaches accessible only by boat or rugged cliffside trek through coastal forests and granite boulders.',
      ),
    ],
  ),
  Destination(
    id: 'rishikesh',
    name: 'Rishikesh Rapids & Himalayan Foothills',
    location: 'Dehradun, Uttarakhand',
    state: 'Uttarakhand',
    category: DestinationCategory.adventure,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    rating: 4.89,
    reviewsCount: 2450,
    pricePerNight: 2800,
    badge: 'Grade IV Rapids',
    bestTimeToVisit: 'Sep – Jun (Prime Rafting & Trekking)',
    duration: '3-4 Days',
    weather: '22°C Mountain Breeze',
    description:
        'The adventure capital nestled between turquoise Ganga currents and the Shivalik range. High-octane Grade IV river rafting, bungee drops over emerald valleys, cliff jumping, and cliffside campfires.',
    curatorTip:
        'Book the 26km Marine Drive to Shivpuri rafting slot at 08:30 AM when river currents are swift and mountain air is crisp.',
    tags: ['White Water Rafting', 'Bungee Jump', 'Himalayas', 'Riverside Camps'],
    attractions: [
      Attraction(
        id: 'rishikesh-1',
        name: 'Marine Drive Grade IV White Water Rapids',
        image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80',
        tag: 'EXPEDITION',
        timing: '08:00 AM - 03:00 PM',
        entryFee: '₹1,200 / person',
        description:
            'Electrifying 16km white water expedition navigating famous rapids including "Roller Coaster", "Golf Course", and "Club House".',
      ),
      Attraction(
        id: 'rishikesh-2',
        name: 'Mohan Chatti Bungee & Giant Swing',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
        tag: 'EXTREME',
        timing: '09:00 AM - 04:00 PM',
        entryFee: '₹3,550 / jump',
        description:
            'Indias highest 83-meter cantilever bungee jump platform fixed amidst rugged rocky ravines with international jump masters.',
      ),
      Attraction(
        id: 'rishikesh-3',
        name: 'Neer Garh Multi-Tier Waterfall Trek',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
        tag: 'TREK',
        timing: '08:00 AM - 06:00 PM',
        entryFee: '₹30 Entry',
        description:
            'Hidden multi-tiered glacial cascade reached by climbing narrow stone tracks through wild butterfly thickets and natural rock pools.',
      ),
    ],
  ),
  Destination(
    id: 'hampi',
    name: 'Hampi Stone Chariot & Vijayanagara Ruins',
    location: 'Vijayanagara, Karnataka',
    state: 'Karnataka',
    category: DestinationCategory.heritage,
    image: 'https://images.unsplash.com/photo-1600100397608-f010f443b740?auto=format&fit=crop&w=1200&q=80',
    rating: 4.95,
    reviewsCount: 3100,
    pricePerNight: 3400,
    badge: 'UNESCO Heritage',
    bestTimeToVisit: 'Nov – Feb (Pleasant Weather & Exploration)',
    duration: '3-4 Days',
    weather: '26°C Clear Sky',
    description:
        'A surreal open-air museum spread across 4,100 hectares of golden granite boulders. Explore 14th-century capital of the Vijayanagara Empire with monolithic temples, musical pillars, and coracle boat river crossings.',
    curatorTip:
        'Cross the Tungabhadra river in a circular wicker coracle boat at dawn to explore the quieter Anegundi side before the heat sets in.',
    tags: ['Vijayanagara', 'Stone Chariot', 'Boulders', 'Tungabhadra'],
    attractions: [
      Attraction(
        id: 'hampi-1',
        name: 'Vijaya Vittala Stone Chariot & Musical Pillars',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        tag: 'MONUMENT',
        timing: '06:00 AM - 06:00 PM',
        entryFee: '₹40 Entry',
        description:
            'Iconic Garuda shrine carved out of ornate granite blocks, accompanied by the legendary musical acoustic stone pillars.',
      ),
      Attraction(
        id: 'hampi-2',
        name: 'Matanga Hill Sunset Panoramic Point',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tag: 'PANORAMA',
        timing: '05:00 AM - 06:30 PM',
        entryFee: 'Free',
        description:
            'The highest vantage point across ancient Hampi, overlooking ruins, banana plantations, and temples bathed in bronze evening light.',
      ),
      Attraction(
        id: 'hampi-3',
        name: 'Virupaksha Temple & Ancient Colonnaded Bazaar',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        tag: 'SACRED',
        timing: '06:00 AM - 08:00 PM',
        entryFee: '₹25 Entry',
        description:
            'Seventh-century living temple with towering 50-meter gopuram alongside ancient colonnaded market streets once trading diamonds.',
      ),
    ],
  ),
  Destination(
    id: 'radhanagar',
    name: 'Radhanagar Beach & Coral Atolls',
    location: 'Havelock, Andaman & Nicobar Islands',
    state: 'Andaman',
    category: DestinationCategory.beaches,
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80',
    rating: 4.97,
    reviewsCount: 1950,
    pricePerNight: 5200,
    badge: 'Asia Top Beach',
    bestTimeToVisit: 'Oct – May (Crystal Turquoise Waters)',
    duration: '4-5 Days',
    weather: '30°C Tropical',
    description:
        'Crowned Asias best beach by Time Magazine. Powder-soft white sands curved against ancient mahua rainforests, luminescent aquamarine waters, world-class scuba diving, and vibrant living coral gardens.',
    curatorTip:
        'Stay until sunset when the sky turns molten copper and swim in the tranquil natural cove at Neil’s Lagoon.',
    tags: ['Turquoise Waters', 'Coral Reef', 'Rainforest', 'Snorkeling'],
    attractions: [
      Attraction(
        id: 'radhanagar-1',
        name: 'Elephant Beach Scuba & Snorkel Reefs',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        tag: 'REEF',
        timing: '07:30 AM - 03:00 PM',
        entryFee: '₹1,500 / dive',
        description:
            'Vivid fringing reefs teeming with clownfish, sea turtles, and kaleidoscopic brain coral just meters off the shoreline.',
      ),
      Attraction(
        id: 'radhanagar-2',
        name: 'Neils Cove Hidden Lagoon',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        tag: 'LAGOON',
        timing: 'Daylight Hours',
        entryFee: 'Free',
        description:
            'Secluded natural swimming lagoon nestled behind black limestone rocks at the quiet northern bend of Radhanagar.',
      ),
      Attraction(
        id: 'radhanagar-3',
        name: 'Bioluminescent Mangrove Night Kayaking',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        tag: 'BIOLUMINESCENT',
        timing: '07:00 PM - 09:30 PM',
        entryFee: '₹2,500 / kayak',
        description:
            'Glide through Havelocks tranquil mangrove channels as glowing plankton illuminates each paddle stroke in starry darkness.',
      ),
    ],
  ),
];
