// src/types/next-auth.d.ts
import NextAuth from "next-auth";

interface AppUser {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}

declare module "next-auth" {
  interface Session {
    user: AppUser & NextAuth.DefaultSession["user"];
  }
  interface User extends AppUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
