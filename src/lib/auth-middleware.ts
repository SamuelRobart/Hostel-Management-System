import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, AuthPayload } from '@/lib/auth';
import { unauthorizedResponse, forbiddenResponse } from '@/lib/api-response';

/**
 * Middleware to check if user is authenticated
 * Returns auth user or throws 401 Unauthorized
 */
export const requireAuth = (req: NextRequest): AuthPayload => {
  const user = getAuthUser(req);
  
  if (!user) {
    throw new Error('UNAUTHORIZED');
  }

  return user;
};

/**
 * Middleware to check if user has specific role
 * Returns error response if role doesn't match
 */
export const requireRole = (
  user: AuthPayload | null,
  allowedRoles: string[]
): boolean => {
  if (!user || !allowedRoles.includes(user.role)) {
    return false;
  }
  return true;
};

/**
 * Wrapper for protected routes with role checking
 * Usage: 
 * const user = await withAuth(req, ['admin', 'warden']);
 */
export const withAuth = async (
  req: NextRequest,
  allowedRoles?: string[]
): Promise<AuthPayload | NextResponse> => {
  try {
    const user = getAuthUser(req);

    if (!user) {
      return unauthorizedResponse('Authentication required');
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return forbiddenResponse(
        `This action requires one of these roles: ${allowedRoles.join(', ')}`
      );
    }

    return user;
  } catch (error) {
    return unauthorizedResponse('Invalid authentication token');
  }
};

/**
 * Type guard to check if response is authentication error
 */
export const isAuthError = (
  result: AuthPayload | NextResponse
): result is NextResponse => {
  return result instanceof NextResponse;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (req: NextRequest): boolean => {
  return getAuthUser(req) !== null;
};

/**
 * Update lastLogin timestamp
 */
export const recordLogin = async (userId: string): Promise<void> => {
  try {
    const User = require('@/models/User').default;
    await User.findByIdAndUpdate(userId, { lastLogin: new Date() });
  } catch (error) {
    console.error('Error recording login:', error);
  }
};
