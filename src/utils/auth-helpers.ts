import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';

export interface AuthUser {
    id: string;
    role: 'student' | 'warden' | 'admin';
    name: string;
    hostelId?: string;
    hostelLocation?: string;
    [key: string]: any;
}

export function getTokenFromRequest(req: NextRequest | Request): string | null {
    // Try to get from cookies
    if (req instanceof NextRequest) {
        const token = req.cookies.get('auth_token')?.value;
        if (token) return token;
    }
    
    // Fallback: try from cookie header
    const cookieHeader = req.headers.get('cookie');
    if (cookieHeader) {
        const cookies = cookieHeader.split(';').map(c => c.trim());
        const authCookie = cookies.find(c => c.startsWith('auth_token='));
        if (authCookie) {
            return authCookie.split('=')[1];
        }
    }
    
    return null;
}

export function verifyToken(token: string): AuthUser | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
        return decoded;
    } catch (error) {
        return null;
    }
}

export function getAuthUser(req: NextRequest | Request): AuthUser | null {
    const token = getTokenFromRequest(req);
    if (!token) return null;
    return verifyToken(token);
}
