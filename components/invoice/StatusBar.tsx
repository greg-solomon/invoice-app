import React from "react";
import { ItemStatus, ScreenType } from "../../types";
import { DraftIndicator } from "../shared/DraftingIndicator";
import { PaidIndicator } from "../shared/PaidIndicator";
import { PendingIndicator } from "../shared/PendingIndicator";
import { Button } from "../ui/Button";
import { Controls } from "./Controls";
import styles from "./styles/StatusBar.module.scss";

interface StatusBarProps {
  status: ItemStatus;
  screenType: ScreenType;
  onClickEditing: () => void;
  onClickDelete?: () => void;
  onClickPaid?: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  status,
  screenType,
  onClickEditing,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.statusInfo}>
        <p className={styles.statusText}>Status</p>
        {status === "draft" && <DraftIndicator />}
        {status === "pending" && <PendingIndicator />}
        {status === "paid" && <PaidIndicator />}
      </div>
      {screenType !== "phone" && <Controls onClickEditing={onClickEditing} />}
    </div>
  );
};
