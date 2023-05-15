import { NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"

export type UserToken = {
  id: string
  [x: string]: any
}

export async function getRequestUser(req: NextApiRequest) {
  const token = (await getToken({ req: req })) as UserToken | null

  return token
}
