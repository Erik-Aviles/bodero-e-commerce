import { moogoseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await moogoseConnect();
      const users = await User.find();
      const sizeUsers = users?.length;
      return res.status(200).json(sizeUsers);
    } catch (error) {
      return res.status(500).json({ message: messages.error.default, error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Metodo ${req.method} No permitido`);
  }
}
