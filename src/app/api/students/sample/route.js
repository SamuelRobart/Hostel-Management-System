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
    createdAt: Date
});
export function GET() {
    return __awaiter(this, void 0, void 0, function () {
        var hostelLocations, sampleStudents, _i, hostelLocations_1, location_1, collectionName, collections, StudentModel, student, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _a.sent();
                    hostelLocations = ['perur', 'singanallur', 'peelamedu', 'goundampalayam', 'vellakinar'];
                    sampleStudents = [];
                    _i = 0, hostelLocations_1 = hostelLocations;
                    _a.label = 2;
                case 2:
                    if (!(_i < hostelLocations_1.length)) return [3 /*break*/, 8];
                    location_1 = hostelLocations_1[_i];
                    collectionName = "students_".concat(location_1);
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 6, , 7]);
                    if (!mongoose.connection.db)
                        return [3 /*break*/, 7];
                    return [4 /*yield*/, mongoose.connection.db.listCollections({ name: collectionName }).toArray()];
                case 4:
                    collections = _a.sent();
                    if (collections.length === 0)
                        return [3 /*break*/, 7];
                    StudentModel = mongoose.models[collectionName] ||
                        mongoose.model(collectionName, studentSchema, collectionName);
                    return [4 /*yield*/, StudentModel.findOne({}).limit(1)];
                case 5:
                    student = _a.sent();
                    if (student) {
                        sampleStudents.push({
                            name: student.name,
                            phone: student.phone,
                            dateOfBirth: student.dateOfBirth,
                            hostel: location_1.charAt(0).toUpperCase() + location_1.slice(1)
                        });
                    }
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    return [3 /*break*/, 7];
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8: return [2 /*return*/, NextResponse.json({
                        message: 'Sample student credentials for testing',
                        students: sampleStudents
                    })];
                case 9:
                    error_2 = _a.sent();
                    return [2 /*return*/, NextResponse.json({ error: 'Failed to get sample students' }, { status: 500 })];
                case 10: return [2 /*return*/];
            }
        });
    });
}
