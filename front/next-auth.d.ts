// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    usuario: {
      id: string;
      email: string;
      nombre: string;
      telefono?: string;
      rol: string;
    };
    token: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      telefono?: string;
      rol: string;
      accessToken: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: {

      id: string;
      email: string;
      name: string;
      telefono?: string;
      rol: string;
    };
    accessToken?: string;
  }
}
