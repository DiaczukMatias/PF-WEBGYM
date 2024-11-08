//extiende los types de nextAuth

import { DefaultSession, DefaultJWT } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string;
      email?: string;
      name?: string;
      image?: string;
      accessToken?: string | null;
    } & DefaultSession['user'];
  }

  interface JWT extends DefaultJWT {
    user?: {
      id?: string;
      email?: string;
      name?: string;
      image?: string ;
    };
    accessToken?: string | null;
  }
}
