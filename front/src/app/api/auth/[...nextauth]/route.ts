import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
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
          //almacenar el token en localStorage
         // localStorage.setItem('access_token', user.token);  // agreado ver si funciona rutas protegidas
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
    async jwt({ token, user, account }) {
      // Si el usuario ha iniciado sesión y es de Google, prepara los datos
      console.log('datos qeu envian desde google ', user);
      
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.rol = user.rol;
        token.accessToken = user.accessToken;
        token.picture = user.image || null
  
        // Si el inicio de sesión es con Google, envía los datos al backend
        if (account?.provider === 'google') {
          try {  
            // Preparar el objeto para enviar al backend con datos opcionales y valores dummy
            const googleUserData = {
              id: token.id, // ID del usuario registrado
              nombre: user?.name || '',
              email: user?.email || '',
              telefono: user?.telefono ? Number(user.telefono) : null, // Enviar un teléfono de prueba
              edad:  user?.edad ? Number(user.edad) :null,         // Enviar una edad de prueba
              contrasena: '', // No enviar contraseña
              confirmarContrasena: '', // No enviar confirmarContraseña
              imagen: token.picture, // Incluir la imagen al enviar al backend

            };
  
            const response = await fetch(`${apiUrl}/auth/google-login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(googleUserData),
            });
  
            const googleUser = await response.json();
            console.log('RESPUESTA DE GOOGLE (JSON):', googleUser);
  
            if (response.ok && googleUser) {
              console.log('Datos enviados al backend:', googleUser);
              token.id = googleUser.usuario.id; // Actualiza el token con datos del backend
              token.rol = googleUser.usuario.rol; // Guarda el rol en el token
              token.accessToken =googleUser.usuario.accesToken  // agregado ver si funciona rutas protegidas
              
            } else {
              console.error('Error del servidor:', googleUser.message);
            }
          } catch (error) {
            console.error('Error enviando datos al backend:', error);
          }
        }
      }
  
      return token;
    },
  
    async session({ session, token }) {
      // Aquí estamos pasando todos los datos del token a la sesión
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        telefono: token.telefono,
        rol: token.rol, // Guardamos el rol aquí
        accessToken: token.accessToken,
        image: token.picture,
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
        const res = await fetch(http://localhost:3010/usuarios/login, // url para el post del inicio sesion con credenciales
         // const res = await fetch(http://localhost:3010/auth/google-login, url q debo usar para el post del inicio de sesion de google, donde la pongo?
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
      // Aseguramos que token.id tiene el tipo adecuado
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