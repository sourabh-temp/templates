import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const adminToken = cookies.get('authToken')?.value; // Separate admin token
  const userToken = cookies.get('userToken')?.value; // Separate user token
  const url = request.nextUrl;

  // Admin Routes Protection
  if (url.pathname.startsWith('/admin')) {
    if (!adminToken) {
      if (url.pathname !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } else {
      if (url.pathname === '/admin/login') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }

  // User Routes Protection (Example: /dashboard)
  if (url.pathname.startsWith('/dashboard')) {
    if (!userToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // API Routes Protection (Admin)
  if (url.pathname.startsWith('/api/admin')) {
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // API Routes Protection (User)
  if (url.pathname.startsWith('/api/user')) {
    if (!userToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect logged-in admin from signin/signup
  if (adminToken && (url.pathname.startsWith('/admin/signin') || url.pathname.startsWith('/admin/signup'))) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Redirect logged-in user from login/signup
  if (userToken && (url.pathname.startsWith('/signin') || url.pathname.startsWith('/signup') || url.pathname.startsWith('/login'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/api/admin/:path*',
    '/api/user/:path*',
    '/signin',
    '/signup',
    '/admin/signin',
    '/admin/signup',
    '/login',
  ],
};