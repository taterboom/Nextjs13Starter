import { getServerSession } from "@/utils/nextauth"
import Profile from "./components/Profile"
import { redirect } from "next/navigation"

export default async function App() {
  //   const data = await getServerSession()
  //   if (!data) redirect("/api/auth/signin")
  return <Profile />
}
