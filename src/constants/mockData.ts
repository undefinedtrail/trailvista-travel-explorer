import { Destination, DestinationCategory } from '../models/Destination';

export interface StateInfo {
  id: string;
  name: string;
  subtitle: string;
  season: string;
  temp: string;
  sunset: string;
  desc: string;
}

export interface StatePin {
  id: string;
  name: string;
  top: number;
  left: number;
}

export const CATEGORIES: DestinationCategory[] = [
  'All',
  'Heritage',
  'Mountains',
  'Beaches',
  'Adventure',
];

export const STATES_LIST = [
  { id: 'all', name: 'All States' },
  { id: 'kerala', name: 'Kerala' },
  { id: 'tamil_nadu', name: 'Tamil Nadu' },
  { id: 'karnataka', name: 'Karnataka' },
  { id: 'maharashtra', name: 'Maharashtra' },
  { id: 'andhra_pradesh', name: 'Andhra Pradesh' },
  { id: 'ladakh', name: 'Ladakh' },
  { id: 'himachal', name: 'Himachal' },
  { id: 'rajasthan', name: 'Rajasthan' },
  { id: 'uttar_pradesh', name: 'Uttar Pradesh' },
  { id: 'assam', name: 'Assam' },
];

export const STATE_PINS: Record<string, StatePin> = {
  ladakh: { id: 'ladakh', name: 'Ladakh', top: 14.2, left: 33.8 },
  himachal: { id: 'himachal', name: 'Himachal Pradesh', top: 20.1, left: 35.3 },
  rajasthan: { id: 'rajasthan', name: 'Rajasthan', top: 36.5, left: 13.0 },
  uttar_pradesh: { id: 'uttar_pradesh', name: 'Uttar Pradesh', top: 41.5, left: 50.5 },
  assam: { id: 'assam', name: 'Assam', top: 37.6, left: 82.3 },
  maharashtra: { id: 'maharashtra', name: 'Maharashtra', top: 57.8, left: 26.3 },
  andhra_pradesh: { id: 'andhra_pradesh', name: 'Andhra Pradesh', top: 63.0, left: 50.2 },
  karnataka: { id: 'karnataka', name: 'Karnataka', top: 72.3, left: 30.3 },
  kerala: { id: 'kerala', name: 'Kerala', top: 88.4, left: 30.5 },
  tamil_nadu: { id: 'tamil_nadu', name: 'Tamil Nadu', top: 88.5, left: 36.8 },
};

export const STATE_DATABASE: Record<string, StateInfo> = {
  all: {
    id: 'all',
    name: 'Incredible India',
    subtitle: '• Nationwide Curated Expeditions',
    season: 'Year-Round Journeys',
    temp: 'Diverse Climates',
    sunset: 'Subcontinental Golden Hour',
    desc: 'Select any pinpoint beacon across the vector map to inspect state-level seasonal telemetry, local boutique homestays, and regional expeditions.',
  },
  ladakh: {
    id: 'ladakh',
    name: 'Ladakh',
    subtitle: '• High Passes & Glacial Sanctuaries',
    season: 'May – Sep (High Season)',
    temp: '11°C',
    sunset: 'Alpine Crystal Clear',
    desc: 'Cobalt glacial lakes at 14,000 ft, white sand cold deserts and ancient Tibetan cliff monasteries nestled in the trans-Himalayas.',
  },
  himachal: {
    id: 'himachal',
    name: 'Himachal Pradesh',
    subtitle: '• Valley of the Gods & Spiti Cold Desert',
    season: 'Apr – Oct',
    temp: '16°C',
    sunset: 'Pine & Cedar Crisp',
    desc: 'Centuries-old mud monasteries, turquoise glacial crescent lakes and dramatic mountain passes cutting through pine-scented valleys.',
  },
  rajasthan: {
    id: 'rajasthan',
    name: 'Rajasthan',
    subtitle: '• Thar Sands & Royal Rajput Palaces',
    season: 'Oct – Mar',
    temp: '29°C',
    sunset: 'Desert Amber Dusk',
    desc: 'Golden sandstone ramparts, starlit dune caravans and tranquil mirror-lake royal havelis reflecting majestic Mewari architecture.',
  },
  uttar_pradesh: {
    id: 'uttar_pradesh',
    name: 'Uttar Pradesh',
    subtitle: '• Sacred Ganga Ghats & Mughal Legacy',
    season: 'Oct – Mar',
    temp: '28°C',
    sunset: 'Ganga Aarti Dusk',
    desc: 'Oldest living spiritual civilization, chanting river ghats, classical sitar notes and marble wonders illuminating the riverbanks.',
  },
  assam: {
    id: 'assam',
    name: 'Assam',
    subtitle: '• Brahmaputra Valleys & Rhino Corridors',
    season: 'Nov – Apr',
    temp: '23°C',
    sunset: 'Emerald Riverbanks',
    desc: 'Endangered one-horned rhinoceros reserves, worlds largest river island and misty colonial tea gardens stretching to the horizon.',
  },
  maharashtra: {
    id: 'maharashtra',
    name: 'Maharashtra',
    subtitle: '• Sahyadri Forts & Rock-cut Sanctuaries',
    season: 'Jul – Feb',
    temp: '28°C',
    sunset: 'Ghats Dusk',
    desc: 'Ancient Buddhist monolithic cave carvings, volcanic plateaus and misty Sahyadri passes crowned by heroic Maratha citadels.',
  },
  andhra_pradesh: {
    id: 'andhra_pradesh',
    name: 'Andhra Pradesh',
    subtitle: '• Bay of Bengal Coasts & Eastern Ghats',
    season: 'Oct – Mar',
    temp: '28°C',
    sunset: 'Coastal Twilight',
    desc: 'Prehistoric subterranean limestone caverns, indigenous shade-grown coffee valleys and golden surf beaches along the Coromandel coast.',
  },
  karnataka: {
    id: 'karnataka',
    name: 'Karnataka',
    subtitle: '• Vijayanagara Empire & Western Ghats',
    season: 'Oct – Apr',
    temp: '25°C',
    sunset: 'Breezy Highlands',
    desc: 'UNESCO monolith ruins along boulder-strewn rivers and rain-washed Arabica plantations nestled deep in the Western Ghats.',
  },
  kerala: {
    id: 'kerala',
    name: 'Kerala',
    subtitle: "• God's Own Country",
    season: 'Oct – Mar (Best Season)',
    temp: '27°C',
    sunset: 'Pleasant Tropical',
    desc: 'Lush backwaters, Alleppey houseboats, spice estate hillocks & misted tea valleys sloping down to Arabian sea coves.',
  },
  tamil_nadu: {
    id: 'tamil_nadu',
    name: 'Tamil Nadu',
    subtitle: '• Dravidian Grandeur & Nilgiri Heights',
    season: 'Nov – Mar',
    temp: '29°C',
    sunset: 'Warm Coastal Breeze',
    desc: 'Centuries-old stone temples, carved Chettinad mansions and heritage spice banquets rooted in living Sangam traditions.',
  },
};

