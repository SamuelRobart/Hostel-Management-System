import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Admin from '@/models/Admin';
import { hashPassword, comparePassword, compareLegacyPassword } from '@/lib/password';
import {
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  DatabaseError,
} from '@/lib/auth-errors';
import { validatePhone, validateUsername, normalizePhone, normalizeUsername } from '@/lib/validation';

/**
 * Student authentication
 */
export const authenticateStudent = async (phone: string, dateOfBirth: Date) => {
  try {
    await connectToDatabase();

    const normalizedPhone = normalizePhone(phone);

    const student = await User.findOne({
      phone: normalizedPhone,
      role: 'student',
    }).lean() as any;

    if (!student) {
      throw new NotFoundError('Student');
    }

    const studentDob = new Date(student.dateOfBirth);
    const inputDob = new Date(dateOfBirth);

    if (
      studentDob.toISOString().split('T')[0] !==
      inputDob.toISOString().split('T')[0]
    ) {
      throw new UnauthorizedError('Invalid date of birth');
    }

    // Record last login
    await User.findByIdAndUpdate(student._id, { lastLogin: new Date() });

    return student;
  } catch (error: any) {
    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      throw error;
    }
    throw new DatabaseError('Failed to authenticate student');
  }
};

/**
 * Warden authentication
 */
export const authenticateWarden = async (
  identifier: string,
  password: string
) => {
  try {
    await connectToDatabase();

    const normalizedIdentifier = normalizeUsername(identifier);

    const warden = await User.findOne({
      $and: [
        { role: 'warden' },
        {
          $or: [
            { phone: normalizedIdentifier },
            { username: normalizedIdentifier },
          ],
        },
      ],
    }).lean() as any;

    if (!warden) {
      throw new NotFoundError('Warden');
    }

    // Compare password (support legacy plain text passwords)
    const isPasswordValid = await compareLegacyPassword(
      password,
      warden.password || ''
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Record last login
    await User.findByIdAndUpdate(warden._id, { lastLogin: new Date() });

    return warden;
  } catch (error: any) {
    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      throw error;
    }
    throw new DatabaseError('Failed to authenticate warden');
  }
};

/**
 * Admin authentication
 */
export const authenticateAdmin = async (username: string, password: string) => {
  try {
    await connectToDatabase();

    const normalizedUsername = normalizeUsername(username);

    // Check Admin model first (legacy system)
    const admin = await Admin.findOne({
      username: normalizedUsername,
    }).lean() as any;

    if (!admin) {
      throw new NotFoundError('Admin');
    }

    // Compare password (support legacy plain text passwords)
    const isPasswordValid = await compareLegacyPassword(
      password,
      admin.password || ''
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Transform admin data to match expected format
    return {
      _id: admin._id,
      name: admin.username, // Use username as name for display
      username: admin.username,
      role: 'admin',
    };
  } catch (error: any) {
    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      throw error;
    }
    throw new DatabaseError('Failed to authenticate admin');
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (userId: string) => {
  try {
    await connectToDatabase();

    const user = await User.findById(userId).lean();

    if (!user) {
      throw new NotFoundError('User');
    }

    return user;
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new DatabaseError('Failed to fetch user');
  }
};

/**
 * Check if phone exists
 */
export const phoneExists = async (phone: string, excludeId?: string) => {
  try {
    await connectToDatabase();

    const normalizedPhone = normalizePhone(phone);
    const query: any = { phone: normalizedPhone };

    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const user = await User.findOne(query).lean();
    return !!user;
  } catch (error) {
    throw new DatabaseError('Failed to check phone');
  }
};

/**
 * Check if username exists
 */
export const usernameExists = async (username: string, excludeId?: string) => {
  try {
    await connectToDatabase();

    const normalizedUsername = normalizeUsername(username);
    const query: any = { username: normalizedUsername };

    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const user = await User.findOne(query).lean();
    return !!user;
  } catch (error) {
    throw new DatabaseError('Failed to check username');
  }
};

/**
 * Create user
 */
export const createUser = async (userData: any) => {
  try {
    await connectToDatabase();

    // Check for duplicates
    if (userData.phone) {
      if (await phoneExists(userData.phone)) {
        throw new ConflictError('Phone number already in use');
      }
    }

    if (userData.username) {
      if (await usernameExists(userData.username)) {
        throw new ConflictError('Username already taken');
      }
    }

    // Hash password if provided
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }

    // Normalize fields
    if (userData.phone) {
      userData.phone = normalizePhone(userData.phone);
    }
    if (userData.username) {
      userData.username = normalizeUsername(userData.username);
    }

    const user = new User(userData);
    const savedUser = await user.save();

    return savedUser.toObject();
  } catch (error: any) {
    if (
      error instanceof ConflictError ||
      error instanceof DatabaseError
    ) {
      throw error;
    }
    throw new DatabaseError(`Failed to create user: ${error.message}`);
  }
};

/**
 * Update user
 */
export const updateUser = async (userId: string, updateData: any) => {
  try {
    await connectToDatabase();

    // Check for duplicate phone if updating
    if (updateData.phone) {
      if (await phoneExists(updateData.phone, userId)) {
        throw new ConflictError('Phone number already in use');
      }
      updateData.phone = normalizePhone(updateData.phone);
    }

    // Check for duplicate username if updating
    if (updateData.username) {
      if (await usernameExists(updateData.username, userId)) {
        throw new ConflictError('Username already taken');
      }
      updateData.username = normalizeUsername(updateData.username);
    }

    // Hash password if provided
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).lean();

    if (!user) {
      throw new NotFoundError('User');
    }

    return user;
  } catch (error: any) {
    if (
      error instanceof ConflictError ||
      error instanceof NotFoundError ||
      error instanceof DatabaseError
    ) {
      throw error;
    }
    throw new DatabaseError(`Failed to update user: ${error.message}`);
  }
};
