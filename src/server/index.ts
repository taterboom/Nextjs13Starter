import { prismaClient } from "@/utils/prisma"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { publicProcedure, router } from "./trpc"

export const appRouter = router({
  users: publicProcedure.query(async () => {
    const users = await prismaClient.user.findMany()
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
  deleteUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const toBeDeletedUserId = input.id
      const userId = ctx.user?.id
      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        })
      }
      // TODO check admin
      const user = await prismaClient.user.findUnique({
        where: {
          id: toBeDeletedUserId,
        },
      })
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
        })
      }
      const deletedUser = await prismaClient.user.delete({
        where: {
          id: toBeDeletedUserId,
        },
      })
      return deletedUser
    }),
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
