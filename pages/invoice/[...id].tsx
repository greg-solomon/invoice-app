import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/InvoicePage.module.scss";
import { useInvoices } from "../../lib/context/InvoiceContext";
import { Invoice } from "../../types";
import { StatusBar } from "../../components/invoice/StatusBar";
import { Summary } from "../../components/invoice/Summary";
import { Receipt } from "../../components/invoice/Receipt";
import { useScreenContext } from "../../lib/context/ScreenContext";
import { BottomControls } from "../../components/invoice/BottomControls";
import { useToggle } from "../../lib/hooks/useToggle";
import { InvoiceForm } from "../../components/shared/InvoiceForm";

interface InvoicePageProps {}

const InvoicePage: React.FC<InvoicePageProps> = (props) => {
  const [invoice, setInvoice] = React.useState<Invoice | null>(null);
  const [isEditing, setEditing] = useToggle(false);
  const router = useRouter();
  const { invoices } = useInvoices();
  const { screenType } = useScreenContext();
  const { id } = router.query;

  const setInvoiceEffect = () => {
    if (!id) return;
    const inv = invoices.filter((i) => i.id === id[0]).pop();
    if (inv) {
      setInvoice(inv);
    }
  };

  React.useEffect(setInvoiceEffect, [id]);

  return (
    <main>
      <Head>
        <title>Invoice #{id} | Invoice App</title>
      </Head>
      <div className={styles.backBtnWrapper}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <img src="/assets/icon-arrow-left.svg" alt="Left Arrow" />
          <span>Go back</span>
        </button>
      </div>
      {invoice && (
        <InvoiceForm
          editing={true}
          show={isEditing}
          cancel={setEditing.off}
          invoice={invoice}
        />
      )}
      {invoice && (
        <StatusBar
          status={invoice.status}
          screenType={screenType}
          onClickEditing={setEditing.toggle}
        />
      )}
      {invoice && <Summary invoice={invoice} />}
      {screenType === "phone" && (
        <BottomControls onClickEditing={setEditing.toggle} />
      )}
    </main>
  );
};

export default InvoicePage;
