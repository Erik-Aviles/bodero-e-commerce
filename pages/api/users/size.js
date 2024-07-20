import { moogoseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import messages from "@/utils/messages";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await moogoseConnect();
    try {
      const sizeUsers = await User.countDocuments();
      return res.status(200).json(sizeUsers);
    } catch (error) {
      return res.status(500).json({ message: messages.error.default, error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Metodo ${req.method} No permitido`);
  }
}
