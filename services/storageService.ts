import AsyncStorage from '@react-native-async-storage/async-storage';

const WISHLIST_STORAGE_KEY = '@trailvista_wishlist_ids_v1';
const THEME_STORAGE_KEY = '@trailvista_theme_preference_v1';

// In-memory fallback cache (starts empty for all new sessions)
let inMemoryWishlist: string[] = [];
let inMemoryTheme: 'dark' | 'light' = 'dark';

export const StorageService = {
  /**
   * Retrieves all saved destination IDs from AsyncStorage with in-memory fallback.
   * New users start with an empty wishlist.
   */
  async getWishlist(): Promise<string[]> {
    try {
      const data = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
      if (!data) {
        inMemoryWishlist = [];
        return [];
      }
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        inMemoryWishlist = parsed;
        return parsed;
      }
      return inMemoryWishlist;
    } catch (error) {
      console.warn('StorageService: getWishlist fallback to in-memory:', error);
      return inMemoryWishlist;
    }
  },

  /**
   * Adds a destination ID to the wishlist and persists it.
   */
  async addToWishlist(destinationId: string): Promise<string[]> {
    try {
      const current = await this.getWishlist();
      if (!current.includes(destinationId)) {
        const updated = [...current, destinationId];
        inMemoryWishlist = updated;
        try {
          await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
        } catch (_) {}
        return updated;
      }
      return current;
    } catch (error) {
      if (!inMemoryWishlist.includes(destinationId)) {
        inMemoryWishlist.push(destinationId);
      }
      return inMemoryWishlist;
    }
  },

  /**
   * Removes a destination ID from the wishlist and persists it.
   */
  async removeFromWishlist(destinationId: string): Promise<string[]> {
    try {
      const current = await this.getWishlist();
      const updated = current.filter((id) => id !== destinationId);
      inMemoryWishlist = updated;
      try {
        await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
      } catch (_) {}
      return updated;
    } catch (error) {
      inMemoryWishlist = inMemoryWishlist.filter((id) => id !== destinationId);
      return inMemoryWishlist;
    }
  },

  /**
   * Toggles a destination in the wishlist with immediate persistence.
   */
  async toggleWishlist(
    destinationId: string
  ): Promise<{ isInWishlist: boolean; wishlist: string[] }> {
    try {
      const current = await this.getWishlist();
      let updated: string[];
      let isInWishlist: boolean;

      if (current.includes(destinationId)) {
        updated = current.filter((id) => id !== destinationId);
        isInWishlist = false;
      } else {
        updated = [...current, destinationId];
        isInWishlist = true;
      }

      inMemoryWishlist = updated;
      try {
        await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
      } catch (_) {}
      return { isInWishlist, wishlist: updated };
    } catch (error) {
      const idx = inMemoryWishlist.indexOf(destinationId);
      let isInWishlist: boolean;
      if (idx >= 0) {
        inMemoryWishlist.splice(idx, 1);
        isInWishlist = false;
      } else {
        inMemoryWishlist.push(destinationId);
        isInWishlist = true;
      }
      return { isInWishlist, wishlist: [...inMemoryWishlist] };
    }
  },

  /**
   * Clears the entire wishlist.
   */
  async clearWishlist(): Promise<void> {
    inMemoryWishlist = [];
    try {
      await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify([]));
    } catch (error) {
      console.warn('StorageService: clearWishlist fallback:', error);
    }
  },

  /**
   * Loads saved theme mode ('dark' | 'light'). Defaults to 'dark'.
   */
  async getThemePreference(): Promise<'dark' | 'light'> {
    try {
      const theme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (theme === 'light' || theme === 'dark') {
        inMemoryTheme = theme;
        return theme;
      }
      return inMemoryTheme;
    } catch (error) {
      return inMemoryTheme;
    }
  },

  /**
   * Saves user theme preference.
   */
  async saveThemePreference(theme: 'dark' | 'light'): Promise<void> {
    inMemoryTheme = theme;
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.warn('StorageService: saveThemePreference fallback:', error);
    }
  },
};
