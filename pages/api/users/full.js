import { moogoseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import messages from "@/utils/messages";
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
        return res.status(500).json({ message: messages.error.default, error });
      }
    }
  }

  //Editar usuario
  if (method === "PUT") {
    try {
      await moogoseConnect();
      const { fullname, password, email, avatar, role, _id } = req.body;

      if (!_id || _id.trim() === "") {
        return res.status(400).json({ message: messages.error.idNotValid });
      }

      const updateData = await User.updateOne(
        { _id },
        {
          fullname,
          password,
          email,
          avatar,
          role,
        }
      );
      return res.status(200).json({
        updateData,
        message: messages.success.userModifiedSuccessfully,
      });
    } catch (err) {
      return res.status(500).json({
        message: messages.error.errorUpdatedUser,
        err: err.message,
      });
    }
  }

  //Eliminar usuarios
  if (method === "DELETE") {
    try {
      await moogoseConnect();
      const { _id } = req.query;
      await User.deleteOne({ _id });
      return res.status(200).json("ok");
    } catch (error) {
      return res.status(500).json({ message: messages.error.default, error });
    }
  }
}
