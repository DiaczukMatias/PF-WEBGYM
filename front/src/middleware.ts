import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: NextRequest) {
    // Este middleware actualmente no restringe ninguna ruta.
    // Puedes agregar aquí lógica adicional en el futuro para proteger rutas según roles o autenticación.
    
    // Ejemplo: acceso completo a todas las rutas
    return NextResponse.next();
    console.log(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Permitir acceso a todos los usuarios autenticados
        return !!token;
      },
    },
  }
);

// Exportar configuración opcional de rutas protegidas, si se requiere en el futuro
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

/*import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { RolEnum } from "./interfaces/IUser";
//no use withAuth ya que la redireccion por defecto es a otro link, no al nuestro

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  console.log(' TOKEN EN MIDDLEWARE'+token?.user?.rol);// ='cliente'
  
  if (!token) {

    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const url = req.nextUrl.pathname;
  const { rol } = token?.user;

  if (url.startsWith('/admin')) {
    if (rol !== RolEnum.ADMIN) {
      return NextResponse.redirect(new URL('/unauthorized', req.url)); // O la ruta de tu elección
    }
  }
  if (url.startsWith('/profesores')) {
    if (rol !== RolEnum.ADMIN && rol !== RolEnum.PROFESOR) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }
  
  return NextResponse.next();
}

//rutas protegidas
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/agenda/:path*",
    "/subscription/:path*",
    "/clases/:path*",
    "/admin/:path*",
    "/profesores/:path*"
    // Agrega aquí más rutas que desees proteger
  ],
};
*/