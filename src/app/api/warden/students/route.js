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
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';
import { successResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '@/lib/api-response';
export function GET(request) {
    return __awaiter(this, void 0, void 0, function () {
        var token, decoded, warden, query, students, formattedStudents, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    token = (_a = request.cookies.get('auth_token')) === null || _a === void 0 ? void 0 : _a.value;
                    if (!token) {
                        return [2 /*return*/, unauthorizedResponse('No authentication token')];
                    }
                    decoded = void 0;
                    try {
                        decoded = jwt.verify(token, JWT_SECRET);
                    }
                    catch (err) {
                        return [2 /*return*/, unauthorizedResponse('Invalid or expired token')];
                    }
                    if (decoded.role !== 'warden') {
                        return [2 /*return*/, forbiddenResponse('Only wardens can access this resource')];
                    }
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, User.findById(decoded.id)];
                case 2:
                    warden = _b.sent();
                    if (!warden) {
                        return [2 /*return*/, successResponse({ students: [], hostelName: '', wardenName: '' }, 'No warden found')];
                    }
                    query = { role: 'student' };
                    if (warden.hostelId) {
                        query.hostelId = warden.hostelId;
                    }
                    else if (warden.hostelLocation) {
                        query.hostelLocation = warden.hostelLocation;
                    }
                    return [4 /*yield*/, User.find(query).select('-password').lean()];
                case 3:
                    students = _b.sent();
                    formattedStudents = students.map(function (student) { return ({
                        _id: student._id,
                        name: student.name,
                        phone: student.phone,
                        email: student.email,
                        dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('en-GB') : 'N/A',
                        native: student.native,
                        course: student.course,
                        college: student.college,
                        date_of_joining: student.createdAt,
                        roomNumber: student.roomNumber ? String(student.roomNumber).padStart(3, '0') : null,
                        bedNumber: student.bedNumber ? student.bedNumber : null,
                        roomId: student.roomId,
                        hostelLocation: student.hostelLocation,
                    }); });
                    return [2 /*return*/, successResponse({
                            students: formattedStudents,
                            hostelName: warden.hostelLocation || 'Assigned Hostel',
                            wardenName: warden.name
                        }, 'Students fetched successfully')];
                case 4:
                    error_1 = _b.sent();
                    console.error('Warden students error:', error_1);
                    return [2 /*return*/, serverErrorResponse('Failed to fetch students')];
                case 5: return [2 /*return*/];
            }
        });
    });
}
