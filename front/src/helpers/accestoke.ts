"use cliente"
import { useSession } from "next-auth/react";


export const  Token = ( )=> {
const { data: session } = useSession();
const token = session?.user?.accessToken;
console.log("token fehtch:", token)
  return token
}
