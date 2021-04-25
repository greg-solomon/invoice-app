import React, { useState } from "react";
import { useScreenContext } from "../../lib/context/ScreenContext";
import { useInput } from "../../lib/hooks/useInput";
import { Invoice, Item } from "../../types";
import { DatePicker } from "../ui/DatePicker";
import { Heading } from "../ui/Heading";
import { Input } from "../ui/Input";
import { SelectDropdown } from "../ui/SelectDropdown";
import { FormItemList } from "./FormItemList";
import { format } from "date-fns";
import styles from "./styles/InvoiceForm.module.scss";
import { Button } from "../ui/Button";
import { useThemeContext } from "../../lib/context/ThemeContext";
import { BackButton } from "./BackButton";

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
  const { dark } = useThemeContext();

  const initialDate =
    invoice?.createdAt || format(new Date(Date.now()), "yyyy-MM-dd");
  const initialFromAddress = invoice?.senderAddress || {
    country: "",
    city: "",
    postCode: "",
    street: "",
  };
  const initialClientName = invoice?.clientName || "";
  const initialClientAddress = invoice?.clientAddress || {
    city: "",
    street: "",
    postCode: "",
    country: "",
  };
  const initialDescription = invoice?.description || "";
  const initialClientEmail = invoice?.clientEmail || "";
  const initialPaymentTerms = invoice?.paymentTerms || 7;

  const initialItems = invoice?.items
    ? [...invoice.items, { name: "", quantity: 0, total: 0, price: 0 }]
    : [{ name: "", quantity: 0, total: 0, price: 0 }];

  const [fromAddress, setFromAddress] = useState(initialFromAddress);
  const [clientEmail, clientEmailHandlers] = useInput(initialClientEmail);
  const [clientName, clientNameHandlers] = useInput(initialClientName);
  const [invoiceDate, setInvoiceDate] = useState(initialDate);
  const [description, descriptionHandlers] = useInput(initialDescription);
  const [paymentTerms, setPaymentTerms] = useState(initialPaymentTerms);
  const [clientAddress, setClientAddress] = useState(initialClientAddress);
  const [items, setItems] = useState<Item[]>(initialItems);
  const handlePaymentTermsChange = (newTerms: number) => {
    setPaymentTerms(newTerms);
  };

  const headingText =
    editing && invoice ? (
      <>
        Edit <span>#</span>
        {invoice.id}
      </>
    ) : (
      "New Invoice"
    );

  const bottomClass = [
    styles.bottomControls,
    dark ? styles.darkBottom : "",
  ].join(" ");
  return (
    <>
      <div
        className={[styles.root, dark ? styles.darkRoot : ""].join(" ")}
        style={{ transform: show ? "translateX(0%)" : `translateX(-100%)` }}
      >
        {screenType === "phone" && <BackButton onClick={cancel} />}
        <form
          className={[styles.content, dark ? styles.darkContent : ""].join(" ")}
        >
          <div className={styles.padding}>
            <Heading variant="h1">{headingText}</Heading>
            <p className={styles.colorLabel}>Bill From</p>
            <Input
              label="Street Address"
              value={fromAddress.street}
              onChange={(e) =>
                setFromAddress((prev) => ({ ...prev, street: e.target.value }))
              }
              name="address"
            />
            <div className={styles.inputGrid}>
              <Input
                label="City"
                value={fromAddress.city}
                onChange={(e) =>
                  setFromAddress((prev) => ({ ...prev, city: e.target.value }))
                }
                name="fromCity"
              />
              <Input
                label="Post Code"
                value={fromAddress.postCode}
                onChange={(e) =>
                  setFromAddress((prev) => ({
                    ...prev,
                    postCode: e.target.value,
                  }))
                }
                name="fromPostCode"
              />
              <Input
                label="Country"
                value={fromAddress.country}
                onChange={(e) =>
                  setFromAddress((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
              />
            </div>
            <p className={styles.colorLabel}>Bill To</p>

            <Input
              label="Client's Name"
              value={clientName}
              onChange={clientNameHandlers.set}
            />
            <Input
              label="Client's Email"
              value={clientEmail}
              onChange={clientEmailHandlers.set}
            />

            <Input
              label="Street Address"
              value={clientAddress.street}
              onChange={(e) =>
                setClientAddress((prev) => ({
                  ...prev,
                  street: e.target.value,
                }))
              }
            />
            <div className={styles.inputGrid}>
              <Input
                label="City"
                value={clientAddress.city}
                onChange={(e) =>
                  setClientAddress((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                name="clientCity"
              />
              <Input
                label="Post Code"
                value={clientAddress.postCode}
                onChange={(e) =>
                  setClientAddress((prev) => ({
                    ...prev,
                    postCode: e.target.value,
                  }))
                }
                name="clientPostCode"
              />
              <Input
                label="Country"
                value={clientAddress.country}
                onChange={(e) =>
                  setClientAddress((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
              />
            </div>

            <div className={styles.dateAndTerms}>
              <DatePicker
                label="Invoice Date"
                value={invoiceDate}
                setInvoiceDate={setInvoiceDate}
                disabled={editing}
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
                value={paymentTerms}
                onChange={handlePaymentTermsChange}
              />
            </div>
            <Input
              label="Project Description"
              value={description}
              onChange={descriptionHandlers.set}
            />

            <FormItemList items={items} setItems={setItems} />
          </div>

          <div className={bottomClass}>
            {editing && (
              <>
                <div></div>
                <div>
                  <Button variant={2} type="button">
                    Cancel
                  </Button>
                  <Button variant={1} type="submit">
                    Save Changes
                  </Button>
                </div>
              </>
            )}
            {!editing && (
              <>
                <div>
                  <Button variant={2} type="button">
                    Discard
                  </Button>
                </div>
                <div>
                  <Button variant={3} type="button">
                    Save as Draft
                  </Button>
                  <Button variant={1} type="submit">
                    Save & Send
                  </Button>
                </div>
              </>
            )}
          </div>
        </form>
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
