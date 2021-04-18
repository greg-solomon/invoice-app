import React from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import { ScreenType } from "../../pages";
import { Heading } from "../ui/Heading";
import { PlusButton } from "../ui/PlusButton";
import styles from "./ActionBar.module.scss";

interface ActionBarProps {
  screenType: ScreenType;
}

export const ActionBar: React.FC<ActionBarProps> = ({ screenType }) => {
  const { dark } = useThemeContext();
  return (
    <div className={styles.container}>
      <Heading variant={screenType === "phone" ? "h2" : "h1"}>Invoices</Heading>
      <div className={styles.actionControls}>
        <PlusButton screenType={screenType} />
      </div>
    </div>
  );
};
