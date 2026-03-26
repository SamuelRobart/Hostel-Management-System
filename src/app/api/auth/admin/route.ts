import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin } from '@/lib/auth-service';
import { generateAccessToken, createAuthCookie } from '@/lib/auth';
import {
  successResponse,
  badRequestResponse,
  unauthorizedResponse,
  serverErrorResponse,
  withCookies,
} from '@/lib/api-response';
import {
  validateWardenAdminLoginData,
  normalizeUsername,
} from '@/lib/validation';
import {
  UnauthorizedError,
  NotFoundError,
  ValidationError,
} from '@/lib/auth-errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = validateWardenAdminLoginData({
      identifier: body.username,
      password: body.password,
    });

    if (!validation.valid) {
      return badRequestResponse(
        'Invalid input',
        validation.errors
      );
    }

    // Authenticate
    const admin = await authenticateAdmin(
      validation.data!.identifier,
      validation.data!.password
    );

    // Generate token
    const accessToken = generateAccessToken({
      id: admin._id.toString(),
      role: 'admin',
      name: admin.name,
      username: admin.username,
    });

    // Create response
    const response = successResponse(
      {
        user: {
          id: admin._id.toString(),
          name: admin.name,
          username: admin.username,
          role: 'admin',
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
    if (error instanceof ValidationError) {
      return badRequestResponse(error.message, error.fields);
    }

    if (error instanceof NotFoundError) {
      return unauthorizedResponse('Invalid admin credentials');
    }

    if (error instanceof UnauthorizedError) {
      return unauthorizedResponse(error.message);
    }

    console.error('Admin login error:', error);
    return serverErrorResponse('Login failed');
  }
}
