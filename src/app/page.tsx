import { authOptions } from "./api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import Link from "next/link"

export default async function Home({}) {
  const data = await getServerSession(authOptions)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {data ? <Link href="/me">Me</Link> : <Link href="/api/auth/signin"></Link>}
    </main>
  )
}
