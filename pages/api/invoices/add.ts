import mongoose from "mongoose";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { connectDB } from "../../../lib/database/connect";
import Invoice from "../../../lib/database/InvoiceSchema";
const addHandler: NextApiHandler = async (req, res) => {
  try {
    // verify session
    const session = await getSession({ req });

    if (!session?.user?.email) throw new Error("Unauthorized");

    const { invoice } = JSON.parse(req.body);

    if (!invoice) {
      throw new Error("Invalid body");
    }

    await connectDB();

    switch (req.method) {
      case "POST":
        const id = invoice.id;
        delete invoice.id;
        const mapped = { ...invoice, invoiceId: id, email: session.user.email };

        const newInvoice = new Invoice(mapped);

        await newInvoice.save();

        res.status(200).json({});
        break;
      default:
        throw new Error();
        break;
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }

  await mongoose.disconnect();
};

export default addHandler;
