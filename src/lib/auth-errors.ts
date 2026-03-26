export class AuthError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export class ValidationError extends AuthError {
  constructor(message: string, public fields?: string[]) {
    super(400, message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message: string = 'Unauthorized') {
    super(401, message, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AuthError {
  constructor(message: string = 'Forbidden') {
    super(403, message, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends AuthError {
  constructor(resource: string) {
    super(404, `${resource} not found`, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AuthError {
  constructor(message: string) {
    super(409, message, 'CONFLICT');
    this.name = 'ConflictError';
  }
}

export class DatabaseError extends AuthError {
  constructor(message: string = 'Database error') {
    super(500, message, 'DATABASE_ERROR');
    this.name = 'DatabaseError';
  }
}

export const errorMessages = {
  INVALID_CREDENTIALS: 'Invalid credentials provided',
  USER_NOT_FOUND: 'User not found',
  INVALID_PASSWORD: 'Invalid password',
  INVALID_PHONE: 'Invalid phone number',
  PHONE_ALREADY_EXISTS: 'Phone number already registered',
  USERNAME_ALREADY_EXISTS: 'Username already taken',
  INVALID_DOB: 'Invalid date of birth',
  INVALID_TOKEN: 'Invalid or expired token',
  TOKEN_EXPIRED: 'Token has expired',
  UNAUTHORIZED_ROLE: 'Unauthorized role',
  ADMIN_NOT_FOUND: 'Admin not found',
  WARDEN_NOT_FOUND: 'Warden not found',
  STUDENT_NOT_FOUND: 'Student not found',
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions',
};
