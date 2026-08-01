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
import Admin from '@/models/Admin';
export function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, action, username, password, adminPassword, ADMIN_INIT_PASSWORD, defaultAdmins, result, existingAdmin, newAdmin, admins, result, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 16, , 17]);
                    return [4 /*yield*/, request.json()];
                case 1:
                    _a = _b.sent(), action = _a.action, username = _a.username, password = _a.password, adminPassword = _a.adminPassword;
                    ADMIN_INIT_PASSWORD = process.env.ADMIN_INIT_PASSWORD || 'init@2024';
                    if (!(action === 'init')) return [3 /*break*/, 5];
                    // Initialize default admins
                    if (adminPassword !== ADMIN_INIT_PASSWORD) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Invalid initialization password' }, { status: 401 })];
                    }
                    return [4 /*yield*/, connectToDatabase()];
                case 2:
                    _b.sent();
                    defaultAdmins = [
                        { username: 'admin', password: 'admin123' },
                        { username: 'superadmin', password: 'superadmin@2024' },
                        { username: 'hostel_admin', password: 'hostel@123' }
                    ];
                    // Clear existing admins
                    return [4 /*yield*/, Admin.deleteMany({})];
                case 3:
                    // Clear existing admins
                    _b.sent();
                    return [4 /*yield*/, Admin.insertMany(defaultAdmins)];
                case 4:
                    result = _b.sent();
                    return [2 /*return*/, NextResponse.json({
                            success: true,
                            message: 'Admin accounts initialized',
                            count: result.length,
                            admins: result.map(function (a) { return ({ username: a.username, _id: a._id }); })
                        })];
                case 5:
                    if (!(action === 'add')) return [3 /*break*/, 9];
                    // Add single admin
                    if (!username || !password) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Username and password required' }, { status: 400 })];
                    }
                    return [4 /*yield*/, connectToDatabase()];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, Admin.findOne({
                            username: username.toLowerCase().trim()
                        })];
                case 7:
                    existingAdmin = _b.sent();
                    if (existingAdmin) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Admin username already exists' }, { status: 400 })];
                    }
                    return [4 /*yield*/, Admin.create({
                            username: username.toLowerCase().trim(),
                            password: password
                        })];
                case 8:
                    newAdmin = _b.sent();
                    return [2 /*return*/, NextResponse.json({
                            success: true,
                            message: 'Admin added successfully',
                            admin: { username: newAdmin.username, _id: newAdmin._id }
                        })];
                case 9:
                    if (!(action === 'list')) return [3 /*break*/, 12];
                    // List all admins
                    return [4 /*yield*/, connectToDatabase()];
                case 10:
                    // List all admins
                    _b.sent();
                    return [4 /*yield*/, Admin.find({}).select('username createdAt').lean()];
                case 11:
                    admins = _b.sent();
                    return [2 /*return*/, NextResponse.json({
                            success: true,
                            admins: admins,
                            count: admins.length
                        })];
                case 12:
                    if (!(action === 'delete')) return [3 /*break*/, 15];
                    // Delete admin by username
                    if (!username) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Username required' }, { status: 400 })];
                    }
                    return [4 /*yield*/, connectToDatabase()];
                case 13:
                    _b.sent();
                    return [4 /*yield*/, Admin.deleteOne({
                            username: username.toLowerCase().trim()
                        })];
                case 14:
                    result = _b.sent();
                    if (result.deletedCount === 0) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Admin not found' }, { status: 404 })];
                    }
                    return [2 /*return*/, NextResponse.json({
                            success: true,
                            message: 'Admin deleted successfully'
                        })];
                case 15: return [2 /*return*/, NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 })];
                case 16:
                    error_1 = _b.sent();
                    console.error('Admin management error:', error_1);
                    return [2 /*return*/, NextResponse.json({ success: false, message: 'Server error', details: error_1.message }, { status: 500 })];
                case 17: return [2 /*return*/];
            }
        });
    });
}
