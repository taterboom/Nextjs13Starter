import { getRequestUser } from "@/utils/jwt"
import { initTRPC } from "@trpc/server"
import { CreateNextContextOptions } from "@trpc/server/adapters/next"

export type UserToken = {
  id: string
  [x: string]: any
}

export const createContext = async (opts: CreateNextContextOptions) => {
  const token = await getRequestUser(opts.req)

  return {
    user: token as UserToken | null,
  }
}

const t = initTRPC.context<typeof createContext>().create()

export const router = t.router
export const publicProcedure = t.procedure
