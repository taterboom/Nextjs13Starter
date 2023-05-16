"use client"

import { trpc } from "@/utils/trpc"
import useSWR from "swr"
import { TextInfo } from "./components/TextInfo"

export default function Profile() {
  const { data, mutate, isLoading } = useSWR("currentUser", () => trpc.getCurrentUser.query())
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
            <div>Name: </div>
            <TextInfo
              editable
              value={data?.name!}
              onSubmit={(text) => {
                trpc.updateUser.mutate({ name: text })
                mutate({ ...data!, name: text })
              }}
            />
          </section>
          <section className="flex items-center gap-4 w-64">
            <div>Email: </div>
            <TextInfo value={data?.email!} />
          </section>
        </>
      )}
    </div>
  )
}
