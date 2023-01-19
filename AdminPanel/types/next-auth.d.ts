import NextAuth, { DefaultSession } from "next-auth/next";
import { User } from "../src/pages/api/backendTypes";

declare module "next-auth" {
  interface Session {
    user: User;
    accessToken: string;
    refreshToken: string;
  }
}
