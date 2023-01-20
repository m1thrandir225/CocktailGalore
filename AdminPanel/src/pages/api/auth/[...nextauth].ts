import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          type: "email",
          placeholder: "email",
        },
        password: {
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, _req) {
        const response = await fetch("http://localhost:4000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.username,
            password: credentials?.password,
          }),
        });
        const data = await response.json();
        if (data.user && data.accessToken) {
          const user = {
            ...data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = { ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
};

export default NextAuth(authConfig);
