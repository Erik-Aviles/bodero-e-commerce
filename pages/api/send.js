import { EmailTemplate } from "@/components/EmailTemplate";
import { moogoseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handle(req, res) {
  await moogoseConnect();
  const body = await req.body;
  const { email } = body;

  const userFind = await User.findOne({ email });

  const { data, error } = await resend.emails.send({
    from: process.env.SECRET_EMAIL,
    to: "boderoracing2016@gmail.com",
    subject: "AVISO! Inicio de session",
    react: EmailTemplate({ email, name: userFind?.fullname }),
  });

  if (error) {
    return res.status(400).json(error);
  }

  return res.status(200).json(data);
}
