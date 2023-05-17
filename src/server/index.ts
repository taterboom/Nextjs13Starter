import { prismaClient } from "@/utils/prisma"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { publicProcedure, router } from "./trpc"

export const appRouter = router({
  getUser: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const users = await prismaClient.user.findUnique({
      where: {
        id: input.id,
      },
    })
    return users
  }),
  getCurrentUser: publicProcedure.query(async ({ input, ctx }) => {
    const userId = ctx.user?.id
    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      })
    }
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    })
    return user
  }),
  updateUser: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user?.id
      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        })
      }
      const user = await prismaClient.user.update({
        where: {
          id: userId,
        },
        data: {
          name: input.name,
        },
      })
      return user
    }),
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
