import React from "react";
import { Controls } from "./Controls";
import styles from "./styles/BottomControls.module.scss";
interface BottomControlsProps {
  onClickEditing: () => void;
  onClickDelete?: () => void;
  onClickPaid?: () => void;
}

export const BottomControls: React.FC<BottomControlsProps> = (props) => {
  return (
    <div className={styles.root}>
      <Controls {...props} />
    </div>
  );
};
