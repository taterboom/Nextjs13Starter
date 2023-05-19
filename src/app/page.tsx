import Link from "next/link"
import { Button } from "./components/Button"
import { getServerSession } from "@/utils/nextauth"

export default async function Home({}) {
  const data = await getServerSession()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl">Next.js 13 + NextAuth Starter</h1>
      <section className="mt-16">
        {data ? (
          <Link href="/me">
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
