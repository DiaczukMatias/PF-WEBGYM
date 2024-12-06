import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Si el usuario está autenticado y quiere entrar al login, redirige a /profile
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  // Si el usuario no está autenticado e intenta acceder a /profile o /admin, redirige a /login
  if (!token && (pathname === '/profile' || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Si el usuario está autenticado pero no es admin y quiere acceder a /admin, redirige a /profile
  if (token && pathname.startsWith('/admin') && token.rol !== 'admin') {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  // Permite el acceso a otras rutas
  return NextResponse.next();
}

// Configuración del matcher para aplicar el middleware solo en rutas específicas
export const config = {
  matcher: ['/login', '/profile', '/admin/:path*'], // Aplica el middleware a todas las rutas bajo /admin
};