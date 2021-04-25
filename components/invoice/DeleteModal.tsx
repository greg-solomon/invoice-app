import React from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import styles from "./styles/DeleteModal.module.scss";

interface DeleteModalProps {
  id: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  id,
  onConfirm,
  onCancel,
}) => {
  const { dark } = useThemeContext();
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClickOff: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!ref.current?.contains(e.target as Node)) {
      onCancel();
    }
  };

  const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onCancel();
  };

  return (
    <div className={styles.root} onClick={handleClickOff}>
      <div
        className={[styles.modal, dark ? styles.darkModal : ""].join(" ")}
        ref={ref}
      >
        <Heading variant="h1">Confirm Deletion</Heading>
        <p className={styles.text}>
          Are you sure you want to delete invoice #{id}? This action cannot be
          undone.{" "}
        </p>
        <div className={styles.buttons}>
          <Button variant={2} onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant={4} onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
