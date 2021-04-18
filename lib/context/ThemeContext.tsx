import React from "react";
import { useToggle } from "../hooks/useToggle";

interface ThemeState {
  dark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeState>(null);

const ThemeProvider: React.FC = ({ children }) => {
  // TODO implement preferred theme
  const [dark, darkHandlers] = useToggle(false);

  const toggleTheme = () => {
    darkHandlers.toggle();
  };
  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => React.useContext(ThemeContext);

export { useThemeContext, ThemeProvider };
