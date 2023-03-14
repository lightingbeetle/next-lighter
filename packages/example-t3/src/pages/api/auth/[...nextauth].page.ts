import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Octokit } from "@octokit/core";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

const octokit = new Octokit({
  auth: env.GITHUB_ORG_TOKEN,
});

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ profile }) {
      // we need login name to check if user is member of organisation
      // https://docs.github.com/en/rest/orgs/members#check-organization-membership-for-a-user
      if (!profile?.login) {
        console.error("No login login information");
        return false;
      }

      let isUserOrganisationMember = false;
      try {
        // FIXME thi
        const response = await octokit.request(
          "GET /orgs/{org}/members/{username}",
          {
            org: "lightingbeetle",
            username: profile.login,
          }
        );
        // @ts-expect-error status type is 302 for some reason, but 204 is correct status to check
        isUserOrganisationMember = response.status === 204;
      } catch (e) {
        if (e instanceof Error) {
          console.error(`${e.message} (username: ${profile.login})`);
        }
      }

      return isUserOrganisationMember;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
