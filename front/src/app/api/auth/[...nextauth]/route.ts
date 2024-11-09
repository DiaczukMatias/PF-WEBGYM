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
          console.log('USER EN AUTHORIZE: ' + user.usuario.nombre);
          return user; 
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.usuario.id,
          email: user.usuario.email,
          name: user.usuario.nombre,
          rol: user.usuario.rol,
        };
        token.accessToken = user.token;
      }
      console.log('token en jwt:', token);
      return token;
    },
    async session({ session, token }) {
      if (token && token.user && token.user.id && token.user.email && token.user.name && token.user.rol && token.accessToken) {
        session.user = {
          ...session.user,
          id: token.user.id,
          email: token.user.email,
          name: token.user.name,
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
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
