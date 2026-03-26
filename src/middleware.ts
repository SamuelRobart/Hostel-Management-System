import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthUser } from './lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/login',
    '/admin-login',
    '/student-login',
    '/warden-login',
    '/student-signup',
    '/api/auth/admin',
    '/api/auth/student',
    '/api/auth/warden',
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/me',
    '/api/students/list',
    '/api/wardens/list',
  ];

  // Check if path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Get auth token
  const token = request.cookies.get('auth_token')?.value;

  // Protected dashboard/panel routes
  if (
    pathname.startsWith('/student') ||
    pathname.startsWith('/warden') ||
    pathname.startsWith('/admin')
  ) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verify token exists but don't verify signature here (that's done in route handlers)
    // This middleware just checks presence
    return NextResponse.next();
  }

  // Protected API routes
  if (pathname.startsWith('/api') && !isPublicPath) {
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protected routes
    '/student/:path*',
    '/warden/:path*',
    '/admin/:path*',
    '/api/:path*',
  ],
};

