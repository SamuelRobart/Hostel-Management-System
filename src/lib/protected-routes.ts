import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, AuthPayload } from '@/lib/auth';
import { unauthorizedResponse, forbiddenResponse } from '@/lib/api-response';

/**
 * Protected route wrapper for API endpoints
 * Usage:
 * export const POST = withProtection(async (req, user) => {
 *   // user is guaranteed to be defined
 *   return successResponse(data);
 * }, ['admin', 'warden']);
 */
export const withProtection = (
  handler: (
    req: NextRequest,
    user: AuthPayload
  ) => Promise<NextResponse>,
  allowedRoles?: string[]
) => {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      const user = getAuthUser(req);

      // Check authentication
      if (!user) {
        return unauthorizedResponse('Authentication required');
      }

      // Check role authorization
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        return forbiddenResponse(
          `This action requires one of these roles: ${allowedRoles.join(', ')}`
        );
      }

      // Call handler with authenticated user
      return await handler(req, user);
    } catch (error: any) {
      console.error('Route protection error:', error);
      return unauthorizedResponse('Authentication failed');
    }
  };
};

/**
 * Require specific role or return error
 */
export const requireRole = (user: AuthPayload, roles: string[]): boolean => {
  return roles.includes(user.role);
};

/**
 * Require admin role
 */
export const requireAdmin = (user: AuthPayload): boolean => {
  return user.role === 'admin';
};

/**
 * Require warden role
 */
export const requireWarden = (user: AuthPayload): boolean => {
  return user.role === 'warden';
};

/**
 * Require student role
 */
export const requireStudent = (user: AuthPayload): boolean => {
  return user.role === 'student';
};

/**
 * Check if user owns resource (for personal data endpoints)
 */
export const ownsResource = (user: AuthPayload, resourceUserId: string): boolean => {
  return user.id === resourceUserId;
};

/**
 * Check if warden manages hostel
 */
export const managesHostel = (user: AuthPayload, hostelId: string): boolean => {
  return user.hostelId === hostelId;
};

/**
 * Example protected route template:
 * 
 * import { withProtection, requireAdmin } from '@/lib/protected-routes';
 * import { successResponse, forbiddenResponse } from '@/lib/api-response';
 * 
 * export const GET = withProtection(
 *   async (req, user) => {
 *     if (!requireAdmin(user)) {
 *       return forbiddenResponse();
 *     }
 *     
 *     // Your logic here
 *     return successResponse(data);
 *   },
 *   ['admin']
 * );
 * 
 * Or without role check:
 * 
 * export const GET = withProtection(
 *   async (req, user) => {
 *     return successResponse({ userId: user.id });
 *   }
 * );
 */
