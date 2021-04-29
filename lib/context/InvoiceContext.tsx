import React, { useEffect, useState } from "react";
import { Invoice, ToggleHandlers } from "../../types";
import { useToggle } from "../hooks/useToggle";
import exampleData from "../../public/data.json";
import { useSession } from "next-auth/client";

interface InvoiceState {
  invoices: Invoice[];
  deleteInvoice: (id: string) => void;
  addInvoice: (newInvoice: Invoice) => void;
  editInvoice: (id: string, edited: Invoice) => void;
  isDemo: boolean;
  demoHandler: ToggleHandlers;
  error: string | null;
}

const InvoiceContext = React.createContext<InvoiceState>({
  invoices: [],
  deleteInvoice: () => {},
  addInvoice: (newInvoice: Invoice) => {},
  editInvoice: (id: string) => {},
  isDemo: false,
  demoHandler: {
    off: () => {},
    on: () => {},
    toggle: () => {},
  },
  error: null,
});

const InvoiceProvider: React.FC = ({ children }) => {
  const [session] = useSession();
  const [isDemo, demoHandler] = useToggle(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      if (isDemo) {
        const storedString = localStorage.getItem("invoices");
        if (storedString) {
          const storedInvoices = JSON.parse(storedString) as Invoice[];
          setInvoices(storedInvoices);
          return;
        } else {
          setInvoices(exampleData as Invoice[]);
          return;
        }
      }

      if (!session) return;
      try {
        const response = await fetch("/api/invoices");

        if (response.status !== 200) throw new Error();

        const data = await response.json();

        setInvoices(data.invoices);
      } catch (e) {
        setError(e.message);
        setInvoices([]);
      }
    };

    // initialization effect
    fetchInvoices();
  }, [isDemo, session]);

  useEffect(() => {
    if (isDemo) {
      localStorage.setItem("invoices", JSON.stringify(invoices));
    }
  }, [invoices, isDemo]);

  const deleteInvoice = async (id: string) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
    if (isDemo) return;

    try {
      await fetch("/api/invoices/delete", {
        method: "POST",
        body: JSON.stringify({
          id,
        }),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const addInvoice = async (newInvoice: Invoice) => {
    setInvoices((prev) => [...prev, newInvoice]);
    if (isDemo) return;

    try {
      await fetch("/api/invoices/add", {
        method: "POST",
        body: JSON.stringify({
          invoice: newInvoice,
        }),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const editInvoice = async (id: string, edited: Invoice) => {
    setInvoices((prev) =>
      prev.map((invoice) => {
        if (invoice.id === id) {
          return edited;
        }

        return invoice;
      })
    );

    if (isDemo) return;

    try {
      await fetch("/api/invoices/update", {
        method: "POST",
        body: JSON.stringify({
          invoice: edited,
        }),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        deleteInvoice,
        addInvoice,
        editInvoice,
        isDemo,
        demoHandler,
        error,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

const useInvoices = () => React.useContext(InvoiceContext);

export { InvoiceProvider, InvoiceContext, useInvoices };
