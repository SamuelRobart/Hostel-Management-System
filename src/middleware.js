import { NextResponse } from 'next/server';
export function middleware(request) {
    var _a;
    var pathname = request.nextUrl.pathname;
    // Public paths that don't require authentication
    var publicPaths = [
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
    var isPublicPath = publicPaths.some(function (path) { return pathname.startsWith(path); });
    if (isPublicPath) {
        return NextResponse.next();
    }
    // Get auth token
    var token = (_a = request.cookies.get('auth_token')) === null || _a === void 0 ? void 0 : _a.value;
    // Protected dashboard/panel routes
    if (pathname.startsWith('/student') ||
        pathname.startsWith('/warden') ||
        pathname.startsWith('/admin')) {
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
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }
    }
    return NextResponse.next();
}
export var config = {
    matcher: [
        // Protected routes
        '/student/:path*',
        '/warden/:path*',
        '/admin/:path*',
        '/api/:path*',
    ],
};
