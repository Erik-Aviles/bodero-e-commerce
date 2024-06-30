import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongobd";
import { moogoseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credencials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email && !credentials.password) {
          throw new Error("Por favor ingrese un correo y una contraseña");
        }
        await moogoseConnect();

        const userFind = await User.findOne({ email: credentials.email });

        if (!userFind) {
          throw new Error("Usuario no registrado");
        }
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          userFind.password
        );

        if (!passwordMatch) {
          throw new Error("Contraseña incorrectta");
        }

        return userFind;
      },
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    jwt({ token, user, profile, session }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token, user }) {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/login",
  },
};
export default NextAuth(authOptions);
