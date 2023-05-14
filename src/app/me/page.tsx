"use client"
import { useSession } from "next-auth/react"

export default function User() {
  const { data } = useSession()
  return <div>{!!data && <code>{JSON.stringify(data)}</code>}</div>
}
