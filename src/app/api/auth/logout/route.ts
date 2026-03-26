import { NextRequest } from 'next/server';
import { successResponse, serverErrorResponse } from '@/lib/api-response';
import { createLogoutCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Create response
    const response = successResponse(
      { message: 'Logged out successfully' },
      'Logout successful'
    );

    // Clear auth cookie
    const logoutCookie = createLogoutCookie();
    response.headers.append('Set-Cookie', logoutCookie);

    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    return serverErrorResponse('Logout failed');
  }
}