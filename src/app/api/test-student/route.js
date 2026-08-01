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
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
var studentSchema = new mongoose.Schema({
    name: String,
    phone: String,
    dateOfBirth: String,
    fatherName: String,
    motherName: String,
    email: String,
    native: String,
    address: String,
    course: String,
    college: String,
    income: String,
    percentage12th: String,
    bankDetails: String,
    caste: String,
    createdAt: { type: Date, default: Date.now }
});
export function POST() {
    return __awaiter(this, void 0, void 0, function () {
        var collectionName, StudentModel, testStudent, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _a.sent();
                    collectionName = 'students_perur';
                    StudentModel = mongoose.models[collectionName] ||
                        mongoose.model(collectionName, studentSchema, collectionName);
                    // Delete existing test student
                    return [4 /*yield*/, StudentModel.deleteOne({ phone: '9999999999' })];
                case 2:
                    // Delete existing test student
                    _a.sent();
                    testStudent = {
                        name: 'Test Student',
                        phone: '9999999999',
                        dateOfBirth: '01/01/2004',
                        fatherName: 'Test Father',
                        motherName: 'Test Mother',
                        email: 'test@gmail.com',
                        native: 'Salem District',
                        address: '123 Test Street, Perur',
                        course: 'B.A English',
                        college: 'Government Arts College',
                        income: '₹75000 per annum',
                        percentage12th: '85%',
                        bankDetails: 'SBI - 123456789',
                        caste: 'BC'
                    };
                    return [4 /*yield*/, StudentModel.create(testStudent)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, NextResponse.json({
                            success: true,
                            message: 'Test student created',
                            credentials: {
                                phone: '9999999999',
                                dateOfBirth: '2004-01-01',
                                note: 'Use these exact credentials for student login'
                            }
                        })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, NextResponse.json({ error: error_1.message }, { status: 500 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function GET() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, POST()];
        });
    });
}
