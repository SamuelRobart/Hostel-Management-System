import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
  details?: any;
}

/**
 * Success Response (200)
 */
export const successResponse = <T>(
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): NextResponse<ApiResponse<T>> => {
  return NextResponse.json(
    {
      success: true,
      statusCode,
      message,
      data,
    },
    { status: statusCode }
  );
};

/**
 * Created Response (201)
 */
export const createdResponse = <T>(
  data: T,
  message: string = 'Resource created successfully'
): NextResponse<ApiResponse<T>> => {
  return NextResponse.json(
    {
      success: true,
      statusCode: 201,
      message,
      data,
    },
    { status: 201 }
  );
};

/**
 * Bad Request Response (400)
 */
export const badRequestResponse = (
  error: string,
  details?: any
): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      success: false,
      statusCode: 400,
      error,
      details,
    },
    { status: 400 }
  );
};

/**
 * Unauthorized Response (401)
 */
export const unauthorizedResponse = (
  error: string = 'Unauthorized'
): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      success: false,
      statusCode: 401,
      error,
    },
    { status: 401 }
  );
};

/**
 * Forbidden Response (403)
 */
export const forbiddenResponse = (
  error: string = 'Forbidden'
): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      success: false,
      statusCode: 403,
      error,
    },
    { status: 403 }
  );
};

/**
 * Not Found Response (404)
 */
export const notFoundResponse = (
  resource: string = 'Resource'
): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      success: false,
      statusCode: 404,
      error: `${resource} not found`,
    },
    { status: 404 }
  );
};

/**
 * Conflict Response (409)
 */
export const conflictResponse = (
  error: string
): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      success: false,
      statusCode: 409,
      error,
    },
    { status: 409 }
  );
};

/**
 * Server Error Response (500)
 */
export const serverErrorResponse = (
  error: string = 'Internal server error',
  details?: any
): NextResponse<ApiResponse> => {
  console.error('Server error:', error, details);
  return NextResponse.json(
    {
      success: false,
      statusCode: 500,
      error,
      ...(process.env.NODE_ENV === 'development' && { details }),
    },
    { status: 500 }
  );
};

/**
 * Wrap response with Set-Cookie header
 */
export const withCookies = (
  response: NextResponse,
  cookies: string[]
): NextResponse => {
  cookies.forEach(cookie => {
    response.headers.append('Set-Cookie', cookie);
  });
  return response;
};
