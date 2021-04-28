import React from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import styles from "./styles/Loading.module.scss";

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = ({}) => {
  const { dark } = useThemeContext();
  return (
    <main
      role="main"
      className={[styles.root, dark ? styles.darkRoot : ""].join(" ")}
    >
      <p>Loading...</p>
    </main>
  );
};
