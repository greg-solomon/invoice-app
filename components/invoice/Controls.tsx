import React from "react";
import { Button } from "../ui/Button";
import styles from "./styles/Controls.module.scss";
interface ControlsProps {
  onClickEditing: () => void;
  onClickDelete: () => void;
  onClickPaid?: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  onClickEditing,
  onClickDelete,
}) => {
  return (
    <div className={styles.buttons}>
      <Button variant={2} onClick={onClickEditing}>
        Edit
      </Button>
      <Button variant={4} onClick={onClickDelete}>
        Delete
      </Button>
      <Button variant={1}>Mark as Paid</Button>
    </div>
  );
};
