# Yātrā (यात्रा) • India Journey Explorer

> **Boutique Travel Expedition Planner & Cultural Field Journal**  
> Built with React Native (Expo SDK 57), TypeScript, and a warm editorial design inspired by traditional Indian aesthetics.

---

## 📖 Project Overview

**Yātrā** is a mobile application designed for travelers who appreciate thoughtful, immersive cultural expeditions across India. Rather than presenting generic travel lists, Yātrā treats each destination as a curated journey—from cobalt glacial lakes in Ladakh (14,000 ft) to the quiet, palm-fringed backwater lagoons of Kerala.

The application blends a contemplative dark-mode visual palette with real-world travel planning utilities: an interactive regional vector map, a dynamic multi-criteria travel matcher, day-by-day itineraries with full morning/afternoon/evening schedules, live weather telemetry, and seamless Google Maps routing.

---

## ✨ Features

### 1. 🗺️ Calibrated India Regional Map
* **Interactive Vector Map**: Minimalist dark-mode vector outline of India displaying state boundaries.
* **Geographically Calibrated Pinpoints**: 10 state beacon pinpoints positioned with high geographic precision across:
  * **Ladakh** (`top: 12%`, `left: 38%`)
  * **Himachal Pradesh** (`top: 21%`, `left: 33%`)
  * **Rajasthan** (`top: 34%`, `left: 23%`)
  * **Uttar Pradesh** (`top: 35%`, `left: 45%`)
  * **Assam** (`top: 38%`, `left: 81%`)
  * **Maharashtra** (`top: 56%`, `left: 30%`)
  * **Andhra Pradesh** (`top: 68%`, `left: 44%`)
  * **Karnataka** (`top: 71%`, `left: 29%`)
  * **Kerala** (`top: 82%`, `left: 26%`)
  * **Tamil Nadu** (`top: 86%`, `left: 36%`)
* **Focused Point Highlighting**: Only the active state pin radiates a pulsing beacon halo ring; the rest of the map preserves clean state outlines.
* **Regional Telemetry HUD**: Selecting any state reveals seasonal weather telemetry, best visiting months, local highlights, and filters the expedition feed.

### 2. 🧭 Smart Destination Matcher ("Find My Trip")
* **Interactive Preferences**:
  * **Travel Style**: Mountains, Beach, Heritage, Adventure, Nature, Culture
  * **Budget Tier**: Budget (under ₹4,500), Moderate (₹4,500 – ₹6,000), Premium (₹6,000+)
  * **Duration**: 1–2 days, 3–4 days, 5+ days
* **Dynamic Ranking Engine**: Calculates multi-weighted compatibility scores (e.g., *"Munnar — 96% Match"*, *"Pangong Tso — 94% Match"*) based on category correlation, tag semantics, budget proximity, duration alignment, and user rating.
* **Instant Navigation**: Tapping any ranked match card opens its comprehensive Details screen.

### 3. 📍 Seamless Google Maps Navigation
* **Hero Route Card**: Prominently placed directly below Key Quick Facts on the Details screen.
* **One-Tap Routing**: Opens the destination coordinates/name directly in Google Maps via React Native `Linking.openURL` without requiring heavy external SDKs or billing keys.
* **Attraction Directions**: Every curated sight card contains a dedicated "Maps" link for point-to-point navigation.

### 4. 🌤️ Live Weather Telemetry with Graceful Fallback
* **Real-Time Data**: Queries real-world temperatures, WMO weather condition codes, relative humidity, and wind speeds via Open-Meteo.
* **Zero Failure Rate**: Wrapped in strict timeout and try/catch handlers—if offline or if network fails, it immediately falls back to verified seasonal weather data (`destination.weather`).
* **Environment Variable Support**: Supports optional OpenWeatherMap integration via `EXPO_PUBLIC_WEATHER_API_KEY`.

### 5. 📅 Duration-Aligned Itineraries (A to Z)
* Every destination's day-by-day plan strictly reflects its declared duration:
  * **6 Days • 5 Nights (Ladakh)**: 6 full days (Acclimatization $\rightarrow$ Indus Valley Monasteries $\rightarrow$ Khardung La $\rightarrow$ Turtuk Border Village $\rightarrow$ Pangong Tso Stargazing $\rightarrow$ Chang La).
  * **5 Days • 4 Nights (Spiti Valley)**: 5 full days (Key Gompa $\rightarrow$ Hikkim & Komic $\rightarrow$ Dhankar Fortress & Ridge Hike $\rightarrow$ Kunzum Pass & Chandratal $\rightarrow$ Chandra River & Atal Tunnel).
  * **4 Days • 3 Nights (Alleppey, Udaipur, Kaziranga, Ajanta-Ellora, Madurai, Andaman)**: 4 complete days each.
  * **3 Days • 2 Nights (Munnar, Jaisalmer, Varanasi, Araku, Hampi, Coorg, Gokarna, Rishikesh)**: 3 complete days each.
* Complete morning, afternoon, and evening milestones for every single day.

### 6. 🔖 Persistent Wishlist & Field Journal
* **AsyncStorage Backing**: Fully persisted via `@react-native-async-storage/async-storage`.
* **Clean Default**: New users start with an empty wishlist (`[]`), as required.
* **Real-Time Synchronization**: Toggling a bookmark updates badge counters and active states instantly across Home, Search, Matcher, and Details.
* **Polished Empty State & Confirmation**: Includes a welcoming empty state with a "Discover Destinations" shortcut and a "Clear All" action with an interactive confirmation alert dialog.

### 7. 🔍 Real-Time Search, Filtering & Sorting
* Instant debounced text search across destination titles, states, locations, and tags.
* Category filtering across *All*, *Heritage*, *Mountains*, *Beaches*, and *Adventure*.
* Multi-criteria sorting: *Recommended*, *Rating: High to Low*, *Price: Low to High*, *Price: High to Low*.

