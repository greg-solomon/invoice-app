import { format, addDays } from "date-fns";
import { Invoice } from "../../types";

function emptyInvoice(): Invoice {
  return {
    clientAddress: {
      city: "",
      country: "",
      postCode: "",
      street: "",
    },
    clientEmail: "",
    clientName: "",
    createdAt: format(Date.now(), "yyyy-MM-dd"),
    description: "",
    id: "",
    items: [],
    paymentDue: getWeekFromNow(),
    paymentTerms: 7,
    senderAddress: {
      city: "",
      country: "",
      postCode: "",
      street: "",
    },
    status: "draft",
    total: 0,
  };
}

function getWeekFromNow() {
  return format(addDays(new Date(Date.now()), 7), "yyyy-MM-dd");
}
export { emptyInvoice };
