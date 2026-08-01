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
export function POST() {
    return __awaiter(this, void 0, void 0, function () {
        var wardens, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _a.sent();
                    // Delete all users
                    return [4 /*yield*/, User.deleteMany({})];
                case 2:
                    // Delete all users
                    _a.sent();
                    wardens = [
                        { name: 'Ms. Kamala Devi', phone: '9876543210', role: 'warden', password: 'warden123', hostelLocation: 'perur', createdAt: new Date() },
                        { name: 'Ms. Priya Lakshmi', phone: '9876543211', role: 'warden', password: 'warden123', hostelLocation: 'singanallur', createdAt: new Date() },
                        { name: 'Ms. Meera Bai', phone: '9876543212', role: 'warden', password: 'warden123', hostelLocation: 'peelamedu', createdAt: new Date() },
                        { name: 'Ms. Radha Krishnan', phone: '9876543213', role: 'warden', password: 'warden123', hostelLocation: 'goundampalayam', createdAt: new Date() },
                        { name: 'Ms. Saroja Devi', phone: '9876543214', role: 'warden', password: 'warden123', hostelLocation: 'vellakinar', createdAt: new Date() },
                        { name: 'Ms. Lakshmi Priya', phone: '9876543215', role: 'warden', password: 'warden123', hostelLocation: 'kinathukadavu', createdAt: new Date() },
                        { name: 'Ms. Geetha Rani', phone: '9876543216', role: 'warden', password: 'warden123', hostelLocation: 'nayakkanpalayam', createdAt: new Date() },
                        { name: 'Ms. Shanti Devi', phone: '9876543217', role: 'warden', password: 'warden123', hostelLocation: 'thondamuthur', createdAt: new Date() },
                        { name: 'Mr. Raman Kumar', phone: '9876543218', role: 'warden', password: 'warden123', hostelLocation: 'masakkalipalayam_boys', createdAt: new Date() },
                        { name: 'Mr. Suresh Babu', phone: '9876543219', role: 'warden', password: 'warden123', hostelLocation: 'ondipudur_boys', createdAt: new Date() }
                    ];
                    return [4 /*yield*/, User.insertMany(wardens)];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, NextResponse.json({
                            success: true,
                            message: "SUCCESS! Added ".concat(result.length, " wardens to users collection"),
                            count: result.length,
                            wardens: result.map(function (w) { return ({ name: w.name, phone: w.phone, location: w.hostelLocation }); })
                        })];
                case 4:
                    error_1 = _a.sent();
                    console.error('Fix error:', error_1);
                    return [2 /*return*/, NextResponse.json({
                            success: false,
                            message: 'Error: ' + error_1.message,
                            error: error_1.message
                        }, { status: 500 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
