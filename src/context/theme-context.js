// context/theme-context.js
import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  colors: {
    light: {
      primary: '#ffffff',
      secondary: '#f3f4f6',
    },
    dark: {
      primary: '#1f2937',
      secondary: '#111827',
    }
  }
});