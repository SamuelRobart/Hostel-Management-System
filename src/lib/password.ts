import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

/**
 * Hash password with bcrypt
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

/**
 * Compare password with hash
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    return false;
  }
};

/**
 * Validate password strength
 * Requirements: min 6 chars, at least 1 letter, at least 1 number
 */
export const validatePasswordStrength = (password: string): {
  valid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (!/[a-zA-Z]/.test(password)) {
    errors.push('Password must contain at least one letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Check if a hash is actually hashed (bcrypt format) or plain text
 */
export const isHashedPassword = (password: string): boolean => {
  // bcrypt hashes start with $2a$, $2b$, or $2y$
  return /^\$2[aby]\$\d{2}$/.test(password.substring(0, 7));
};

/**
 * Compare with backward compatibility (handles both hashed and plain text)
 */
export const compareLegacyPassword = async (
  password: string,
  storedPassword: string
): Promise<boolean> => {
  try {
    if (isHashedPassword(storedPassword)) {
      return await bcrypt.compare(password, storedPassword);
    } else {
      // Fallback to plain text comparison for legacy passwords
      return password === storedPassword;
    }
  } catch (error) {
    return false;
  }
};
