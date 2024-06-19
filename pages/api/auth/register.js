import { moogoseConnect } from "@/lib/mongoose";
import isValidEmail from "@/utils/isValidEmail";
import messages from "@/utils/messages";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function handle(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      await moogoseConnect();
      const body = await req.body;
      const { fullname, email, password, confirmPassword, role, avatar } = body;

      //validar que esten todos los campos
      if (!fullname || !email || !password || !confirmPassword) {
        return res.status(400).json({
          message: messages.error.needProps,
        });
      }

      //validar si el email es un email
      if (!isValidEmail(email)) {
        return res.status(400).json({
          message: messages.error.emailNotValid,
        });
      }

      //validar que las contraseñas sean iguales
      if (password !== confirmPassword) {
        return res.status(400).json({
          message: messages.error.passwordNotMatch,
        });
      }

      const userFind = await User.findOne({ email });

      // validar si ya existe el email en la base de datos
      if (userFind) {
        return res.status(400).json({
          message: messages.error.emailExist,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      //crear usuario
      const newUser = new User({
        fullname,
        email,
        password: hashedPassword,
        avatar,
        role,
      });

      //enviar la contraseña encriptada
      const { password: userPass, ...rest } = newUser._doc;

      //guardar usuario
      await newUser.save();

      //crear un token
      const token = jwt.sign(
        {
          data: rest,
        },
        process.env.SECRET,
        {
          expiresIn: 86400,
        }
      );

      const response = res.status(200).json({
        newUser: rest,
        message: messages.success.userCreated,
      });

      response.cookies.set("auth_cookie", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400,
        path: "/",
      });

      return response;
    } catch (error) {
      return res.status(500).json({ message: messages.error.default, error });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Método ${method}, no permitido`);
}
