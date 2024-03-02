import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  /*  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user;
      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  }, */
  pages: {
    signIn: "/auth/signin",
  },
};
export default NextAuth(authOptions);
