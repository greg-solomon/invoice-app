import mongoose from "mongoose";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { connectDB } from "../../../lib/database/connect";
import Invoice from "../../../lib/database/InvoiceSchema";

const deleteHandler: NextApiHandler = async (req, res) => {
  // verify session
  const session = await getSession({ req });

  if (!session?.user?.email) throw new Error("Unauthorized");

  const { id } = JSON.parse(req.body);

  if (!id) {
    throw new Error("Invalid body");
  }
  try {
    await connectDB();

    switch (req.method) {
      case "POST":
        await Invoice.findOneAndDelete({ invoiceId: id });
        res.status(200).json({ message: "Deleted Successfully" });
        break;
      default:
        res.status(400).json({ message: "Invalid request" });
        break;
    }
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
  await mongoose.disconnect();
};

export default deleteHandler;
