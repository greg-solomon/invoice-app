import React from "react";
import { Invoice } from "../../types";
import data from "../../public/data.json";

interface InvoiceState {
  invoices: Invoice[];
}

const InvoiceContext = React.createContext<InvoiceState>({ invoices: [] });

const InvoiceProvider: React.FC = ({ children }) => {
  const [invoices, setInvoices] = React.useState<Invoice[]>(data as Invoice[]);
  return (
    <InvoiceContext.Provider value={{ invoices }}>
      {children}
    </InvoiceContext.Provider>
  );
};

const useInvoices = () => React.useContext(InvoiceContext);

export { InvoiceProvider, useInvoices };
