import { moogoseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/Customer";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await moogoseConnect();
      const customers = await Customer.find();
      const sizeCustomers = customers?.length;
      return res.status(200).json(sizeCustomers);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Metodo ${req.method} No permitido`);
  }
}
