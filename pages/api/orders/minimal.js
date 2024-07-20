import { moogoseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await moogoseConnect();
      const minimalOrders = await Order.find({}, null, {
        sort: { _id: -1 },
      }).select("_id name paid line_items createdAt updatedAt");
      return res.status(200).json(minimalOrders);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Metodo ${req.method} No permitido`);
  }
}
