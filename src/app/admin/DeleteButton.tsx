"use client"

import { trpc } from "@/utils/trpc"
import { User } from "next-auth"

export function DeleteButton(props: { data: User }) {
  return (
    <button
      onClick={() => {
        // new PrismaClient().user.delete({where: {id: props.data.id}})
        trpc.deleteUser.mutate({ id: props.data.id }).then((res) => {
          alert(res.name + " deleted")
          location.reload()
        })
      }}
    >
      delete
    </button>
  )
}
