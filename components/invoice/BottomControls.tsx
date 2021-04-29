import React from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import { ItemStatus } from "../../types";
import { Controls } from "./Controls";
import styles from "./styles/BottomControls.module.scss";
interface BottomControlsProps {
  onClickEditing: () => void;
  onClickDelete: () => void;
  onClickPaid: () => void;
  status: ItemStatus;
}

export const BottomControls: React.FC<BottomControlsProps> = (props) => {
  const { dark } = useThemeContext();
  return (
    <div className={[styles.root, dark ? styles.dark : ""].join(" ")}>
      <Controls {...props} />
    </div>
  );
};
