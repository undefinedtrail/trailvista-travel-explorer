/**
 * Yātrā Warm Editorial Design System Theme Tokens
 * Direct implementation of Stitch design tokens and specifications.
 */

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  tertiary: string;
  gold: string;
  error: string;
  background: string;
  surface: string;
  card: string;
  cardBorder: string;
  chipIdle: string;
  chipBorder: string;
  chipText: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  headerBg: string;
  bottomBarBg: string;
}

export const DarkTheme: ThemeColors = {
  primary: '#C2512D',
  primaryDark: '#A13917',
  primaryLight: '#FF8F6B',
  secondary: '#44645F',
  tertiary: '#D98E32',
  gold: '#F59E0B',
  error: '#BA1A1A',
  background: '#0F1014',
  surface: '#121316',
  card: '#1A1B22',
  cardBorder: '#262732',
  chipIdle: '#1C1D25',
  chipBorder: '#2E303D',
  chipText: '#D1D1D8',
  text: '#FFFFFF',
  textSecondary: '#EDE9E1',
  textMuted: '#A0A0AB',
  headerBg: 'rgba(18, 19, 22, 0.95)',
  bottomBarBg: 'rgba(26, 27, 34, 0.95)',
};

export const LightTheme: ThemeColors = {
  primary: '#C2512D',
  primaryDark: '#A13917',
  primaryLight: '#E06D46',
  secondary: '#1B3B36',
  tertiary: '#854F00',
  gold: '#D98E32',
  error: '#BA1A1A',
  background: '#F9F7F2',
  surface: '#F5F2FB',
  card: '#FFFFFF',
  cardBorder: '#E6E3DA',
  chipIdle: '#EDE9DF',
  chipBorder: '#DED9CD',
  chipText: '#3D3A35',
  text: '#1C1917',
  textSecondary: '#2D2A26',
  textMuted: '#6B665F',
  headerBg: 'rgba(249, 247, 242, 0.95)',
  bottomBarBg: 'rgba(255, 255, 255, 0.95)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};
