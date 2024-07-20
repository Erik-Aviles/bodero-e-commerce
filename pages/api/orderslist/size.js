import { moogoseConnect } from "@/lib/mongoose";
import { OrdersList } from "@/models/OrdersList";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await moogoseConnect();
      const sizeOrdersList = await OrdersList.countDocuments();
      return res.status(200).json(sizeOrdersList);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Metodo ${req.method} No permitido`);
  }
}
