'use client';
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Users, Search, AlertCircle, Home, Bed, User, X, Plus, RefreshCw } from 'lucide-react';
export default function WardenDashboard() {
    var _this = this;
    var _a;
    var _b = useState([]), students = _b[0], setStudents = _b[1];
    var _c = useState([]), rooms = _c[0], setRooms = _c[1];
    var _d = useState(''), hostelName = _d[0], setHostelName = _d[1];
    var _e = useState(true), loading = _e[0], setLoading = _e[1];
    var _f = useState(false), refreshing = _f[0], setRefreshing = _f[1];
    var _g = useState(''), searchTerm = _g[0], setSearchTerm = _g[1];
    var _h = useState({ pending: 0, inProgress: 0, resolved: 0, closed: 0 }), issueStats = _h[0], setIssueStats = _h[1];
    var _j = useState({ rooms: 0, bedsTotal: 0, bedsOccupied: 0 }), roomStats = _j[0], setRoomStats = _j[1];
    var _k = useState(false), showBedModal = _k[0], setShowBedModal = _k[1];
    var _l = useState(null), selectedStudent = _l[0], setSelectedStudent = _l[1];
    var _m = useState(''), selectedRoom = _m[0], setSelectedRoom = _m[1];
    var _o = useState(''), selectedBed = _o[0], setSelectedBed = _o[1];
    var _p = useState(false), assigning = _p[0], setAssigning = _p[1];
    var _q = useState({}), bedOccupancy = _q[0], setBedOccupancy = _q[1];
    var router = useRouter();
    var calculateBedOccupancy = function (studentsList) {
        var occupancy = {};
        studentsList.forEach(function (student) {
            if (student.roomNumber && student.bedNumber) {
                var key = "".concat(student.roomNumber, "-").concat(student.bedNumber);
                occupancy[key] = (occupancy[key] || 0) + 1;
            }
        });
        setBedOccupancy(occupancy);
    };
    // Helper: fetch with auth token from both cookie and Authorization header
    var authFetch = function (url) {
        var token = localStorage.getItem('token');
        var headers = {};
        if (token)
            headers['Authorization'] = "Bearer ".concat(token);
        return fetch(url, { credentials: 'include', headers: headers });
    };
    var fetchAllData = function () {
        var args_1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_1[_i] = arguments[_i];
        }
        return __awaiter(_this, __spreadArray([], args_1, true), void 0, function (isRefresh) {
            var user, userData, _a, studentsRes, issuesRes, roomsRes, anyUnauthorized, studentsData, issuesData, next, _b, _c, i, roomsData, roomsList, bedsTotal, bedsOccupied, bedsTotal, bedsOccupied, error_1;
            var _d, _e, _f;
            if (isRefresh === void 0) { isRefresh = false; }
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (isRefresh)
                            setRefreshing(true);
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 6, 7, 8]);
                        user = localStorage.getItem('user');
                        if (!user) {
                            // Only redirect on initial load, not on manual refresh
                            if (!isRefresh)
                                router.push('/warden-login');
                            return [2 /*return*/];
                        }
                        userData = JSON.parse(user);
                        if (userData.role !== 'warden') {
                            if (!isRefresh)
                                router.push('/login');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Promise.all([
                                authFetch('/api/warden/students'),
                                authFetch('/api/issues'),
                                authFetch('/api/rooms'),
                            ])];
                    case 2:
                        _a = _g.sent(), studentsRes = _a[0], issuesRes = _a[1], roomsRes = _a[2];
                        anyUnauthorized = studentsRes.status === 401 ||
                            issuesRes.status === 401 ||
                            roomsRes.status === 401;
                        if (anyUnauthorized) {
                            if (!isRefresh) {
                                router.push('/warden-login');
                            }
                            // During refresh: silently stop — don't wipe out existing data
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, studentsRes.json()];
                    case 3:
                        studentsData = _g.sent();
                        if (studentsData.success && ((_d = studentsData.data) === null || _d === void 0 ? void 0 : _d.students)) {
                            setStudents(studentsData.data.students);
                            setHostelName(studentsData.data.hostelName);
                            calculateBedOccupancy(studentsData.data.students);
                        }
                        else if (studentsData.students) {
                            setStudents(studentsData.students);
                            setHostelName(studentsData.hostelName);
                            calculateBedOccupancy(studentsData.students);
                        }
                        return [4 /*yield*/, issuesRes.json()];
                    case 4:
                        issuesData = _g.sent();
                        if (issuesData.success && Array.isArray((_e = issuesData.data) === null || _e === void 0 ? void 0 : _e.issues)) {
                            next = { pending: 0, inProgress: 0, resolved: 0, closed: 0 };
                            for (_b = 0, _c = issuesData.data.issues; _b < _c.length; _b++) {
                                i = _c[_b];
                                if (i.status === 'pending')
                                    next.pending += 1;
                                else if (i.status === 'in-progress')
                                    next.inProgress += 1;
                                else if (i.status === 'resolved')
                                    next.resolved += 1;
                                else if (i.status === 'closed')
                                    next.closed += 1;
                            }
                            setIssueStats(next);
                        }
                        return [4 /*yield*/, roomsRes.json()];
                    case 5:
                        roomsData = _g.sent();
                        if (roomsData.success && Array.isArray((_f = roomsData.data) === null || _f === void 0 ? void 0 : _f.rooms)) {
                            roomsList = roomsData.data.rooms;
                            setRooms(roomsList);
                            bedsTotal = roomsList.reduce(function (sum, r) { return sum + (r.capacity || 0); }, 0);
                            bedsOccupied = roomsList.reduce(function (sum, r) { return sum + (r.currentOccupancy || 0); }, 0);
                            setRoomStats({ rooms: roomsList.length, bedsTotal: bedsTotal, bedsOccupied: bedsOccupied });
                        }
                        else if (Array.isArray(roomsData.rooms)) {
                            setRooms(roomsData.rooms);
                            bedsTotal = roomsData.rooms.reduce(function (sum, r) { return sum + (r.capacity || 0); }, 0);
                            bedsOccupied = roomsData.rooms.reduce(function (sum, r) { return sum + (r.currentOccupancy || 0); }, 0);
                            setRoomStats({ rooms: roomsData.rooms.length, bedsTotal: bedsTotal, bedsOccupied: bedsOccupied });
                        }
                        return [3 /*break*/, 8];
                    case 6:
                        error_1 = _g.sent();
                        console.error('Error loading data:', error_1);
                        return [3 /*break*/, 8];
                    case 7:
                        if (isRefresh)
                            setRefreshing(false);
                        else
                            setLoading(false);
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    useEffect(function () {
        fetchAllData();
    }, [router]);
    var handleLogout = function () {
        router.push('/logout');
    };
    var handleAssignBed = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, studentsRes, studentsData, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!selectedStudent || !selectedRoom || selectedBed === '') {
                        alert('Please select student, room, and bed');
                        return [2 /*return*/];
                    }
                    setAssigning(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, 9, 10]);
                    return [4 /*yield*/, fetch('/api/warden/assign-bed', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                studentId: selectedStudent._id,
                                roomId: selectedRoom,
                                bedNumber: selectedBed
                            }),
                            credentials: 'include'
                        })];
                case 2:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _b.sent();
                    if (!data.success) return [3 /*break*/, 6];
                    return [4 /*yield*/, fetch('/api/warden/students', { credentials: 'include' })];
                case 4:
                    studentsRes = _b.sent();
                    return [4 /*yield*/, studentsRes.json()];
                case 5:
                    studentsData = _b.sent();
                    if (studentsData.success && ((_a = studentsData.data) === null || _a === void 0 ? void 0 : _a.students)) {
                        setStudents(studentsData.data.students);
                        calculateBedOccupancy(studentsData.data.students);
                    }
                    else if (studentsData.students) {
                        setStudents(studentsData.students);
                        calculateBedOccupancy(studentsData.students);
                    }
                    setShowBedModal(false);
                    setSelectedStudent(null);
                    setSelectedRoom('');
                    setSelectedBed('');
                    return [3 /*break*/, 7];
                case 6:
                    alert('Error: ' + (data.error || 'Failed to assign bed'));
                    _b.label = 7;
                case 7: return [3 /*break*/, 10];
                case 8:
                    err_1 = _b.sent();
                    alert('Error: ' + err_1.message);
                    return [3 /*break*/, 10];
                case 9:
                    setAssigning(false);
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    var filteredStudents = students.filter(function (student) {
        var _a, _b;
        return ((_a = student.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchTerm.toLowerCase())) ||
            ((_b = student.phone) === null || _b === void 0 ? void 0 : _b.includes(searchTerm));
    });
    if (loading) {
        return (<div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>);
    }
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="bg-white/80 backdrop-blur border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Warden Dashboard</p>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                {hostelName || 'Assigned Hostel'}
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Track students, beds, and issues in one place.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={function () { return fetchAllData(true); }} disabled={refreshing} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400 flex items-center gap-2 text-sm">
                                <RefreshCw className={"h-4 w-4 ".concat(refreshing ? 'animate-spin' : '')}/>
                                {refreshing ? 'Refreshing' : 'Refresh'}
                            </button>
                            <button onClick={function () { return router.push('/warden/rooms'); }} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 text-sm">
                                <Bed className="h-4 w-4"/>
                                Rooms & Beds
                            </button>
                            <button onClick={function () { return router.push('/warden/issues'); }} className="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700 flex items-center gap-2 text-sm">
                                <AlertCircle className="h-4 w-4"/>
                                Issues
                            </button>
                            <button onClick={function () { return router.push('/warden/profile'); }} className="px-4 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center gap-2 text-sm">
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
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Students</p>
                                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                            </div>
                            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Users className="h-5 w-5 text-blue-600"/>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Beds Occupied</p>
                                <p className="text-2xl font-bold text-gray-900">{roomStats.bedsOccupied}/{roomStats.bedsTotal}</p>
                            </div>
                            <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                                <Bed className="h-5 w-5 text-indigo-600"/>
                            </div>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-2 bg-indigo-600 rounded-full" style={{ width: "".concat(roomStats.bedsTotal ? Math.min(100, (roomStats.bedsOccupied / roomStats.bedsTotal) * 100) : 0, "%") }}/>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Pending Issues</p>
                                <p className="text-2xl font-bold text-gray-900">{issueStats.pending}</p>
                            </div>
                            <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center">
                                <AlertCircle className="h-5 w-5 text-orange-600"/>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            In progress: {issueStats.inProgress} • Resolved: {issueStats.resolved} • Closed: {issueStats.closed}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Rooms</p>
                                <p className="text-2xl font-bold text-gray-900">{roomStats.rooms}</p>
                            </div>
                            <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                                <Home className="h-5 w-5 text-emerald-600"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Students</h2>
                            <p className="text-sm text-gray-500">Search and review student details.</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <button onClick={function () { return fetchAllData(true); }} disabled={refreshing} className="p-2 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50" title="Refresh students">
                                <RefreshCw className={"h-4 w-4 ".concat(refreshing ? 'animate-spin' : '')}/>
                            </button>
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"/>
                                <input type="text" placeholder="Search by name or phone..." value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} className="pl-10 w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"/>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room / Bed</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {filteredStudents.map(function (student, index) { return (<tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                            <div className="text-xs text-gray-500">{student.native || '-'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.dateOfBirth}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{student.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {student.roomNumber ? (<span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                                                    Room {student.roomNumber}{student.bedNumber ? " \u2022 Bed ".concat(student.bedNumber) : ''}
                                                </span>) : (<span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-200">
                                                    Not assigned
                                                </span>)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.course || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {student.date_of_joining ? new Date(student.date_of_joining).toLocaleDateString('en-GB') : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button onClick={function () {
                setSelectedStudent(student);
                setShowBedModal(true);
            }} className={"font-medium flex items-center gap-1 ".concat(student.bedNumber
                ? 'text-orange-600 hover:text-orange-800'
                : 'text-blue-600 hover:text-blue-800')}>
                                                <Plus className="h-4 w-4"/>
                                                {student.bedNumber ? 'Reassign' : 'Assign'}
                                            </button>
                                        </td>
                                    </tr>); })}
                            </tbody>
                        </table>

                        {filteredStudents.length === 0 && (<div className="p-10 text-center text-gray-500">
                                No students found for your search.
                            </div>)}
                    </div>
                </div>
            </div>

            {/* Bed Occupancy Section - Occupied */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Occupied Beds */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-red-100 bg-red-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-600"></div>
                                <h2 className="text-lg font-semibold text-red-900">Occupied Beds</h2>
                            </div>
                            <button onClick={function () { return fetchAllData(true); }} disabled={refreshing} className="p-1.5 text-red-600 hover:bg-red-100 rounded-md disabled:opacity-50" title="Refresh">
                                <RefreshCw className={"h-4 w-4 ".concat(refreshing ? 'animate-spin' : '')}/>
                            </button>
                        </div>
                        <p className="text-sm text-red-700 mt-1">Beds with allocated students.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-red-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Room</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Bed</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Students</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {(function () {
            var occupiedBeds = rooms.flatMap(function (room) {
                return room.beds
                    .filter(function (bed) { return bed.isOccupied; })
                    .map(function (bed) { return ({ room: room, bed: bed }); });
            });
            if (occupiedBeds.length === 0) {
                return (<tr>
                                                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                                    No occupied beds.
                                                </td>
                                            </tr>);
            }
            return occupiedBeds.map(function (_a) {
                var room = _a.room, bed = _a.bed;
                var studentName = bed.studentId && typeof bed.studentId === 'object'
                    ? bed.studentId.name
                    : 'Occupied';
                return (<tr key={"".concat(room._id, "-").concat(bed.bedNumber)} className="hover:bg-red-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center text-sm px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium">
                                                        {room.roomNumber}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    Bed {bed.bedNumber}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                                                        <span className="h-2 w-2 rounded-full bg-red-500 inline-block"></span>
                                                        {studentName}
                                                    </span>
                                                </td>
                                            </tr>);
            });
        })()}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Vacant Beds */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-green-100 bg-green-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-600"></div>
                                <h2 className="text-lg font-semibold text-green-900">Vacant Beds</h2>
                            </div>
                            <button onClick={function () { return fetchAllData(true); }} disabled={refreshing} className="p-1.5 text-green-600 hover:bg-green-100 rounded-md disabled:opacity-50" title="Refresh">
                                <RefreshCw className={"h-4 w-4 ".concat(refreshing ? 'animate-spin' : '')}/>
                            </button>
                        </div>
                        <p className="text-sm text-green-700 mt-1">Available beds for students.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-green-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Room</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Bed</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {(function () {
            var vacantBeds = rooms.flatMap(function (room) {
                return room.beds
                    .filter(function (bed) { return !bed.isOccupied; })
                    .map(function (bed) { return ({ room: room, bed: bed }); });
            });
            if (vacantBeds.length === 0) {
                return (<tr>
                                                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                                    No vacant beds.
                                                </td>
                                            </tr>);
            }
            return vacantBeds.map(function (_a) {
                var room = _a.room, bed = _a.bed;
                return (<tr key={"".concat(room._id, "-").concat(bed.bedNumber)} className="hover:bg-green-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center text-sm px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium">
                                                    {room.roomNumber}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                Bed {bed.bedNumber}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-100 text-green-700 border border-green-300 text-xs font-medium">
                                                    <span className="h-2 w-2 rounded-full bg-green-500 inline-block"></span>
                                                    Available
                                                </span>
                                            </td>
                                        </tr>);
            });
        })()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showBedModal && selectedStudent && (<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Assign Bed to {selectedStudent.name}</h2>
                            <button onClick={function () {
                setShowBedModal(false);
                setSelectedStudent(null);
                setSelectedRoom('');
                setSelectedBed('');
            }} className="text-gray-500 hover:text-gray-700">
                                <X className="h-5 w-5"/>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Room</label>
                                <select value={selectedRoom} onChange={function (e) {
                setSelectedRoom(e.target.value);
                setSelectedBed('');
            }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">-- Choose a room --</option>
                                    {rooms.map(function (room) { return (<option key={room._id} value={room._id}>
                                            Room {room.roomNumber} (Floor {room.floor}, {room.currentOccupancy}/{room.capacity} beds)
                                        </option>); })}
                                </select>
                            </div>

                            {selectedRoom && (<div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Bed</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {(_a = rooms
                    .find(function (r) { return r._id === selectedRoom; })) === null || _a === void 0 ? void 0 : _a.beds.map(function (bed) { return (<button key={bed.bedNumber} onClick={function () { return !bed.isOccupied && setSelectedBed(bed.bedNumber); }} disabled={bed.isOccupied && bed.studentId !== selectedStudent._id} className={"py-2 px-3 rounded-md border font-medium transition ".concat(selectedBed === bed.bedNumber
                        ? 'bg-blue-600 text-white border-blue-600'
                        : bed.isOccupied && bed.studentId !== selectedStudent._id
                            ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 cursor-pointer')}>
                                                    Bed {bed.bedNumber}
                                                </button>); })}
                                    </div>
                                </div>)}

                            <div className="flex gap-2 mt-6">
                                <button onClick={function () {
                setShowBedModal(false);
                setSelectedStudent(null);
                setSelectedRoom('');
                setSelectedBed('');
            }} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                                    Cancel
                                </button>
                                <button onClick={handleAssignBed} disabled={!selectedRoom || selectedBed === '' || assigning} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {assigning ? 'Assigning...' : 'Assign Bed'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>);
}
