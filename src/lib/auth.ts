import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

export interface AuthPayload {
  id: string;
  role: 'student' | 'warden' | 'admin';
  name: string;
  phone?: string;
  username?: string;
  hostelId?: string;
  hostelLocation?: string;
  roomId?: string;
  [key: string]: any;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  user: AuthPayload;
}

/**
 * Generate JWT Access Token (short-lived, 1 day)
 */
export const generateAccessToken = (payload: Partial<AuthPayload>): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

/**
 * Generate JWT Refresh Token (long-lived, 7 days)
 */
export const generateRefreshToken = (payload: Partial<AuthPayload>): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

/**
 * Verify Access Token
 */
export const verifyAccessToken = (token: string): AuthPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch (error) {
    return null;
  }
};

/**
 * Verify Refresh Token
 */
export const verifyRefreshToken = (token: string): AuthPayload | null => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as AuthPayload;
  } catch (error) {
    return null;
  }
};

/**
 * Extract token from request (from cookies or Authorization header)
 */
export const getTokenFromRequest = (req: NextRequest | Request): string | null => {
  // Try Authorization header first
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Fallback to cookies
  if (req instanceof NextRequest) {
    const token = req.cookies.get('auth_token')?.value;
    if (token) return token;
  }

  // Parse cookie header
  const cookieHeader = req.headers.get('cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(c => c.trim());
    const authCookie = cookies.find(c => c.startsWith('auth_token='));
    if (authCookie) {
      return authCookie.split('=')[1];
    }
  }

  return null;
};

/**
 * Get authenticated user from request
 */
export const getAuthUser = (req: NextRequest | Request): AuthPayload | null => {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyAccessToken(token);
};

/**
 * Create secure cookie string
 */
export const createAuthCookie = (token: string, maxAge: number = 60 * 60 * 24 * 7): string => {
  return `auth_token=${token}; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Strict; Max-Age=${maxAge}; Path=/`;
};

/**
 * Create logout cookie (clear auth token)
 */
export const createLogoutCookie = (): string => {
  return `auth_token=; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Strict; Max-Age=0; Path=/`;
};

/**
 * Validate required fields in payload
 */
export const validateAuthPayload = (payload: any): payload is AuthPayload => {
  return (
    payload &&
    typeof payload.id === 'string' &&
    ['student', 'warden', 'admin'].includes(payload.role) &&
    typeof payload.name === 'string'
  );
};
