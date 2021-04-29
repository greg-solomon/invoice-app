import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  email: { type: String, required: true },
  invoiceId: { type: String, required: true },
  createdAt: { type: String, required: true },
  paymentDue: { type: String },
  description: { type: String },
  paymentTerms: { type: Number },
  clientName: { type: String },
  clientEmail: { type: String },
  status: { type: String, required: true },
  senderAddress: {
    street: String,
    city: String,
    postCode: String,
    country: String,
  },
  clientAddress: {
    street: String,
    city: String,
    postCode: String,
    country: String,
  },
  items: [{ name: String, quantity: Number, price: Number, total: Number }],
  total: Number,
});

export default mongoose.models.Invoice ||
  mongoose.model("Invoice", InvoiceSchema);
