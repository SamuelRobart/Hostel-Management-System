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
export function GET() {
    return __awaiter(this, void 0, void 0, function () {
        var hostels, girlsNames, fatherNames, motherNames, courses, colleges, castes, totalAdded, _i, hostels_1, hostel, collectionName, StudentModel, students, i, birthDay, birthMonth, birthYear, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _a.sent();
                    hostels = [
                        { location: 'perur', count: 10 },
                        { location: 'goundampalayam', count: 10 },
                        { location: 'nayakkanpalayam', count: 10 }
                    ];
                    girlsNames = ['Priya Sharma', 'Kavitha Raj', 'Meera Devi', 'Lakshmi Priya', 'Divya Kumar', 'Saroja Bai', 'Geetha Rani', 'Shanti Devi', 'Radha Krishnan', 'Kamala Devi'];
                    fatherNames = ['Rajesh Kumar', 'Suresh Babu', 'Raman Raj', 'Vijay Kumar', 'Arun Devi'];
                    motherNames = ['Kamala Devi', 'Priya Lakshmi', 'Meera Bai', 'Saroja Devi', 'Geetha Rani'];
                    courses = ['B.A English', 'B.Sc Mathematics', 'B.A History', 'B.Sc Physics', 'B.A Tamil'];
                    colleges = ['Government Arts College', 'Government Arts and Science College'];
                    castes = ['BC', 'MBC', 'SC'];
                    totalAdded = 0;
                    _i = 0, hostels_1 = hostels;
                    _a.label = 2;
                case 2:
                    if (!(_i < hostels_1.length)) return [3 /*break*/, 6];
                    hostel = hostels_1[_i];
                    collectionName = "students_".concat(hostel.location);
                    StudentModel = mongoose.models[collectionName] ||
                        mongoose.model(collectionName, studentSchema, collectionName);
                    // Clear existing
                    return [4 /*yield*/, StudentModel.deleteMany({})];
                case 3:
                    // Clear existing
                    _a.sent();
                    students = [];
                    for (i = 0; i < hostel.count; i++) {
                        birthDay = Math.floor(Math.random() * 28) + 1;
                        birthMonth = Math.floor(Math.random() * 12) + 1;
                        birthYear = 2003 + Math.floor(Math.random() * 3);
                        students.push({
                            name: girlsNames[i % girlsNames.length],
                            phone: "9".concat(Math.floor(Math.random() * 900000000 + 100000000)),
                            dateOfBirth: "".concat(birthDay.toString().padStart(2, '0'), "/").concat(birthMonth.toString().padStart(2, '0'), "/").concat(birthYear),
                            fatherName: fatherNames[i % fatherNames.length],
                            motherName: motherNames[i % motherNames.length],
                            email: "".concat(girlsNames[i % girlsNames.length].toLowerCase().replace(' ', '.')).concat(i, "@gmail.com"),
                            native: 'Salem District',
                            address: "".concat(i + 1, "/123, Main Street, ").concat(hostel.location),
                            course: courses[i % courses.length],
                            college: colleges[i % colleges.length],
                            income: "\u20B9".concat(Math.floor(Math.random() * 150000 + 50000), " per annum"),
                            percentage12th: "".concat(Math.floor(Math.random() * 20 + 75), "%"),
                            bankDetails: "SBI - 123456789".concat(i),
                            caste: castes[i % castes.length]
                        });
                    }
                    return [4 /*yield*/, StudentModel.insertMany(students)];
                case 4:
                    _a.sent();
                    totalAdded += students.length;
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/, NextResponse.json({
                        success: true,
                        message: "Added ".concat(totalAdded, " students to 3 hostels"),
                        hostels: hostels.map(function (h) { return h.location; })
                    })];
                case 7:
                    error_1 = _a.sent();
                    return [2 /*return*/, NextResponse.json({ error: error_1.message }, { status: 500 })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
