import { moogoseConnect } from "@/lib/mongoose";
import messages from "@/utils/messages";
import { User } from "@/models/User";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handle(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const body = await req.body;
      const { email } = body;

      await moogoseConnect();
      const userFind = await User.findOne({ email });

      // validar si existe el email en la base de datos
      if (!userFind) {
        return res.status(400).json({
          message: messages.error.userNotFound,
        });
      }

      const tokenData = { email: userFind.email, userId: userFind._id };

      const token = jwt.sign(
        {
          data: tokenData,
        },
        process.env.SECRET,
        {
          expiresIn: 86400,
        }
      );

      const forgetUrl = `${process.env.NEXT_PUBLIC_URL}/cambiar-contrasena?token=${token}`;

      //@ts-ignore
      await resend.emails.send({
        from: process.env.SECRET_EMAIL,
        to: email,
        subject: "Cambio de contraseña",
        react: EmailTemplate({ buttonUrl: forgetUrl }),
      });

      return res.status(200).json({
        message: messages.success.emailSend,
      });
    } catch (error) {
      return res.status(500).json({ message: messages.error.default, error });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Método ${method}, no permitido`);
}
