export type Theme = 'light';

export interface ThemeContextType {
  theme: 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'light') => void;
  isDark: false;
}

