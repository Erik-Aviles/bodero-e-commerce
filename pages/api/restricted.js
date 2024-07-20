import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  try {
    const { status } = await getServerSession(req, res, authOptions);
    console.log(status);

    if (session) {
      res.status(200).send({
        content: "Estas dentro de un contenido protegido.",
      });
    } else {
      res.status(401).send({
        error: "Debes iniciar sesión para ver el contenido protegido.",
      });
    }
  } catch (error) {
    console.error("Error obteniendo la sesión:", error);
    res.status(500).send({
      error: "Hubo un problema en el servidor. Inténtalo de nuevo más tarde.",
    });
  }
}
