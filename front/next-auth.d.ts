// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id?: string;
    sub?: string;  // Google puede usar 'sub' en lugar de 'id'
   /* email: string;
    name: string;
    telefono?: string;
    picture?: string;
    rol?: string;
    token?: string;*/
  }

  interface Session {
    user: User 
    /*{
      sub?:string;
      id?: string;
      email?: string;
      name?: string;
      telefono?: string;
      picture?: string;
      rol?: string;
      accessToken: string | unknow;
    }*/
}

//  las q funcionaban en el inicio de sesion con credenciales:

 

  /*interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      telefono?: string;
      rol: string;
      accessToken: string;
    };
  }


declare module 'next-auth/jwt' {
  interface JWT {
    user:   {
      id: string;
      email: string;
      nombre: string;
      telefono?: string;
      rol: string;
    }
    accessToken?: string;
  }
} 
*/  }