import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

const useSecureCookies = process.env.NEXTAUTH_URL!.startsWith("https://")
const cookiePrefix = useSecureCookies ? "__Secure-" : ""
const hostName = new URL(process.env.NEXTAUTH_URL!).hostname

export const authOptions: AuthOptions = {
  debug: process.env.NODE_ENV === "development",
  // https://next-auth.js.org/configuration/providers/oauth
  adapter: PrismaAdapter(new PrismaClient()),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        // sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain: hostName,
      },
    },
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, user, token }) {
      console.log("session callback: ", session, user, token)
      return { ...session, user: { ...session.user, ...user, ...token } }
    },
    async jwt({ token, user, ...rest }) {
      console.log("jwt callback: ", token, user, rest)
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
