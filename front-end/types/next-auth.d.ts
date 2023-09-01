import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      user_id: string;
      email?: string;
      name?: string;

      day_of_birth?: Date;
      verify?: number;
      role?: string;
    };
  }
}
