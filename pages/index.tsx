import Head from "next/head";
import { useThemeContext } from "../lib/context/ThemeContext";
import React from "react";
import { ActionBar } from "../components/home/ActionBar";
import { InvoiceList } from "../components/home/InvoiceList";
import { ItemStatus } from "../types";
import { useToggle } from "../lib/hooks/useToggle";
import { useScreenContext } from "../lib/context/ScreenContext";
import { InvoiceForm } from "../components/shared/InvoiceForm";
import styles from "../styles/HomePage.module.scss";

export default function Home() {
  const [draftFilter, draftFilterHandler] = useToggle();
  const [pendingFilter, pendingFilterHandler] = useToggle();
  const [paidFilter, paidFilterHandler] = useToggle();
  const [isModalOpen, modalHandler] = useToggle();
  const [activeFilters, setActiveFilters] = React.useState<ItemStatus[]>([]);
  const { screenType } = useScreenContext();
  const { dark } = useThemeContext();
  const updateFiltersEffect = () => {
    let filters: ItemStatus[] = [];

    if (draftFilter) filters.push("draft");
    if (paidFilter) filters.push("paid");
    if (pendingFilter) filters.push("pending");

    setActiveFilters(filters);
  };

  React.useEffect(updateFiltersEffect, [
    paidFilter,
    pendingFilter,
    draftFilter,
  ]);

  const filterHandlers = {
    draft: {
      value: draftFilter,
      onChange: () => {
        draftFilterHandler.toggle();
      },
    },
    pending: {
      value: pendingFilter,
      onChange: () => {
        pendingFilterHandler.toggle();
      },
    },
    paid: {
      value: paidFilter,
      onChange: () => {
        paidFilterHandler.toggle();
      },
    },
  };
  return (
    <>
      <main
        role="main"
        className={[styles.main, dark ? styles.darkMain : ""].join(" ")}
      >
        <ActionBar
          screenType={screenType}
          filterHandlers={filterHandlers}
          handleNewInvoice={modalHandler.on}
        />
        <InvoiceList filters={activeFilters} screenType={screenType} />
      </main>
      <InvoiceForm
        show={isModalOpen}
        cancel={modalHandler.off}
        editing={false}
      />
    </>
  );
}
