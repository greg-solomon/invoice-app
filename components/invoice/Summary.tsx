import React from "react";
import { Invoice } from "../../types";
import { format } from "date-fns";
import styles from "./styles/Summary.module.scss";
import { Heading } from "../ui/Heading";
import { Receipt } from "./Receipt";

interface SummaryProps {
  invoice: Invoice;
}

export const Summary: React.FC<SummaryProps> = ({ invoice }) => {
  return (
    <div className={styles.root}>
      <div className={styles.summaryTop}>
        <div>
          <p className={styles.id}>
            <span>#</span>
            {invoice.id}
          </p>
          <p className={styles.description}>{invoice.description}</p>
        </div>
        <div className={styles.address}>
          <p>{invoice.senderAddress.street}</p>
          <p>{invoice.senderAddress.city}</p>
          <p>{invoice.senderAddress.postCode}</p>
          <p>{invoice.senderAddress.country}</p>
        </div>
      </div>
      <div className={styles.billingInformation}>
        <div className={styles.dateInfo}>
          <p className={styles.billingLabel}>Invoice Date</p>
          <Heading variant="h3">
            {format(new Date(invoice.createdAt), "dd MMM yyyy")}
          </Heading>

          <p className={styles.billingLabel}>Payment Due</p>
          <Heading variant="h3">
            {format(new Date(invoice.paymentDue), "dd MMM yyyy")}
          </Heading>
        </div>
        <div className={styles.clientInfo}>
          <p className={styles.billingLabel}>Bill To</p>
          <Heading variant="h3">{invoice.clientName}</Heading>
          <div className={styles.address}>
            <p>{invoice.clientAddress.street}</p>
            <p>{invoice.clientAddress.city}</p>
            <p>{invoice.clientAddress.postCode}</p>
            <p>{invoice.clientAddress.country}</p>
          </div>
        </div>
        <div className={styles.emailInfo}>
          <p className={styles.billingLabel}>Sent To</p>
          <Heading variant="h3">{invoice.clientEmail}</Heading>
        </div>
      </div>
      <Receipt invoice={invoice} />
    </div>
  );
};
