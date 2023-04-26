import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextApiResponse,NextApiRequest } from "next";

export async function GET() {
  const session = await getServerSession(authOptions)
 
  if (session) 
    return new Response(JSON.stringify(session));
  else 
    return new Response('Sign in Please');
  
}


