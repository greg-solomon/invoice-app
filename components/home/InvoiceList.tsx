import React from "react";
import { Invoice, ItemStatus, ScreenType } from "../../types";
import styles from "./InvoiceList.module.scss";
import { InvoiceItem } from "./InvoiceItem";
import { Heading } from "../ui/Heading";
import { useInvoices } from "../../lib/context/InvoiceContext";

interface InvoiceListProps {
  filters: ItemStatus[];
  screenType: ScreenType;
}

export const InvoiceList: React.FC<InvoiceListProps> = ({
  filters,
  screenType,
}) => {
  const { invoices } = useInvoices();
  let content;

  if (invoices.length === 0) {
    content = (
      <div className={styles.emptyRoot}>
        <img src="/assets/illustration-empty.svg" alt="Empty Illustration" />
        <Heading variant="h2">There is nothing here</Heading>
        <p className={styles.emptyText}>
          Create an invoice by clicking the <strong>New Invoice</strong> button
          and get started
        </p>
      </div>
    );
  } else if (filters.length > 0) {
    content = invoices
      .filter((inv) => filters.includes(inv.status))
      .map((item) => (
        <InvoiceItem invoice={item} key={item.id} screenType={screenType} />
      ));
  } else {
    content = invoices.map((item) => (
      <InvoiceItem invoice={item} key={item.id} screenType={screenType} />
    ));
  }

  return <ul className={styles.list}>{content}</ul>;
};
