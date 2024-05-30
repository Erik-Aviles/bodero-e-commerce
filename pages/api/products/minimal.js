import { moogoseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await moogoseConnect();
      const minimalProducts = await Product.find().select(
        "_id quantity quantityUpdated"
      );
      return res.status(200).json(minimalProducts);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Metodo ${req.method} No permitido`);
  }
}
