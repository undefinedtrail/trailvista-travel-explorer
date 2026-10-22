# TrailVista • India Journey Explorer

[![Download Android APK](https://img.shields.io/badge/Download-Android%20APK%20(v1.0.1)-E05A47?style=for-the-badge&logo=android&logoColor=white)](https://github.com/undefinedtrail/trailvista-travel-explorer/releases/latest/download/TrailVista.apk)
[![GitHub Release](https://img.shields.io/github/v/release/undefinedtrail/trailvista-travel-explorer?style=for-the-badge&color=2EA44F)](https://github.com/undefinedtrail/trailvista-travel-explorer/releases/latest)

---

### 📲 Instant Standalone Installation (No Dev Server Needed!)
Install **TrailVista** directly on any Android device without configuring Node.js, Metro bundler, or Expo Go:
- 🚀 **Direct APK Link**: [**Download TrailVista.apk (v1.0.1)**](https://github.com/undefinedtrail/trailvista-travel-explorer/releases/latest/download/TrailVista.apk)
- 📦 **Releases Page**: [**View GitHub Releases**](https://github.com/undefinedtrail/trailvista-travel-explorer/releases/latest)

> **Quick Install Instructions**:
> 1. Download `TrailVista.apk` using your phone's browser.
> 2. Tap the downloaded file and select **"Install"** (enable *"Install unknown apps"* if prompted).
> 3. Launch TrailVista—the full app, images, and itineraries run completely standalone and offline-ready!

---

## 🧭 Project Overview

**TrailVista** is a modern mobile travel exploration platform crafted for travelers who seek authentic, culturally deep, and geographically rich expeditions across India. Rather than presenting generic commercial booking lists, TrailVista approaches travel as a thoughtful field journal:

* **Geographically Grounded**: Features a custom-rendered, geographically accurate interactive vector SVG map of India spanning the high passes of Ladakh to the tranquil backwaters of Kerala and the coral reefs of the Andaman Islands.
* **Curated Expeditions**: Covers 17 handcrafted journeys across 13 states with day-by-day schedules, morning/afternoon/evening itineraries, local etiquette notes, and authentic high-resolution photography.
* **Intelligent Discovery**: Includes a dynamic **Smart Destination Matcher** that ranks journeys in real time according to travel style, pace, and trip duration, alongside a one-tap **"Surprise Me"** random expedition generator.
* **Real-World Utility**: Direct one-tap **Google Maps navigation**, live **weather telemetry** (powered by Open-Meteo), and an offline-persisted **Wishlist** for seamless expedition bookmarking.

---

## 📱 Screenshots

| 1. Explore & Interactive Map | 2. Search & "Surprise Me" |
| :---: | :---: |
| <img src="assets/screenshots/explore.png" width="300" alt="Explore Screen" /> | <img src="assets/screenshots/search.png" width="300" alt="Search & Surprise Me" /> |
| *Interactive Pan-India SVG Vector Map with state telemetry HUD and curated expedition feed* | *Live search with category filters, popular expeditions, and one-tap Surprise Me generator* |

| 3. Smart Destination Matcher | 4. Saved Wishlist |
| :---: | :---: |
| <img src="assets/screenshots/smart_matcher.png" width="300" alt="Smart Matcher" /> | <img src="assets/screenshots/wishlist.png" width="300" alt="Saved Journeys Wishlist" /> |
| *"Find My Trip" dynamic multi-criteria engine with real-time percentage compatibility scoring* | *Offline-persisted saved journeys organized by travel category with instant removal* |

<div align="center">

### 5. Expedition Dossier & Navigation
<img src="assets/screenshots/destination_details.png" width="320" alt="Destination Details Screen" />

*Full destination dossier featuring live weather telemetry, direct Google Maps live routing, best season advice, and curated attractions*

</div>

---

## ✨ Features

### 1. 🗺️ Geographically Accurate Interactive SVG Regional Map
* **Pure Vector SVG Map**: Handcrafted pan-India vector cartography representing state and union territory boundaries with authentic geographic fidelity.
* **13 Interactive Regions**: Full support for Kerala, Telangana, Andhra Pradesh, Tamil Nadu, Karnataka, Maharashtra, Rajasthan, Ladakh, Himachal Pradesh, Uttar Pradesh, Assam, Uttarakhand, and Andaman & Nicobar Islands.
* **Dynamic Highlight States**: Tapping any available region fills the state with a warm terracotta accent (`#E05A47`), while unavailable states display crisp, subtle boundary outlines.
* **Regional Telemetry HUD**: Selecting a state surfaces its live regional weather telemetry, peak season recommendation, and automatically filters the expedition feed.
* **Instant Reset View**: One-tap "All States" button smoothly transitions back to the complete pan-India overview.

### 2. 🎯 Smart Destination Matcher ("Find My Trip")
* **Interactive Traveler Criteria**:
  * **Travel Style**: Mountains, Beach, Heritage, Adventure, Nature, Culture
  * **Travel Pace**: Relaxed (Scenic & Serene), Curated (Balanced Highlights), Immersive (Trails & Expeditions)
  * **Duration**: 1–2 days, 3–4 days, 5+ days
* **Dynamic Ranking Engine**: Calculates multi-weighted compatibility scores (e.g., *"Munnar — 94% Match"*, *"Pangong Tso — 92% Match"*) based on category correlation, tag semantics, exploration pace alignment, and duration compatibility.
* **Instant Exploration**: Tap any ranked destination card to jump straight into its complete day-by-day expedition dossier.

### 3. 🎲 "Surprise Me" Serendipitous Trip Discovery
* **One-Tap Serendipity**: In the Search tab, tap the prominent **"Surprise Me 🎲 Random Trip"** banner to discover an unexpected curated expedition across India.
* **Instant Deep Linking**: Smoothly navigates the traveler straight to the selected destination dossier.

### 4. 📍 Direct Google Maps Navigation
* **Live Route Button**: Prominently displayed right under the destination's Quick Facts.
* **Point-to-Point Routing**: Opens real geographic coordinates and landmarks in Google Maps via native `Linking.openURL`—no billing keys or heavyweight SDK overhead.
* **Attraction Directions**: Every curated sight card contains a dedicated "Maps" link for point-to-point navigation to specific temples, fortresses, and trails.

### 5. ⛅ Live Weather Telemetry with Graceful Fallback
* **Real-Time Data**: Queries real-world temperatures, WMO weather condition codes, relative humidity, and wind speeds via Open-Meteo.
* **Zero Failure Rate**: Wrapped in strict timeout and error handlers—if offline or if network fails, it immediately falls back to verified seasonal weather data (`destination.weather`).
* **Environment Variable Support**: Supports optional OpenWeatherMap integration via `EXPO_PUBLIC_WEATHER_API_KEY`.

### 6. 📸 100% Visually Verified High-Resolution Photography
* **Curated Covers & Highlights**: Every single destination (17 total) and attraction (51 total) features authentic, high-resolution photography.
* **Authentic Heritage & Nature**:
  * **Telangana**: Charminar, Golconda Fort Citadel & UNESCO Ramappa Temple / Kakatiya Kala Thoranam.
  * **Rajasthan**: Jaisalmer Sonar Qila & Thar Desert camel caravans; Udaipur City Palace & Lake Pichola.
  * **Maharashtra**: Kailasa Temple Cave 16 monolith & Ajanta cliff canyon.
  * **Karnataka**: Hampi Vijaya Vittala Stone Chariot & Virupaksha Gopuram; Gokarna coastal Arabian Sea shrine; Coorg coffee plantations.
  * **Assam**: Indian one-horned rhinoceros in Kaziranga grasslands.
  * **Tamil Nadu**: Meenakshi Amman Temple Gopuram and sacred temple tank.
  * **Uttar Pradesh**: Dashashwamedh Ghat evening Ganga Aarti ceremony & dawn boatmen.
  * **Uttarakhand**: Grade IV white-water rafting in Rishikesh Ganga Gorge.
  * **Andaman**: Radhanagar Beach white sands and turquoise waters.

### 7. 🌓 Modern UI & Polish
* **Futuristic Theme Toggle**: Smooth circular sun/moon toggle to switch between obsidian dark theme and warm parchment light theme.
* **System Edge-Swipe Back Gesture**: Native swipe-to-go-back gesture enabled throughout all screen stacks.
* **Custom App Icon & Splash Screen**: Elegant branding with custom splash screen and vector icons.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [React Native 0.83](https://reactnative.dev/) with [Expo SDK 57](https://expo.dev/) (New Architecture enabled) |
| **Language** | [TypeScript 5.9](https://www.typescriptlang.org/) (Strict Mode) |
| **Vector Graphics** | [`react-native-svg`](https://github.com/software-mansion/react-native-svg) (Pure SVG vector geometry) |
| **Navigation** | [React Navigation 7](https://reactnavigation.org/) (Native Stack & Bottom Tabs with native gestures) |
| **Icons & Typography** | [`@expo/vector-icons`](https://icons.expo.fyi/) (MaterialIcons, Ionicons, Feather) |
| **State Management** | React Context API (`ThemeContext`, `WishlistContext`) with local persistence |
| **Network & APIs** | Open-Meteo REST API, React Native `Linking`, standard Fetch API |
| **CI / CD** | GitHub Actions (automated compilation of standalone Android Release APK with Hermes) |

---

## 🚀 Getting Started & Setup Instructions

### Prerequisites
* **Node.js**: v18.x or v20.x+ installed ([Download Node.js](https://nodejs.org/))
* **Package Manager**: `npm` or `bun`
* **Mobile Testing**: [Expo Go app](https://expo.dev/go) on iOS or Android, or an Android Studio / Xcode emulator

### 1. Clone the Repository
```bash
git clone https://github.com/undefinedtrail/trailvista-travel-explorer.git
cd trailvista-travel-explorer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npx expo start
```

### 4. Run on Your Device
* **Android Device / Emulator**: Press `a` in the terminal or scan the displayed QR code with the Expo Go app.
* **iOS Simulator / Device**: Press `i` in the terminal (macOS required) or scan the QR code with your iOS Camera app.
* **Web Browser**: Press `w` in the terminal to explore the web build.

### 5. Typecheck & Code Verification
```bash
npx tsc --noEmit
```

### 6. Building the Standalone APK Locally (Optional)
If you have the Android SDK and Java 17 configured:
```bash
npx expo prebuild --platform android
cd android
./gradlew assembleRelease
```
The compiled APK will be generated at `android/app/build/outputs/apk/release/app-release.apk`.

---

## 📂 Project Directory Structure

```
trailvista-travel-explorer/
├── .github/
│   └── workflows/
│       └── build-apk.yml          # GitHub Actions workflow for standalone APK release
├── assets/
│   ├── icon.png                   # App launcher icon
│   ├── splash-icon.png            # Launch splash screen graphic
│   ├── yatra_logo.png             # TrailVista flame emblem
│   └── screenshots/               # App UI screenshots
│       ├── explore.png            # Explore tab with interactive SVG map
│       ├── search.png             # Search tab with "Surprise Me"
│       ├── smart_matcher.png      # "Find My Trip" criteria engine
│       ├── wishlist.png           # Saved journeys wishlist
│       └── destination_details.png# Full destination dossier & map routing
├── src/
│   ├── components/                # Reusable UI components (DestinationCard, Header, etc.)
│   ├── constants/
│   │   ├── colors.ts              # Obsidian Dark & Warm Light color palettes
│   │   └── mockData.ts            # Curated expeditions, states, itineraries & coordinates
│   ├── context/
│   │   ├── ThemeContext.tsx       # Dark/Light mode theme provider
│   │   └── WishlistContext.tsx    # Saved expedition state & local storage
│   ├── models/
│   │   └── Destination.ts         # TypeScript data interfaces & types
│   ├── navigation/
│   │   └── AppNavigator.tsx       # Bottom tabs & NativeStack navigation
│   ├── screens/
│   │   ├── HomeScreen.tsx         # Pan-India map & curated expeditions feed
│   │   ├── SearchScreen.tsx       # Search, filter chips & "Surprise Me" generator
│   │   ├── SmartMatcherScreen.tsx # "Find My Trip" multi-weighted matching engine
│   │   ├── WishlistScreen.tsx     # Saved journeys & quick access
│   │   └── DetailsScreen.tsx      # Comprehensive itinerary, live weather & Google Maps
│   ├── services/
│   │   └── weatherService.ts      # Open-Meteo & OpenWeather integration with fallback
│   └── widgets/
│       ├── IndiaMapExplorer.tsx   # Custom SVG interactive India map widget
│       └── StateTelemetryCard.tsx # Regional weather & season telemetry card
├── App.tsx                        # Root application entry point
├── app.json                       # Expo configuration & native permissions
├── tsconfig.json                  # TypeScript compiler options
└── package.json                   # Project scripts and dependencies
```

---

## 📄 License

This project is developed for educational, cultural, and exploratory travel purposes. All rights reserved.
