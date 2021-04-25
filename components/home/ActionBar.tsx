import React from "react";
import { useInvoices } from "../../lib/context/InvoiceContext";
import { useThemeContext } from "../../lib/context/ThemeContext";
import { FilterType, Invoice, ScreenType } from "../../types";
import { FilterDropdown } from "../ui/FilterDropdown";
import { Heading } from "../ui/Heading";
import { PlusButton } from "../ui/PlusButton";
import styles from "./styles/ActionBar.module.scss";

interface ActionBarProps {
  screenType: ScreenType;
  filterHandlers: {
    paid: FilterType;
    pending: FilterType;
    draft: FilterType;
  };
  handleNewInvoice: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  screenType,
  filterHandlers,
  handleNewInvoice,
}) => {
  const { dark } = useThemeContext();
  const { invoices } = useInvoices();
  return (
    <div
      className={[styles.container, dark ? styles.containerDark : ""].join(" ")}
    >
      <div>
        <Heading variant={screenType === "phone" ? "h2" : "h1"}>
          Invoices
        </Heading>
        <p className={styles.invoiceOverview}>
          {screenType === "phone"
            ? `${invoices.length} invoices`
            : `There are ${invoices.length} total invoices`}
        </p>
      </div>
      <div className={styles.actionControls}>
        <FilterDropdown screenType={screenType} filters={filterHandlers} />
        <PlusButton screenType={screenType} onClick={handleNewInvoice} />
      </div>
    </div>
  );
};
