/* import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function (req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    res.send({
      content: "Estas dentro de un contenido protegido.",
    });
  } else {
    res.send({
      error: "Debes iniciar sesión para ver el contenido protegido.",
    });
  }
}
 */
