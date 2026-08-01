import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
var JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
var JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
/**
 * Generate JWT Access Token (short-lived, 1 day)
 */
export var generateAccessToken = function (payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};
/**
 * Generate JWT Refresh Token (long-lived, 7 days)
 */
export var generateRefreshToken = function (payload) {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};
/**
 * Verify Access Token
 */
export var verifyAccessToken = function (token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (error) {
        return null;
    }
};
/**
 * Verify Refresh Token
 */
export var verifyRefreshToken = function (token) {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET);
    }
    catch (error) {
        return null;
    }
};
/**
 * Extract token from request (from cookies or Authorization header)
 */
export var getTokenFromRequest = function (req) {
    var _a;
    // Try Authorization header first
    var authHeader = req.headers.get('authorization');
    if (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }
    // Fallback to cookies
    if (req instanceof NextRequest) {
        var token = (_a = req.cookies.get('auth_token')) === null || _a === void 0 ? void 0 : _a.value;
        if (token)
            return token;
    }
    // Parse cookie header
    var cookieHeader = req.headers.get('cookie');
    if (cookieHeader) {
        var cookies = cookieHeader.split(';').map(function (c) { return c.trim(); });
        var authCookie = cookies.find(function (c) { return c.startsWith('auth_token='); });
        if (authCookie) {
            return authCookie.split('=')[1];
        }
    }
    return null;
};
/**
 * Get authenticated user from request
 */
export var getAuthUser = function (req) {
    var token = getTokenFromRequest(req);
    if (!token)
        return null;
    return verifyAccessToken(token);
};
/**
 * Create secure cookie string
 */
export var createAuthCookie = function (token, maxAge) {
    if (maxAge === void 0) { maxAge = 60 * 60 * 24 * 7; }
    return "auth_token=".concat(token, "; HttpOnly; Secure=").concat(process.env.NODE_ENV === 'production', "; SameSite=Strict; Max-Age=").concat(maxAge, "; Path=/");
};
/**
 * Create logout cookie (clear auth token)
 */
export var createLogoutCookie = function () {
    return "auth_token=; HttpOnly; Secure=".concat(process.env.NODE_ENV === 'production', "; SameSite=Strict; Max-Age=0; Path=/");
};
/**
 * Validate required fields in payload
 */
export var validateAuthPayload = function (payload) {
    return (payload &&
        typeof payload.id === 'string' &&
        ['student', 'warden', 'admin'].includes(payload.role) &&
        typeof payload.name === 'string');
};
