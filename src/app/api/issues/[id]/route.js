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
import { withProtection } from '@/lib/protected-routes';
import { successResponse, badRequestResponse, unauthorizedResponse, notFoundResponse, serverErrorResponse } from '@/lib/api-response';
export var PATCH = function (req_1, _a) { return __awaiter(void 0, [req_1, _a], void 0, function (req, _b) {
    var params = _b.params;
    return __generator(this, function (_c) {
        return [2 /*return*/, withProtection(function (request, user) { return __awaiter(void 0, void 0, void 0, function () {
                var body, status_1, resolutionNotes, validStatuses, issue, updateData, updatedIssue, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            // Only wardens and admins can update issues
                            if (!['warden', 'admin'].includes(user.role)) {
                                return [2 /*return*/, unauthorizedResponse('Only wardens and admins can update issues')];
                            }
                            return [4 /*yield*/, request.json()];
                        case 1:
                            body = _a.sent();
                            status_1 = body.status, resolutionNotes = body.resolutionNotes;
                            // Validate required fields
                            if (!status_1) {
                                return [2 /*return*/, badRequestResponse('Status is required')];
                            }
                            validStatuses = ['pending', 'in-progress', 'resolved', 'closed'];
                            if (!validStatuses.includes(status_1)) {
                                return [2 /*return*/, badRequestResponse("Invalid status. Must be one of: ".concat(validStatuses.join(', ')))];
                            }
                            return [4 /*yield*/, connectToDatabase()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, Issue.findById(params.id).lean()];
                        case 3:
                            issue = _a.sent();
                            if (!issue) {
                                return [2 /*return*/, notFoundResponse('Issue')];
                            }
                            updateData = {
                                status: status_1,
                            };
                            if (status_1 === 'in-progress' && !issue.assignedTo) {
                                updateData.assignedTo = user.id;
                            }
                            if (status_1 === 'resolved') {
                                updateData.resolvedAt = new Date();
                                updateData.assignedTo = user.id;
                                if (resolutionNotes) {
                                    updateData.resolutionNotes = resolutionNotes;
                                }
                            }
                            if (status_1 === 'closed') {
                                updateData.closedAt = new Date();
                                if (!issue.resolvedAt) {
                                    updateData.resolvedAt = new Date();
                                }
                                if (resolutionNotes) {
                                    updateData.resolutionNotes = resolutionNotes;
                                }
                            }
                            return [4 /*yield*/, Issue.findByIdAndUpdate(params.id, updateData, {
                                    new: true,
                                }).lean()];
                        case 4:
                            updatedIssue = (_a.sent());
                            return [2 /*return*/, successResponse({
                                    issue: {
                                        id: updatedIssue === null || updatedIssue === void 0 ? void 0 : updatedIssue._id,
                                        status: updatedIssue === null || updatedIssue === void 0 ? void 0 : updatedIssue.status,
                                        assignedTo: updatedIssue === null || updatedIssue === void 0 ? void 0 : updatedIssue.assignedTo,
                                        resolvedAt: updatedIssue === null || updatedIssue === void 0 ? void 0 : updatedIssue.resolvedAt,
                                    },
                                }, 'Issue status updated successfully')];
                        case 5:
                            error_1 = _a.sent();
                            console.error('Issue update error:', error_1);
                            return [2 /*return*/, serverErrorResponse('Failed to update issue')];
                        case 6: return [2 /*return*/];
                    }
                });
            }); })(req)];
    });
}); };
