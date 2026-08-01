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
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';
export function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var data, token, authHeader, decoded, admin, user, existing, warden, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, request.json()];
                case 2:
                    data = _c.sent();
                    token = ((_a = request.cookies.get('auth_token')) === null || _a === void 0 ? void 0 : _a.value) || ((_b = request.cookies.get('token')) === null || _b === void 0 ? void 0 : _b.value);
                    authHeader = request.headers.get('authorization');
                    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
                        token = authHeader.substring(7);
                    }
                    console.log('Warden creation request - Token found:', !!token);
                    if (!token) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Unauthorized - No token provided' }, { status: 401 })];
                    }
                    decoded = void 0;
                    try {
                        decoded = jwt.verify(token, JWT_SECRET);
                    }
                    catch (error) {
                        console.log('Token verification failed:', error);
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Unauthorized - Invalid token' }, { status: 401 })];
                    }
                    admin = null;
                    if (!(decoded.role === 'admin')) return [3 /*break*/, 4];
                    return [4 /*yield*/, Admin.findById(decoded.id || decoded.userId)];
                case 3:
                    admin = _c.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, User.findById(decoded.id || decoded.userId)];
                case 5:
                    user = _c.sent();
                    if (user && user.role === 'admin') {
                        admin = user;
                    }
                    _c.label = 6;
                case 6:
                    if (!admin) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Admin access required' }, { status: 403 })];
                    }
                    if (!data.name || !data.phone || !data.password || !data.username) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Name, username, phone and password are required' }, { status: 400 })];
                    }
                    return [4 /*yield*/, User.findOne({
                            $or: [{ phone: data.phone }, { username: data.username }]
                        })];
                case 7:
                    existing = _c.sent();
                    if (existing) {
                        return [2 /*return*/, NextResponse.json({
                                success: false,
                                message: existing.phone === data.phone ? 'Phone already exists' : 'Username already exists'
                            }, { status: 400 })];
                    }
                    warden = new User({
                        name: data.name,
                        username: data.username,
                        phone: data.phone,
                        password: data.password,
                        role: 'warden',
                        hostelId: data.hostelId,
                        createdAt: new Date()
                    });
                    return [4 /*yield*/, warden.save()];
                case 8:
                    _c.sent();
                    return [2 /*return*/, NextResponse.json({ success: true, message: 'Warden created successfully', warden: warden })];
                case 9:
                    error_1 = _c.sent();
                    console.error('Error creating warden:', error_1);
                    return [2 /*return*/, NextResponse.json({ success: false, message: 'Failed to create warden', details: error_1.message }, { status: 500 })];
                case 10: return [2 /*return*/];
            }
        });
    });
}
