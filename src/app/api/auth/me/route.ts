import { NextRequest } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { successResponse, unauthorizedResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const user = getAuthUser(request);

    if (!user) {
      return unauthorizedResponse('Not authenticated');
    }

    return successResponse(
      {
        id: user.id,
        name: user.name,
        role: user.role,
        phone: user.phone,
        username: user.username,
        hostelId: user.hostelId,
        hostelLocation: user.hostelLocation,
        roomId: user.roomId,
      },
      'User profile retrieved'
    );
  } catch (error: any) {
    return unauthorizedResponse('Invalid authentication token');
  }
}
