export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: ItemStatus;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: Item[];
  total: number;
}

export type Item = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type ScreenType = "phone" | "tablet" | "desktop";

export type FilterType = {
  value: boolean;
  onChange: () => void;
};

export type ItemStatus = "draft" | "pending" | "paid";

export type ToggleHandlers = {
  on: () => void;
  off: () => void;
  toggle: () => void;
};
