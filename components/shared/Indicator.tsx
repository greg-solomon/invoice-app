import React from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import styles from "./styles/Indicators.module.scss";

interface IndicatorProps {
  type: "draft" | "pending" | "paid";
}
const Indicator: React.FC<IndicatorProps> = ({ type }) => {
  const { dark } = useThemeContext();
  switch (type) {
    case "draft":
      return (
        <div className={[styles.draft, dark ? styles.draftDark : ""].join(" ")}>
          <span></span>
          <p>Draft</p>
        </div>
      );
    case "paid":
      return (
        <div className={styles.paid}>
          <span></span>
          <p>Paid</p>
        </div>
      );
    case "pending":
    default:
      return (
        <div className={styles.pending}>
          <span></span>
          <p>Pending</p>
        </div>
      );
  }
};

export { Indicator };
