'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, Building, Phone, Calendar, Mail, MapPin, AlertCircle, Menu as MenuIcon, Ticket } from 'lucide-react';
export default function StudentDashboard() {
    var _this = this;
    var _a = useState(null), student = _a[0], setStudent = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState({ open: 0, inProgress: 0, resolved: 0, closed: 0 }), issueStats = _c[0], setIssueStats = _c[1];
    var router = useRouter();
    useEffect(function () {
        var fetchProfile = function () { return __awaiter(_this, void 0, void 0, function () {
            var token, headers, fetchOpts, _a, profileRes, issuesRes, hasLocalUser, data, localUser, issuesData, next, _i, _b, i, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, 6, 7]);
                        token = localStorage.getItem('token');
                        headers = {};
                        if (token)
                            headers['Authorization'] = "Bearer ".concat(token);
                        fetchOpts = { credentials: 'include', headers: headers };
                        return [4 /*yield*/, Promise.all([
                                fetch('/api/student/profile', fetchOpts),
                                fetch('/api/issues', fetchOpts),
                            ])];
                    case 1:
                        _a = _c.sent(), profileRes = _a[0], issuesRes = _a[1];
                        if (profileRes.status === 401) {
                            hasLocalUser = localStorage.getItem('user');
                            if (!hasLocalUser) {
                                router.push('/student-login');
                            }
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, profileRes.json()];
                    case 2:
                        data = _c.sent();
                        if (data.student) {
                            setStudent(data.student);
                            // Always sync localStorage with the latest room/bed from DB
                            // This ensures warden reassignments are visible without re-login
                            try {
                                localUser = JSON.parse(localStorage.getItem('user') || '{}');
                                localStorage.setItem('user', JSON.stringify(__assign(__assign({}, localUser), { roomNumber: data.student.roomNumber, bedNumber: data.student.bedNumber, hostelLocation: data.student.hostelLocation })));
                            }
                            catch (_d) { }
                        }
                        if (!issuesRes.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, issuesRes.json()];
                    case 3:
                        issuesData = _c.sent();
                        if (issuesData.success && Array.isArray(issuesData.issues)) {
                            next = { open: 0, inProgress: 0, resolved: 0, closed: 0 };
                            for (_i = 0, _b = issuesData.issues; _i < _b.length; _i++) {
                                i = _b[_i];
                                if (i.status === 'pending')
                                    next.open += 1;
                                else if (i.status === 'in-progress')
                                    next.inProgress += 1;
                                else if (i.status === 'resolved')
                                    next.resolved += 1;
                                else if (i.status === 'closed')
                                    next.closed += 1;
                            }
                            setIssueStats(next);
                        }
                        _c.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        error_1 = _c.sent();
                        console.error('Error loading profile:', error_1);
                        return [3 /*break*/, 7];
                    case 6:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        fetchProfile();
    }, [router]);
    var handleLogout = function () {
        router.push('/logout');
    };
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    if (!student) {
        return <div className="min-h-screen flex items-center justify-center">Profile not found.</div>;
    }
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="bg-white/80 backdrop-blur border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Student Dashboard</p>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{student.name}</h1>
                            <p className="text-sm text-gray-600 mt-1">
                                {student.course} {student.college ? "\u2022 ".concat(student.college) : ''}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={function () { return router.push('/student/issues'); }} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 text-sm">
                                <Ticket className="h-4 w-4"/>
                                Raise Ticket
                            </button>
                            <button onClick={function () { return router.push('/student/menu'); }} className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-2 text-sm">
                                <MenuIcon className="h-4 w-4"/>
                                Menu
                            </button>
                            <button onClick={function () { return router.push('/student/profile'); }} className="px-4 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center gap-2 text-sm">
                                <User className="h-4 w-4"/>
                                Profile
                            </button>
                            <button onClick={handleLogout} className="px-4 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center gap-2 text-sm">
                                <LogOut className="h-4 w-4"/>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <p className="text-sm text-gray-500">Hostel</p>
                        <p className="text-lg font-semibold text-gray-900 mt-1">{student.hostelLocation || 'Not assigned'}</p>
                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                            <Building className="h-4 w-4"/>
                            Allocation managed by warden
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <p className="text-sm text-gray-500">Room / Bed</p>
                        {student.roomNumber ? (<p className="text-lg font-semibold text-gray-900 mt-1">
                                Room {student.roomNumber}{student.bedNumber ? " \u2022 Bed ".concat(student.bedNumber) : ''}
                            </p>) : (<p className="text-lg font-semibold text-gray-900 mt-1">Not assigned</p>)}
                        <div className="mt-3 text-xs text-gray-500">Keep your bed card details safe.</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <p className="text-sm text-gray-500">Open Tickets</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{issueStats.open + issueStats.inProgress}</p>
                        <p className="text-xs text-gray-500 mt-2">
                            Pending: {issueStats.open} • In progress: {issueStats.inProgress}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <p className="text-sm text-gray-500">Resolved</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{issueStats.resolved + issueStats.closed}</p>
                        <p className="text-xs text-gray-500 mt-2">
                            Resolved: {issueStats.resolved} • Closed: {issueStats.closed}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900">Quick details</h2>
                        <p className="text-sm text-gray-500 mt-1">Your account information.</p>

                        <div className="mt-5 space-y-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-gray-400 mt-0.5"/>
                                <div>
                                    <p className="text-sm text-gray-500">Date of birth</p>
                                    <p className="text-gray-900">{student.dateOfBirth}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-gray-400 mt-0.5"/>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="text-gray-900 font-mono">{student.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-gray-400 mt-0.5"/>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-gray-900">{student.email || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-gray-400 mt-0.5"/>
                                <div>
                                    <p className="text-sm text-gray-500">Native place</p>
                                    <p className="text-gray-900">{student.native || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900">Support</h2>
                        <p className="text-sm text-gray-500 mt-1">Need help? Raise a ticket with the right category.</p>

                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button onClick={function () { return router.push('/student/issues'); }} className="w-full px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-left">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="h-5 w-5 text-blue-600"/>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Raise a ticket</p>
                                        <p className="text-xs text-gray-500">Maintenance, food, security…</p>
                                    </div>
                                </div>
                            </button>
                            <button onClick={function () { return router.push('/student/menu'); }} className="w-full px-4 py-3 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-left">
                                <div className="flex items-center gap-3">
                                    <MenuIcon className="h-5 w-5 text-emerald-600"/>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">View menu</p>
                                        <p className="text-xs text-gray-500">Weekly breakfast/lunch/dinner</p>
                                    </div>
                                </div>
                            </button>
                            <button onClick={function () { return router.push('/student/profile'); }} className="w-full px-4 py-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-left">
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-purple-600"/>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">My profile</p>
                                        <p className="text-xs text-gray-500">Room/bed and details</p>
                                    </div>
                                </div>
                            </button>
                            <button onClick={handleLogout} className="w-full px-4 py-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 text-left">
                                <div className="flex items-center gap-3">
                                    <LogOut className="h-5 w-5 text-red-600"/>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Logout</p>
                                        <p className="text-xs text-gray-500">End this session safely</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}
