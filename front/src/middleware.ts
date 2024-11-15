import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Permitir acceso sin restricciones
  ;
  
  return NextResponse.next();
}

// Exporta la configuración de matcher si es necesario, aunque puedes omitirla para permitir acceso completo
export const config = {};


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