import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import { moogoseConnect } from "@/lib/mongoose";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          await moogoseConnect();
          if (!credentials.email || !credentials.password) {
            throw new Error("Por favor ingrese un correo y una contraseña");
          }
          const userFind = await User.findOne({ email: credentials.email });
          if (!userFind) {
            throw new Error("Usuario no registrado");
          }
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            userFind.password
          );
          if (!passwordMatch) {
            throw new Error("Contraseña incorrecta");
          }
          return userFind;
        } catch (error) {
          console.error("Error en el proceso de autenticación:", error);
          throw new Error("Error en el servidor. Intente más tarde.");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account.provider === "credentials") {
        return true;
      }
    },
    jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        token.user = session.user;
      }

      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 60 * 60 * 10 },
  jwt: { secret: process.env.NEXTAUTH_SECRET, maxAge: 60 * 60 * 10 },
  debug: process.env.NODE_ENV !== "production",
  pages: {
    signIn: "/auth/login",
  },
};
export default NextAuth(authOptions);
