import { format } from "date-fns";
import React from "react";
import { useScreenContext } from "../../lib/context/ScreenContext";
import { useInput } from "../../lib/hooks/useInput";
import { Invoice } from "../../types";
import { DatePicker } from "../ui/DatePicker";
import { Heading } from "../ui/Heading";
import { Input } from "../ui/Input";
import { SelectDropdown } from "../ui/SelectDropdown";
import styles from "./styles/InvoiceForm.module.scss";

interface InvoiceFormProps {
  editing?: boolean;
  invoice?: Invoice;
  show: boolean;
  cancel: () => void;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  editing = false,
  invoice,
  cancel,
  show,
}) => {
  const { screenType } = useScreenContext();
  const [streetAddress, streetAddressHandlers] = useInput(
    invoice?.clientAddress?.street || ""
  );
  const [city, cityHandlers] = useInput(invoice?.clientAddress.city || "");
  const [postCode, postCodeHandlers] = useInput(
    invoice?.clientAddress.postCode || ""
  );

  const [country, countryHandlers] = useInput(
    invoice?.clientAddress.country || ""
  );

  const [invoiceDate, setInvoiceDate] = React.useState(invoice?.createdAt);

  const headingText =
    editing && invoice ? (
      <>
        Edit <span>#</span>
        {invoice.id}
      </>
    ) : (
      "New Invoice"
    );
  return (
    <>
      <div
        className={styles.root}
        style={{ transform: show ? "translateX(0%)" : `translateX(-100%)` }}
      >
        {screenType === "phone" && (
          <div className={styles.backBtnWrapper}>
            <button className={styles.backBtn} onClick={cancel}>
              <img src="/assets/icon-arrow-left.svg" alt="Left Arrow" />
              <span>Go back</span>
            </button>
          </div>
        )}
        <div className={styles.content}>
          <Heading variant="h1">{headingText}</Heading>
          <p className={styles.colorLabel}>Bill From</p>
          <Input
            label="Street Address"
            value={streetAddress}
            onChange={streetAddressHandlers.set}
            name="address"
          />
          <div className={styles.flex}>
            <Input
              label="City"
              value={city}
              onChange={cityHandlers.set}
              name="city"
            />
            <Input
              label="Post Code"
              value={postCode}
              onChange={postCodeHandlers.set}
              name="postCode"
            />
          </div>
          <Input
            label="Country"
            value={country}
            onChange={countryHandlers.set}
          />
          <DatePicker
            label="Invoice Date"
            value={invoiceDate || format(new Date(Date.now()), "yyyy-MM-dd")}
          />
          <SelectDropdown
            label="Payment Terms"
            options={[
              { label: "Net 1 Day", value: 1 },
              { label: "Net 7 Days", value: 7 },
              { label: "Net 14 Days", value: 14 },
              { label: "Net 30 Days", value: 30 },
            ]}
            name="terms"
            value={invoice?.paymentTerms || 7}
          />
        </div>
      </div>
      <ModalShadow show={show} cancel={cancel} />
    </>
  );
};

const ModalShadow = ({
  show,
  cancel,
}: {
  show: boolean;
  cancel: () => void;
}) => (
  <div
    className={styles.darkOut}
    onClick={cancel}
    style={{
      opacity: show ? 1 : 0,
      transform: show ? "translateX(0%)" : `translateX(-100%)`,
    }}
  />
);
