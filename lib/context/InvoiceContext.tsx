import React from "react";
import { Invoice } from "../../types";
import data from "../../public/data.json";

interface InvoiceState {
  invoices: Invoice[];
  deleteInvoice: (id: string) => void;
  addInvoice: (newInvoice: Invoice) => void;
  editInvoice: (id: string, edited: Invoice) => void;
}

const InvoiceContext = React.createContext<InvoiceState>({
  invoices: [],
  deleteInvoice: () => {},
  addInvoice: (newInvoice: Invoice) => {},
  editInvoice: (id: string) => {},
});

const InvoiceProvider: React.FC = ({ children }) => {
  const [invoices, setInvoices] = React.useState<Invoice[]>(data as Invoice[]);

  React.useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
  };

  const addInvoice = (newInvoice: Invoice) => {
    setInvoices((prev) => [...prev, newInvoice]);
  };

  const editInvoice = (id: string, edited: Invoice) => {
    setInvoices((prev) =>
      prev.map((invoice) => {
        if (invoice.id === id) {
          return edited;
        }

        return invoice;
      })
    );
  };

  return (
    <InvoiceContext.Provider
      value={{ invoices, deleteInvoice, addInvoice, editInvoice }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

const useInvoices = () => React.useContext(InvoiceContext);

export { InvoiceProvider, InvoiceContext, useInvoices };
