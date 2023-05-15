import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

prisma.user
  .findMany({ include: { posts: true } })
  .then((data) => console.dir(data, { depth: null }))
// prisma.post
//   .create({
//     data: {
//       title: "Prisma makes databases easy",
//       content: "?",
//       authorId: 1,
//     },
//   })
//   .then(console.dir)
