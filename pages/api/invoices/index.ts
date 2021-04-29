import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import mongoose from "mongoose";
import Invoice from "../../../lib/database/InvoiceSchema";
import { connectDB } from "../../../lib/database/connect";

const fetchInvoiceHandler: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });

    if (!session) throw new Error();
    await connectDB();
    switch (req.method) {
      case "GET":
        const invoices = await Invoice.find({ email: session.user?.email });

        if (!invoices) {
          res.json({ invoices: [] });
        } else {
          const toSend = invoices.map(
            ({ _doc: { invoiceId, email, ...invoice } }) => ({
              id: invoiceId,
              ...invoice,
            })
          );

          res.json({ invoices: toSend });
        }
        break;
      default:
        res.status(400).json({ message: "Error" });
        break;
    }
  } catch (error) {
    res.status(403).json({
      message: "Unauthorized",
    });
  }
  await mongoose.disconnect();
};

export default fetchInvoiceHandler;
