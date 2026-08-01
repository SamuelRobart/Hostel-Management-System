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
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Room from '@/models/Room';
import User from '@/models/User';
import Hostel from '@/models/Hostel';
import { getAuthUser } from '@/utils/auth-helpers';
export function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var authUser, _a, roomId, bedNumber_1, studentId_1, room, student, bed, prevRoom, prevBed, hostel, _b, _c, _d, error_1;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 14, , 15]);
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _f.sent();
                    authUser = getAuthUser(request);
                    if (!authUser || (authUser.role !== 'admin' && authUser.role !== 'warden')) {
                        return [2 /*return*/, NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 })];
                    }
                    return [4 /*yield*/, request.json()];
                case 2:
                    _a = _f.sent(), roomId = _a.roomId, bedNumber_1 = _a.bedNumber, studentId_1 = _a.studentId;
                    return [4 /*yield*/, Room.findById(roomId)];
                case 3:
                    room = _f.sent();
                    if (!room) {
                        return [2 /*return*/, NextResponse.json({ success: false, error: 'Room not found' }, { status: 404 })];
                    }
                    return [4 /*yield*/, User.findById(studentId_1)];
                case 4:
                    student = _f.sent();
                    if (!student || student.role !== 'student') {
                        return [2 /*return*/, NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 })];
                    }
                    bed = room.beds.find(function (b) { return b.bedNumber === bedNumber_1; });
                    if (!bed) {
                        return [2 /*return*/, NextResponse.json({ success: false, error: 'Bed not found' }, { status: 404 })];
                    }
                    if (bed.isOccupied) {
                        return [2 /*return*/, NextResponse.json({ success: false, error: 'Bed is already occupied' }, { status: 400 })];
                    }
                    if (!student.roomId) return [3 /*break*/, 7];
                    return [4 /*yield*/, Room.findById(student.roomId)];
                case 5:
                    prevRoom = _f.sent();
                    if (!prevRoom) return [3 /*break*/, 7];
                    prevBed = prevRoom.beds.find(function (b) { var _a; return ((_a = b.studentId) === null || _a === void 0 ? void 0 : _a.toString()) === studentId_1; });
                    if (!prevBed) return [3 /*break*/, 7];
                    prevBed.isOccupied = false;
                    prevBed.studentId = undefined;
                    prevBed.occupiedAt = undefined;
                    prevRoom.currentOccupancy -= 1;
                    return [4 /*yield*/, prevRoom.save()];
                case 6:
                    _f.sent();
                    _f.label = 7;
                case 7:
                    // Assign new bed
                    bed.isOccupied = true;
                    bed.studentId = student._id;
                    bed.occupiedAt = new Date();
                    room.currentOccupancy += 1;
                    // Update student
                    student.roomId = room._id;
                    student.roomNumber = room.roomNumber;
                    student.bedNumber = bedNumber_1;
                    if (!student.hostelId) {
                        student.hostelId = room.hostelId;
                    }
                    return [4 /*yield*/, Promise.all([room.save(), student.save()])];
                case 8:
                    _f.sent();
                    return [4 /*yield*/, Hostel.findById(room.hostelId)];
                case 9:
                    hostel = _f.sent();
                    if (!hostel) return [3 /*break*/, 12];
                    _b = hostel;
                    return [4 /*yield*/, User.countDocuments({
                            hostelId: hostel._id,
                            role: 'student'
                        })];
                case 10:
                    _b.currentOccupancy = _f.sent();
                    return [4 /*yield*/, hostel.save()];
                case 11:
                    _f.sent();
                    _f.label = 12;
                case 12:
                    _d = (_c = NextResponse).json;
                    _e = {
                        success: true,
                        message: 'Bed assigned successfully'
                    };
                    return [4 /*yield*/, Room.findById(roomId).populate('beds.studentId', 'name phone')];
                case 13: return [2 /*return*/, _d.apply(_c, [(_e.room = _f.sent(),
                            _e)])];
                case 14:
                    error_1 = _f.sent();
                    console.error('Error assigning bed:', error_1);
                    return [2 /*return*/, NextResponse.json({ success: false, error: 'Failed to assign bed', details: error_1.message }, { status: 500 })];
                case 15: return [2 /*return*/];
            }
        });
    });
}
export function DELETE(request) {
    return __awaiter(this, void 0, void 0, function () {
        var authUser, searchParams, studentId_2, student, room, bed, hostel, _a, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 11, , 12]);
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _b.sent();
                    authUser = getAuthUser(request);
                    if (!authUser || (authUser.role !== 'admin' && authUser.role !== 'warden')) {
                        return [2 /*return*/, NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 })];
                    }
                    searchParams = new URL(request.url).searchParams;
                    studentId_2 = searchParams.get('studentId');
                    if (!studentId_2) {
                        return [2 /*return*/, NextResponse.json({ success: false, error: 'Student ID is required' }, { status: 400 })];
                    }
                    return [4 /*yield*/, User.findById(studentId_2)];
                case 2:
                    student = _b.sent();
                    if (!student || !student.roomId) {
                        return [2 /*return*/, NextResponse.json({ success: false, error: 'Student not assigned to any room' }, { status: 404 })];
                    }
                    return [4 /*yield*/, Room.findById(student.roomId)];
                case 3:
                    room = _b.sent();
                    if (!room) {
                        return [2 /*return*/, NextResponse.json({ success: false, error: 'Room not found' }, { status: 404 })];
                    }
                    bed = room.beds.find(function (b) { var _a; return ((_a = b.studentId) === null || _a === void 0 ? void 0 : _a.toString()) === studentId_2; });
                    if (!bed) return [3 /*break*/, 5];
                    bed.isOccupied = false;
                    bed.studentId = undefined;
                    bed.occupiedAt = undefined;
                    room.currentOccupancy -= 1;
                    return [4 /*yield*/, room.save()];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    // Update student
                    student.roomId = undefined;
                    student.roomNumber = undefined;
                    student.bedNumber = undefined;
                    return [4 /*yield*/, student.save()];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, Hostel.findById(room.hostelId)];
                case 7:
                    hostel = _b.sent();
                    if (!hostel) return [3 /*break*/, 10];
                    _a = hostel;
                    return [4 /*yield*/, User.countDocuments({
                            hostelId: hostel._id,
                            role: 'student'
                        })];
                case 8:
                    _a.currentOccupancy = _b.sent();
                    return [4 /*yield*/, hostel.save()];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10: return [2 /*return*/, NextResponse.json({
                        success: true,
                        message: 'Bed unassigned successfully'
                    })];
                case 11:
                    error_2 = _b.sent();
                    console.error('Error unassigning bed:', error_2);
                    return [2 /*return*/, NextResponse.json({ success: false, error: 'Failed to unassign bed', details: error_2.message }, { status: 500 })];
                case 12: return [2 /*return*/];
            }
        });
    });
}
