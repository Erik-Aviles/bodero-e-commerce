import { moogoseConnect } from "@/lib/mongoose";
import { Debts } from "@/models/Debts";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await moogoseConnect();
      const sizeDebts = await Debts.countDocuments();
      return res.status(200).json(sizeDebts);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Metodo ${req.method} No permitido`);
  }
}
