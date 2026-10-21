/**
 * Live Weather Service with Graceful Fallback
 * Integrates live real-time weather via Open-Meteo (or optional OpenWeatherMap if EXPO_PUBLIC_WEATHER_API_KEY is configured).
 * Always safely wrapped in try/catch to guarantee zero application crashes.
 */

export interface WeatherData {
  temperature: string;
  condition: string;
  humidity?: string;
  windSpeed?: string;
  iconName: string;
  isLive: boolean;
}

// Coordinates for curated Indian destinations
const DESTINATION_COORDINATES: Record<string, { lat: number; lon: number }> = {
  'ker-01': { lat: 10.0889, lon: 77.0595 }, // Munnar
  'ker-02': { lat: 9.4981, lon: 76.3388 },  // Alleppey
  'lad-01': { lat: 34.1526, lon: 77.5771 }, // Leh & Pangong
  'hp-01': { lat: 32.2276, lon: 78.0710 },  // Spiti
  'raj-01': { lat: 26.9157, lon: 70.9083 }, // Jaisalmer
  'raj-02': { lat: 24.5854, lon: 73.7125 }, // Udaipur
  'up-01': { lat: 25.3176, lon: 82.9739 },  // Varanasi
  'asm-01': { lat: 26.5775, lon: 93.1711 }, // Kaziranga
  'mh-01': { lat: 19.8762, lon: 75.3433 },  // Ajanta-Ellora
  'ap-01': { lat: 18.3273, lon: 82.8775 },  // Araku Valley
  'kar-01': { lat: 15.3350, lon: 76.4600 }, // Hampi
  'kar-02': { lat: 12.3375, lon: 75.8069 }, // Coorg
  'kar-03': { lat: 14.5479, lon: 74.3188 }, // Gokarna
  'tn-01': { lat: 9.9252, lon: 78.1198 },   // Madurai
  'andaman-01': { lat: 11.9761, lon: 92.9876 }, // Havelock
  'uk-01': { lat: 30.0869, lon: 78.2676 },  // Rishikesh
};

/**
 * Maps WMO standard weather interpretation codes to friendly descriptions & icon names.
 */
function mapWmoCode(code: number): { condition: string; icon: string } {
  if (code === 0) return { condition: 'Clear Sky', icon: 'wb-sunny' };
  if (code === 1 || code === 2) return { condition: 'Mainly Clear', icon: 'wb-twilight' };
  if (code === 3) return { condition: 'Overcast', icon: 'cloud' };
  if (code === 45 || code === 48) return { condition: 'Misty Fog', icon: 'grain' };
  if (code >= 51 && code <= 55) return { condition: 'Light Drizzle', icon: 'grain' };
  if (code >= 61 && code <= 67) return { condition: 'Rain Showers', icon: 'grain' };
  if (code >= 71 && code <= 77) return { condition: 'Alpine Snow', icon: 'ac-unit' };
  if (code >= 80 && code <= 82) return { condition: 'Passing Showers', icon: 'grain' };
  if (code >= 95) return { condition: 'Thunderstorm', icon: 'flash-on' };
  return { condition: 'Pleasant', icon: 'wb-sunny' };
}

export const WeatherService = {
  /**
   * Fetches live telemetry for a destination with immediate fallback to static data.
   */
  async getLiveWeather(
    destinationId: string,
    fallbackString: string = '24°C Pleasant'
  ): Promise<WeatherData> {
    const coords = DESTINATION_COORDINATES[destinationId];

    // Default static fallback
    const fallbackTemp = fallbackString.split(' ')[0] || '24°C';
    const fallbackDesc = fallbackString.includes(' ')
      ? fallbackString.substring(fallbackString.indexOf(' ') + 1)
      : 'Pleasant';

    const defaultResult: WeatherData = {
      temperature: fallbackTemp,
      condition: fallbackDesc,
      iconName: 'wb-sunny',
      isLive: false,
    };

    if (!coords) {
      return defaultResult;
    }

    try {
      const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

      // If OpenWeatherMap API key is provided, use it
      if (apiKey) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${apiKey}`;
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          return {
            temperature: `${Math.round(data.main.temp)}°C`,
            condition: data.weather?.[0]?.main || fallbackDesc,
            humidity: `${data.main.humidity}%`,
            windSpeed: `${Math.round(data.wind.speed * 3.6)} km/h`,
            iconName: 'wb-sunny',
            isLive: true,
          };
        }
      }

      // Default to Open-Meteo free live telemetry (keyless, fast, production-reliable)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const current = data.current;
        if (current && current.temperature_2m !== undefined) {
          const wmo = mapWmoCode(current.weather_code || 0);
          return {
            temperature: `${Math.round(current.temperature_2m)}°C`,
            condition: wmo.condition,
            humidity: current.relative_humidity_2m ? `${current.relative_humidity_2m}%` : undefined,
            windSpeed: current.wind_speed_10m ? `${Math.round(current.wind_speed_10m)} km/h` : undefined,
            iconName: wmo.icon,
            isLive: true,
          };
        }
      }

      return defaultResult;
    } catch (_) {
      // Graceful fallback on network/timeout error
      return defaultResult;
    }
  },
};
