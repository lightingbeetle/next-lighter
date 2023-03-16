import { type DefaultSession } from "next-auth";
import { type GithubProfile } from "next-auth/providers/github";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Profile extends GithubProfile {}
}
