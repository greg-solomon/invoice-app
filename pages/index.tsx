import Head from "next/head";
import data from "../public/data.json";
import { useThemeContext } from "../lib/context/ThemeContext";
import React from "react";
import { ActionBar } from "../components/invoice/ActionBar";

export type ScreenType = "phone" | "tablet" | "desktop";

export default function Home() {
  const { dark } = useThemeContext();
  const [screenType, setScreenType] = React.useState<ScreenType>("phone");
  const darkClass = dark ? "dark" : "";

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

  React.useEffect(() => {
    handleScreenResize();
    window.addEventListener("resize", handleScreenResize);

    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);

  return (
    <main role="main" className={darkClass}>
      <ActionBar screenType={screenType} />
    </main>
  );
}
