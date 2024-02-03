// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { checkLogin } from "../../userauths/authentication";
// import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          return checkLogin(email, password);
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],

  callbacks: {
    async jwt(data) {
      return { ...data.token, ...data.user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },

    async signIn(abc) {
      console.log(abc);
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/nextauth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
