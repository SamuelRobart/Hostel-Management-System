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
export function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name_1, phone, alternatePhone, dateOfBirth, email, fatherName, motherName, native, address, course, college, appliedColleges, income, percentage12th, bankDetails, caste, aadhaarNumber, communityCertificateNumber, photoUrl, documents, hostelLocation, existingStudent, existingAltPhone, existingAadhaar, hostelId, hostel, newStudent, savedStudent, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, request.json()];
                case 2:
                    _a = _b.sent(), name_1 = _a.name, phone = _a.phone, alternatePhone = _a.alternatePhone, dateOfBirth = _a.dateOfBirth, email = _a.email, fatherName = _a.fatherName, motherName = _a.motherName, native = _a.native, address = _a.address, course = _a.course, college = _a.college, appliedColleges = _a.appliedColleges, income = _a.income, percentage12th = _a.percentage12th, bankDetails = _a.bankDetails, caste = _a.caste, aadhaarNumber = _a.aadhaarNumber, communityCertificateNumber = _a.communityCertificateNumber, photoUrl = _a.photoUrl, documents = _a.documents, hostelLocation = _a.hostelLocation;
                    // Validation
                    if (!name_1 || !phone || !dateOfBirth) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Name, Phone, and Date of Birth are required' }, { status: 400 })];
                    }
                    if (!hostelLocation) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Hostel location is required' }, { status: 400 })];
                    }
                    // Phone validation
                    if (!/^\d{10}$/.test(phone)) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Phone number must be 10 digits' }, { status: 400 })];
                    }
                    if (alternatePhone && !/^\d{10}$/.test(alternatePhone)) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Alternate phone must be 10 digits' }, { status: 400 })];
                    }
                    // Aadhaar validation
                    if (aadhaarNumber && !/^\d{12}$/.test(aadhaarNumber)) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Aadhaar number must be 12 digits' }, { status: 400 })];
                    }
                    return [4 /*yield*/, User.findOne({ phone: phone.trim() })];
                case 3:
                    existingStudent = _b.sent();
                    if (existingStudent) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Student with this phone number already exists' }, { status: 400 })];
                    }
                    if (!alternatePhone) return [3 /*break*/, 5];
                    return [4 /*yield*/, User.findOne({ alternatePhone: alternatePhone.trim() })];
                case 4:
                    existingAltPhone = _b.sent();
                    if (existingAltPhone) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Student with this alternate phone already exists' }, { status: 400 })];
                    }
                    _b.label = 5;
                case 5:
                    if (!aadhaarNumber) return [3 /*break*/, 7];
                    return [4 /*yield*/, User.findOne({ aadhaarNumber: aadhaarNumber.trim() })];
                case 6:
                    existingAadhaar = _b.sent();
                    if (existingAadhaar) {
                        return [2 /*return*/, NextResponse.json({ success: false, message: 'Student with this Aadhaar number already registered' }, { status: 400 })];
                    }
                    _b.label = 7;
                case 7:
                    hostelId = undefined;
                    return [4 /*yield*/, Hostel.findOne({ location: hostelLocation.trim() })];
                case 8:
                    hostel = _b.sent();
                    if (hostel) {
                        hostelId = hostel._id;
                    }
                    newStudent = new User({
                        name: name_1.trim(),
                        phone: phone.trim(),
                        alternatePhone: (alternatePhone === null || alternatePhone === void 0 ? void 0 : alternatePhone.trim()) || undefined,
                        dateOfBirth: new Date(dateOfBirth),
                        role: 'student',
                        email: (email === null || email === void 0 ? void 0 : email.trim()) || undefined,
                        fatherName: (fatherName === null || fatherName === void 0 ? void 0 : fatherName.trim()) || undefined,
                        motherName: (motherName === null || motherName === void 0 ? void 0 : motherName.trim()) || undefined,
                        native: (native === null || native === void 0 ? void 0 : native.trim()) || undefined,
                        address: (address === null || address === void 0 ? void 0 : address.trim()) || undefined,
                        course: (course === null || course === void 0 ? void 0 : course.trim()) || undefined,
                        college: (college === null || college === void 0 ? void 0 : college.trim()) || undefined,
                        appliedColleges: appliedColleges || [],
                        income: (income === null || income === void 0 ? void 0 : income.trim()) || undefined,
                        percentage12th: (percentage12th === null || percentage12th === void 0 ? void 0 : percentage12th.trim()) || undefined,
                        bankDetails: (bankDetails === null || bankDetails === void 0 ? void 0 : bankDetails.trim()) || undefined,
                        caste: (caste === null || caste === void 0 ? void 0 : caste.trim()) || undefined,
                        aadhaarNumber: (aadhaarNumber === null || aadhaarNumber === void 0 ? void 0 : aadhaarNumber.trim()) || undefined,
                        communityCertificateNumber: (communityCertificateNumber === null || communityCertificateNumber === void 0 ? void 0 : communityCertificateNumber.trim()) || undefined,
                        photoUrl: (photoUrl === null || photoUrl === void 0 ? void 0 : photoUrl.trim()) || undefined,
                        documents: documents || [],
                        hostelLocation: (hostelLocation === null || hostelLocation === void 0 ? void 0 : hostelLocation.trim()) || undefined,
                        hostelId: hostelId
                    });
                    return [4 /*yield*/, newStudent.save()];
                case 9:
                    savedStudent = _b.sent();
                    return [2 /*return*/, NextResponse.json({
                            success: true,
                            message: 'Student registered successfully',
                            student: {
                                id: savedStudent._id.toString(),
                                name: savedStudent.name,
                                phone: savedStudent.phone,
                                role: savedStudent.role,
                                hostelName: savedStudent.hostelLocation
                            }
                        }, { status: 201 })];
                case 10:
                    error_1 = _b.sent();
                    console.error('Student signup error:', error_1);
                    return [2 /*return*/, NextResponse.json({ success: false, message: 'Server error', details: error_1.message }, { status: 500 })];
                case 11: return [2 /*return*/];
            }
        });
    });
}
