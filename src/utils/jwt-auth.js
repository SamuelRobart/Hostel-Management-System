import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';
export function verifyAuthToken(req) {
    var cookieHeader = req.headers.get('cookie');
    if (!cookieHeader)
        return null;
    var tokenMatch = cookieHeader.match(/auth_token=([^;]+)/);
    if (!tokenMatch)
        return null;
    var token = tokenMatch[1];
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (err) {
        return null;
    }
}
export function requireAuth(req) {
    var decoded = verifyAuthToken(req);
    if (!decoded) {
        throw new Error('Unauthorized');
    }
    return decoded;
}
