import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useInvoices } from "../../lib/context/InvoiceContext";
import { Invoice } from "../../types";
import { StatusBar } from "../../components/invoice/StatusBar";
import { Summary } from "../../components/invoice/Summary";
import { useScreenContext } from "../../lib/context/ScreenContext";
import { BottomControls } from "../../components/invoice/BottomControls";
import { useToggle } from "../../lib/hooks/useToggle";
import { InvoiceForm } from "../../components/shared/InvoiceForm";
import { useThemeContext } from "../../lib/context/ThemeContext";
import styles from "../../styles/InvoicePage.module.scss";
import { BackButton } from "../../components/shared/BackButton";
import { DeleteModal } from "../../components/invoice/DeleteModal";

const InvoicePage: React.FC = () => {
  const { deleteInvoice, invoices, editInvoice } = useInvoices();
  const router = useRouter();
  const [invoice, setInvoice] = React.useState<Invoice | null>(null);
  const [isEditing, setEditing] = useToggle(false);
  const [deleting, deletingHandlers] = useToggle(false);
  const { screenType } = useScreenContext();
  const { dark } = useThemeContext();
  const { id } = router.query;

  const setInvoiceEffect = () => {
    if (!id) return;
    const inv = invoices.filter((i) => i.id === id[0]).pop();
    if (inv) {
      setInvoice(inv);
    }
  };

  React.useEffect(setInvoiceEffect, [id, invoices]);

  const handleDeletion = (id: string) => {
    deleteInvoice(id);
    router.replace("/");
  };

  const handleMarkAsPaid = () => {
    console.log(`Marking as paid...`);
    if (invoice) {
      editInvoice(invoice.id, { ...invoice, status: "paid" });
      setInvoice({ ...invoice, status: "paid" });
    }
  };

  return (
    <main
      role="main"
      className={[styles.main, dark ? styles.darkMain : ""].join(" ")}
    >
      <Head>
        <title>Invoice #{id} | Invoice App</title>
      </Head>
      <BackButton />
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
          onClickDelete={deletingHandlers.on}
          onClickPaid={handleMarkAsPaid}
        />
      )}
      {invoice && <Summary invoice={invoice} />}
      {invoice && screenType === "phone" && (
        <BottomControls
          onClickEditing={setEditing.toggle}
          onClickDelete={deletingHandlers.on}
          onClickPaid={handleMarkAsPaid}
          status={invoice.status}
        />
      )}
      {deleting && invoice && (
        <DeleteModal
          id={invoice.id}
          onConfirm={() => handleDeletion(invoice.id)}
          onCancel={deletingHandlers.off}
        />
      )}
    </main>
  );
};

export default InvoicePage;
