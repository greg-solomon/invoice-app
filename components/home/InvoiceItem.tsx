import React from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { Invoice, ScreenType } from "../../types";
import { Indicator } from "../shared/Indicator";
import styles from "./styles/InvoiceItem.module.scss";
import { useThemeContext } from "../../lib/context/ThemeContext";

interface InvoiceItemProps {
  invoice: Invoice;
  screenType: ScreenType;
}
export const InvoiceItem: React.FC<InvoiceItemProps> = ({
  invoice,
  screenType,
}) => {
  const { dark } = useThemeContext();
  const router = useRouter();

  const currencyOptions = {
    style: "currency",
    currency: "USD",
  };

  const currencyFmt = new Intl.NumberFormat("en-US", currencyOptions);

  const currencyString = currencyFmt.format(invoice.total);

  const nameClass = [styles.clientName, dark ? styles.dateDark : ""].join(" ");
  const dateClass = [styles.date, dark ? styles.dateDark : ""].join(" ");
  return (
    <div
      className={[styles.root, dark ? styles.darkRoot : ""].join(" ")}
      onClick={() =>
        router.push({ pathname: `/invoice/[id]`, query: { id: invoice.id } })
      }
    >
      <div className={styles.itemOverview}>
        <p className={[styles.itemId].join(" ")}>
          <span>#</span>
          {invoice.id}
        </p>
        {screenType === "phone" && (
          <p className={nameClass}>{invoice.clientName}</p>
        )}
        {screenType !== "phone" && (
          <p className={dateClass}>
            Due {format(new Date(invoice.paymentDue), "dd MMM yyyy")}
          </p>
        )}
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.dateAndAmount}>
          {screenType === "phone" && (
            <p className={dateClass}>
              Due {format(new Date(invoice.paymentDue), "dd MMM yyyy")}
            </p>
          )}
          {screenType !== "phone" && (
            <p className={nameClass}>{invoice.clientName}</p>
          )}
          <p
            className={[styles.amount, dark ? styles.amountDark : ""].join(" ")}
          >
            {currencyString}
          </p>
        </div>
        <div className={styles.indicatorWrapper}>
          <Indicator type={invoice.status} />
          <img src="/assets/icon-arrow-right.svg" alt="Right Arrow Icon" />
        </div>
      </div>
    </div>
  );
};
