import { moogoseConnect } from "@/lib/mongoose";
import messages from "@/utils/messages";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function handle(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const body = await req.body;
      const { newPassword, confirmPassword } = body;

      //validar que esten todos los campos
      if (!newPassword || !confirmPassword) {
        return res.status(400).json({
          message: messages.error.needProps,
        });
      }
      await moogoseConnect();

      const headersList = await req.headers;
      const token = headersList["token"];

      // const headersList = headers();
      // const token = headersList.get("token");

      //validar que haya token
      if (!token) {
        return res.status(400).json({
          message: messages.error.notAuthorized,
        });
      }

      try {
        const isTokenValid = jwt.verify(token, process.env.SECRET);

        // @ts-ignore
        const { data } = isTokenValid;

        const userFind = await User.findById(data.userId);

        // validar si existe el usuario en la base de datos
        if (!userFind) {
          return res.status(400).json({
            message: messages.error.userNotFound,
          });
        }

        //validar que las contraseñas sean iguales
        if (newPassword !== confirmPassword) {
          return res.status(400).json({
            message: messages.error.passwordNotMatch,
          });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        //al usuarioo encontradoo se le asigna la nueva contraseña
        userFind.password = hashedPassword;

        // guardar cambios
        await userFind.save();

        return res.status(200).json({
          message: messages.success.passwordChanged,
        });
      } catch (error) {
        return res
          .status(400)
          .json({ message: messages.error.tokenNotValid, error });
      }
    } catch (error) {
      return res.status(500).json({ message: messages.error.default, error });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Método ${method}, no permitido`);
}
