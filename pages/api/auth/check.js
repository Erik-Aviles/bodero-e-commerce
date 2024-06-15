import { moogoseConnect } from "@/lib/mongoose";
import messages from "@/utils/messages";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";

export default async function handle(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
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

        const { data } = isTokenValid;

        await moogoseConnect();
        const userFind = await User.findById(data._id);

        // validar si existe el usuario en la base de datos
        if (!userFind) {
          return res.status(400).json({
            message: messages.error.userNotFound,
          });
        }

        return res.status(200).json({
          isAuthorized: true,
          message: messages.success.authorized,
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

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Método ${method}, no permitido`);
}
