import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';
export function getTokenFromRequest(req) {
    var _a;
    // Try to get from cookies
    if (req instanceof NextRequest) {
        var token = (_a = req.cookies.get('auth_token')) === null || _a === void 0 ? void 0 : _a.value;
        if (token)
            return token;
    }
    // Fallback: try from cookie header
    var cookieHeader = req.headers.get('cookie');
    if (cookieHeader) {
        var cookies = cookieHeader.split(';').map(function (c) { return c.trim(); });
        var authCookie = cookies.find(function (c) { return c.startsWith('auth_token='); });
        if (authCookie) {
            return authCookie.split('=')[1];
        }
    }
    return null;
}
export function verifyToken(token) {
    try {
        var decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
}
export function getAuthUser(req) {
    var token = getTokenFromRequest(req);
    if (!token)
        return null;
    return verifyToken(token);
}
