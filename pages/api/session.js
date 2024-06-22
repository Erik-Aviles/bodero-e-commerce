import { verify } from "jsonwebtoken";
import messages from "@/utils/messages";

export default async function handle(req, res) {
  const { myTokenName } = req.cookies;
  if (!myTokenName) {
    return res.status(401).json({
      message: messages.error.notToken,
    });
  }
  try {
    const userToken = verify(myTokenName, process.env.SECRET);

    return res.status(200).json({
      session: userToken,
      message: messages.success.authorized,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ message: messages.error.tokenNotValid, error });
  }
}
