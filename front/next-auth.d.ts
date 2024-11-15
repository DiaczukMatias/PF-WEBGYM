import NextAuth from 'next-auth'; //no quitar sino rompe algo en route
import { JWT } from 'next-auth/jwt';//no quitar sino rompe algo en route

declare module 'next-auth' {
  interface User {

    id: string;
    email: string;
    name: string;
    telefono?: string;
    rol: string;
    accessToken?: string;
    edad?:string;
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string;
    telefono?: string;
    rol: string;
    accessToken?: string;
  }
}
