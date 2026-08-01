var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Admin from '@/models/Admin';
import { hashPassword, compareLegacyPassword } from '@/lib/password';
import { UnauthorizedError, NotFoundError, ConflictError, DatabaseError, } from '@/lib/auth-errors';
import { normalizePhone, normalizeUsername } from '@/lib/validation';
/**
 * Student authentication
 */
export var authenticateStudent = function (phone, dateOfBirth) { return __awaiter(void 0, void 0, void 0, function () {
    var normalizedPhone, student, studentDob, inputDob, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, connectToDatabase()];
            case 1:
                _a.sent();
                normalizedPhone = normalizePhone(phone);
                return [4 /*yield*/, User.findOne({
                        phone: normalizedPhone,
                        role: 'student',
                    }).lean()];
            case 2:
                student = _a.sent();
                if (!student) {
                    throw new NotFoundError('Student');
                }
                studentDob = new Date(student.dateOfBirth);
                inputDob = new Date(dateOfBirth);
                if (studentDob.toISOString().split('T')[0] !==
                    inputDob.toISOString().split('T')[0]) {
                    throw new UnauthorizedError('Invalid date of birth');
                }
                // Record last login
                return [4 /*yield*/, User.findByIdAndUpdate(student._id, { lastLogin: new Date() })];
            case 3:
                // Record last login
                _a.sent();
                return [2 /*return*/, student];
            case 4:
                error_1 = _a.sent();
                if (error_1 instanceof NotFoundError || error_1 instanceof UnauthorizedError) {
                    throw error_1;
                }
                throw new DatabaseError('Failed to authenticate student');
            case 5: return [2 /*return*/];
        }
    });
}); };
/**
 * Warden authentication
 */
export var authenticateWarden = function (identifier, password) { return __awaiter(void 0, void 0, void 0, function () {
    var normalizedIdentifier, warden, isPasswordValid, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, connectToDatabase()];
            case 1:
                _a.sent();
                normalizedIdentifier = normalizeUsername(identifier);
                return [4 /*yield*/, User.findOne({
                        $and: [
                            { role: 'warden' },
                            {
                                $or: [
                                    { phone: normalizedIdentifier },
                                    { username: normalizedIdentifier },
                                ],
                            },
                        ],
                    }).lean()];
            case 2:
                warden = _a.sent();
                if (!warden) {
                    throw new NotFoundError('Warden');
                }
                return [4 /*yield*/, compareLegacyPassword(password, warden.password || '')];
            case 3:
                isPasswordValid = _a.sent();
                if (!isPasswordValid) {
                    throw new UnauthorizedError('Invalid credentials');
                }
                // Record last login
                return [4 /*yield*/, User.findByIdAndUpdate(warden._id, { lastLogin: new Date() })];
            case 4:
                // Record last login
                _a.sent();
                return [2 /*return*/, warden];
            case 5:
                error_2 = _a.sent();
                if (error_2 instanceof NotFoundError || error_2 instanceof UnauthorizedError) {
                    throw error_2;
                }
                throw new DatabaseError('Failed to authenticate warden');
            case 6: return [2 /*return*/];
        }
    });
}); };
/**
 * Admin authentication
 */
export var authenticateAdmin = function (username, password) { return __awaiter(void 0, void 0, void 0, function () {
    var normalizedUsername, admin, isPasswordValid, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, connectToDatabase()];
            case 1:
                _a.sent();
                normalizedUsername = normalizeUsername(username);
                return [4 /*yield*/, Admin.findOne({
                        username: normalizedUsername,
                    }).lean()];
            case 2:
                admin = _a.sent();
                if (!admin) {
                    throw new NotFoundError('Admin');
                }
                return [4 /*yield*/, compareLegacyPassword(password, admin.password || '')];
            case 3:
                isPasswordValid = _a.sent();
                if (!isPasswordValid) {
                    throw new UnauthorizedError('Invalid credentials');
                }
                // Transform admin data to match expected format
                return [2 /*return*/, {
                        _id: admin._id,
                        name: admin.username, // Use username as name for display
                        username: admin.username,
                        role: 'admin',
                    }];
            case 4:
                error_3 = _a.sent();
                if (error_3 instanceof NotFoundError || error_3 instanceof UnauthorizedError) {
                    throw error_3;
                }
                throw new DatabaseError('Failed to authenticate admin');
            case 5: return [2 /*return*/];
        }
    });
}); };
/**
 * Get user by ID
 */
export var getUserById = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, connectToDatabase()];
            case 1:
                _a.sent();
                return [4 /*yield*/, User.findById(userId).lean()];
            case 2:
                user = _a.sent();
                if (!user) {
                    throw new NotFoundError('User');
                }
                return [2 /*return*/, user];
            case 3:
                error_4 = _a.sent();
                if (error_4 instanceof NotFoundError) {
                    throw error_4;
                }
                throw new DatabaseError('Failed to fetch user');
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Check if phone exists
 */
