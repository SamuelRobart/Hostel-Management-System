/**
 * Validate email format
 */
export var validateEmail = function (email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
/**
 * Validate phone number (basic Indian phone format)
 */
export var validatePhone = function (phone) {
    var phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.trim());
};
/**
 * Validate date of birth (must be valid date and past)
 */
export var validateDateOfBirth = function (dob) {
    var date = typeof dob === 'string' ? new Date(dob) : dob;
    if (isNaN(date.getTime())) {
        return false;
    }
    // Must be in the past
    if (date >= new Date()) {
        return false;
    }
    // Must be at least 15 years old
    var age = new Date().getFullYear() - date.getFullYear();
    if (age < 15) {
        return false;
    }
    return true;
};
/**
 * Normalize phone number
 */
export var normalizePhone = function (phone) {
    return phone.trim().replace(/[^\d]/g, '');
};
/**
 * Normalize username
 */
export var normalizeUsername = function (username) {
    return username.trim().toLowerCase();
};
/**
 * Validate username format
 */
export var validateUsername = function (username) {
    // Alphanumeric and underscore only, 3-20 chars
    var usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
};
/**
 * Sanitize string input
 */
export var sanitizeString = function (str) {
    return str.trim().replace(/[<>]/g, '');
};
/**
 * Validate required fields
 */
export var validateRequiredFields = function (obj, fields) {
    var missing = fields.filter(function (field) { return !obj[field]; });
    return {
        valid: missing.length === 0,
        missing: missing,
    };
};
/**
 * Compare dates (ignoring time)
 */
export var compareDates = function (date1, date2) {
    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate());
};
/**
 * Parse and validate student data
 */
export var validateStudentLoginData = function (data) {
    var errors = [];
    if (!data.phone) {
        errors.push('Phone is required');
    }
    else if (!validatePhone(data.phone)) {
        errors.push('Invalid phone format');
    }
    if (!data.dob) {
        errors.push('Date of birth is required');
    }
    else if (!validateDateOfBirth(data.dob)) {
        errors.push('Invalid date of birth');
    }
    if (errors.length > 0) {
        return { valid: false, errors: errors };
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
export var validateWardenAdminLoginData = function (data) {
    var errors = [];
    if (!data.identifier) {
        errors.push('Username or phone is required');
    }
    if (!data.password) {
        errors.push('Password is required');
    }
    if (errors.length > 0) {
        return { valid: false, errors: errors };
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
