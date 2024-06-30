import { moogoseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import messages from "@/utils/messages";
import bcrypt from "bcryptjs";
// import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;

  //Obtener usuarios
  if (method === "GET") {
    if (req.query?.id) {
      await moogoseConnect();
      return res.status(200).json(await User.findOne({ _id: req.query.id }));
    } else {
      try {
        await moogoseConnect();
        const users = await User.find({}, null, { sort: { _id: -1 } });
        return res.status(200).json(users);
      } catch (error) {
        return res
          .status(500)
          .json({ message: messages.error.default, error: error.message });
      }
    }
  }

  //Editar
  if (method === "PUT") {
    try {
      await moogoseConnect();
      const { fullname, email, avatar, role, _id } = req.body;

      if (!_id || _id.trim() === "") {
        return res.status(400).json({ message: messages.error.idNotValid });
      }

      const updateData = {
        fullname,
        email,
        avatar,
        role,
      };

      await User.updateOne({ _id }, updateData);
      return res.status(200).json({
        message: messages.success.updateSuccessfully,
      });
    } catch (err) {
      return res.status(500).json({
        message: messages.error.errorUpdatedUser,
        err: err.message,
      });
    }
  }

  //Eliminar
  if (method === "DELETE") {
    try {
      await moogoseConnect();
      const { _id } = req.query;
      await User.deleteOne({ _id });
      return res.status(200).json("ok");
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }
}