export var phoneExists = function (phone, excludeId) { return __awaiter(void 0, void 0, void 0, function () {
    var normalizedPhone, query, user, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, connectToDatabase()];
            case 1:
                _a.sent();
                normalizedPhone = normalizePhone(phone);
                query = { phone: normalizedPhone };
                if (excludeId) {
                    query._id = { $ne: excludeId };
                }
                return [4 /*yield*/, User.findOne(query).lean()];
            case 2:
                user = _a.sent();
                return [2 /*return*/, !!user];
            case 3:
                error_5 = _a.sent();
                throw new DatabaseError('Failed to check phone');
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Check if username exists
 */
export var usernameExists = function (username, excludeId) { return __awaiter(void 0, void 0, void 0, function () {
    var normalizedUsername, query, user, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, connectToDatabase()];
            case 1:
                _a.sent();
                normalizedUsername = normalizeUsername(username);
                query = { username: normalizedUsername };
                if (excludeId) {
                    query._id = { $ne: excludeId };
                }
                return [4 /*yield*/, User.findOne(query).lean()];
            case 2:
                user = _a.sent();
                return [2 /*return*/, !!user];
            case 3:
                error_6 = _a.sent();
                throw new DatabaseError('Failed to check username');
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Create user
 */
export var createUser = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user, savedUser, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                return [4 /*yield*/, connectToDatabase()];
            case 1:
                _b.sent();
                if (!userData.phone) return [3 /*break*/, 3];
                return [4 /*yield*/, phoneExists(userData.phone)];
            case 2:
                if (_b.sent()) {
                    throw new ConflictError('Phone number already in use');
                }
                _b.label = 3;
            case 3:
                if (!userData.username) return [3 /*break*/, 5];
                return [4 /*yield*/, usernameExists(userData.username)];
            case 4:
                if (_b.sent()) {
                    throw new ConflictError('Username already taken');
                }
                _b.label = 5;
            case 5:
                if (!userData.password) return [3 /*break*/, 7];
                _a = userData;
                return [4 /*yield*/, hashPassword(userData.password)];
            case 6:
                _a.password = _b.sent();
                _b.label = 7;
            case 7:
                // Normalize fields
                if (userData.phone) {
                    userData.phone = normalizePhone(userData.phone);
                }
                if (userData.username) {
                    userData.username = normalizeUsername(userData.username);
                }
                user = new User(userData);
                return [4 /*yield*/, user.save()];
            case 8:
                savedUser = _b.sent();
                return [2 /*return*/, savedUser.toObject()];
            case 9:
                error_7 = _b.sent();
                if (error_7 instanceof ConflictError ||
                    error_7 instanceof DatabaseError) {
                    throw error_7;
                }
                throw new DatabaseError("Failed to create user: ".concat(error_7.message));
            case 10: return [2 /*return*/];
        }
    });
}); };
/**
 * Update user
 */
export var updateUser = function (userId, updateData) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user, error_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                return [4 /*yield*/, connectToDatabase()];
            case 1:
                _b.sent();
                if (!updateData.phone) return [3 /*break*/, 3];
                return [4 /*yield*/, phoneExists(updateData.phone, userId)];
            case 2:
                if (_b.sent()) {
                    throw new ConflictError('Phone number already in use');
                }
                updateData.phone = normalizePhone(updateData.phone);
                _b.label = 3;
            case 3:
                if (!updateData.username) return [3 /*break*/, 5];
                return [4 /*yield*/, usernameExists(updateData.username, userId)];
            case 4:
                if (_b.sent()) {
                    throw new ConflictError('Username already taken');
                }
                updateData.username = normalizeUsername(updateData.username);
                _b.label = 5;
            case 5:
                if (!updateData.password) return [3 /*break*/, 7];
                _a = updateData;
                return [4 /*yield*/, hashPassword(updateData.password)];
            case 6:
                _a.password = _b.sent();
                _b.label = 7;
            case 7: return [4 /*yield*/, User.findByIdAndUpdate(userId, updateData, {
                    new: true,
                }).lean()];
            case 8:
                user = _b.sent();
                if (!user) {
                    throw new NotFoundError('User');
                }
                return [2 /*return*/, user];
            case 9:
                error_8 = _b.sent();
                if (error_8 instanceof ConflictError ||
                    error_8 instanceof NotFoundError ||
                    error_8 instanceof DatabaseError) {
                    throw error_8;
                }
                throw new DatabaseError("Failed to update user: ".concat(error_8.message));
            case 10: return [2 /*return*/];
        }
    });
}); };
