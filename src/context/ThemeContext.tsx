import React, { useEffect } from 'react';
import type { ThemeContextType } from './theme-types';
import { ThemeContext } from './ThemeContextInstance';

const lightContextValue: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  isDark: false,
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';

    try {
      localStorage.removeItem('luvron-theme');
    } catch {
      // Ignore localStorage restrictions
    }
  }, []);

  return (
    <ThemeContext.Provider value={lightContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

