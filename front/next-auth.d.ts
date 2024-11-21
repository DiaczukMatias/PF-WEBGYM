// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'; //no quitar sino rompe algo en route
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    membresia?: IMembresia;
    inscripciones?: IInscripcion[];
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
