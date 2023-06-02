import { prismaClient } from "@/utils/prisma"

export async function GET() {
  const data = await prismaClient.user.count()
  return new Response(data.toString(), { status: 200 })
}
