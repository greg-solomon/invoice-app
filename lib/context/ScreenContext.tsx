import React from "react";
import { ScreenType } from "../../types";

interface ScreenState {
  screenType: ScreenType;
}

const ScreenContext = React.createContext<ScreenState>({ screenType: "phone" });

const ScreenProvider: React.FC = ({ children }) => {
  const [screenType, setScreenType] = React.useState<ScreenType>("phone");
  const handleScreenResize = () => {
    if (!window) return;
    if (window.innerWidth < 768) {
      setScreenType("phone");
    } else if (window.innerWidth < 1440) {
      setScreenType("tablet");
    } else {
      setScreenType("desktop");
    }
  };

  const screenResizeEffect = () => {
    handleScreenResize();
    window.addEventListener("resize", handleScreenResize);

    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  };

  React.useEffect(screenResizeEffect, []);
  return (
    <ScreenContext.Provider value={{ screenType }}>
      {children}
    </ScreenContext.Provider>
  );
};

const useScreenContext = () => React.useContext(ScreenContext);

export { ScreenProvider, useScreenContext };
