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
export function GET(request) {
    return __awaiter(this, void 0, void 0, function () {
        var token, authHeader, decoded, admin, user, wardens, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _c.sent();
                    token = ((_a = request.cookies.get('auth_token')) === null || _a === void 0 ? void 0 : _a.value) || ((_b = request.cookies.get('token')) === null || _b === void 0 ? void 0 : _b.value);
                    authHeader = request.headers.get('authorization');
                    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
                        token = authHeader.substring(7);
                    }
                    if (!token) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Unauthorized - No token provided' }, { status: 401 })];
                    }
                    decoded = void 0;
                    try {
                        decoded = jwt.verify(token, JWT_SECRET);
                    }
                    catch (error) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Unauthorized - Invalid token' }, { status: 401 })];
                    }
                    admin = null;
                    if (!(decoded.role === 'admin')) return [3 /*break*/, 3];
                    return [4 /*yield*/, Admin.findById(decoded.id || decoded.userId)];
                case 2:
                    admin = _c.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, User.findById(decoded.id || decoded.userId)];
                case 4:
                    user = _c.sent();
                    if (user && user.role === 'admin') {
                        admin = user;
                    }
                    _c.label = 5;
                case 5:
                    if (!admin) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Admin access required' }, { status: 403 })];
                    }
                    return [4 /*yield*/, User.find({ role: 'warden' }).populate('hostelId')];
                case 6:
                    wardens = _c.sent();
                    return [2 /*return*/, NextResponse.json({
                            success: true,
                            wardens: wardens,
                            count: wardens.length
                        })];
                case 7:
                    error_1 = _c.sent();
                    console.error('Error fetching wardens:', error_1);
                    return [2 /*return*/, NextResponse.json({ success: false, error: 'Failed to fetch wardens', details: error_1.message }, { status: 500 })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
