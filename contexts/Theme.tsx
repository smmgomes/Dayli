import React, { PropsWithChildren, createContext, useState } from 'react';
import { Appearance } from 'react-native';

export const ThemeContext = createContext<{
  themeValue: string;
  setThemeValue: React.Dispatch<React.SetStateAction<string>>;
} | undefined>(undefined);


export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [themeValue, setThemeValue] = useState<string>(
    Appearance.getColorScheme() ?? 'light',
  );
  return (
    <ThemeContext.Provider value={{ themeValue, setThemeValue }}>
      {children}
    </ThemeContext.Provider>
  );
};