export const MOCK_DESTINATIONS: Destination[] = [
  // KERALA (Mountains & Beaches)
  {
    id: 'ker-01',
    itineraryCode: 'KER 01',
    name: 'Munnar Tea Valleys & Western Ghats Trail',
    location: 'Idukki, Western Ghats, Kerala',
    state: 'Kerala',
    stateKey: 'kerala',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1516690553959-71a414d6b9b6?auto=format&fit=crop&w=1200&q=80',
    rating: 4.42,
    reviewsCount: 2110,
    pricePerNight: 4500,
    badge: '1,600m Alt',
    bestTimeToVisit: 'Sep – May (Cool Mist & Emerald Spices)',
    duration: '3 Days • 2 Nights',
    weather: '18°C Misty',
    sunset: 'Pleasant Tropical',
    subtitle: 'Highlands & Cloud Forests',
    description:
      'Colonial-era planter bungalow perched over contour-farmed tea slopes. Includes guided mountain mist walk, loose-leaf tasting, and cardamom fireplace lounge amidst 1,600m Western Ghats peaks.',
    curatorTip:
      'Early 6 AM departure to Lockhart Peak avoids cloud cover for the unobstructed valley view.',
    highlights: [
      'Day 1: Colonial Tea Estate Trek',
      'Day 2: Lockhart Gap Sunrise & Anamudi',
      'Day 3: Organic Spice Farm Harvest',
    ],
    includes: ['Naturalist Guide', '4x4 Mountain Jeep', 'Authentic Sadhya Meals'],
    tags: ['Tea Estates', 'Western Ghats', 'Cloud Valley', 'Waterfalls'],
    attractions: [
      {
        id: 'ker-01-1',
        name: 'Kolukkumalai Highest Tea Estate',
        image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80',
        tag: 'ESTATE',
        timing: '06:00 AM - 05:00 PM',
        entryFee: '₹150 Entry',
        description:
          'The worlds highest organic tea plantation accessible via rugged mountain jeeps, offering panoramic sunrise vistas above the cloud bank.',
      },
      {
        id: 'ker-01-2',
        name: 'Eravikulam National Park & Anamudi',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
        tag: 'WILDLIFE',
        timing: '07:30 AM - 04:00 PM',
        entryFee: '₹200 Entry',
        description:
          'Sanctuary for the endangered Nilgiri Tahr against rolling shola grasslands and the highest mountain peak in South India.',
      },
      {
        id: 'ker-01-3',
        name: 'Mattupetty Masonry Dam & Lake',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tag: 'NATURE',
        timing: '09:00 AM - 05:00 PM',
        entryFee: '₹50 Entry',
        description:
          'Scenic masonry dam nestled between verdant hills, famous for tranquil speed boating and wild elephant sightings on the banks.',
      },
    ],
    itineraryPlan: [
      {
            "day": "Day 1",
            "title": "Highlands Arrival & Planter Heritage",
            "morning": "09:30 AM: Check-in to colonial stone planter bungalow nestled among contour tea slopes. Welcome cardamom tea and estate orientation.",
            "afternoon": "02:00 PM: Guided walking tour through Lockhart tea factory. Learn orthodox CTC leaf processing, drying, and grading.",
            "evening": "05:30 PM: Sunset walk to Lockhart Gap viewpoint. Fireside loose-leaf tea tasting and dinner in the heritage bungalow dining hall."
      },
      {
            "day": "Day 2",
            "title": "Highest Cloud Peak & Shola Sanctuary",
            "morning": "05:30 AM: Rugged 4x4 mountain jeep ascent to Kolukkumalai (7,900 ft), the world highest organic tea estate, for sunrise above the cloud sea.",
            "afternoon": "01:00 PM: Eravikulam National Park shola grasslands hike to spot the endangered Nilgiri Tahr beneath Anamudi Peak.",
            "evening": "06:00 PM: Traditional Kerala Sadhya feast served on banana leaf followed by campfire storytelling under starry skies."
      },
      {
            "day": "Day 3",
            "title": "Organic Spice Trails & Lake Cruise",
            "morning": "08:30 AM: Guided walk through family-owned organic spice garden to harvest wild cardamom, clove pods, and nutmeg.",
            "afternoon": "01:00 PM: Speedboating across Mattupetty Masonry Dam with wild elephant sightings along the water banks.",
            "evening": "04:30 PM: Scenic descent toward Kochi airport via Cheeyappara and Valara waterfalls."
      }
],
    fieldNotes: {
      "culinary": "Must try: Fluffy Kerala Appam with aromatic vegetable or chicken stew, Malabar Parotta with roasted spices, and hot spiced Cardamom Chai.",
      "logistics": "Cochin International Airport (COK) is 3.5 hours away via NH85 Ghat road. Private SUV hire is recommended for mountain hairpin bends.",
      "gear": "Waterproof trekking boots, breathable rain jacket, fleece for 14°C evenings, and a reusable water canteen."
},
  },
  {
    id: 'ker-02',
    itineraryCode: 'KER 02',
    name: 'Alleppey Backwaters Houseboat Odyssey',
    location: 'Vembanad Lake, Alleppey, Kerala',
    state: 'Kerala',
    stateKey: 'kerala',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    rating: 4.55,
    reviewsCount: 2840,
    pricePerNight: 5800,
    badge: 'Kettuvallam',
    bestTimeToVisit: 'Year-Round (Best Oct – Mar)',
    duration: '4 Days • 3 Nights',
    weather: '27°C Tropical',
    sunset: 'Lagoon Golden Hour',
    subtitle: 'Slow Waterways & Palm Lagoons',
    description:
      'Handcrafted eco-luxury kettuvallam gliding silently through narrow palm-canopied canals, lotus ponds, and ancient spice trading villages of Vembanad.',
    curatorTip:
      'Opt for the narrower inland canals between Champakulam and Kainakary for zero motorboat traffic.',
    highlights: [
      'Day 1: Kettuvallam Private Boarding',
      'Day 2: Vembanad Lake Sunset Cruise',
      'Day 3: Coir Crafting & Kayaking',
    ],
    includes: ['Private Chef on Board', 'Traditional Canoe Safari', 'Fresh Toddy Tasting'],
    tags: ['Houseboat', 'Backwaters', 'Canals', 'Ayurveda'],
    attractions: [
      {
        id: 'ker-02-1',
        name: 'Vembanad Lake Sunset Sanctuary',
        image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
        tag: 'LAKE',
        timing: '06:00 AM - 06:30 PM',
        entryFee: 'Boat Cruise',
        description:
          'Indias longest lake, hosting the world-famous Nehru Trophy Snake Boat Race and tranquil sunset bird-watching.',
      },
      {
        id: 'ker-02-2',
        name: 'Champakulam Kalloorkad St. Mary Basilica',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tag: 'HERITAGE',
        timing: '07:00 AM - 07:00 PM',
        entryFee: 'Free',
        description:
          'One of the oldest Christian churches in India, dating to 427 CE, standing gracefully along the riverbank.',
      },
      {
        id: 'ker-02-3',
        name: 'Marari Golden Sand Shoreline',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        tag: 'BEACH',
        timing: 'Open 24 Hours',
        entryFee: 'Free',
        description:
          'Quiet fishing village beach with coconut groves, warm Arabian waters, and freshly caught seafood shacks.',
      },
    ],
    itineraryPlan: [
  {
    "day": "Day 1",
    "title": "Kettuvallam Boarding & Palm Waterways",
    "morning": "11:30 AM: Welcome coconut drink aboard private handcrafted eco-luxury Kettuvallam at Punnamada jetty. Houseboat sets sail along Vembanad Lake.",
    "afternoon": "01:30 PM: Traditional lunch prepared by private onboard chef featuring fresh pearl spot fish (Karimeen) and Kerala red rice.",
    "evening": "05:30 PM: Anchor near Champakulam village. Walking tour of 427 CE St. Mary Basilica and peaceful palm-fringed village paths."
  },
  {
    "day": "Day 2",
    "title": "Narrow Canal Canoe Safari & Coir Crafts",
    "morning": "06:00 AM: Silent wooden canoe safari gliding through narrow inland waterways inaccessible to large boats. Birdwatching at dawn.",
    "afternoon": "02:00 PM: Visit traditional cottage coir-spinning units and watch skilled artisans weaving coconut fiber into ropes and mats.",
    "evening": "05:45 PM: Sunset cruise across the wide open waters of Vembanad Lake, followed by candlelit dinner on the open boat deck."
  },
  {
    "day": "Day 3",
    "title": "Kumarakom Sanctuary & Sub-Sea Level Paddy Fields",
    "morning": "06:30 AM: Sunrise excursion across to Kumarakom Bird Sanctuary on the eastern lake bank to spot migratory Siberian storks, herons, and kingfishers.",
    "afternoon": "01:00 PM: Drift through Kuttanad, the 'Rice Bowl of Kerala', where farming is uniquely conducted 4 to 10 feet below sea level.",
    "evening": "06:00 PM: Twilight Ayurvedic herbal relaxation session aboard the houseboat, accompanied by live flute melodies on deck."
  },
  {
    "day": "Day 4",
    "title": "Arabian Shoreline & Artisan Farewell",
    "morning": "08:30 AM: Disembark at jetty. Drive 30 minutes to Marari Beach for a peaceful morning walk along golden sands and coconut groves.",
    "afternoon": "12:30 PM: Fresh seafood lunch at beachside shack before visiting Alleppey lighthouse museum.",
    "evening": "04:00 PM: Transfer to Kochi Airport or Alappuzha railway station for onward departure."
  }
],
    fieldNotes: {
      "culinary": "Must try: Karimeen Pollichathu wrapped and roasted in banana leaf, duck roast with appams, and fresh sweet toddy tapped from coconut palms.",
      "logistics": "Alappuzha railway station (ALLP) is 15 minutes from jetty; Cochin International Airport (COK) is 1.5 hours north via NH66.",
      "gear": "Lightweight cotton/linen clothing, polarized sunglasses, natural mosquito repellent, and a waterproof phone dry-bag."
},
  },

  // LADAKH (Mountains / Adventure)
  {
    id: 'lad-01',
    itineraryCode: 'LAD 01',
    name: 'Pangong Tso & Nubra Valley High-Pass Expedition',
    location: 'Leh & Nubra, Ladakh',
    state: 'Ladakh',
    stateKey: 'ladakh',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    rating: 4.67,
    reviewsCount: 1650,
    pricePerNight: 6800,
    badge: '17,982 ft Pass',
    bestTimeToVisit: 'May – Oct (Clear Passes & Milky Way)',
    duration: '6 Days • 5 Nights',
    weather: '11°C Alpine Crisp',
    sunset: 'Alpine Crystal Clear',
    subtitle: 'High Alpine Pass Expedition',
    description:
      'Cobalt glacial lakes at 14,000 ft, white sand cold deserts and ancient Tibetan cliff monasteries nestled in the trans-Himalayas.',
    curatorTip:
      'Spend your first 36 hours resting completely in Leh to acclimatize smoothly to the high altitude.',
    highlights: [
      'Day 1: Khardung La Pass (17,982 ft) Crossing',
      'Day 2: Diskit Monastery & Hunder Sand Dunes',
      'Day 3: Pangong Lake Milky Way Glamping',
    ],
    includes: ['Oxygen-equipped 4x4', 'High-altitude Acclimatization Kit', 'Glamping Domes'],
    tags: ['Trans-Himalayas', 'Glacial Lakes', 'Bactrian Camels', 'Stargazing'],
    attractions: [
      {
        id: 'lad-01-1',
        name: 'Pangong Tso Endorheic Glacial Lake',
        image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
        tag: 'LAKE',
        timing: 'Daylight Hours',
        entryFee: 'Permit Required',
        description:
          'Iconic 134km long lake at 4,225m shifting in shades from cobalt blue to emerald green under dramatic jagged peaks.',
      },
      {
        id: 'lad-01-2',
        name: 'Diskit Monastery & 32m Maitreya Buddha',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tag: 'MONASTERY',
        timing: '06:00 AM - 06:00 PM',
        entryFee: '₹30 Entry',
        description:
          'Oldest and largest Buddhist monastery in Nubra Valley, featuring a monumental golden Maitreya Buddha facing Shyok river.',
      },
      {
        id: 'lad-01-3',
        name: 'Hunder White Sand Cold Desert Dunes',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
        tag: 'DUNES',
        timing: 'Sunrise to Sunset',
        entryFee: '₹300 / camel ride',
        description:
          'High altitude cold sand dunes surrounded by snowy mountains, home to double-humped Bactrian camels from the Silk Route.',
      },
    ],
    itineraryPlan: [
  {
    "day": "Day 1",
    "title": "High Altitude Acclimatization & Leh Bazaar",
    "morning": "09:00 AM: Arrival at Leh Airport (11,500 ft). Transfer to boutique solar-heated hotel. Mandatory complete physical rest for 24 hours.",
    "afternoon": "03:00 PM: Gentle walk through historic Leh Old Town and organic bakeries. Sip warming Kashmiri Kahwa and herbal butter tea.",
    "evening": "05:30 PM: Sunset meditation at whitewashed Shanti Stupa overlooking the Stok Kangri mountain range."
  },
  {
    "day": "Day 2",
    "title": "Indus Valley Monasteries & Shey Palace",
    "morning": "08:00 AM: Visit Hemis Monastery, the largest and wealthiest monastery in Ladakh, with its copper-gilded Buddha and sacred museum relics.",
    "afternoon": "01:30 PM: Tour the 12-storey Thiksey Monastery, architecturally resembling Potala Palace, and witness monastic chanting rituals.",
    "evening": "05:30 PM: Sunset over the ruins of Shey Palace and its giant copper-gold seated Shakyamuni Buddha statue."
  },
  {
    "day": "Day 3",
    "title": "Khardung La Pass & Nubra Sand Dunes",
    "morning": "07:30 AM: Ascend to Khardung La (17,982 ft), one of the worlds highest motorable passes with panoramic Karakoram views.",
    "afternoon": "02:00 PM: Descend into Nubra Valley. Explore 14th-century Diskit Monastery and the majestic 32-meter golden Maitreya Buddha statue.",
    "evening": "05:00 PM: Double-humped Bactrian camel safari among the white sand dunes of Hunder against snowcapped peaks. Night in luxury dome tents."
  },
  {
    "day": "Day 4",
    "title": "Turtuk Village & Baltic Border Culture",
    "morning": "07:30 AM: Journey along the turquoise Shyok river to Turtuk, a picturesque village nestled 12 km from the border, opened to travelers in 2010.",
    "afternoon": "01:00 PM: Walk among ancient apricot and walnut orchards, wooden Balti heritage houses, and taste traditional buckwheat kisir crepes.",
    "evening": "05:30 PM: Return to Hunder camp for traditional Ladakhi cultural folk dances around a warm bonfire under starlit skies."
  },
  {
    "day": "Day 5",
    "title": "Pangong Tso Cobalt Waters & Milky Way",
    "morning": "08:00 AM: Scenic high-altitude drive via Agham-Shyok route to Pangong Tso (14,270 ft), the legendary 134 km long endorheic lake.",
    "afternoon": "01:30 PM: Lakeside picnic lunch watching the crystal waters shift shades from turquoise to deep royal cobalt under passing alpine clouds.",
    "evening": "08:00 PM: World-class stargazing and Milky Way astrophotography session under crystal-clear alpine night skies."
  },
  {
    "day": "Day 6",
    "title": "Chang La Pass Crossing & Leh Departure",
    "morning": "06:30 AM: Golden sunrise reflection across Pangong Lake waters, followed by hot Ladakhi breakfast and butter tea.",
    "afternoon": "01:00 PM: Cross Chang La Pass (17,590 ft), stopping at Tangste for steaming noodle soup before descending into Leh valley.",
    "evening": "05:30 PM: Farewell dinner at an organic Leh terrace cafe; transfer to Leh airport next morning for onward flight."
  }
],
    fieldNotes: {
      "culinary": "Must try: Steaming bowls of vegetable Thukpa, hand-folded mutton Momos, Tingmo steamed bread with dal, and wild Ladakh sea buckthorn juice.",
      "logistics": "Inner Line Permits (ILP) required for Nubra and Pangong (arranged by hotel/agent). Keep portable oxygen cans in vehicle.",
      "gear": "Heavy down jacket, thermal inner layers, UV400 sunglasses, high-SPF sunscreen, lip balm, and an oximeter."
},
  },

  // HIMACHAL PRADESH (Mountains)
  {
    id: 'hp-01',
    itineraryCode: 'HP 01',
    name: 'Spiti Valley Ancient Monasteries & Chandratal Camp',
    location: 'Lahaul & Spiti, Himachal Pradesh',
    state: 'Himachal Pradesh',
    stateKey: 'himachal',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    rating: 4.58,
    reviewsCount: 1780,
    pricePerNight: 5400,
    badge: '3,800m Alt',
    bestTimeToVisit: 'Apr – Oct (High Summer Season)',
    duration: '5 Days • 4 Nights',
    weather: '16°C Pine Crisp',
    sunset: 'Pine & Cedar Crisp',
    subtitle: 'High-Altitude Wilderness & Mud Monasteries',
    description:
      'Centuries-old mud monasteries, turquoise glacial crescent lakes and dramatic mountain passes cutting through pine-scented valleys.',
    curatorTip:
      'Send a physical postcard from Hikkim (14,567 ft) - it takes 2 weeks to reach anywhere worldwide.',
    highlights: [
      'Day 1: Key Gompa Cliff Monastery blessings',
      'Day 2: Highest post office mail sending at Hikkim',
      'Day 3: Chandratal Moon Lake Stargazing Camp',
    ],
    includes: ['Experienced Alpine Driver', 'Spiti Homestay Passes', 'Thermal Sleeping Gear'],
    tags: ['Key Gompa', 'Chandratal', 'Hikkim', 'Cold Desert'],
    attractions: [
      {
        id: 'hp-01-1',
        name: 'Key Gompa 1,000-Year-Old Fortress',
        image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
        tag: 'MONASTERY',
        timing: '06:00 AM - 06:00 PM',
        entryFee: 'Free Entry',
        description:
          'Spectacular cliff-side monastery dating back to the 11th century, housing rare thangkas and ancient musical instruments.',
      },
      {
        id: 'hp-01-2',
        name: 'Chandratal Crescent Moon Glacial Lake',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tag: 'LAKE',
        timing: 'Daylight Hours',
        entryFee: 'Free',
        description:
          'Sacred high-altitude crescent lake at 4,300m mirroring snow-capped Chandra Bhaga peaks.',
      },
      {
        id: 'hp-01-3',
        name: 'Hikkim Worlds Highest Post Office',
        image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
        tag: 'LANDMARK',
        timing: '10:00 AM - 04:00 PM',
        entryFee: 'Postage Cost',
        description:
          'Send vintage handwritten postcards with authentic high-altitude seals to any address on the globe.',
      },
    ],
    itineraryPlan: [
  {
    "day": "Day 1",
    "title": "Key Gompa Cliff Monastery & Kaza Town",
    "morning": "09:00 AM: Base camp orientation in Kaza (12,000 ft). Acclimatization tea with sea buckthorn honey.",
    "afternoon": "02:00 PM: Ascend to the 1,000-year-old Key Gompa fortress monastery perched on a conical hill; tour ancient prayer halls and butter lamps.",
    "evening": "06:00 PM: Traditional Spitian thukpa and momo tasting with local monks at the monastery refectory."
  },
  {
    "day": "Day 2",
    "title": "Highest Inhabited Villages (Hikkim & Komic)",
    "morning": "08:30 AM: Drive to Hikkim (14,567 ft) to post hand-written physical letters from the highest post office in the world.",
    "afternoon": "01:30 PM: Continue to Komic (15,027 ft), the highest motorable village in Asia, visiting Tangyud Gompa.",
    "evening": "05:30 PM: Fossil hunting walk through Langza village under the watchful eye of the giant golden hilltop Buddha statue."
  },
  {
    "day": "Day 3",
    "title": "Dhankar Fortress & High Alpine Lake Hike",
    "morning": "08:00 AM: Explore Dhankar Monastery, dramatic cliff-hanging citadel that served as the ancient capital of the Spiti Kingdom.",
    "afternoon": "01:30 PM: Moderate 1-hour ridge hike up to pristine Dhankar Lake for breathtaking 360-degree views of the Spiti and Pin River confluence.",
    "evening": "06:30 PM: Warm homestay dinner featuring local roasted barley Tsampa and organic potato stew in a traditional mud brick home."
  },
  {
    "day": "Day 4",
    "title": "Kunzum Pass & Chandratal Moon Lake Camp",
    "morning": "07:30 AM: High-pass drive across windy Kunzum La (15,060 ft) with prayer flag circumambulation at Kunzum Mata Temple.",
    "afternoon": "02:00 PM: Hike along the crescent-shaped shores of turquoise Chandratal Lake (Moon Lake) at 14,100 ft amidst alpine wildflowers.",
    "evening": "07:30 PM: High-altitude luxury tent glamping with panoramic celestial astrophotography under Bortle-1 dark night skies."
  },
  {
    "day": "Day 5",
    "title": "Chandra River Trail & Manali Descent",
    "morning": "07:00 AM: Early breakfast at Chandratal camp; embark on the rugged off-road drive along the Chandra river bed via Batal and Chhatru.",
    "afternoon": "01:30 PM: Cross the engineering marvel Atal Tunnel (9.02 km) emerging from cold desert into lush green Kullu Valley.",
    "evening": "05:00 PM: Arrival in Manali for hot sulfur bath relaxation and onward Himalayan highway connection."
  }
],
    fieldNotes: {
      "culinary": "Must try: Siddu (steamed fermented wheat bread with walnut-poppy seed filling and ghee), hot Spitian barley soup, and Seabuckthorn tea.",
      "logistics": "Accessible via Manali-Atal Tunnel route (May-Oct) or Shimla-Kinnaur route (open most of the year). 4x4 high ground clearance vehicle required.",
      "gear": "Windproof outer shell, thermal base layers, sturdy trekking boots, headlamp, and cash (ATMs are rarely functional in Kaza)."
},
  },

  // RAJASTHAN (Adventure & Heritage)
  {
    id: 'raj-01',
    itineraryCode: 'RAJ 01',
    name: 'Jaisalmer Golden Dunes & Thar Desert Caravan',
    location: 'Thar Desert, Jaisalmer, Rajasthan',
    state: 'Rajasthan',
    stateKey: 'rajasthan',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    rating: 4.31,
    reviewsCount: 2210,
    pricePerNight: 4900,
    badge: 'Thar Desert',
    bestTimeToVisit: 'Oct – Mar (Amber Sunsets & Campfires)',
    duration: '3 Days • 2 Nights',
    weather: '29°C Warm Dry',
    sunset: 'Desert Amber Dusk',
    subtitle: 'Thar Sands & Living Fortresses',
    description:
      'Golden sandstone ramparts, starlit dune caravans and tranquil mirror-lake royal havelis reflecting majestic Mewari architecture.',
    curatorTip:
      'Request desert camp sites located in the quiet Khuri dunes rather than crowded commercial clusters.',
    highlights: [
      'Day 1: Living Fort Walk & Havelis',
      'Day 2: Sunset Camel Ride in Sam Dunes',
      'Day 3: Manganiyar Folk Night under Stars',
    ],
    includes: ['Private Camel Handler', 'Swiss Luxury Desert Tent', 'Rajasthani Dal-Baati Feast'],
    tags: ['Thar Desert', 'Camel Safari', 'Golden Fort', 'Folk Music'],
    attractions: [
      {
        id: 'raj-01-1',
        name: 'Jaisalmer Living Golden Fort',
        image: 'https://images.unsplash.com/photo-1676444490527-cf8f7894e9f0?auto=format&fit=crop&w=800&q=80',
        tag: 'FORT',
        timing: '09:00 AM - 06:00 PM',
        entryFee: '₹100 Entry',
        description:
          'One of the worlds few fully functioning living forts with 3,000 residents living inside 12th-century yellow sandstone walls.',
      },
      {
        id: 'raj-01-2',
        name: 'Patwon Ki Haveli Filigree Carvings',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        tag: 'HAVELI',
        timing: '09:00 AM - 05:30 PM',
        entryFee: '₹50 Entry',
        description:
          'A cluster of 5 aristocratic mansions famous for intricate lace-like stone jharokhas and mirror work.',
      },
      {
        id: 'raj-01-3',
        name: 'Sam Sand Dunes Sunset Point',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
        tag: 'DUNES',
        timing: '04:30 PM - 07:30 PM',
        entryFee: 'Free Entry',
        description:
          'Spectacular wind-rippled dunes turning deep bronze as the setting sun sinks into the horizon.',
      },
    ],
    itineraryPlan: [
      {
            "day": "Day 1",
            "title": "Living Golden Fortress & Haveli Filigree",
            "morning": "09:00 AM: Enter Sonar Qila (Jaisalmer Fort) through historic Akhai Pol. Explore medieval Jain temples with intricate sandstone carvings.",
            "afternoon": "01:30 PM: Authentic Dal Baati Churma lunch at rooftop cafe. Marvel at Patwon Ki Haveli five-mansion filigree stone balconies.",
            "evening": "05:30 PM: Golden hour reflection stroll around Gadisar Lake. Witness folk musicians playing Kamaycha instruments on the stone ghats."
      },
      {
            "day": "Day 2",
            "title": "Desert Ghost Village & Sam Sunset Dunes",
            "morning": "08:30 AM: Excursion to Kuldhara 13th-century abandoned ghost village. Discover legendary Brahmin stone ruins and deep stepwells.",
            "afternoon": "02:00 PM: Check-in to private Swiss luxury desert camp in Khuri dunes. Enjoy spiced masala chai and freshly fried onion kachoris.",
            "evening": "04:45 PM: Camel caravan ride along wind-rippled desert crests for a 360-degree sunset. Live Manganiyar folk music and Kalbelia fire dance around campfire."
      },
      {
            "day": "Day 3",
            "title": "Dune Sunrise & Desert Artisan Bazaars",
            "morning": "06:00 AM: Barefoot sunrise walk on crisp desert crests. Traditional bajra roti and jaggery breakfast at camp.",
            "afternoon": "11:00 AM: Return to city bazaar for handcrafted camel leather journals, mirror-work textiles, and fossil stone souvenirs.",
            "evening": "04:30 PM: Sunset vantage point at Vyas Chhatri royal cenotaphs before departure."
      }
],
    fieldNotes: {
      "culinary": "Must try: Dal Baati Churma with pure desi ghee, Ker Sangri wild desert berry curry, Gatte ki Sabzi, and rich Makhaniya Lassi at Kanchan Shree.",
      "logistics": "Jaisalmer airport (JSA) operates seasonal flights; Jodhpur (JDH) is 4.5 hours away via smooth NH11 highway. Pre-book private desert 4x4 transfers.",
      "gear": "Warm thermal layers (desert nights drop to 9°C), polarized sunglasses, wide-brim hat, and lightweight slip-on shoes for sandstone stairs."
},
  },
  {
    id: 'raj-02',
    itineraryCode: 'RAJ 02',
    name: 'Udaipur Lake Pichola Royal Haveli',
    location: 'Lake Pichola, Udaipur, Rajasthan',
    state: 'Rajasthan',
    stateKey: 'rajasthan',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1664241689244-ea76002ec956?auto=format&fit=crop&w=1200&q=80',
    rating: 4.46,
    reviewsCount: 3120,
    pricePerNight: 6500,
    badge: 'City of Lakes',
    bestTimeToVisit: 'Oct – Mar (Gentle Lake Breezes)',
    duration: '4 Days • 3 Nights',
    weather: '27°C Pleasant',
    sunset: 'Lake Mirror Glow',
    subtitle: 'Royal Rajput Palaces & Lakefront Living',
    description:
      'Palatial lakefront suites overlooking Jag Mandir and the City Palace. Sip spiced chai in courtyard gardens as traditional musicians play flute across the water.',
    curatorTip:
      'Sunset views from Ambrai Ghat give the purest silhouette of City Palace illuminated across the dark waters.',
    highlights: [
      'Day 1: City Palace Museum Private Tour',
      'Day 2: Sunset Solar Boat on Lake Pichola',
      'Day 3: Miniature Painting Masterclass',
    ],
    includes: ['Heritage Lakefront Suite', 'Private Royal Boat Pass', 'Mewari Dining Experience'],
    tags: ['City Palace', 'Lake Pichola', 'Mewari Cuisine', 'Havelis'],
    attractions: [
      {
        id: 'raj-02-1',
        name: 'Udaipur City Palace Complex',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        tag: 'PALACE',
        timing: '09:00 AM - 05:30 PM',
        entryFee: '₹300 Entry',
        description:
          'Monumental granite and marble palace overlooking Lake Pichola with ornate courtyards and mirror mosaics.',
      },
      {
        id: 'raj-02-2',
        name: 'Jag Mandir Island Lake Palace',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tag: 'ISLAND',
        timing: '09:00 AM - 06:00 PM',
        entryFee: 'Boat Pass Required',
        description:
          'Built on an island in Lake Pichola with eight carved stone elephants guarding the royal landing pier.',
      },
      {
        id: 'raj-02-3',
        name: 'Saheliyon Ki Bari Royal Fountains',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        tag: 'GARDEN',
        timing: '08:00 AM - 07:00 PM',
        entryFee: '₹20 Entry',
        description:
          'Historic garden oasis with marble pavilions, elephant fountains, and lotus pools designed for royal maids.',
      },
    ],
    itineraryPlan: [
  {
    "day": "Day 1",
    "title": "City Palace & Sunset Lake Cruise",
    "morning": "10:00 AM: Check-in to 18th-century lakefront haveli with intricate jharokha balconies. Royal floral welcome.",
    "afternoon": "02:00 PM: Guided private tour of Udaipur City Palace complex, peacock courtyards, and mirror work halls.",
    "evening": "05:30 PM: Private wooden boat cruise on Lake Pichola past Jag Mandir and the illuminated Lake Palace at twilight."
  },
  {
    "day": "Day 2",
    "title": "Jagdish Temple & Saheliyon-ki-Bari",
    "morning": "08:30 AM: Walk through the historic old city alleys to the 1651 CE intricately carved stone Jagdish Temple.",
    "afternoon": "01:30 PM: Stroll through the marble fountains and lotus pools of Saheliyon-ki-Bari (Courtyard of Maidens).",
    "evening": "06:30 PM: Traditional Mewari royal thali dinner with Laal Maas and Bajra roti at a candlelit terrace overlooking the water."
  },
  {
    "day": "Day 3",
    "title": "Monsoon Palace & Shilpgram Artisans",
    "morning": "09:00 AM: Scenic winding drive up the Aravalli hills to Sajjangarh (Monsoon Palace) for birds-eye views across Udaipurs lakes.",
    "afternoon": "02:00 PM: Explore Shilpgram rural arts and crafts village; witness live pottery, leather mojari making, and miniature Rajasthani painting.",
    "evening": "07:00 PM: Mesmerizing Rajasthani folk dance and puppet show at Bagore-ki-Haveli on Gangaur Ghat."
  },
  {
    "day": "Day 4",
    "title": "Kumbhalgarh Great Wall & Departure",
    "morning": "08:00 AM: Excursion to Kumbhalgarh Fort, boasting the second-longest continuous stone wall in the world (36 km).",
    "afternoon": "02:00 PM: Traditional lunch at an Aravalli farm retreat tasting Dal Baati Churma and Ker Sangri.",
    "evening": "05:30 PM: Transfer to Maharana Pratap Airport (UDR) or Udaipur City railway station for onward departure."
  }
],
    fieldNotes: {
      "culinary": "Must try: Laal Maas slow-cooked with fiery Mathania red chilies, Mewari Gatte ki Sabzi, and hot rabri-soaked Malpua near Jagdish Temple.",
      "logistics": "Maharana Pratap Airport (UDR) is 35 minutes from the old city. Navigate narrow lakeside alleys on foot or via authorized e-rickshaws.",
      "gear": "Smart casual wear for heritage palace dining, comfortable walking sandals, and camera with a wide-angle lens for lake panoramas."
},
  },

  // UTTAR PRADESH (Heritage)
  {
    id: 'up-01',
    itineraryCode: 'UP 01',
    name: 'Varanasi Ghats & Ganga Dawn Aarti Expedition',
    location: 'Ganga Riverfront, Varanasi, Uttar Pradesh',
    state: 'Uttar Pradesh',
    stateKey: 'uttar_pradesh',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85',
    rating: 4.38,
    reviewsCount: 3410,
    pricePerNight: 3200,
    badge: 'Oldest Living City',
    bestTimeToVisit: 'Oct – Apr (Ganga Dusk & Vedic Chants)',
    duration: '3 Days • 2 Nights',
    weather: '28°C Sacred Warmth',
    sunset: 'Ganga Aarti Dusk',
    subtitle: 'Spiritual Sacred Trail & Ancient Riverfront',
    description:
      'At 05:30 AM, before daylight breaches the river horizon, slender wooden oars dip silently into the sacred Ganges. Chanting priests, brass oil lamps, and centuries of unbroken spiritual tradition.',
    curatorTip:
      'Board your wooden boat at Assi Ghat precisely at 5:15 AM to witness the sun rise directly across the tranquil waters before motorized tour boats arrive.',
    highlights: [
      'Day 1: Twilight Ganga Maha Aarti at Dashashwamedh',
      'Day 2: Silent Sunrise Wooden Boat to Manikarnika',
      'Day 3: Sarnath Stupa & Silk Weaver Alleys',
    ],
    includes: ['Private Historian Scholar', 'Sunrise Rowboat Pass', 'Banarasi Silk Studio Tour'],
    tags: ['Ghats', 'Vedic Chants', 'Ganga Aarti', 'Sarnath'],
    attractions: [
      {
        id: 'up-01-1',
        name: 'Dashashwamedh Ghat Evening Aarti',
        image: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80',
        tag: 'RITUAL',
        timing: '06:45 PM Daily',
        entryFee: 'Free Entry',
        description:
          'Witness the iconic Grand Ganga Aarti with multi-tiered brass oil lamps, conch shells, and sacred incense floating across the river.',
      },
      {
        id: 'up-01-2',
        name: 'Assi Ghat Dawn Boat Expedition',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
        tag: 'DAWN',
        timing: '05:15 AM Sunrise',
        entryFee: '₹400 / hr',
        description:
          'Embark on a traditional hand-rowed wooden boat toward Manikarnika illuminating century-old palaces along the river.',
      },
      {
        id: 'up-01-3',
        name: 'Sarnath Stupa & Deer Park',
        image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80',
        tag: 'HERITAGE',
        timing: '06:00 AM - 05:00 PM',
        entryFee: '₹50 Entry',
        description:
          'Where Gautama Buddha gave his first sermon, home to the towering Dhamek Stupa and Ashoka Lion Capital museum.',
      },
    ],
    itineraryPlan: [
      {
            "day": "Day 1",
            "title": "Ganga Riverfront & Twilight Maha Aarti",
            "morning": "10:00 AM: Check-in to riverside heritage haveli along the ghats. First orientation walk through narrow medieval galis (alleys).",
            "afternoon": "02:00 PM: Visit Kashi Vishwanath temple corridor. Sip creamy Banarasi Thandai infused with fennel, pistachios, and saffron.",
            "evening": "06:15 PM: Board private wooden hand-rowed bajra boat positioned facing Dashashwamedh Ghat to witness the grand multi-tiered brass lamp Maha Aarti."
      },
      {
            "day": "Day 2",
            "title": "Silent Dawn Rowboat & Classical Weavers",
            "morning": "05:15 AM: Embark on sunrise rowboat from Assi Ghat to Manikarnika Ghat. Witness pilgrims offering morning prayers as golden light illuminates the stone steps.",
            "afternoon": "12:30 PM: Feast on traditional Banarasi Kachori Sabzi and Jalebi at Ram Bhandar. Private workshop visit with 5th-generation master Banarasi silk weavers.",
            "evening": "05:30 PM: Classical sitar and tabla recital at riverside ashram followed by clay-cup Malaiyo dessert tasting at Chowk."
      },
      {
            "day": "Day 3",
            "title": "Sarnath Deer Park & Buddhist Stupa",
            "morning": "08:30 AM: 30-minute drive to Sarnath where Buddha gave his first sermon. Meditate at Dhamek Stupa and admire Ashoka Lion Capital museum.",
            "afternoon": "01:30 PM: Lunch at authentic temple cafe. Visit Tibetan monastery and peaceful deer sanctuary grounds.",
            "evening": "04:30 PM: Final sunset stroll along Tulsi Ghat before evening transfer to Varanasi Junction or Babatpur Airport."
      }
],
    fieldNotes: {
      "culinary": "Must try: Chooda Matar (spiced flattened rice), crispy piping-hot Kachoris with spicy aloo sabzi, Blue Lassi with pomegranate and rabri, and authentic Banarasi Paan.",
      "logistics": "Varanasi Airport (VNS) is 45 minutes from the riverfront. Gali alleys are pedestrian-only; take e-rickshaws to Godowlia crossing and walk from there.",
      "gear": "Slip-on breathable footwear for easy removal at temple ghats, modest cotton attire with covered shoulders, light stole for morning river breeze."
},
  },

  // ASSAM (Adventure)
  {
    id: 'asm-01',
    itineraryCode: 'ASM 01',
    name: 'Kaziranga Rhino Sanctuary & Majuli River Voyage',
    location: 'Brahmaputra Basin, Assam',
    state: 'Assam',
    stateKey: 'assam',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
    rating: 4.21,
    reviewsCount: 1420,
    pricePerNight: 4700,
    badge: 'Rhino Corridor',
    bestTimeToVisit: 'Nov – Apr (Dry Season & Safaris)',
    duration: '4 Days • 3 Nights',
    weather: '23°C River Breeze',
    sunset: 'Emerald Riverbanks',
    subtitle: 'Wild River & Rhino Safari',
    description:
      'Endangered one-horned rhinoceros reserves, worlds largest river island and misty colonial tea gardens stretching to the horizon along the mighty Brahmaputra.',
    curatorTip:
      'Book the Central Kohora Safari range for morning elephant tracking and the Western Bagori range for open wetland rhino herds.',
    highlights: [
      'Day 1: Dawn Elephant & Open-top 4x4 Safari',
      'Day 2: Brahmaputra Ferry to Majuli Island',
      'Day 3: Mask Making & Neo-Vaishnavite Satras',
    ],
    includes: ['Certified Forest Naturalist', 'All Forest Permits & Jeeps', 'Majuli Bamboo Cottage'],
    tags: ['One-Horned Rhino', 'Brahmaputra', 'Majuli Island', 'Tea Estates'],
    attractions: [
      {
        id: 'asm-01-1',
        name: 'Kaziranga National Park Rhino Corridors',
        image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80',
        tag: 'SAFARI',
        timing: '06:30 AM - 04:00 PM',
        entryFee: '₹1,200 / jeep',
        description:
          'UNESCO World Heritage site sheltering two-thirds of the worlds great one-horned rhinoceroses in tall elephant grass.',
      },
      {
        id: 'asm-01-2',
        name: 'Majuli Island Cultural Satras',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tag: 'CULTURE',
        timing: '08:00 AM - 05:00 PM',
        entryFee: 'Free Entry',
        description:
          'The worlds largest freshwater river island, preserved for centuries as a center of Neo-Vaishnavite art and traditional theater.',
      },
      {
        id: 'asm-01-3',
        name: 'Brahmaputra River Dolphin Sanctuary',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        tag: 'WILDLIFE',
        timing: 'Dawn & Dusk',
        entryFee: 'Boat Fee',
        description:
          'Spot elusive endangered freshwater Ganges river dolphins surfacing amidst the wide river waters.',
      },
    ],
    itineraryPlan: [
  {
    "day": "Day 1",
    "title": "Kaziranga Arrival & Orchid Sanctuary",
    "morning": "10:00 AM: Drive from Guwahati through lush tea gardens of Assam to Kaziranga National Park eco-resort.",
    "afternoon": "02:30 PM: Visit Kaziranga National Orchid and Biodiversity Park featuring over 500 species of native Himalayan orchids.",
    "evening": "06:30 PM: Traditional Assamese Bihu cultural folk dance performance accompanied by indigenous dhol and buffalo horn pipes."
  },
  {
    "day": "Day 2",
    "title": "Central & Western Range Wildlife Safaris",
    "morning": "06:00 AM: Dawn elephant-back safari in the Central Kohora Range to observe Indian greater one-horned rhinos grazing in morning mist.",
    "afternoon": "02:00 PM: Open-top 4x4 safari through Western Bagori Range to spot Asiatic water buffaloes, swamp deer, and wild elephants.",
    "evening": "07:00 PM: Bonfire dinner featuring bamboo hollow roasted fish and Joha scented rice at the jungle lodge."
  },
  {
    "day": "Day 3",
    "title": "Majuli River Island Voyage & Monasteries",
    "morning": "07:30 AM: Scenic country ferry across the mighty Brahmaputra river to Majuli, the worlds largest river island.",
    "afternoon": "01:30 PM: Visit Uttar Kamalabari Satra and Auniati Satra to witness 15th-century Vaishnavite monastic chanting and mask-making craft.",
    "evening": "05:30 PM: Sunset over the Brahmaputra wetlands, spotting migratory river birds and endangered Gangetic river dolphins."
  },
  {
    "day": "Day 4",
    "title": "Mishing Tribal Village & Silk Weaving",
    "morning": "08:30 AM: Guided walk through a stilt-house Mishing tribal village; observe traditional handloom silk weaving (Muga & Eri silk).",
    "afternoon": "01:00 PM: Organic tribal feast cooked with wild ferns, herbs, and steamed rice in banana leaves.",
    "evening": "05:00 PM: Return ferry to Jorhat or Guwahati airport for outbound connections."
  }
],
    fieldNotes: {
      "culinary": "Must try: Assamese Thali with fragrant Joha rice, Maasor Tenga (tangy river fish curry cooked with tomatoes and elephant apple), and duck cooked with ash gourd.",
      "logistics": "Guwahati Airport (GAU) is 4 hours away via NH715. Safaris must be booked through forest department counters or authorized resorts 15 days ahead.",
      "gear": "Earth-toned clothing (khaki, olive, brown; avoid bright colors on safari), high-powered binoculars (8x42 or 10x42), telephoto lens, insect repellent."
},
  },

  // MAHARASHTRA (Heritage)
  {
    id: 'mh-01',
    itineraryCode: 'MH 01',
    name: 'Ajanta-Ellora Monolithic Caves & Sahyadri Trail',
    location: 'Chhatrapati Sambhajinagar, Maharashtra',
    state: 'Maharashtra',
    stateKey: 'maharashtra',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    rating: 4.15,
    reviewsCount: 2310,
    pricePerNight: 4200,
    badge: 'UNESCO Monolith',
    bestTimeToVisit: 'Year-Round (Best Jul – Feb)',
    duration: '4 Days • 3 Nights',
    weather: '28°C Pleasant',
    sunset: 'Ghats Dusk',
    subtitle: 'UNESCO Monoliths & Cave Carvings',
    description:
      'Ancient Buddhist monolithic cave carvings, volcanic plateaus and misty Sahyadri passes crowned by heroic Maratha citadels.',
    curatorTip:
      'Kailasa Temple at Ellora Cave 16 looks most surreal during late afternoon amber hour when the sun hits the sculpted court.',
    highlights: [
      'Day 1: Kailasa Temple Rock Monolith Exploration',
      'Day 2: Ajanta Frescoes & Horseshoe Canyon',
      'Day 3: Daulatabad Hill Fortress Ascent',
    ],
    includes: ['Sanskrit Art Scholar', 'Private Chauffeur EV', 'Boutique Vineyard Dinner'],
    tags: ['Kailasa Temple', 'Ellora Caves', 'Ajanta Murals', 'Sahyadris'],
    attractions: [
      {
        id: 'mh-01-1',
        name: 'Kailasa Temple Monolith (Cave 16)',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        tag: 'MONUMENT',
        timing: '06:00 AM - 06:00 PM',
        entryFee: '₹40 Entry',
        description:
          'Carved from a single colossal basalt cliff from top to bottom, removing over 200,000 tonnes of rock without mortar.',
      },
      {
        id: 'mh-01-2',
        name: 'Ajanta Caves Horseshoe Canyon Frescoes',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        tag: 'FRESCOES',
        timing: '09:00 AM - 05:30 PM',
        entryFee: '₹40 Entry',
        description:
          'Thirty rock-hewn Buddhist cave monuments preserving masterpieces of Buddhist religious art and expressive murals.',
      },
      {
        id: 'mh-01-3',
        name: 'Daulatabad Medieval Hill Fortress',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tag: 'FORT',
        timing: '08:00 AM - 06:00 PM',
        entryFee: '₹25 Entry',
        description:
          'Impregnable triangular fortress featuring a dark underground maze (Andhari) and 360-degree plateau viewpoints.',
      },
    ],
    itineraryPlan: [
  {
    "day": "Day 1",
    "title": "Aurangabad Arrival & Bibi Ka Maqbara",
    "morning": "10:30 AM: Arrival in Aurangabad (Chhatrapati Sambhaji Nagar). Check-in to heritage boutique hotel.",
    "afternoon": "02:00 PM: Explore the 17th-century Bibi Ka Maqbara ('Taj of the Deccan') and the medieval water mill hydraulic system at Panchakki.",
    "evening": "06:30 PM: Dinner featuring authentic local Naan Qalia and visit to traditional Himroo and Paithani silk handloom weavers."
  },
  {
    "day": "Day 2",
    "title": "Ajanta Frescoes & Horseshoe Canyon",
    "morning": "07:30 AM: Scenic 2-hour drive through Deccan plains to the UNESCO World Heritage Ajanta Caves nestled in a dramatic volcanic gorge.",
    "afternoon": "12:00 PM: Inspect 2nd-century BCE Buddhist rock murals in Caves 1, 2, 17, and the 29-meter Reclining Buddha in Cave 26.",
    "evening": "05:30 PM: Stop at Ajanta Viewpoint overlooking the entire horseshoe canyon where British officer John Smith rediscovered the caves in 1819."
  },
  {
    "day": "Day 3",
    "title": "Ellora Caves & Kailasa Monolith",
    "morning": "08:30 AM: Tour Ellora Caves, highlighting Cave 16 (Kailasa Temple), the largest monolithic rock excavation in the world carved top-down.",
    "afternoon": "02:00 PM: Walk through the intricately multi-tiered Buddhist caves (Caves 10-12) and the ornate Jain cave complexes (Indra Sabha).",
    "evening": "05:30 PM: Sunset visit to the impregnable medieval hill fortress of Daulatabad (Devagiri) with its deceptive maze corridor (Bhulbhulaiya)."
  },
  {
    "day": "Day 4",
    "title": "Grishneshwar Jyotirlinga & Sahyadri Farewell",
    "morning": "08:30 AM: Visit the historic red-rock Grishneshwar Temple, one of the 12 sacred Jyotirlingas, rebuilt by Queen Ahilyabai Holkar.",
    "afternoon": "01:00 PM: Authentic Maharashtrian lunch featuring Pithla Bhakri, Thecha, and fresh Solkadhi.",
    "evening": "04:30 PM: Transfer to Aurangabad airport or railway station for onward departure."
  }
],
    fieldNotes: {
      "culinary": "Must try: Naan Qalia (slow-simmered spiced mutton with tandoor-baked naan), spicy Saoji cuisine, and sweet puran poli with hot milk.",
      "logistics": "Chhatrapati Sambhajinagar Airport (IXU) connects daily to Mumbai and Delhi. Hiring a dedicated private air-conditioned car for the 3-day circuit is essential.",
      "gear": "Sturdy walking shoes with excellent grip for stone steps, small LED torch for dimly lit cave chambers, and light breathable cotton clothing."
},
  },

  // ANDHRA PRADESH (Mountains & Adventure)
  {
    id: 'ap-01',
    itineraryCode: 'AP 01',
    name: 'Araku Valley Tribal Coffee & Borra Caves Odyssey',
    location: 'Eastern Ghats, Alluri Sitharama Raju, Andhra Pradesh',
    state: 'Andhra Pradesh',
    stateKey: 'andhra_pradesh',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    rating: 3.94,
    reviewsCount: 1540,
    pricePerNight: 3600,
    badge: '150M Yr Caves',
    bestTimeToVisit: 'Oct – Mar (Pleasant Valley Mist)',
    duration: '3 Days • 2 Nights',
    weather: '28°C Highlands',
    sunset: 'Coastal Twilight',
    subtitle: 'Limestone Caves & Tribal Coffee Plantations',
    description:
      'Prehistoric subterranean limestone caverns, indigenous shade-grown coffee valleys and golden surf beaches along the Coromandel coast.',
    curatorTip:
      'Book the window seat on the morning Vistadome train departing Visakhapatnam for panoramic mountain tunnel views.',
    highlights: [
      'Day 1: Borra Caves 150-Million-Year Stalactite Walk',
      'Day 2: Araku Organic Tribal Coffee Cupping',
      'Day 3: Katiki Waterfalls Jeep Safari',
    ],
    includes: ['Vistadome Glass-top Train Ticket', 'Tribal Community Host', 'Organic Bamboo Chicken Dinner'],
    tags: ['Borra Caves', 'Araku Coffee', 'Eastern Ghats', 'Waterfalls'],
    attractions: [
      {
        id: 'ap-01-1',
        name: 'Borra Caves 150-Million-Year Stalactites',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
        tag: 'CAVES',
        timing: '09:30 AM - 05:00 PM',
        entryFee: '₹80 Entry',
        description:
          'Deep speleothem cave system filled with million-year-old stalactite and stalagmite formations illuminated by ambient lights.',
      },
      {
        id: 'ap-01-2',
        name: 'Araku Tribal Coffee Museum & Plantations',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
        tag: 'COFFEE',
        timing: '09:00 AM - 06:00 PM',
        entryFee: '₹20 Entry',
        description:
          'Learn the story of world-renowned organic shade-grown Araku Arabica coffee with artisanal espresso tasting sessions.',
      },
      {
        id: 'ap-01-3',
        name: 'Katiki Multi-Tiered Jungle Waterfalls',
        image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
        tag: 'WATERFALL',
        timing: 'Daylight Hours',
        entryFee: 'Free',
        description:
          '50-foot cascading mountain waterfall accessed via 4x4 rugged jeeps through thick deciduous bamboo forests.',
      },
    ],
    itineraryPlan: [
      {
            "day": "Day 1",
            "title": "Vistadome Mountain Train & Coffee Hills",
            "morning": "06:45 AM: Board Vistadome glass-roof train at Visakhapatnam. Travel through 58 tunnels and 84 bridges climbing into Eastern Ghats.",
            "afternoon": "01:00 PM: Check-in to eco-resort in Araku Valley. Savor traditional Bamboo Chicken and tribal millet delicacies.",
            "evening": "04:30 PM: Visit Araku Tribal Coffee Museum. Artisanal espresso tasting and interactive Dhimsa folk dance performance with tribal villagers."
      },
      {
            "day": "Day 2",
            "title": "Borra 150-Million-Year Caverns & Waterfalls",
            "morning": "08:30 AM: Descend into Borra Caves (150-million-year-old speleothem cave system) filled with illuminated stalactites and stalagmites.",
            "afternoon": "01:30 PM: Rugged 4x4 open jeep safari to Katiki Waterfalls hidden deep in deciduous bamboo forests. Natural plunge pool dip.",
            "evening": "05:30 PM: Sunset viewpoint at Galikonda Peak (highest point in Visakhapatnam district at 4,300 ft)."
      },
      {
            "day": "Day 3",
            "title": "Chaparai Cascades & Coastal Return",
            "morning": "08:30 AM: Visit Chaparai water cascades where natural stream water flows smoothly over flat sloping rock beds.",
            "afternoon": "12:30 PM: Purchase freshly roasted organic Araku Arabica coffee beans and wild tribal honey from Girijan Cooperative store.",
            "evening": "04:30 PM: Scenic ghat road drive descending back to Visakhapatnam with sunset views over Rushikonda Beach."
      }
],
    fieldNotes: {
      "culinary": "Must try: Bamboo Chicken (chicken marinated in tribal wild spices stuffed into green bamboo stalks and slow-roasted over wood charcoal), and Araku Arabica coffee.",
      "logistics": "Visakhapatnam Airport (VTZ) is the primary gateway (3.5 hours drive). Book Vistadome train tickets on IRCTC 30 days in advance as seats sell out instantly.",
      "gear": "Water shoes or sandals with grip for wet cave and cascade walks, light pullover for 18°C valley mornings, and motion sickness tablets for winding ghat roads."
},
  },

  // KARNATAKA (Heritage, Mountains & Beaches)
  {
    id: 'kar-01',
    itineraryCode: 'KAR 01',
    name: 'Hampi Stone Chariot & Tungabhadra Boulders',
    location: 'Vijayanagara, Karnataka',
    state: 'Karnataka',
    stateKey: 'karnataka',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    rating: 4.48,
    reviewsCount: 3100,
    pricePerNight: 3400,
    badge: 'UNESCO Heritage',
    bestTimeToVisit: 'Nov – Feb (Pleasant Weather & Exploration)',
    duration: '3 Days • 2 Nights',
    weather: '25°C Clear Sky',
    sunset: 'Breezy Highlands',
    subtitle: 'Ancient Citadel & Stone Chariots',
    description:
      'A surreal open-air museum spread across 4,100 hectares of golden granite boulders. Explore 14th-century capital of the Vijayanagara Empire with monolithic temples, musical pillars, and coracle boat river crossings.',
    curatorTip:
      'Climb Matanga Hill by 5:30 AM for a 360-degree panorama of ancient Hampi bathed in morning bronze light.',
    highlights: [
      'Day 1: Vittala Complex & Musical Pillars',
      'Day 2: Sunset Bouldering at Matanga Hill',
      'Day 3: Coracle Boat River Run',
    ],
    includes: ['Archaeological Historian', 'Bouldering Gear', 'Riverside Heritage Camp'],
    tags: ['Vijayanagara', 'Stone Chariot', 'Boulders', 'Tungabhadra'],
    attractions: [
      {
        id: 'kar-01-1',
        name: 'Vijaya Vittala Stone Chariot & Musical Pillars',
        image: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=800&q=80',
        tag: 'MONUMENT',
        timing: '06:00 AM - 06:00 PM',
        entryFee: '₹40 Entry',
        description:
          'Iconic Garuda shrine carved out of ornate granite blocks, accompanied by the legendary musical acoustic stone pillars.',
      },
      {
        id: 'kar-01-2',
        name: 'Matanga Hill Sunset Panoramic Point',
        image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
        tag: 'PANORAMA',
        timing: '05:00 AM - 06:30 PM',
        entryFee: 'Free',
        description:
          'The highest vantage point across ancient Hampi, overlooking ruins, banana plantations, and temples bathed in bronze evening light.',
      },
      {
        id: 'kar-01-3',
        name: 'Virupaksha Temple & Ancient Colonnaded Bazaar',
        image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=800&q=80',
        tag: 'SACRED',
        timing: '06:00 AM - 08:00 PM',
        entryFee: '₹25 Entry',
        description:
          'Seventh-century living temple with towering 50-meter gopuram alongside ancient colonnaded market streets once trading diamonds.',
      },
    ],
    itineraryPlan: [
      {
            "day": "Day 1",
            "title": "Vittala Stone Chariot & Coracle River Crossing",
            "morning": "08:30 AM: Enter the UNESCO World Heritage site at Vijaya Vittala temple complex. Stand before the iconic Stone Chariot and musical acoustic pillars.",
            "afternoon": "01:30 PM: South Indian banana leaf thali at Mango Tree restaurant. Walk through the ancient colonnaded bazaar of Hampi.",
            "evening": "05:00 PM: Traditional round coracle boat ride across the boulder-strewn Tungabhadra River, followed by sunset reflections at Kodandarama Temple."
      },
      {
            "day": "Day 2",
            "title": "Matanga Sunrise & Royal Citadel",
            "morning": "05:30 AM: Dawn hike up Matanga Hill for an unforgettable 360-degree panorama of ancient ruins bathed in bronze morning light.",
            "afternoon": "01:00 PM: Explore the Royal Enclosure, stepped water tank (Pushkarani), Queens Bath, and the Indo-Islamic Lotus Mahal.",
            "evening": "05:30 PM: Bouldering session on granite rocks with certified instructor near Sanapur Lake followed by sunset cafe chill."
      },
      {
            "day": "Day 3",
            "title": "Living Virupaksha & Anegundi Ancient Trail",
            "morning": "07:30 AM: Blessings at 7th-century active Virupaksha Temple with Lakshmi the temple elephant. Stroll through Hemakuta hill monument cluster.",
            "afternoon": "12:30 PM: Cross river to Anegundi (mythological Kishkindha). Visit monkey-temple hill at Anjanadri and prehistoric rock paintings.",
            "evening": "04:30 PM: Final sunset at Tungabhadra river dam before departure from Hosapete railway station."
      }
],
    fieldNotes: {
      "culinary": "Must try: Crisp Benne Dosa (butter dosa), traditional North Karnataka Jolada Rotti meal with Yennegai (stuffed brinjal), and tender coconut water.",
      "logistics": "Hosapete railway station (HPT) is 12 km from Hampi; Hubballi Airport (HBX) is 3 hours drive. Rent a bicycle, moped, or autorickshaw to explore ruins.",
      "gear": "Breathable cotton shirts, slip-resistant trainers for climbing granite boulders, sun hat, UV sunglasses, and a refillable water canteen."
},
  },
  {
    id: 'kar-02',
    itineraryCode: 'KAR 02',
    name: 'Coorg Coffee Mist Plantation Stay',
    location: 'Madikeri, Kodagu, Karnataka',
    state: 'Karnataka',
    stateKey: 'karnataka',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1200&q=80',
    rating: 3.89,
    reviewsCount: 1820,
    pricePerNight: 4100,
    badge: 'Arabica Coffee',
    bestTimeToVisit: 'Oct – May (Fragrant Blossom Season)',
    duration: '3 Days • 2 Nights',
    weather: '21°C Mist & Rain',
    sunset: 'Pine Foothills Dusk',
    subtitle: 'Rainforest & Shade Coffee',
    description:
      'Colonial stone planters bungalow amidst 300 acres of shade-grown Arabica and pepper vines. Wake up to bird calls and freshly brewed estate espresso.',
    curatorTip:
      'November brings fragrant white coffee blossoms across the estate hills with sweet jasmine aroma.',
    highlights: [
      'Day 1: Arabica Berry Picking Experience',
      'Day 2: Brahmagiri Wildlife Sanctuary Hike',
      'Day 3: Kodava Cupping & Roasting Masterclass',
    ],
    includes: ['Master Coffee Roaster', 'Estate Cottage Stay', 'Kodava Fireplace Dinner'],
    tags: ['Coorg', 'Coffee Estate', 'Brahmagiri', 'Kodava'],
    attractions: [
      {
        id: 'kar-02-1',
        name: 'Abbey Falls Roaring Cascade',
        image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
        tag: 'WATERFALL',
        timing: '09:00 AM - 05:00 PM',
        entryFee: '₹15 Entry',
        description:
          'Dramatic 70-foot waterfall tumbling down granite boulders surrounded by coffee bushes and giant spice trees.',
      },
      {
        id: 'kar-02-2',
        name: 'Namdroling Golden Temple Monastery',
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
        tag: 'TEMPLE',
        timing: '07:00 AM - 06:00 PM',
        entryFee: 'Free',
        description:
          'Spectacular Tibetan monastery in Bylakuppe with three 40-foot gilded golden Buddha statues and colorful prayer flags.',
      },
      {
        id: 'kar-02-3',
        name: 'Raja Seat Sunset Garden',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tag: 'SUNSET',
        timing: '06:00 AM - 07:30 PM',
        entryFee: '₹20 Entry',
        description:
          'Historic seasonal garden of the Kodagu Kings offering breathtaking sunset vistas across green hills and misty valleys.',
      },
    ],
    itineraryPlan: [
      {
            "day": "Day 1",
            "title": "Arabica Coffee Estate & Planter Heritage",
            "morning": "10:00 AM: Check-in to stone planters bungalow on a 300-acre private Arabica and pepper estate. Welcome espresso and estate walking tour.",
            "afternoon": "02:00 PM: Coffee berry picking and roasting masterclass with master estate roaster. Learn about shade-grown coffee and wild pepper vines.",
            "evening": "06:00 PM: Fireside Kodava feast tasting signature Pandi Curry cooked with dark kachampuli fruit vinegar."
      },
      {
            "day": "Day 2",
            "title": "Abbey Waterfalls & Brahmagiri Sanctuary",
            "morning": "08:30 AM: Trek down through spice plantations to the roaring 70-foot Abbey Falls tumbling over hanging bridges.",
            "afternoon": "01:30 PM: Wildlife trail in Brahmagiri sanctuary spotting Malabar giant squirrels, hornbills, and wild orchids.",
            "evening": "05:30 PM: Spectacular sunset panorama from Rajas Seat, the historic royal viewing pavilion of the Kodagu Kings."
      },
      {
            "day": "Day 3",
            "title": "Bylakuppe Golden Temple & River Island",
            "morning": "08:30 AM: Drive to Bylakuppe, Indias second largest Tibetan settlement. Tour Namdroling Monastery with three 40-foot golden Buddha statues.",
            "afternoon": "01:00 PM: Tibetan momos and thukpa lunch at monastery cafe followed by shopping for handmade singing bowls and prayer flags.",
            "evening": "04:00 PM: Stop at Dubare Elephant Camp along the Cauvery River before departure."
      }
],
    fieldNotes: {
      "culinary": "Must try: Signature Kodava Pandi Curry (tender pork cooked with kachampuli dark vinegar), Akki Rotti (rice flatbreads), Kadambuttu (steamed rice balls), and Coorg honey.",
      "logistics": "Mangaluru Airport (IXE) is 3.5 hours drive; Bengaluru Airport (BLR) is 5.5 hours via the new Mysuru expressway. Private car is ideal.",
      "gear": "Rain jacket or umbrella (frequent mountain mists), fleece jacket for 16°C nights, hiking boots, and leech socks during monsoon months."
},
  },
  {
    id: 'kar-03',
    itineraryCode: 'KAR 03',
    name: 'Gokarna Om Beach & Coastal Headlands',
    location: 'Uttara Kannada, Karnataka',
    state: 'Karnataka',
    stateKey: 'karnataka',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    rating: 4.08,
    reviewsCount: 1620,
    pricePerNight: 2800,
    badge: 'Om Beach',
    bestTimeToVisit: 'Oct – Mar (Gentle Swells & Golden Dusk)',
    duration: '3 Days • 2 Nights',
    weather: '29°C Coastal Breeze',
    sunset: 'Arabian Sunset',
    subtitle: 'Golden Shores & Coastal Cliffs',
    description:
      'Where the Western Ghats tumble directly into the Arabian Sea. Golden crescent beaches shaped naturally like the sacred Om symbol, fringed with coconut groves, dramatic clifftop trails, and serene beach shacks.',
    curatorTip:
      'Trek the coastal trail from Kudle to Half Moon Beach at 4:30 PM to catch sunset from the rocky promontory with dolphins surfing the break.',
    highlights: [
      'Day 1: Kudle to Om Beach Clifftop Hike',
      'Day 2: Dolphin Kayaking at Sunrise',
      'Day 3: Paradise Beach Secret Cove Boat Run',
    ],
    includes: ['Ocean Kayak & Lifevest', 'Beachside Bamboo Shack', 'Seafood Grill Dinner'],
    tags: ['Om Beach', 'Coastal Trek', 'Sunsets', 'Cliff Shacks'],
    attractions: [
      {
        id: 'kar-03-1',
        name: 'Om Beach Sacred Coves',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
        tag: 'BEACH',
        timing: 'Sunrise to Sunset',
        entryFee: 'Free',
        description:
          'Naturally sculpted coastal rocks where two semi-circular coves join together, perfect for ocean kayaking and dolphin spotting.',
      },
      {
        id: 'kar-03-2',
        name: 'Kudle Beach Clifftop Trail',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        tag: 'TREK',
        timing: 'Open 24 Hours',
        entryFee: 'Free',
        description:
          'Panoramic hiking trail connecting rocky headlands with peaceful bohemian cafes overlooking dramatic Arabian sea tides.',
      },
      {
        id: 'kar-03-3',
        name: 'Half Moon & Paradise Secret Cove',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        tag: 'SECRET COVE',
        timing: 'Daylight Hours',
        entryFee: 'Free',
        description:
          'Secluded wild beaches accessible only by boat or rugged cliffside trek through coastal forests and granite boulders.',
      },
    ],
    itineraryPlan: [
      {
            "day": "Day 1",
            "title": "Crescent Om Beach & Clifftop Shack",
            "morning": "11:00 AM: Check-in to clifftop eco-shack overlooking the Arabian Sea. Gentle acclimatization swim at Kudle Beach.",
            "afternoon": "02:00 PM: Fresh coastal pomfret fry and coconut water at Namaste Cafe on Om Beach.",
            "evening": "05:30 PM: Sunset walk along the Om symbol-shaped twin coves as Arabian tides gently lap against black basalt rocks."
      },
      {
            "day": "Day 2",
            "title": "Five-Beach Trail & Ocean Dolphin Kayak",
            "morning": "06:30 AM: Ocean kayaking safari off Om Beach with chances of spotting wild coastal dolphins surfing the morning break.",
            "afternoon": "01:00 PM: Scenic cliffside hiking trail connecting Kudle Beach to Half Moon Beach and secluded Paradise Beach accessible only by foot.",
            "evening": "06:30 PM: Beach bonfire and fresh seafood grill dinner under the stars at Paradise Beach."
      },
      {
            "day": "Day 3",
            "title": "Mahabaleshwar Temple & Mirjan Citadel",
            "morning": "08:00 AM: Visit 4th-century Mahabaleshwar Shiva temple housing the sacred Atmalinga with classic Dravidian stone carvings.",
            "afternoon": "01:00 PM: Short excursion to 16th-century Mirjan Fort with historic stone ramparts covered in emerald moss.",
            "evening": "04:30 PM: Departure from Gokarna Road railway station or drive toward Goa Airport."
      }
],
    fieldNotes: {
      "culinary": "Must try: Karavali fish curry with boiled red rice, prawn rava fry, banana flower fritters, and Nutella pancakes at cliffside shacks.",
      "logistics": "Gokarna Road railway station (GOK) is 15 minutes away; Dabolim Airport Goa (GOI) is 3 hours north via NH66.",
      "gear": "Swimwear, polarized sunglasses, reef-safe sunscreen, dry bag for kayak trips, and sturdy strap sandals for rocky cliff paths."
},
  },

  // TAMIL NADU (Heritage)
  {
    id: 'tn-01',
    itineraryCode: 'TN 01',
    name: 'Madurai Heritage & Chettinad Mansions Circuit',
    location: 'Madurai & Karaikudi, Tamil Nadu',
    state: 'Tamil Nadu',
    stateKey: 'tamil_nadu',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1200&q=80',
    rating: 4.35,
    reviewsCount: 1940,
    pricePerNight: 3800,
    badge: '14 Gopurams',
    bestTimeToVisit: 'Oct – Mar (Gentle Winter Season)',
    duration: '4 Days • 3 Nights',
    weather: '29°C Warm Breeze',
    sunset: 'Warm Coastal Breeze',
    subtitle: 'Heritage & Living Architecture',
    description:
      'Centuries-old stone temples, carved Chettinad mansions and heritage spice banquets rooted in living Sangam traditions.',
    curatorTip:
      'Witness the sacred night ceremony at Meenakshi temple at 9:00 PM for deep spiritual immersion.',
    highlights: [
      'Day 1: Meenakshi Amman Temple Dawn Walk',
      'Day 2: Athangudi Tile Workshop & Palaces',
      'Day 3: 7-Course Chettinad Culinary Feast',
    ],
    includes: ['Temple Architectural Scholar', 'Artisan Studio Entry', 'Heritage Palace Stay'],
    tags: ['Meenakshi Temple', 'Chettinad', 'Athangudi Tiles', 'Heritage Palaces'],
    attractions: [
      {
        id: 'tn-01-1',
        name: 'Meenakshi Amman Temple 14 Tower Gopurams',
        image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80',
        tag: 'TEMPLE',
        timing: '05:00 AM - 10:00 PM',
        entryFee: 'Free Entry',
        description:
          'Historic Dravidian temple complex with 14 towering gopurams covered in thousands of colorful mythological statues.',
      },
      {
        id: 'tn-01-2',
        name: 'Athangudi Handmade Tile Atelier',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
        tag: 'CRAFT',
        timing: '09:00 AM - 05:00 PM',
        entryFee: 'Free',
        description:
          'Generations-old craft using local clay and glass plates to produce exquisite geometric heritage patterned tiles.',
      },
      {
        id: 'tn-01-3',
        name: 'Chettinad 100-Room Merchant Palaces',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        tag: 'PALACE',
        timing: '09:00 AM - 06:00 PM',
        entryFee: '₹100 Entry',
        description:
          'Grand palatial houses featuring Burmese teak pillars, Belgian crystal mirrors, and Italian marble courtyards.',
      },
    ],
    itineraryPlan: [
  {
    "day": "Day 1",
    "title": "Meenakshi Amman Temple & Madurai Heritage",
    "morning": "09:30 AM: Check-in to heritage courtyard hotel in Madurai.",
    "afternoon": "02:30 PM: Tour the grand Thirumalai Nayakkar Palace featuring giant stucco pillars and Indo-Saracenic ceiling carvings.",
    "evening": "06:00 PM: Evening entrance to Meenakshi Amman Temple to witness the ornate 14 gopurams and the sacred night procession ceremony."
  },
  {
    "day": "Day 2",
    "title": "Chettinad Palatial Mansions & Antiques",
    "morning": "08:00 AM: Drive 1.5 hours to the Chettinad heritage cluster (Kanadukathan & Karaikudi).",
    "afternoon": "01:00 PM: Traditional 18-course Chettinad feast served on fresh banana leaf, featuring Kuzhi Paniyaram, Pepper Chicken, and Milagu Rasam.",
    "evening": "04:30 PM: Tour 19th-century Chettiar merchant palaces with Belgian crystal mirrors, Italian marble, and Burmese teak pillars."
  },
  {
    "day": "Day 3",
    "title": "Athangudi Tile Workshops & Handlooms",
    "morning": "08:30 AM: Visit Athangudi village to watch master craftsmen handmade geometric cement tiles using local sand and natural dyes.",
    "afternoon": "02:00 PM: Explore the famous Chettinad antique markets and witness master weavers producing vibrant Kandangi cotton sarees.",
    "evening": "06:00 PM: Sunset walk through the quiet village tank temples with towering terracotta Ayyanar horses."
  },
  {
    "day": "Day 4",
    "title": "Pillayarpatti Cave Temple & Departure",
    "morning": "08:30 AM: Visit the 1,600-year-old rock-cut Karpaka Vinayakar temple in Pillayarpatti carved inside a natural hill cave.",
    "afternoon": "01:00 PM: Traditional south Indian filter coffee tasting and lunch at a restored heritage mansion.",
    "evening": "04:30 PM: Transfer to Madurai International Airport (IXM) or Madurai Junction for return journey."
  }
],
    fieldNotes: {
      "culinary": "Must try: Chettinad Chicken/Mushroom Chukka, Kozhi Biryani, crispy Kuzhi Paniyaram, Jigarthanda beverage, and piping-hot Madurai filter coffee.",
      "logistics": "Madurai Airport (IXM) is 20 minutes from the temple city; Karaikudi is 1.5 hours away via NH383. Dedicated AC vehicle recommended.",
      "gear": "Modest traditional Indian clothing required for temple entry (dhoti/pants; covered shoulders), slip-on shoes, and breathable light cottons."
},
  },

  // ANDAMAN & NICOBAR (Beaches)
  {
    id: 'andaman-01',
    itineraryCode: 'AND 01',
    name: 'Radhanagar Beach & Havelock Coral Atolls',
    location: 'Havelock, Andaman & Nicobar Islands',
    state: 'Andaman & Nicobar',
    stateKey: 'all',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80',
    rating: 4.62,
    reviewsCount: 1950,
    pricePerNight: 5200,
    badge: 'Asia Top Beach',
    bestTimeToVisit: 'Oct – May (Crystal Turquoise Waters)',
    duration: '4 Days • 3 Nights',
    weather: '30°C Tropical',
    sunset: 'Copper Sky Atoll',
    subtitle: 'Turquoise Waters & Living Coral',
    description:
      'Crowned Asias best beach by Time Magazine. Powder-soft white sands curved against ancient mahua rainforests, luminescent aquamarine waters, world-class scuba diving, and vibrant living coral gardens.',
    curatorTip:
      'Stay until sunset when the sky turns molten copper and swim in the tranquil natural cove at Neils Lagoon.',
    highlights: [
      'Day 1: Radhanagar Sunset Swim & Lagoon Walk',
      'Day 2: Elephant Beach Scuba & Coral Reef Dive',
      'Day 3: Bioluminescent Mangrove Night Kayaking',
    ],
    includes: ['Scuba Gear & PADI Instructor', 'Speedboat Transfer', 'Beachfront Villa'],
    tags: ['Turquoise Waters', 'Coral Reef', 'Rainforest', 'Snorkeling'],
    attractions: [
      {
        id: 'andaman-01-1',
        name: 'Elephant Beach Scuba & Snorkel Reefs',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        tag: 'REEF',
        timing: '07:30 AM - 03:00 PM',
        entryFee: '₹1,500 / dive',
        description:
          'Vivid fringing reefs teeming with clownfish, sea turtles, and kaleidoscopic brain coral just meters off the shoreline.',
      },
      {
        id: 'andaman-01-2',
        name: 'Neils Cove Hidden Lagoon',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        tag: 'LAGOON',
        timing: 'Daylight Hours',
        entryFee: 'Free',
        description:
          'Secluded natural swimming lagoon nestled behind black limestone rocks at the quiet northern bend of Radhanagar.',
      },
      {
        id: 'andaman-01-3',
        name: 'Bioluminescent Mangrove Night Kayaking',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        tag: 'BIOLUMINESCENT',
        timing: '07:00 PM - 09:30 PM',
        entryFee: '₹2,500 / kayak',
        description:
          'Glide through Havelocks tranquil mangrove channels as glowing plankton illuminates each paddle stroke in starry darkness.',
      },
    ],
    itineraryPlan: [
  {
    "day": "Day 1",
    "title": "Port Blair to Havelock Catamaran Cruise",
    "morning": "08:00 AM: High-speed luxury catamaran cruise from Port Blair Phoenix Bay jetty across cobalt Andaman waters to Havelock Island (Swaraj Dweep).",
    "afternoon": "01:30 PM: Check-in to beachfront timber eco-villa set beneath coconut palm canopies. Fresh tender coconut welcome drink.",
    "evening": "04:30 PM: Witness the legendary Radhanagar Beach sunset (rated among Asias best beaches) with powdery white sands and turquoise surf."
  },
  {
    "day": "Day 2",
    "title": "Elephant Beach Snorkel & Coral Reefs",
    "morning": "07:30 AM: Speedboat transfer through mangrove channels to Elephant Beach for guided snorkeling among live brain coral and clownfish.",
    "afternoon": "01:30 PM: Seafood lunch at beachside cafe featuring grilled red snapper, butter garlic tiger prawns, and tropical fruit smoothies.",
    "evening": "05:30 PM: Twilight sea-kayaking through bioluminescent mangrove lagoons where microscopic plankton glitter with every paddle stroke."
  },
  {
    "day": "Day 3",
    "title": "Scuba Diving at South Button & Kalapathar",
    "morning": "06:30 AM: PADI certified discovery boat dive at South Button reef; encounter sea turtles, manta rays, and vibrant reef sharks.",
    "afternoon": "02:00 PM: Motorbike or jeep exploration along the eastern coastline to Kalapathar Beach, famous for black volcanic rocks against aquamarine waves.",
    "evening": "06:30 PM: Candlelit beach barbeque dinner with fresh catch under the starlit equatorial sky."
  },
  {
    "day": "Day 4",
    "title": "Return Catamaran & Historic Memorial",
    "morning": "09:00 AM: Catamaran cruise back to Port Blair; panoramic views of uninhabited forested islands.",
    "afternoon": "02:00 PM: Historical tour of the British colonial Cellular Jail (Kala Pani) and freedom fighter galleries.",
    "evening": "05:30 PM: Transfer to Veer Savarkar International Airport (IXZ) for evening flight."
  }
],
    fieldNotes: {
      "culinary": "Must try: Fresh grilled Red Snapper with garlic butter, coastal Andaman coconut crab curry, and fresh tropical passionfruit smoothies.",
      "logistics": "Fly into Veer Savarkar Airport (IXZ) in Port Blair. Book private catamaran tickets (Makruzz or Nautika) well in advance.",
      "gear": "UV rashguard, polarized sunglasses, reef-safe biodegradable sunscreen, dry bag, and snorkeling mask."
},
  },

  // UTTARAKHAND (Adventure)
  {
    id: 'uk-01',
    itineraryCode: 'UK 01',
    name: 'Rishikesh Rapids & Himalayan Foothills',
    location: 'Dehradun, Uttarakhand',
    state: 'Uttarakhand',
    stateKey: 'all',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    rating: 3.76,
    reviewsCount: 2450,
    pricePerNight: 2800,
    badge: 'Grade IV Rapids',
    bestTimeToVisit: 'Sep – Jun (Prime Rafting & Trekking)',
    duration: '3 Days • 2 Nights',
    weather: '22°C Mountain Breeze',
    sunset: 'Shivalik Evening',
    subtitle: 'White Water Rafting & Mountain Drops',
    description:
      'The adventure capital nestled between turquoise Ganga currents and the Shivalik range. High-octane Grade IV river rafting, bungee drops over emerald valleys, cliff jumping, and cliffside campfires.',
    curatorTip:
      'Book the 26km Marine Drive to Shivpuri rafting slot at 08:30 AM when river currents are swift and mountain air is crisp.',
    highlights: [
      'Day 1: 26km White Water Rafting Expedition',
      'Day 2: 83m Cantilever Bungee Jump Drop',
      'Day 3: Neer Garh Multi-Tier Waterfall Hike',
    ],
    includes: ['Certified Rafting Master', 'Safety Kayak Escort', 'Riverside Camp Tent'],
    tags: ['White Water Rafting', 'Bungee Jump', 'Himalayas', 'Riverside Camps'],
    attractions: [
      {
        id: 'uk-01-1',
        name: 'Marine Drive Grade IV White Water Rapids',
        image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80',
        tag: 'EXPEDITION',
        timing: '08:00 AM - 03:00 PM',
        entryFee: '₹1,200 / person',
        description:
          'Electrifying 16km white water expedition navigating famous rapids including "Roller Coaster", "Golf Course", and "Club House".',
      },
      {
        id: 'uk-01-2',
        name: 'Mohan Chatti Bungee & Giant Swing',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
        tag: 'EXTREME',
        timing: '09:00 AM - 04:00 PM',
        entryFee: '₹3,550 / jump',
        description:
          'Indias highest 83-meter cantilever bungee jump platform fixed amidst rugged rocky ravines with international jump masters.',
      },
      {
        id: 'uk-01-3',
        name: 'Neer Garh Multi-Tier Waterfall Trek',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
        tag: 'TREK',
        timing: '08:00 AM - 06:00 PM',
        entryFee: '₹30 Entry',
        description:
          'Hidden multi-tiered glacial cascade reached by climbing narrow stone tracks through wild butterfly thickets and natural rock pools.',
      },
    ],
    itineraryPlan: [
      {
            "day": "Day 1",
            "title": "Riverside Camp & Triveni Twilight Aarti",
            "morning": "10:00 AM: Check-in to riverside luxury camp on the white sand banks of the Ganga in Shivpuri. Welcome ginger-lemon-honey tea.",
            "afternoon": "02:00 PM: Acclimatization cliff jumping and body surfing in turquoise river currents with certified river guides.",
            "evening": "06:00 PM: Drive to Triveni Ghat in Rishikesh for the sacred evening Ganga Aarti with chanting priests, conch shells, and floating leaf diyas."
      },
      {
            "day": "Day 2",
            "title": "Grade IV White Water Rafting & Bungee Drop",
            "morning": "08:30 AM: 16km high-octane white water rafting expedition tackling famous rapids like Roller Coaster, Golf Course, and Club House.",
            "afternoon": "02:00 PM: Indias highest 83-meter cantilever bungee jump drop at Mohan Chatti over rocky river ravines.",
            "evening": "07:00 PM: Campfire barbecue dinner along the riverbank listening to acoustic guitar and mountain breezes."
      },
      {
            "day": "Day 3",
            "title": "Neer Garh Waterfalls & Beatles Ashram",
            "morning": "07:30 AM: Morning trek to Neer Garh multi-tiered jungle waterfall with refreshing natural rock pools.",
            "afternoon": "01:00 PM: Explore the historic Beatles Ashram (Chaurasi Kutia) featuring transcendental meditation dome caves and colorful graffiti murals.",
            "evening": "04:30 PM: 45-minute transfer to Dehradun Jolly Grant Airport (DED) for return flight."
      }
],
    fieldNotes: {
      "culinary": "Must try: Traditional Garhwali Aloo ke Gutke, hot Garhwali Chai with lemongrass, fresh organic smoothie bowls, and piping-hot Jalebis in Tapovan.",
      "logistics": "Dehradun Jolly Grant Airport (DED) is 35 minutes away; road journey from Delhi via the new expressway takes 4.5 hours.",
      "gear": "Quick-drying synthetic clothing, water shoes with secure straps, waterproof phone dry pouch, and light jacket for evening river breezes."
},
  },
];
