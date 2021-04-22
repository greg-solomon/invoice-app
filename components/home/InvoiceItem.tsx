import React from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { Invoice, ScreenType } from "../../types";
import { DraftIndicator } from "../shared/DraftingIndicator";
import { PaidIndicator } from "../shared/PaidIndicator";
import { PendingIndicator } from "../shared/PendingIndicator";
import styles from "./InvoiceItem.module.scss";

interface InvoiceItemProps {
  invoice: Invoice;
  screenType: ScreenType;
}
export const InvoiceItem: React.FC<InvoiceItemProps> = ({
  invoice,
  screenType,
}) => {
  const router = useRouter();
  const currencyString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    invoice.items.map((item) => +item.total).reduce((acc, val) => (acc += val))
  );
  return (
    <div
      className={styles.root}
      onClick={() =>
        router.push({ pathname: `/invoice/[id]`, query: { id: invoice.id } })
      }
    >
      <div className={styles.itemOverview}>
        <p className={styles.itemId}>
          <span>#</span>
          {invoice.id}
        </p>
        {screenType === "phone" && (
          <p className={styles.clientName}>{invoice.clientName}</p>
        )}
        {screenType !== "phone" && (
          <p className={styles.date}>
            Due {format(new Date(invoice.paymentDue), "dd MMM yyyy")}
          </p>
        )}
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.dateAndAmount}>
          {screenType === "phone" && (
            <p className={styles.date}>
              Due {format(new Date(invoice.paymentDue), "dd MMM yyyy")}
            </p>
          )}
          {screenType !== "phone" && (
            <p className={styles.clientName}>{invoice.clientName}</p>
          )}
          <p className={styles.amount}>{currencyString}</p>
        </div>
        <div className={styles.indicatorWrapper}>
          {invoice.status === "draft" && <DraftIndicator />}
          {invoice.status === "paid" && <PaidIndicator />}
          {invoice.status === "pending" && <PendingIndicator />}
          <img src="/assets/icon-arrow-right.svg" alt="Right Arrow Icon" />
        </div>
      </div>
    </div>
  );
};
