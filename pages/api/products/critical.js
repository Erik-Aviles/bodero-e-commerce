import { moogoseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await moogoseConnect();
      const stockCritical = await Product.find(
        { quantity: { $lte: 2 } },
        null,
        { sort: { _id: -1 } }
      ).select(
        "_id title quantity brand code codeEnterprise codeWeb lastquantity quantityUpdated lastquantityUpdated"
      );
      return res.status(200).json(stockCritical);
    } catch (error) {
      return res.status(500).json({
        message: "Ocurrió un error al obtener los productos.",
        error: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
