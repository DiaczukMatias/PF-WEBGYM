import { Account, AuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from "next-auth/jwt";
import { AdapterUser } from 'next-auth/adapters';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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
        const res = await fetch(`${apiUrl}/usuarios/login`, {
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
            membresia: user.usuario.membresia,
            inscripciones: user.usuario.inscripciones,
            picture: user.usuario.imagen
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user?: User | AdapterUser; account?: Account | null }) {
      // Si hay un usuario, actualiza el token con los datos correspondientes
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.rol = user.rol;
        token.telefono = user.telefono || null;
        token.image = user.picture || user.imagen || null;
        token.accessToken = user.accessToken;
        token.membresia = user.membresia || null;
        token.inscripciones = user.inscripciones || null;
    
    
        // Si el flujo proviene de Google
        if (account?.provider === 'google') {
          
    
          try {
            const googleUserData = {
              id: "", // Garantiza que sea string o un valor por defecto
              nombre: user.name || "",
              email: user.email || "",
              telefono: null,
              edad: null,
              contrasena: "",
              confirmarContrasena: "",
              imagen: user.image || null,
            };
            
            const response = await fetch(`${apiUrl}/auth/google-login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(googleUserData),
            });
    
            const googleUser = await response.json();
    
            if (response.ok && googleUser) {
              token.id = googleUser.usuario.id;
              token.rol = googleUser.usuario.rol;
              token.accessToken = googleUser.token;
            } else {
              console.error("Error del backend al sincronizar:", googleUser.message);
            }
          } catch (error) {
            console.error("Error enviando datos al backend:", error);
          }
        } else {
          // Log específico para credenciales
        }
      }
      
      return token;
    }
    
    ,
  
    async session({ session, token }) {
      // Aquí estamos pasando todos los datos del token a la sesión
      session.user = {
        id: token.id!,
        name: token.name!,
        email: token.email!,
        telefono: token.telefono!,
        rol: token.rol!,
        accessToken: token.accessToken!,
        image: token.image!,
        membresia: token.membresia,
        inscripciones: token.inscripciones,

      };
      return session;
    },
  }
  
  ,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};