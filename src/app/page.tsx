import { authOptions } from "./api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { Button } from "./Components/Button"

export default async function Home({}) {
  const data = await getServerSession(authOptions)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl">Next 13 + NextAuth Starter</h1>
      <section className="mt-16">
        {data ? (
          <Link href="/profile">
            <Button>{data.user.id}</Button>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <Button>Sign In</Button>
          </Link>
        )}
      </section>
    </main>
  )
}
