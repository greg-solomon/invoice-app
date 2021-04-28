import React from "react";
import { Invoice } from "../../types";
import exampleData from "../../public/data.json";

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
  const [isDemo, setDemo] = React.useState(true);
  const [hasVisitedApp, setHasVisitedApp] = React.useState(true);
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);

  React.useEffect(() => {}, [hasVisitedApp]);

  React.useEffect(() => {
    const hasVisited = getVisitInformation();
    if (!hasVisited) {
      localStorage.setItem("visited", JSON.stringify(true));
    }
    setHasVisitedApp(hasVisited);
    const initialInvoices = getInvoices(isDemo, hasVisited);

    setInvoices(initialInvoices);
  }, []);

  React.useEffect(() => {
    if (isDemo) {
      localStorage.setItem("invoices", JSON.stringify(invoices));
      console.log(`Storing item...`);
    }
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

function getInvoices(isDemo: boolean, hasVisitedApp: boolean): Invoice[] {
  if (isDemo && !hasVisitedApp) return exampleData as Invoice[];
  if (isDemo) {
    const storedString = localStorage.getItem("invoices");
    if (storedString) {
      const storedInvoices = JSON.parse(storedString) as Invoice[];
      console.log({ storedInvoices });
      return storedInvoices;
    }
  }
  return [];
}

function getVisitInformation(): boolean {
  const fetched = localStorage.getItem("visited");
  if (fetched) {
    return JSON.parse(fetched) as boolean;
  }
  return false;
}
