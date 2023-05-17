"use client"

import { trpc } from "@/utils/trpc"
import { useParams } from "next/navigation"
import useSWR from "swr"

export default function App() {
  const params = useParams()
  const userId = params!.userId as string
  const { data, isLoading } = useSWR(`getUser${userId}`, () => trpc.getUser.query({ id: userId }))

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-2xl">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <section className="flex items-center gap-4 w-64">
            <img src={data?.image!} alt="" className="w-20 h-20 rounded shadow" />
          </section>
          <section className="flex items-center gap-4 w-64">
            <div>ID: </div>
            <div>{data?.id}</div>
          </section>
          <section className="flex items-center gap-4 w-64">
            <div>Name: </div>
            <div>{data?.name}</div>
          </section>
          <section className="flex items-center gap-4 w-64">
            <div>Email: </div>
            <div>{data?.email}</div>
          </section>
        </>
      )}
    </div>
  )
}
