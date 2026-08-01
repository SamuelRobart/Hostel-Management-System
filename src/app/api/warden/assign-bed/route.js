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
import Room from '@/models/Room';
import RoomAssignmentLog from '@/models/RoomAssignmentLog';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';
import { successResponse, badRequestResponse, forbiddenResponse, notFoundResponse, serverErrorResponse } from '@/lib/api-response';
export function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var token, decoded, warden, _a, studentId_1, roomId, bedNumber, bedNum_1, room, student, bedIndex, bed, previousRoomId, previousRoomNumber, previousBedNumber, isReassignment, oldRoom, oldBedIndex, logEntry, error_1;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 11, , 12]);
                    token = (_b = request.cookies.get('auth_token')) === null || _b === void 0 ? void 0 : _b.value;
                    if (!token) {
                        return [2 /*return*/, forbiddenResponse('No authentication token')];
                    }
                    decoded = void 0;
                    try {
                        decoded = jwt.verify(token, JWT_SECRET);
                    }
                    catch (err) {
                        return [2 /*return*/, forbiddenResponse('Invalid or expired token')];
                    }
                    if (decoded.role !== 'warden') {
                        return [2 /*return*/, forbiddenResponse('Only wardens can assign beds')];
                    }
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, User.findById(decoded.id)];
                case 2:
                    warden = _c.sent();
                    if (!warden) {
                        return [2 /*return*/, notFoundResponse('Warden not found')];
                    }
                    return [4 /*yield*/, request.json()];
                case 3:
                    _a = _c.sent(), studentId_1 = _a.studentId, roomId = _a.roomId, bedNumber = _a.bedNumber;
                    if (!studentId_1 || !roomId || bedNumber === undefined || bedNumber === '') {
                        return [2 /*return*/, badRequestResponse('Missing required fields: studentId, roomId, bedNumber')];
                    }
                    bedNum_1 = typeof bedNumber === 'string' ? parseInt(bedNumber, 10) : bedNumber;
                    if (isNaN(bedNum_1)) {
                        return [2 /*return*/, badRequestResponse('Invalid bed number')];
                    }
                    return [4 /*yield*/, Room.findById(roomId)];
                case 4:
                    room = _c.sent();
                    if (!room) {
                        return [2 /*return*/, notFoundResponse('Room not found')];
                    }
                    // Verify room belongs to warden's hostel (check both hostelId and hostelLocation)
                    if (warden.hostelId && room.hostelId && room.hostelId.toString() !== warden.hostelId.toString()) {
                        return [2 /*return*/, forbiddenResponse('Room does not belong to your hostel')];
                    }
                    if (warden.hostelLocation && room.hostelLocation && room.hostelLocation !== warden.hostelLocation) {
                        return [2 /*return*/, forbiddenResponse('Room does not belong to your hostel')];
                    }
                    return [4 /*yield*/, User.findById(studentId_1)];
                case 5:
                    student = _c.sent();
                    if (!student) {
                        return [2 /*return*/, notFoundResponse('Student not found')];
                    }
                    if (student.role !== 'student') {
                        return [2 /*return*/, badRequestResponse('User is not a student')];
                    }
                    // Verify student belongs to warden's hostel (check both hostelId and hostelLocation)
                    if (warden.hostelId && student.hostelId && student.hostelId.toString() !== warden.hostelId.toString()) {
                        return [2 /*return*/, forbiddenResponse('Student does not belong to your hostel')];
                    }
                    if (warden.hostelLocation && student.hostelLocation && student.hostelLocation !== warden.hostelLocation) {
                        return [2 /*return*/, forbiddenResponse('Student does not belong to your hostel')];
                    }
                    // Check if bed is within valid range (1 to capacity)
                    if (bedNum_1 < 1 || bedNum_1 > room.capacity) {
                        return [2 /*return*/, badRequestResponse("Bed number must be between 1 and ".concat(room.capacity))];
                    }
                    bedIndex = room.beds.findIndex(function (b) { return b.bedNumber === bedNum_1; });
                    if (bedIndex === -1) {
                        return [2 /*return*/, badRequestResponse('Bed not found in room')];
                    }
                    bed = room.beds[bedIndex];
                    if (bed.isOccupied && bed.studentId && bed.studentId.toString() !== studentId_1) {
                        return [2 /*return*/, badRequestResponse('Bed is already occupied by another student')];
                    }
                    previousRoomId = null;
                    previousRoomNumber = null;
                    previousBedNumber = null;
                    isReassignment = false;
                    if (!student.roomId) return [3 /*break*/, 8];
                    isReassignment = true;
                    previousRoomId = student.roomId;
                    previousRoomNumber = student.roomNumber;
                    previousBedNumber = student.bedNumber;
                    return [4 /*yield*/, Room.findById(student.roomId)];
                case 6:
                    oldRoom = _c.sent();
                    if (!oldRoom) return [3 /*break*/, 8];
                    oldBedIndex = oldRoom.beds.findIndex(function (b) { return b.studentId && b.studentId.toString() === studentId_1; });
                    if (!(oldBedIndex !== -1)) return [3 /*break*/, 8];
                    oldRoom.beds[oldBedIndex].isOccupied = false;
                    oldRoom.beds[oldBedIndex].studentId = undefined;
                    oldRoom.beds[oldBedIndex].occupiedAt = undefined;
                    oldRoom.currentOccupancy = Math.max(0, oldRoom.currentOccupancy - 1);
                    return [4 /*yield*/, oldRoom.save()];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8:
                    // Assign new bed
                    room.beds[bedIndex].isOccupied = true;
                    room.beds[bedIndex].studentId = student._id;
                    room.beds[bedIndex].occupiedAt = new Date();
                    // Update room occupancy if this is a new assignment
                    if (!student.roomId || student.roomId.toString() !== roomId) {
                        room.currentOccupancy = (room.currentOccupancy || 0) + 1;
                    }
                    // Update student with room and bed info
                    student.roomId = room._id;
                    student.roomNumber = room.roomNumber;
                    student.bedNumber = bedNum_1;
                    return [4 /*yield*/, Promise.all([room.save(), student.save()])];
                case 9:
                    _c.sent();
                    logEntry = new RoomAssignmentLog({
                        studentId: student._id,
                        studentName: student.name,
                        studentPhone: student.phone,
                        hostelId: room.hostelId,
                        roomId: room._id,
                        roomNumber: room.roomNumber,
                        bedNumber: bedNum_1,
                        floor: room.floor,
                        wardenId: warden._id,
                        wardenName: warden.name,
                        action: isReassignment ? 'reassign' : 'assign',
                        previousRoomId: previousRoomId,
                        previousRoomNumber: previousRoomNumber,
                        previousBedNumber: previousBedNumber,
                        assignedAt: new Date(),
                    });
                    return [4 /*yield*/, logEntry.save()];
                case 10:
                    _c.sent();
                    return [2 /*return*/, successResponse({
                            student: {
                                id: student._id,
                                name: student.name,
                                roomNumber: room.roomNumber,
                                bedNumber: bedNumber,
                                roomId: room._id
                            },
                            room: {
                                id: room._id,
                                roomNumber: room.roomNumber,
                                currentOccupancy: room.currentOccupancy
                            }
                        }, 'Bed assigned successfully')];
                case 11:
                    error_1 = _c.sent();
                    console.error('Bed assignment error:', error_1);
                    return [2 /*return*/, serverErrorResponse('Failed to assign bed')];
                case 12: return [2 /*return*/];
            }
        });
    });
}
