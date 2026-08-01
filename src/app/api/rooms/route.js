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
import Hostel from '@/models/Hostel';
import { getAuthUser } from '@/utils/auth-helpers';
export function GET(request) {
    return __awaiter(this, void 0, void 0, function () {
        var authUser, searchParams, hostelId, floor, block, query, hostels, hostelIds, rooms, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _a.sent();
                    authUser = getAuthUser(request);
                    searchParams = new URL(request.url).searchParams;
                    hostelId = searchParams.get('hostelId');
                    floor = searchParams.get('floor');
                    block = searchParams.get('block');
                    query = {};
                    if (hostelId) {
                        query.hostelId = hostelId;
                    }
                    if (floor) {
                        query.floor = parseInt(floor);
                    }
                    if (block) {
                        query.block = block;
                    }
                    if (!(authUser && authUser.role === 'warden')) return [3 /*break*/, 4];
                    if (!authUser.hostelId) return [3 /*break*/, 2];
                    query.hostelId = authUser.hostelId;
                    return [3 /*break*/, 4];
                case 2:
                    if (!authUser.hostelLocation) return [3 /*break*/, 4];
                    return [4 /*yield*/, Hostel.find({ location: authUser.hostelLocation }).select('_id')];
                case 3:
                    hostels = _a.sent();
                    hostelIds = hostels.map(function (h) { return h._id; });
                    if (hostelIds.length > 0) {
                        query.hostelId = { $in: hostelIds };
                    }
                    _a.label = 4;
                case 4: return [4 /*yield*/, Room.find(query)
                        .populate('hostelId', 'name location')
                        .populate('beds.studentId', 'name phone')
                        .sort({ floor: 1, roomNumber: 1 })
                        .lean()];
                case 5:
                    rooms = _a.sent();
                    return [2 /*return*/, NextResponse.json({
                            success: true,
                            count: rooms.length,
                            rooms: rooms
                        })];
                case 6:
                    error_1 = _a.sent();
                    console.error('Error fetching rooms:', error_1);
                    return [2 /*return*/, NextResponse.json({ success: false, error: 'Failed to fetch rooms', details: error_1.message }, { status: 500 })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
export function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var authUser, data, hostelId, roomNumber, floor, block, capacity, roomType, amenities, hostel, beds, i, room, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _b.sent();
                    authUser = getAuthUser(request);
                    if (!authUser || (authUser.role !== 'admin' && authUser.role !== 'warden')) {
                        return [2 /*return*/, NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 })];
                    }
                    return [4 /*yield*/, request.json()];
                case 2:
                    data = _b.sent();
                    hostelId = data.hostelId, roomNumber = data.roomNumber, floor = data.floor, block = data.block, capacity = data.capacity, roomType = data.roomType, amenities = data.amenities;
                    return [4 /*yield*/, Hostel.findById(hostelId)];
                case 3:
                    hostel = _b.sent();
                    if (!hostel) {
                        return [2 /*return*/, NextResponse.json({ success: false, error: 'Hostel not found' }, { status: 404 })];
                    }
                    // Wardens can only create rooms for their hostel
                    if (authUser.role === 'warden' && ((_a = authUser.hostelId) === null || _a === void 0 ? void 0 : _a.toString()) !== hostelId) {
                        return [2 /*return*/, NextResponse.json({ success: false, error: 'Unauthorized to create rooms for this hostel' }, { status: 403 })];
                    }
                    beds = [];
                    for (i = 1; i <= capacity; i++) {
                        beds.push({
                            bedNumber: i,
                            isOccupied: false,
                        });
                    }
                    room = new Room({
                        hostelId: hostelId,
                        roomNumber: roomNumber,
                        floor: floor,
                        block: block,
                        capacity: capacity,
                        currentOccupancy: 0,
                        beds: beds,
                        roomType: roomType || 'double',
                        amenities: amenities || [],
                    });
                    return [4 /*yield*/, room.save()];
                case 4:
                    _b.sent();
                    // Update hostel room count
                    hostel.totalRooms = (hostel.totalRooms || 0) + 1;
                    hostel.totalBeds = (hostel.totalBeds || 0) + capacity;
                    return [4 /*yield*/, hostel.save()];
                case 5:
                    _b.sent();
                    return [2 /*return*/, NextResponse.json({
                            success: true,
                            message: 'Room created successfully',
                            room: room
                        })];
                case 6:
                    error_2 = _b.sent();
                    console.error('Error creating room:', error_2);
                    return [2 /*return*/, NextResponse.json({ success: false, error: 'Failed to create room', details: error_2.message }, { status: 500 })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
