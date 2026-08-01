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
import { getAuthUser } from '@/lib/auth';
import { unauthorizedResponse, forbiddenResponse } from '@/lib/api-response';
/**
 * Protected route wrapper for API endpoints
 * Usage:
 * export const POST = withProtection(async (req, user) => {
 *   // user is guaranteed to be defined
 *   return successResponse(data);
 * }, ['admin', 'warden']);
 */
export var withProtection = function (handler, allowedRoles) {
    return function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = getAuthUser(req);
                    // Check authentication
                    if (!user) {
                        return [2 /*return*/, unauthorizedResponse('Authentication required')];
                    }
                    // Check role authorization
                    if (allowedRoles && !allowedRoles.includes(user.role)) {
                        return [2 /*return*/, forbiddenResponse("This action requires one of these roles: ".concat(allowedRoles.join(', ')))];
                    }
                    return [4 /*yield*/, handler(req, user)];
                case 1: 
                // Call handler with authenticated user
                return [2 /*return*/, _a.sent()];
                case 2:
                    error_1 = _a.sent();
                    console.error('Route protection error:', error_1);
                    return [2 /*return*/, unauthorizedResponse('Authentication failed')];
                case 3: return [2 /*return*/];
            }
        });
    }); };
};
/**
 * Require specific role or return error
 */
export var requireRole = function (user, roles) {
    return roles.includes(user.role);
};
/**
 * Require admin role
 */
export var requireAdmin = function (user) {
    return user.role === 'admin';
};
/**
 * Require warden role
 */
export var requireWarden = function (user) {
    return user.role === 'warden';
};
/**
 * Require student role
 */
export var requireStudent = function (user) {
    return user.role === 'student';
};
/**
 * Check if user owns resource (for personal data endpoints)
 */
export var ownsResource = function (user, resourceUserId) {
    return user.id === resourceUserId;
};
/**
 * Check if warden manages hostel
 */
export var managesHostel = function (user, hostelId) {
    return user.hostelId === hostelId;
};
/**
 * Example protected route template:
 *
 * import { withProtection, requireAdmin } from '@/lib/protected-routes';
 * import { successResponse, forbiddenResponse } from '@/lib/api-response';
 *
 * export const GET = withProtection(
 *   async (req, user) => {
 *     if (!requireAdmin(user)) {
 *       return forbiddenResponse();
 *     }
 *
 *     // Your logic here
 *     return successResponse(data);
 *   },
 *   ['admin']
 * );
 *
 * Or without role check:
 *
 * export const GET = withProtection(
 *   async (req, user) => {
 *     return successResponse({ userId: user.id });
 *   }
 * );
 */
