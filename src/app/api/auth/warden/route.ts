import { NextRequest, NextResponse } from 'next/server';
import { authenticateWarden } from '@/lib/auth-service';
import { generateAccessToken, createAuthCookie } from '@/lib/auth';
import {
  successResponse,
  badRequestResponse,
  unauthorizedResponse,
  serverErrorResponse,
} from '@/lib/api-response';
import { validateWardenAdminLoginData } from '@/lib/validation';
import { UnauthorizedError, NotFoundError } from '@/lib/auth-errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = validateWardenAdminLoginData({
      identifier: body.phone || body.username,
      password: body.password,
    });

    if (!validation.valid) {
      return badRequestResponse('Invalid input', validation.errors);
    }

    // Authenticate
    const warden = await authenticateWarden(
      validation.data!.identifier,
      validation.data!.password
    );

    // Generate token
    const accessToken = generateAccessToken({
      id: warden._id.toString(),
      role: 'warden',
      name: warden.name,
      phone: warden.phone,
      username: warden.username,
      hostelId: warden.hostelId?.toString(),
      hostelLocation: warden.hostelLocation,
    });

    // Create response
    const response = successResponse(
      {
        user: {
          id: warden._id.toString(),
          name: warden.name,
          phone: warden.phone,
          username: warden.username,
          role: 'warden',
          assignedHostel: warden.hostelLocation,
          location: warden.hostelLocation,
          hostelId: warden.hostelId,
        },
        accessToken,
      },
      'Login successful'
    );

    // Set cookie
    const cookie = createAuthCookie(accessToken);
    response.headers.append('Set-Cookie', cookie);

    return response;
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      return unauthorizedResponse('Warden credentials not found');
    }

    if (error instanceof UnauthorizedError) {
      return unauthorizedResponse(error.message);
    }

    console.error('Warden login error:', error);
    return serverErrorResponse('Login failed');
  }
}