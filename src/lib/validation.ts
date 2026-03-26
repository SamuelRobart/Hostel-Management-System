/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic Indian phone format)
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.trim());
};

/**
 * Validate date of birth (must be valid date and past)
 */
export const validateDateOfBirth = (dob: string | Date): boolean => {
  const date = typeof dob === 'string' ? new Date(dob) : dob;
  
  if (isNaN(date.getTime())) {
    return false;
  }

  // Must be in the past
  if (date >= new Date()) {
    return false;
  }

  // Must be at least 15 years old
  const age = new Date().getFullYear() - date.getFullYear();
  if (age < 15) {
    return false;
  }

  return true;
};

/**
 * Normalize phone number
 */
export const normalizePhone = (phone: string): string => {
  return phone.trim().replace(/[^\d]/g, '');
};

/**
 * Normalize username
 */
export const normalizeUsername = (username: string): string => {
  return username.trim().toLowerCase();
};

/**
 * Validate username format
 */
export const validateUsername = (username: string): boolean => {
  // Alphanumeric and underscore only, 3-20 chars
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

/**
 * Sanitize string input
 */
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, '');
};

/**
 * Validate required fields
 */
export const validateRequiredFields = (
  obj: any,
  fields: string[]
): { valid: boolean; missing: string[] } => {
  const missing = fields.filter(field => !obj[field]);
  return {
    valid: missing.length === 0,
    missing,
  };
};

/**
 * Compare dates (ignoring time)
 */
export const compareDates = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Parse and validate student data
 */
export const validateStudentLoginData = (data: any): {
  valid: boolean;
  errors: string[];
  data?: { phone: string; dob: Date };
} => {
  const errors: string[] = [];

  if (!data.phone) {
    errors.push('Phone is required');
  } else if (!validatePhone(data.phone)) {
    errors.push('Invalid phone format');
  }

  if (!data.dob) {
    errors.push('Date of birth is required');
  } else if (!validateDateOfBirth(data.dob)) {
    errors.push('Invalid date of birth');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    data: {
      phone: normalizePhone(data.phone),
      dob: new Date(data.dob),
    },
  };
};

/**
 * Validate warden/admin login data
 */
export const validateWardenAdminLoginData = (data: any): {
  valid: boolean;
  errors: string[];
  data?: { identifier: string; password: string };
} => {
  const errors: string[] = [];

  if (!data.identifier) {
    errors.push('Username or phone is required');
  }

  if (!data.password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    data: {
      identifier: normalizeUsername(data.identifier),
      password: data.password,
    },
  };
};
