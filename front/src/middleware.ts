// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
//no use withAuth ya que la redireccion por defecto es a otro link, no al nuestro

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {

    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
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
    // Agrega aquí más rutas que desees proteger
  ],
};
