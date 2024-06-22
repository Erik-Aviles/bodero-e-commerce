import { moogoseConnect } from "@/lib/mongoose";
import messages from "@/utils/messages";
import { serialize } from "cookie";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handle(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      await moogoseConnect();
      const body = await req.body;
      const { email, password } = body;

      //validar que esten todos los campos
      if (!email || !password) {
        return res.status(400).json({
          message: messages.error.needProps,
        });
      }

      const userFind = await User.findOne({ email });

      // validar si existe el email en la base de datos
      if (!userFind) {
        return res.status(401).json({
          message: messages.error.userNotFound,
        });
      }

      const isCorrect = await bcrypt.compare(password, userFind.password);

      // validar que la consetraña sea la correcta
      if (!isCorrect) {
        return res.status(401).json({
          message: messages.error.incorrectPassword,
        });
      }

      if (userFind.role === "admin") {
        const { password: userPass, ...rest } = userFind._doc;
        //Genera un token de usuario(inicio de sesión)
        const token = jwt.sign(
          {
            data: rest,
          },
          process.env.SECRET,
          {
            expiresIn: 86400,
          }
        );
        const serialized = serialize("myTokenName", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 86400,
          path: "/",
        });

        res.setHeader("Set-Cookie", serialized);
        return res.status(200).json({
          userLogged: rest,
          message: messages.success.userLogged,
        });
      } else {
        return res.status(401).json({
          message: messages.error.notAuthorized,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: messages.error.default, error });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Método ${method}, no permitido`);
}
