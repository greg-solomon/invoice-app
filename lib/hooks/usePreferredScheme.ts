import { useEffect, useState } from "react";

function detectColorScheme() {
  if (!window || !window.matchMedia) {
    return false;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return true;
  }
  return false;
}
export const usePreferredColorScheme = () => {
  const [preferredScheme, setPreferredScheme] = useState(false);

  useEffect(() => {
    setPreferredScheme(detectColorScheme());
  }, []);
  return [preferredScheme];
};
