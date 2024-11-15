import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        contrasena: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, contrasena } = credentials!;
        const res = await fetch(`http://localhost:3010/usuarios/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, contrasena }),
        });
        const user = await res.json();

        if (res.ok && user) {
          // Aquí estamos regresando el usuario y token
          return {
            id: user.usuario.id,
            name: user.usuario.nombre,
            email: user.usuario.email,
            telefono: user.usuario.telefono,
            rol: user.usuario.rol,
            accessToken: user.token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.rol = user.rol;
        token.accessToken = user.accessToken;
      }
      console.log('Token en jwt:', token);
      return token;
    },
    
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        telefono: token.telefono,
        rol: token.rol,
        accessToken: token.accessToken,
      };
      console.log('Session data:', session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


/*
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';


export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,      
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: 'Email', type: 'text' },
        contrasena: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, contrasena } = credentials!;
        const res = await fetch(`http://localhost:3010/usuarios/login`, // url para el post del inicio sesion con credenciales
         // const res = await fetch(`http://localhost:3010/auth/google-login`, url q debo usar para el post del inicio de sesion de google, donde la pongo?
         {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, contrasena }),
        });

        const user = await res.json();

        if (res.ok && user) {
          console.log('USER EN AUTHORIZE: ' + user.usuario.nombre);
          return user; 
        }
        return null;
      },
    }),
  ],
  debug: true,   // Habilitar depuración para obtener más detalles de google
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("Google User:", user); // Ver los detalles del usuario devuelto por Google
        token.id = user.id || user.sub   // Ahora TypeScript sabe que 'user' tiene 'id' o 'sub'
      }
      return token;
    },
    async session({ session, token }) {
      console.log("token.id:", token.id )
      // Aseguramos que `token.id` tiene el tipo adecuado
      session.user.id = token.id as string; // Aserción de tipo
      return session;
    }
  },*/
  
  /* funcionaba con el inicio de sesion con credenciales
  
  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.usuario.id,
          email: user.usuario.email,
          name: user.usuario.nombre,
          telefono: user.usuario.telefono,
          rol: user.usuario.rol,
        };
        token.accessToken = user.token;

      }
      console.log('token en jwt:', token);
      return token;
    },


    async session({ session, token }) {
      if (token && token.user && token.user.id && token.user.email && token.user.name && token.user.telefono && token.user.rol && token.accessToken) {
        session.user = {
          ...session.user,
          id: token.user.id,
          email: token.user.email,
          name: token.user.name,
          telefono: token.user.telefono,
          rol: token.user.rol,
          accessToken: token.accessToken

        };
      } else {
        // Manejar el caso donde algunos valores son undefined
        console.error("Algunas propiedades de token o user son undefined");
      }
      
      console.log('session data:', session);
      return session;
    } 
      },
    */

  /*
  secret: process.env.NEXTAUTH_SECRET,
  session: {

    strategy: 'jwt',

  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
*/