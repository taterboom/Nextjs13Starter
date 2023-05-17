"use client"

import { signOut, useSession } from "next-auth/react"
import { Button } from "../components/Button"

export default function App() {
  const { data } = useSession()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-2xl">
      <section className="flex items-center gap-4 w-64">
        <img src={data?.user.image!} alt="" className="w-20 h-20 rounded shadow" />
      </section>
      <section className="flex items-center gap-4 w-64">
        <div>ID: </div>
        <div>{data?.user.id}</div>
      </section>
      <section className="flex items-center gap-4 w-64">
        <div>Name: </div>
        <div>{data?.user.name}</div>
      </section>
      <section className="flex items-center gap-4 w-64">
        <div>Email: </div>
        <div>{data?.user.email}</div>
      </section>
      <section className="w-64">
        <Button className="text-lg" onClick={() => signOut()}>
          Sign Out
        </Button>
      </section>
    </div>
  )
}
