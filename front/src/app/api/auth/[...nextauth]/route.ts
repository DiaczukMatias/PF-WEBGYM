import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
//import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    // Proveedor de Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    /* Proveedor de Facebook
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),*/

    // Proveedor de autenticación clásica con email y password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Aquí debes implementar tu lógica de validación
        const { email, password } = credentials!;
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {

        token.accessToken = account.access_token === "string" ? account.access_token: undefined;
      }
      if (user) {
        token.user = typeof user === "string" ? user: undefined;

      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,

          token: typeof token.user === "string" ? token.user : "", // Asegura que los datos del usuario se pasen a la sesión
          accessToken: typeof token.accessToken === "string" ? token.accesToken: undefined,
        };
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
