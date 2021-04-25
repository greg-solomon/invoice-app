import React from "react";
import { useScreenContext } from "../../lib/context/ScreenContext";
import { useThemeContext } from "../../lib/context/ThemeContext";
import { Invoice, ScreenType } from "../../types";
import { Heading } from "../ui/Heading";
import styles from "./styles/Receipt.module.scss";

interface ReceiptProps {
  invoice: Invoice;
}

interface ReceiptItemProps {
  screenType: ScreenType;
  item: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  };
}

export const Receipt: React.FC<ReceiptProps> = ({ invoice }) => {
  const { screenType } = useScreenContext();
  const { dark } = useThemeContext();

  const totalString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(invoice.total);

  switch (screenType) {
    case "phone":
      return (
        <div className={[styles.root, dark ? styles.darkRoot : ""].join(" ")}>
          <div className={styles.padding}>
            {invoice.items.map((item) => (
              <ReceiptItem
                item={item}
                screenType={screenType}
                key={item.name}
              />
            ))}
          </div>
          <div
            className={[styles.subTotal, dark ? styles.darkSubTotal : ""].join(
              " "
            )}
          >
            <p className={styles.totalLabel}>Grand Total</p>
            <Heading variant="h2">{totalString}</Heading>
          </div>
        </div>
      );
    case "tablet":
    case "desktop":
    default:
      return (
        <>
          <table
            className={[styles.receiptTable, dark ? styles.darkTable : ""].join(
              " "
            )}
          >
            <thead>
              <tr>
                <td>Item Name</td>
                <td>QTY.</td>
                <td>Price</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td className={styles.tableLightText}>{item.quantity}</td>
                  <td className={styles.tableLightText}>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.price)}
                  </td>
                  <td className={styles.tableDarkText}>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className={[styles.subTotal, dark ? styles.darkSubTotal : ""].join(
              " "
            )}
          >
            <p className={styles.totalLabel}>Amount Due</p>
            <Heading variant="h2">{totalString}</Heading>
          </div>
        </>
      );
  }
};

const ReceiptItem: React.FC<ReceiptItemProps> = ({ item, screenType }) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(item.price);

  const totalString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(item.total);

  return (
    <div className={styles.item}>
      <div>
        <p className={styles.itemName}>{item.name}</p>
        <p className={styles.quantityAndPrice}>
          {item.quantity} x {priceString}
        </p>
      </div>
      <div>
        <p className={styles.total}>{totalString}</p>
      </div>
    </div>
  );
};
