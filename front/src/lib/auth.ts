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
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user?: User| AdapterUser; account?: Account | null }) {
      console.log('Datos proporcionados por Google:', user);
    
      if (user) {
        // Actualizamos los datos básicos en el token
        token.id = user.id || token.id;
        token.name = user.name || token.name;
        token.email = user.email || token.email;
        token.rol = user.rol || token.rol;
        token.telefono = user.telefono || null;
        token.picture = user.image || null;
    
        // Lógica adicional si el usuario inició sesión con Google
        if (account?.provider === "google") {
          try {
            // Preparar datos para enviar al backend
            const googleUserData = {
              nombre: user.name || "",
              email: user.email || "",
              telefono: null, // Opcional
              edad: null, // Opcional
              contrasena: "", // No se usa con Google
              confirmarContrasena: "", // No se usa con Google
              imagen: user.image || null,
            };
    
            // Enviar datos al backend
            const response = await fetch(`${apiUrl}/auth/google-login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(googleUserData),
            });
    
            // Manejar respuesta del backend
            const googleUser = await response.json();
            if (response.ok && googleUser) {
              console.log("Usuario sincronizado con backend:", googleUser);
    
              // Actualizar el token con datos del backend
              token.id = googleUser.usuario.id;
              token.rol = googleUser.usuario.rol;
              token.accessToken = googleUser.accessToken; // Si se retorna un token desde el backend
            } else {
              console.error("Error del backend al sincronizar:", googleUser.message);
            }
          } catch (error) {
            console.error("Error enviando datos al backend:", error);
          }
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
        image: token.picture!,
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