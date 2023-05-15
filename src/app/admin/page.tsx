import { prismaClient } from "@/utils/prisma"
import { User } from "next-auth"
import { DeleteButton } from "./DeleteButton"

function Item(props: { data: User }) {
  return (
    <div className="flex gap-4">
      <div>{props.data.name}</div>
      <DeleteButton data={props.data} />
    </div>
  )
}

export default async function App() {
  const users = await prismaClient.user.findMany()
  return (
    <div>
      {users.map((user) => (
        <Item key={user.id} data={user} />
      ))}
    </div>
  )
}
