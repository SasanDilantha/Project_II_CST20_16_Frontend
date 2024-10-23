import React, { createContext, useState, useContext } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

const lightTheme = {
  mode: 'light',
  background: '#FFF7E1', // light creamy peach background
  text: '#4A4A4A', // slightly darker grey text
  primary: '#FFA500', // vibrant orange for primary actions
  secondary: '#FFD933', // warm yellow for secondary actions
  buttonBackground: '#FFA500', // button background color
  buttonText: '#FFFFFF', // button text color
  borderColor: '#D3D3D3', // slightly darker border color for inputs and other elements
  shadowColor: '#666666', // lighter shadow color for elements
  cardBackground: '#FFFFFF', // card background color
  inputBackground: '#F5F5F5', // light grey input background color
  inputText: '#4A4A4A', // input text color
};

const darkTheme = {
  mode: 'dark',
  background: '#1E1E1E', // very dark grey background
  text: '#E0E0E0', // light grey text
  primary: '#FF8C00', // vibrant orange for primary actions
  secondary: '#FFD700', // bright yellow for secondary actions
  buttonBackground: '#FF8C00', // button background color
  buttonText: '#FFFFFF', // button text color
  borderColor: '#555', // border color for inputs and other elements
  shadowColor: '#000', // shadow color for elements
  cardBackground: '#2A2A2A', // card background color
  inputBackground: '#333', // input background color
  inputText: '#E0E0E0', // input text color
};

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const defaultTheme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.mode === 'light' ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
