import { moogoseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handle(req, res) {
  await moogoseConnect();
  res.json(await Order.find().sort({ createdAt: -1 }));
}
