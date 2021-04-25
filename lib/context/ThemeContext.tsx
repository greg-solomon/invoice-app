import React from "react";
import { usePreferredColorScheme } from "../hooks/usePreferredScheme";
import { useToggle } from "../hooks/useToggle";

interface ThemeState {
  dark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeState>({
  dark: false,
  toggleTheme: () => {},
});

const ThemeProvider: React.FC = ({ children }) => {
  const [preferred] = usePreferredColorScheme();
  const [dark, darkHandlers] = useToggle(preferred);

  React.useEffect(() => {
    if (preferred) darkHandlers.on();
    else darkHandlers.off();
  }, [preferred]);
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
