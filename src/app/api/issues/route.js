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
import Issue from '@/models/Issue';
import User from '@/models/User';
import { withProtection } from '@/lib/protected-routes';
import { successResponse, serverErrorResponse, unauthorizedResponse, notFoundResponse, badRequestResponse } from '@/lib/api-response';
export var GET = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, withProtection(function (request, user) { return __awaiter(void 0, void 0, void 0, function () {
                var issues, warden_1, transformedIssues, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 9, , 10]);
                            return [4 /*yield*/, connectToDatabase()];
                        case 1:
                            _a.sent();
                            issues = [];
                            if (!(user.role === 'student')) return [3 /*break*/, 3];
                            return [4 /*yield*/, Issue.find({ studentId: user.id })
                                    .populate('assignedTo', 'name')
                                    .sort({ createdAt: -1 })
                                    .lean()];
                        case 2:
                            // Students see only their issues
                            issues = _a.sent();
                            return [3 /*break*/, 8];
                        case 3:
                            if (!(user.role === 'warden')) return [3 /*break*/, 6];
                            return [4 /*yield*/, User.findById(user.id).lean()];
                        case 4:
                            warden_1 = _a.sent();
                            if (!warden_1) {
                                return [2 /*return*/, notFoundResponse('Warden')];
                            }
                            return [4 /*yield*/, Issue.find()
                                    .populate('studentId', 'name hostelLocation')
                                    .populate('assignedTo', 'name')
                                    .sort({ createdAt: -1 })
                                    .lean()];
                        case 5:
                            issues = _a.sent();
                            // Filter by hostel location
                            issues = issues.filter(function (issue) { var _a; return ((_a = issue.studentId) === null || _a === void 0 ? void 0 : _a.hostelLocation) === warden_1.hostelLocation; });
                            return [3 /*break*/, 8];
                        case 6:
                            if (!(user.role === 'admin')) return [3 /*break*/, 8];
                            return [4 /*yield*/, Issue.find()
                                    .populate('studentId', 'name hostelLocation')
                                    .populate('assignedTo', 'name')
                                    .sort({ createdAt: -1 })
                                    .lean()];
                        case 7:
                            // Admins see all issues
                            issues = _a.sent();
                            _a.label = 8;
                        case 8:
                            transformedIssues = issues.map(function (issue) { return ({
                                _id: issue._id,
                                title: issue.title,
                                description: issue.description,
                                category: issue.category,
                                status: issue.status,
                                priority: issue.priority,
                                createdAt: issue.createdAt,
                                assignedTo: issue.assignedTo,
                                studentId: issue.studentId,
                            }); });
                            return [2 /*return*/, successResponse({ issues: transformedIssues }, 'Issues retrieved successfully')];
                        case 9:
                            error_1 = _a.sent();
                            console.error('Issues fetch error:', error_1);
                            return [2 /*return*/, serverErrorResponse('Failed to fetch issues')];
                        case 10: return [2 /*return*/];
                    }
                });
            }); })(req)];
    });
}); };
export var POST = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, withProtection(function (request, user) { return __awaiter(void 0, void 0, void 0, function () {
                var body, title, description, category, priority, student, count, ticketNumber, issue, dbError_1, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 9, , 10]);
                            // Only students and wardens can report issues
                            if (!['student', 'warden'].includes(user.role)) {
                                return [2 /*return*/, unauthorizedResponse('Only students and wardens can report issues')];
                            }
                            return [4 /*yield*/, request.json()];
                        case 1:
                            body = _a.sent();
                            title = body.title, description = body.description, category = body.category, priority = body.priority;
                            // Validate required fields
                            if (!title || !description) {
                                return [2 /*return*/, badRequestResponse('Title and description are required')];
                            }
                            if (typeof title !== 'string' || typeof description !== 'string') {
                                return [2 /*return*/, badRequestResponse('Title and description must be text')];
                            }
                            return [4 /*yield*/, connectToDatabase()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, User.findById(user.id).lean()];
                        case 3:
                            student = _a.sent();
                            if (!student) {
                                console.error('Student not found with ID:', user.id);
                                return [2 /*return*/, notFoundResponse('User')];
                            }
                            if (!student.hostelId) {
                                return [2 /*return*/, badRequestResponse('You are not assigned to a hostel. Please contact administration to assign you a hostel.')];
                            }
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 7, , 8]);
                            return [4 /*yield*/, Issue.countDocuments()];
                        case 5:
                            count = _a.sent();
                            ticketNumber = "TKT-".concat(Date.now().toString().slice(-8), "-").concat((count + 1).toString().padStart(4, '0'));
                            issue = new Issue({
                                ticketNumber: ticketNumber,
                                studentId: user.id,
                                hostelId: student.hostelId,
                                title: title.trim(),
                                description: description.trim(),
                                category: category || 'maintenance',
                                priority: priority || 'medium',
                                reportedBy: student.name,
                                status: 'pending',
                            });
                            return [4 /*yield*/, issue.save()];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, successResponse({
                                    issue: {
                                        id: issue._id.toString(),
                                        ticketNumber: issue.ticketNumber,
                                        title: issue.title,
                                        status: issue.status,
                                    },
                                }, 'Issue reported successfully', 201)];
                        case 7:
                            dbError_1 = _a.sent();
                            console.error('Database error saving issue:', dbError_1);
                            return [2 /*return*/, serverErrorResponse("Failed to save issue: ".concat(dbError_1.message))];
                        case 8: return [3 /*break*/, 10];
                        case 9:
                            error_2 = _a.sent();
                            console.error('Issue creation error:', error_2);
                            return [2 /*return*/, serverErrorResponse("Failed to create issue: ".concat(error_2.message))];
                        case 10: return [2 /*return*/];
                    }
                });
            }); })(req)];
    });
}); };