### 8. 🌓 Dual Mode Lighting (Dark / Light)
* Seamless switching between Deep Night (`#0F1014` / `#1A1B22`) and Parchment Day (`#F8F6F0` / `#FFFFFF`).
* Persists user choice across sessions.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React Native** | `0.86.3` | Core mobile UI framework |
| **Expo** | `~57.0.30` | SDK toolchain & build system |
| **TypeScript** | `~6.0.3` | Static type safety and data models |
| **React** | `19.2.3` | Component architecture & state management |
| **AsyncStorage** | `2.2.0` | Local persistent storage |
| **@expo/vector-icons**| `^15.0.2` | MaterialIcons iconography |
| **Open-Meteo API** | *v1 (live)* | Free, reliable real-time weather telemetry |

---

## 🚀 Setup & Run Instructions

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18 or higher recommended)
* [Expo Go](https://expo.dev/go) installed on your physical mobile device (Android or iOS)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/undefinedtrail/travel-explorer.git
   cd travel-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure environment variables:
   Create a `.env` file in the project root if you want to use an optional OpenWeatherMap key:
   ```env
   EXPO_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
   ```
   *(Note: If omitted, the app automatically uses keyless Open-Meteo live weather and local seasonal fallbacks).*

4. Start the Expo development server:
   ```bash
   npx expo start
   ```

5. Run on your device:
   * **Android / iOS**: Scan the displayed QR code with the Expo Go app (or camera on iOS).
   * **Android Emulator**: Press `a` in the terminal.
   * **iOS Simulator**: Press `i` in the terminal (macOS only).
   * **Web Preview**: Press `w` in the terminal.

### Verification & Diagnostics
To verify type safety and bundle health before deployment:
```bash
npx tsc --noEmit        # Type check (0 errors)
npx expo-doctor         # Diagnose project dependencies
```

---

## 📁 Project Structure

```
├── App.tsx                     # Main application entry point & tab router
├── index.ts                    # Expo registration entry
├── app.json                    # Expo configuration & metadata
├── tsconfig.json               # TypeScript configuration
├── assets/                     # Logos, app icons, and vector map assets
│   ├── india_map.png           # India state outline vector asset
│   └── yatra_logo.png          # Yātrā flame emblem
├── src/
│   ├── constants/
│   │   ├── mockData.ts         # Curated Indian destinations, state pins & metadata
│   │   └── theme.ts            # Warm Editorial theme tokens (Dark & Light)
│   ├── models/
│   │   ├── Attraction.ts       # TypeScript interface for curated sights
│   │   └── Destination.ts      # TypeScript interface for destinations & itineraries
│   ├── screens/
│   │   ├── HomeScreen.tsx      # Compact hero, trending carousels & regional map
│   │   ├── DetailsScreen.tsx   # Itinerary, sights, live weather & Google Maps
│   │   ├── SearchScreen.tsx    # Real-time search, category filters & sorting
│   │   ├── SmartMatcherScreen.tsx # "Find My Trip" dynamic ranking engine
│   │   └── WishlistScreen.tsx  # AsyncStorage field notebook with clear all
│   ├── services/
│   │   ├── storageService.ts   # AsyncStorage wrapper for wishlist & theme persistence
│   │   └── weatherService.ts   # Live weather telemetry & safe offline fallback
│   └── widgets/
│       ├── AttractionCard.tsx  # Sight card with timings, fees & maps directions
│       ├── BottomNavBar.tsx    # Floating pill navigation bar (4 tabs)
│       ├── CategoryChip.tsx    # Filter chips
│       ├── DestinationCard.tsx # Feed cards with pricing, duration & rating
│       ├── IndiaMapExplorer.tsx# Interactive India map with beacon pulses
│       ├── SearchBar.tsx       # Debounced search input
│       ├── StateTelemetryCard.tsx # Regional climate & expedition HUD
│       └── TopHeader.tsx       # Minimalist brand header with theme toggle
└── README.md                   # Project documentation
```

---

## 📋 Assignment Deliverables & Feature Coverage

| Stage / Requirement | Status | Implementation Details |
| :--- | :---: | :--- |
| **Stage 1: Exploration & Setup** | ✅ Completed | React Native app bootstrapped, Expo SDK 57, TypeScript strict mode, clean folder structure. |
| **Stage 2: Core Architecture** | ✅ Completed | Fully modeled `Destination` and `Attraction` interfaces with pricing, ratings, durations, and day-by-day plans. |
| **Stage 3: Interactive Features** | ✅ Completed | Interactive Regional Map with state beacons, live debounced search, category filters, sorting by price/rating. |
| **Stage 4: Polish & Persistence** | ✅ Completed | AsyncStorage wishlist starting empty, theme persistence, live weather fallback, and Google Maps routing. |
| **Extra: Smart Matcher ("Find My Trip")** | ✅ Completed | Dynamic ranking engine matching travel style, budget, and duration with percentage scores. |
| **Extra: Geographically Calibrated Map** | ✅ Completed | Adjusted Kerala, Andhra Pradesh, and Assam pins to exact geographical coordinates. |
| **Extra: Duration-Matched Itineraries** | ✅ Completed | Every destination's plan matches its declared duration (up to 6 full days for Ladakh). |

---

## 📷 Screenshots

| Home / Regional Map | Smart Matcher ("Find My Trip") | Destination Details & Google Maps |
| :---: | :---: | :---: |
| *Interactive map beacons & state HUD* | *Multi-criteria ranked match score* | *Live weather, itinerary & route card* |

---

## 📄 License
This project is open-source under the MIT License.
