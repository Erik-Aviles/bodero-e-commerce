import { moogoseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import messages from "@/utils/messages";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "PUT") {
    try {
      await moogoseConnect();
      const { _id, lastquantity } = req.body;

      if (!_id || _id.trim() === "") {
        return res.status(400).json({ message: messages.error.idNotValid });
      }
      if (lastquantity < 0) {
        return res
          .status(400)
          .json({ message: messages.error.unsupportedValue });
      }

      const product = await Product.findById(_id);

      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      // Actualizar stock sumando el nuevo lastquantity al stock actual
      product.lastquantity = lastquantity;
      product.quantity = Number(product.quantity) + Number(lastquantity);
      product.lastquantityUpdated = Date.now();

      await product.save();

      return res.status(200).json({ message: messages.success.addedStock });
    } catch (err) {
      return res.status(500).json({
        message: "Error al actualizar el producto",
        err: err.message,
      });
    }
  }

  res.setHeader("Allow", ["PUT"]);
  res.status(405).end(`Method ${method} No permitido`);
}
