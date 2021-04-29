import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useScreenContext } from "../../lib/context/ScreenContext";
import { Invoice } from "../../types";
import { DatePicker } from "../ui/DatePicker";
import { Heading } from "../ui/Heading";
import { Input } from "../ui/Input";
import { SelectDropdown } from "../ui/SelectDropdown";
import { FormItemList } from "./FormItemList";
import { Button } from "../ui/Button";
import { useThemeContext } from "../../lib/context/ThemeContext";
import { BackButton } from "./BackButton";
import { emptyInvoice } from "../../lib/utils/emptyInvoice";
import { useInvoices } from "../../lib/context/InvoiceContext";
import { createID } from "../../lib/utils/createID";
import { IDIsUnique } from "../../lib/utils/IDisUnique";
import { addDays, format } from "date-fns";
import styles from "./styles/InvoiceForm.module.scss";

interface InvoiceFormProps {
  editing?: boolean;
  invoice?: Invoice;
  show: boolean;
  cancel: () => void;
}

export const InvoiceForm: FC<InvoiceFormProps> = ({
  editing = false,
  invoice,
  cancel,
  show,
}) => {
  const { addInvoice, invoices, editInvoice } = useInvoices();
  const { screenType } = useScreenContext();
  const { dark } = useThemeContext();
  const [data, setData] = useState(invoice || emptyInvoice());
  const [items, setItems] = useState(
    invoice?.items || [{ name: "New Item", quantity: 1, total: 0, price: 0 }]
  );

  useEffect(() => {
    // update items in form data
    setData((prev) => ({
      ...prev,
      items,
      total: items
        .map((item) => +item.total)
        .reduce((acc, val) => (acc += val)),
    }));
  }, [items]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      paymentDue: format(
        addDays(new Date(Date.now()), data.paymentTerms),
        "yyyy-MM-dd"
      ),
    }));
  }, [data.paymentTerms]);

  /* HANDLERS */
  const handlePaymentTermsChange = (newTerms: number) => {
    setData((prev) => ({
      ...prev,
      paymentTerms: newTerms,
    }));
  };

  const handleSaveAsDraft = () => {
    // if there is no ID for the invoice, create it
    if (!data.id) {
      // create ID
      let id = createID();
      const ids = invoices.map((inv) => inv.id);

      // make sure ID is unique to the user
      while (!IDIsUnique(id, ids)) {
        id = createID();
      }

      addInvoice({ ...data, id });
    } else {
      addInvoice(data);
    }
    return quitAndReset();
  };

  const handleSaveInvoice: React.FormEventHandler<HTMLFormElement> = (e) => {
    if (!data.id) {
      let id = createID();
      const ids = invoices.map((inv) => inv.id);

      while (!IDIsUnique(id, ids)) {
        id = createID();
      }

      setData((prev) => ({ ...prev, id, status: "pending" }));
      addInvoice({ ...data, status: "pending", id });
      e.preventDefault();

      return quitAndReset();
    }
    if (editing) {
      editInvoice(data.id, { ...data, status: "pending" });
      setData({ ...data, status: "pending" });
      e.preventDefault();
      return quitAndReset();
    } else {
      addInvoice({ ...data, status: "pending" });
      setData({ ...data, status: "pending" });
      e.preventDefault();
      return quitAndReset();
    }
  };

  const handleCancel = () => {
    // reset data and cancel
    if (invoice) {
      setData(invoice);
    }
    cancel();
  };

  const quitAndReset = () => {
    setData(emptyInvoice());
    setItems([{ name: "New Item", quantity: 1, total: 0, price: 0 }]);
    cancel();
  };
  /* END OF HANDLERS */

  const bottomClass = [
    styles.bottomControls,
    dark ? styles.darkBottom : "",
  ].join(" ");

  const rootDivProps = {
    className: [styles.root, dark ? styles.darkRoot : ""].join(" "),
    style: { transform: show ? "translateX(0%)" : `translateX(-100%)` },
  };

  const formProps = {
    className: [styles.content, dark ? styles.darkContent : ""].join(" "),
    onSubmit: handleSaveInvoice,
  };

  // bill from input props
  const fromStreetInputProps = {
    label: "Street Address",
    value: data.senderAddress.street,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setData((prev) => ({
        ...prev,
        senderAddress: {
          ...prev.senderAddress,
          street: e.target.value,
        },
      })),
    name: "address",
  };

  const fromCityInputProps = {
    label: "City",
    value: data.senderAddress.city,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setData((prev) => ({
        ...prev,
        senderAddress: {
          ...prev.senderAddress,
          city: e.target.value,
        },
      })),

    name: "fromCity",
  };

  const fromPostCodeInputProps = {
    label: "Post Code",
    value: data.senderAddress.postCode,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setData((prev) => ({
        ...prev,
        senderAddress: {
          ...prev.senderAddress,
          postCode: e.target.value,
        },
      })),

    name: "fromPostCode",
  };

  const fromCountryInputProps = {
    label: "Country",
    value: data.senderAddress.country,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setData((prev) => ({
        ...prev,
        senderAddress: {
          ...prev.senderAddress,
          country: e.target.value,
        },
      })),
  };
  /* end of bill from props */

  // bill to input props
  const clientNameInputProps = {
    label: "Client's Name",
    value: data.clientName,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setData((prev) => ({
        ...prev,
        clientName: e.target.value,
      }));
    },
  };

  const clientEmailInputProps = {
    label: "Client's Email",
    value: data.clientEmail,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setData((prev) => ({
        ...prev,
        clientEmail: e.target.value,
      }));
    },
  };

  const clientAddressInputProps = {
    label: "Street Address",
    value: data.clientAddress.street,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setData((prev) => ({
        ...prev,
        clientAddress: {
          ...prev.clientAddress,
          street: e.target.value,
        },
      })),
  };

  const clientCityInputProps = {
    label: "City",
    value: data.clientAddress.city,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setData((prev) => ({
        ...prev,
        clientAddress: {
          ...prev.clientAddress,
          city: e.target.value,
        },
      })),
    name: "clientCity",
  };

  const clientPostCodeInputProps = {
    label: "Post Code",
    value: data.clientAddress.postCode,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setData((prev) => ({
        ...prev,
        clientAddress: {
          ...prev.clientAddress,
          postCode: e.target.value,
        },
      })),

    name: "clientPostCode",
  };

  const clientCountryInputProps = {
    label: "Country",
    value: data.clientAddress.country,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setData((prev) => ({
        ...prev,
        clientAddress: {
          ...prev.clientAddress,
          country: e.target.value,
        },
      })),
  };
  /* end of bill to props */

  const datePickerProps = {
    label: "Invoice Date",
    value: data.paymentDue,
    setInvoiceDate: (date: string) => {
      setData((prev) => ({
        ...prev,
        paymentDue: date,
      }));
    },
    disabled: editing,
  };

  const paymentTermsProps = {
    label: "Payment Terms",
    options: [
      { label: "Net 1 Day", value: 1 },
      { label: "Net 7 Days", value: 7 },
      { label: "Net 14 Days", value: 14 },
      { label: "Net 30 Days", value: 30 },
    ],
    name: "terms",
    value: data.paymentTerms,
    onChange: handlePaymentTermsChange,
  };

  const projectDescriptionInputProps = {
    label: "Project Description",
    value: data.description,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setData((prev) => ({
        ...prev,
        description: e.target.value,
      }));
    },
  };
  return (
    <>
      <div {...rootDivProps}>
        {screenType === "phone" && <BackButton onClick={cancel} />}
        <form {...formProps}>
          <div className={styles.padding}>
            <Heading variant="h1">
              {editing && invoice ? (
                <>
                  Edit <span>#</span>
                  {invoice.id}
                </>
              ) : (
                "New Invoice"
              )}
            </Heading>
            <p className={styles.colorLabel}>Bill From</p>
            <Input {...fromStreetInputProps} />
            <div className={styles.inputGrid}>
              <Input {...fromCityInputProps} />
              <Input {...fromPostCodeInputProps} />
              <Input {...fromCountryInputProps} />
            </div>
            <p className={styles.colorLabel}>Bill To</p>
            <Input {...clientNameInputProps} />
            <Input {...clientEmailInputProps} />
            <Input {...clientAddressInputProps} />
            <div className={styles.inputGrid}>
              <Input {...clientCityInputProps} />
              <Input {...clientPostCodeInputProps} />
              <Input {...clientCountryInputProps} />
            </div>

            <div className={styles.dateAndTerms}>
              <DatePicker {...datePickerProps} />
              <SelectDropdown {...paymentTermsProps} />
            </div>
            <Input {...projectDescriptionInputProps} />
            <FormItemList items={items} setItems={setItems} />
          </div>

          <div className={bottomClass}>
            {editing && (
              <>
                {/* empty div for flexbox  */}
                <div></div>
                <div>
                  <Button variant={2} type="button" onClick={handleCancel}>
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
                  <Button variant={2} type="button" onClick={handleCancel}>
                    Discard
                  </Button>
                </div>
                <div>
                  <Button variant={3} type="button" onClick={handleSaveAsDraft}>
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
