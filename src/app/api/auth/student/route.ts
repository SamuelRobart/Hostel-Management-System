import { NextRequest, NextResponse } from 'next/server';
import { authenticateStudent } from '@/lib/auth-service';
import { generateAccessToken, createAuthCookie } from '@/lib/auth';
import {
  successResponse,
  badRequestResponse,
  unauthorizedResponse,
  serverErrorResponse,
} from '@/lib/api-response';
import { validateStudentLoginData } from '@/lib/validation';
import { UnauthorizedError, NotFoundError } from '@/lib/auth-errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = validateStudentLoginData({
      phone: body.phone,
      dob: body.dateOfBirth,
    });

    if (!validation.valid) {
      return badRequestResponse('Invalid input', validation.errors);
    }

    // Authenticate
    const student = await authenticateStudent(
      validation.data!.phone,
      validation.data!.dob
    );

    // Generate token
    const accessToken = generateAccessToken({
      id: student._id.toString(),
      role: 'student',
      name: student.name,
      phone: student.phone,
      hostelId: student.hostelId?.toString(),
      hostelLocation: student.hostelLocation,
      roomId: student.roomId?.toString(),
    });

    // Create response
    const response = successResponse(
      {
        user: {
          id: student._id.toString(),
          name: student.name,
          phone: student.phone,
          role: 'student',
          hostelName: student.hostelLocation,
          hostelId: student.hostelId,
          roomId: student.roomId,
          bedNumber: student.bedNumber,
          email: student.email,
          dateOfBirth: student.dateOfBirth,
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
      return unauthorizedResponse('Student not found');
    }

    if (error instanceof UnauthorizedError) {
      return unauthorizedResponse(error.message);
    }

    console.error('Student login error:', error);
    return serverErrorResponse('Login failed');
  }
}