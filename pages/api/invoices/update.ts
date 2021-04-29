import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { connectDB } from "../../../lib/database/connect";
import Invoice from "../../../lib/database/InvoiceSchema";

const updateHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (!session?.user?.email) throw new Error();
  await connectDB();
  switch (req.method) {
    case "POST":
      const { invoice } = JSON.parse(req.body);
      const invoiceId = invoice.id;
      delete invoice.id;
      const mapped = { ...invoice, invoiceId, email: session.user.email };
      await Invoice.findOneAndUpdate({ invoiceId }, { ...mapped });
      res.status(200).json({});
      break;
    default:
      res.status(400).json({ message: "Invalid body" });
      break;
  }
};

export default updateHandler;
