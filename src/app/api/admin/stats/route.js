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
import User from '@/models/User';
import Hostel from '@/models/Hostel';
export function GET() {
    return __awaiter(this, void 0, void 0, function () {
        var hostelsData, hostels, mongoose, db, _i, hostelsData_1, hostelDoc, location_1, studentCount, collectionName, collections, error_1, warden, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 14, , 15]);
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, Hostel.find({}).lean()];
                case 2:
                    hostelsData = (_b.sent());
                    hostels = [];
                    mongoose = require('mongoose');
                    db = mongoose.connection.db;
                    _i = 0, hostelsData_1 = hostelsData;
                    _b.label = 3;
                case 3:
                    if (!(_i < hostelsData_1.length)) return [3 /*break*/, 13];
                    hostelDoc = hostelsData_1[_i];
                    location_1 = hostelDoc.location;
                    return [4 /*yield*/, User.countDocuments({
                            role: 'student',
                            $or: [
                                { hostelId: hostelDoc._id },
                                { hostelLocation: location_1 }
                            ]
                        })];
                case 4:
                    studentCount = _b.sent();
                    if (!(studentCount === 0 && db)) return [3 /*break*/, 10];
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 9, , 10]);
                    collectionName = "students_".concat(location_1.toLowerCase());
                    return [4 /*yield*/, db.listCollections({ name: collectionName }).toArray()];
                case 6:
                    collections = _b.sent();
                    if (!(collections.length > 0)) return [3 /*break*/, 8];
                    return [4 /*yield*/, db.collection(collectionName).countDocuments({})];
                case 7:
                    studentCount = _b.sent();
                    _b.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_1 = _b.sent();
                    console.log("No collection found for ".concat(location_1));
                    return [3 /*break*/, 10];
                case 10: return [4 /*yield*/, User.findOne({
                        role: 'warden',
                        $or: [
                            { hostelId: hostelDoc._id },
                            { hostelLocation: location_1 }
                        ]
                    })];
                case 11:
                    warden = _b.sent();
                    hostels.push({
                        _id: hostelDoc._id.toString(),
                        name: location_1,
                        type: hostelDoc.name.toLowerCase().includes('girls') ? 'girls' : 'boys',
                        capacity: hostelDoc.totalCapacity || 35,
                        occupied: studentCount,
                        warden: warden ? {
                            _id: warden._id.toString(),
                            name: warden.name,
                            phone: warden.phone
                        } : null,
                        wardenId: (_a = hostelDoc.wardenId) === null || _a === void 0 ? void 0 : _a.toString()
                    });
                    _b.label = 12;
                case 12:
                    _i++;
                    return [3 /*break*/, 3];
                case 13: return [2 /*return*/, NextResponse.json({
                        success: true,
                        hostels: hostels,
                        summary: {
                            totalHostels: hostels.length,
                            totalCapacity: hostels.reduce(function (sum, h) { return sum + h.capacity; }, 0),
                            totalOccupied: hostels.reduce(function (sum, h) { return sum + h.occupied; }, 0),
                            girlsHostels: hostels.filter(function (h) { return h.type === 'girls'; }).length,
                            boysHostels: hostels.filter(function (h) { return h.type === 'boys'; }).length
                        }
                    })];
                case 14:
                    error_2 = _b.sent();
                    console.error('Stats API Error:', error_2);
                    return [2 /*return*/, NextResponse.json({
                            error: 'Failed to fetch stats',
                            details: error_2.message
                        }, { status: 500 })];
                case 15: return [2 /*return*/];
            }
        });
    });
}
