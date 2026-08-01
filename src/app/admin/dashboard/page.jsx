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
import { Building2, Users, AlertCircle, UserCheck, X, Plus, LogOut, User } from 'lucide-react';
export default function AdminDashboard() {
    var _this = this;
    var router = useRouter();
    var _a = useState([]), hostels = _a[0], setHostels = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(null), selectedHostel = _c[0], setSelectedHostel = _c[1];
    var _d = useState([]), students = _d[0], setStudents = _d[1];
    var _e = useState(false), saving = _e[0], setSaving = _e[1];
    var _f = useState([]), realStudents = _f[0], setRealStudents = _f[1];
    var _g = useState(false), showAddForm = _g[0], setShowAddForm = _g[1];
    var _h = useState(false), showWardenForm = _h[0], setShowWardenForm = _h[1];
    var _j = useState(false), showHostelForm = _j[0], setShowHostelForm = _j[1];
    var _k = useState([]), wardens = _k[0], setWardens = _k[1];
    var _l = useState([]), hostelsForWarden = _l[0], setHostelsForWarden = _l[1];
    var _m = useState({
        name: '',
        phone: '',
        dateOfBirth: '',
        fatherName: '',
        motherName: '',
        email: '',
        native: '',
        address: '',
        course: '',
        college: '',
        income: '',
        percentage12th: '',
        bankDetails: '',
        caste: '',
        hostelLocation: ''
    }), newStudent = _m[0], setNewStudent = _m[1];
    var _o = useState({
        name: '',
        username: '',
        phone: '',
        password: '',
        hostelId: ''
    }), newWarden = _o[0], setNewWarden = _o[1];
    var _p = useState({
        name: '',
        location: '',
        type: 'girls',
        totalCapacity: 35,
        totalRooms: 7,
        bedsPerRoom: 5
    }), newHostel = _p[0], setNewHostel = _p[1];
    // Fetch wardens
    var fetchWardens = function () { return __awaiter(_this, void 0, void 0, function () {
        var token, headers, res, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = localStorage.getItem('token');
                    headers = {};
                    if (token) {
                        headers['Authorization'] = "Bearer ".concat(token);
                    }
                    return [4 /*yield*/, fetch('/api/wardens/list', { headers: headers })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (data.success) {
                        setWardens(data.wardens);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Failed to fetch wardens:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Fetch hostels for warden assignment
    var fetchHostelsForWarden = function () { return __awaiter(_this, void 0, void 0, function () {
        var token, headers, res, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = localStorage.getItem('token');
                    headers = {};
                    if (token) {
                        headers['Authorization'] = "Bearer ".concat(token);
                    }
                    return [4 /*yield*/, fetch('/api/hostels', { headers: headers })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (data.success) {
                        setHostelsForWarden(data.hostels);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Failed to fetch hostels:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var fetchStats = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, formattedHostels, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/admin/stats')];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (data.hostels) {
                        formattedHostels = data.hostels.map(function (h, index) {
                            var _a, _b, _c;
                            return ({
                                _id: h._id || h.name, // Use _id if available, otherwise name
                                name: "Elite Hostel (".concat(h.type === 'girls' ? 'Girls' : 'Boys', ")"),
                                location: h.name || h.location, // The collection name is the location/identifier here
                                totalCapacity: h.capacity || h.totalCapacity,
                                currentOccupancy: h.occupied || h.currentOccupancy,
                                wardenName: ((_a = h.warden) === null || _a === void 0 ? void 0 : _a.name) || 'N/A',
                                wardenPhone: ((_b = h.warden) === null || _b === void 0 ? void 0 : _b.phone) || 'N/A',
                                wardenId: ((_c = h.warden) === null || _c === void 0 ? void 0 : _c._id) || h.wardenId
                            });
                        });
                        setHostels(formattedHostels);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Failed to fetch stats:', error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Fetch students from the database for the detailed view
    var fetchStudents = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, formattedStudents, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/students/list')];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (data.students) {
                        formattedStudents = data.students.map(function (s) { return (__assign(__assign({}, s), { id: s._id, 
                            // Map DB fields (snake_case) to Interface (camelCase)
                            fatherName: s.father_name || s.fatherName, motherName: s.mother_name || s.motherName, percentage12th: s.twelfth_percentage || s.percentage12th, 
                            // Handle Date format if it's coming as ISO string
                            dateOfBirth: s.dob ? new Date(s.dob).toLocaleDateString('en-GB') : (s.dateOfBirth ? new Date(s.dateOfBirth).toLocaleDateString('en-GB') : 'N/A') })); });
                        setStudents(formattedStudents);
                        setRealStudents(formattedStudents);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error('Failed to fetch students:', error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Fetch students for specific hostel
    var fetchHostelStudents = function (hostelLocation) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, formattedStudents, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/students/hostel?location=".concat(encodeURIComponent(hostelLocation)))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (data.success && data.students) {
                        formattedStudents = data.students.map(function (s) { return (__assign(__assign({}, s), { id: s._id || s.id, fatherName: s.father_name || s.fatherName, motherName: s.mother_name || s.motherName, percentage12th: s.twelfth_percentage || s.percentage12th || s['12th_percentage'], dateOfBirth: s.dob ? new Date(s.dob).toLocaleDateString('en-GB') : (s.dateOfBirth ? new Date(s.dateOfBirth).toLocaleDateString('en-GB') : 'N/A') })); });
                        setRealStudents(formattedStudents);
                        setSelectedHostel(hostelLocation);
                    }
                    else {
                        setRealStudents([]);
                        setSelectedHostel(hostelLocation);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.error('Failed to fetch hostel students:', error_5);
                    setRealStudents([]);
                    setSelectedHostel(hostelLocation);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        var init = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, Promise.all([fetchStats(), fetchStudents(), fetchWardens(), fetchHostelsForWarden()])];
                    case 1:
                        _a.sent();
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); };
        init();
    }, []);
    // No need for client-side stats calculation since API provides it primarily,
    // but for reactivity we can keep using the hostels state.
    var totalCapacity = hostels.reduce(function (sum, hostel) { return sum + hostel.totalCapacity; }, 0);
    var totalOccupancy = hostels.reduce(function (sum, hostel) { return sum + hostel.currentOccupancy; }, 0);
    var totalVacancy = totalCapacity - totalOccupancy;
    var handleLogout = function () {
        router.push('/logout');
    };
    if (loading) {
        return (<div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>);
    }
    return (<>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white/80 backdrop-blur border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-gray-500">Administration</p>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  Admin Dashboard
                  <span className="px-3 py-1 text-xs font-medium bg-green-50 text-green-800 rounded-full border border-green-200">
                    Live data
                  </span>
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Elite Hostel Group • Government Certified
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={function () { return router.push('/admin/rooms'); }} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4"/>
                  Rooms
                </button>
                <button onClick={function () { return router.push('/admin/issues'); }} className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4"/>
                  Issues
                </button>
                <button onClick={function () { return router.push('/admin/profile'); }} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm">
                  <User className="h-4 w-4"/>
                  Profile
                </button>
                <button onClick={function () { return setShowHostelForm(true); }} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center gap-2 text-sm">
                  <Plus className="h-4 w-4"/>
                  Add Hostel
                </button>
                <button onClick={function () { return setShowWardenForm(true); }} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 text-sm">
                  <Plus className="h-4 w-4"/>
                  Add Warden
                </button>
                <button onClick={function () { return setShowAddForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 text-sm">
                  <Plus className="h-4 w-4"/>
                  Add Student
                </button>
                <button onClick={handleLogout} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm">
                  <LogOut className="h-4 w-4"/>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Weekly Menu Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 shadow-lg rounded-lg mb-8 border border-green-200">
            <div className="px-6 py-4 border-b border-green-200 bg-green-100">
              <h2 className="text-lg font-medium text-green-800">Weekly Hostel Menu</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-green-200">
                <thead className="bg-green-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Breakfast</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Lunch</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Dinner</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-green-100">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Monday</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Semiya Kichadi + Chutney/Sambar</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Rice + Sambar + Poriyal + Rasam + Mor + Muttai/Muttai Masala</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Rice + Sambar + Vegetable</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Tuesday</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Poori + Masala</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Veg Biryani + Veg Kuruma + Egg</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Idli + Sambar + Chutney</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Wednesday</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Idli + Sambar + Chutney</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Rice + Mutton/Chicken Kuruma + Mor</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Veg Pulav + Kuruma/Raitha</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Thursday</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Idli + Sambar + Chutney</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Tomato/Lemon/Curd Rice + Potato Poriyal + Egg</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Othappam + Chutney + Sambar</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Friday</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Pongal/Varagu Pongal + Kathirikai Kozhju + Vada</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Rice + Kara Kulambu + Poriyal/Koottu + Rasam + Mor + Egg</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Wheat Dosa + Tomato Chutney</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Saturday</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Rava Kichadi + Coconut Chutney</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Pudhina/Carrot/Curry Leaf Rice + Egg + Appalam/Paruppu Sadam</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Rice + Sambar + Vegetable</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Sunday</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Dosa/Navadhaniya Dosa + Sambar + Chutney</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Rice + Veg Kuruma + Rasam + Mor</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Tomato/Sambar Rice + Varuval</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-blue-600"/>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Hostels</p>
                  <p className="text-2xl font-bold text-gray-900">{hostels.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600"/>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Capacity</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCapacity}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <UserCheck className="h-8 w-8 text-purple-600"/>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Current Occupancy</p>
                  <p className="text-2xl font-bold text-gray-900">{totalOccupancy}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-orange-600"/>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Vacancy</p>
                  <p className="text-2xl font-bold text-gray-900">{totalVacancy}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hostels Grid */}
          <div className="space-y-8">
            {/* Girls Hostels */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200 bg-pink-50">
                <h2 className="text-lg font-medium text-gray-900">Girls College Hostels ({hostels.filter(function (hostel) { return hostel.name.includes('Girls'); }).length})</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {hostels.filter(function (hostel) { return hostel.name.includes('Girls'); }).map(function (hostel) {
            var occupancyPercentage = ((hostel.currentOccupancy / hostel.totalCapacity) * 100).toFixed(1);
            var vacancy = hostel.totalCapacity - hostel.currentOccupancy;
            return (<div key={hostel._id} onClick={function () { return router.push("/admin/hostels/".concat(hostel._id)); }} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-900">Elite Hostel</h3>
                        <span className={"px-2 py-1 text-xs rounded-full ".concat(parseFloat(occupancyPercentage) > 90
                    ? 'bg-red-100 text-red-800'
                    : parseFloat(occupancyPercentage) > 75
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800')}>
                          {occupancyPercentage}%
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">📍 {hostel.location}</p>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">{hostel.totalCapacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Occupied:</span>
                          <span className="font-medium text-blue-600">{hostel.currentOccupancy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vacancy:</span>
                          <span className="font-medium text-green-600">{vacancy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Warden:</span>
                          <span className="font-medium text-xs">{hostel.wardenName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium text-xs">{hostel.wardenPhone}</span>
                        </div>
                      </div>

                      <div className="mt-3 bg-gray-200 rounded-full h-2">
                        <div className={"h-2 rounded-full ".concat(parseFloat(occupancyPercentage) > 90
                    ? 'bg-red-500'
                    : parseFloat(occupancyPercentage) > 75
                        ? 'bg-yellow-500'
                        : 'bg-green-500')} style={{ width: "".concat(occupancyPercentage, "%") }}></div>
                      </div>
                    </div>);
        })}
              </div>
            </div>

            {/* Boys Hostels */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
                <h2 className="text-lg font-medium text-gray-900">Boys College Hostels ({hostels.filter(function (hostel) { return hostel.name.includes('Boys'); }).length})</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {hostels.filter(function (hostel) { return hostel.name.includes('Boys'); }).map(function (hostel) {
            var occupancyPercentage = ((hostel.currentOccupancy / hostel.totalCapacity) * 100).toFixed(1);
            var vacancy = hostel.totalCapacity - hostel.currentOccupancy;
            return (<div key={hostel._id} onClick={function () { return router.push("/admin/hostels/".concat(hostel._id)); }} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">Elite Hostel</h3>
                        <span className={"px-2 py-1 text-xs rounded-full ".concat(parseFloat(occupancyPercentage) > 90
                    ? 'bg-red-100 text-red-800'
                    : parseFloat(occupancyPercentage) > 75
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800')}>
                          {occupancyPercentage}%
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">📍 {hostel.location}</p>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">{hostel.totalCapacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Occupied:</span>
                          <span className="font-medium text-blue-600">{hostel.currentOccupancy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vacancy:</span>
                          <span className="font-medium text-green-600">{vacancy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Warden:</span>
                          <span className="font-medium">{hostel.wardenName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium">{hostel.wardenPhone}</span>
                        </div>
                      </div>

                      <div className="mt-3 bg-gray-200 rounded-full h-2">
                        <div className={"h-2 rounded-full ".concat(parseFloat(occupancyPercentage) > 90
                    ? 'bg-red-500'
                    : parseFloat(occupancyPercentage) > 75
                        ? 'bg-yellow-500'
                        : 'bg-green-500')} style={{ width: "".concat(occupancyPercentage, "%") }}></div>
                      </div>
                    </div>);
        })}
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg mt-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Warden Management ({wardens.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {wardens.map(function (warden) {
            var _a;
            return (<tr key={warden._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {warden.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {warden.username || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {warden.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {((_a = warden.hostelId) === null || _a === void 0 ? void 0 : _a.name) || 'Not Assigned'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(warden.createdAt).toLocaleDateString()}
                      </td>
                    </tr>);
        })}
                  {wardens.length === 0 && (<tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No wardens found. Click "Add Warden" to create one.
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg mt-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Warden Directory</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warden Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hostels.map(function (hostel) { return (<tr key={hostel._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600" onClick={function () { return router.push("/admin/hostels/".concat(hostel._id)); }}>
                        Elite Hostel
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {hostel.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:text-blue-600" onClick={function () { return hostel.wardenId && router.push("/admin/wardens/".concat(hostel.wardenId)); }}>
                        {hostel.wardenName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {hostel.wardenPhone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={"inline-flex px-2 py-1 text-xs font-semibold rounded-full ".concat(hostel.name.includes('Girls')
                ? 'bg-pink-100 text-pink-800'
                : 'bg-blue-100 text-blue-800')}>
                          {hostel.name.includes('Girls') ? 'Girls' : 'Boys'}
                        </span>
                      </td>
                    </tr>); })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg mt-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Student Details by Hostel</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupied</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacancy</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hostels.map(function (hostel) {
            var vacancy = hostel.totalCapacity - hostel.currentOccupancy;
            return (<tr key={hostel._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Elite Hostel ({hostel.name.includes('Girls') ? 'Girls' : 'Boys'})
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {hostel.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                          {hostel.currentOccupancy} students
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                          {vacancy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button onClick={function () { return fetchHostelStudents(hostel.location); }} className="text-blue-600 hover:text-blue-900 font-medium">
                            View {hostel.currentOccupancy} Students
                          </button>
                        </td>
                      </tr>);
        })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedHostel && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h2 className="text-xl font-bold">Students in {selectedHostel} Hostel ({realStudents.length})</h2>
                <div className="text-sm text-green-600 font-medium mt-1">
                  📱 Phone numbers highlighted in yellow - use these for student login!
                </div>
                {realStudents.length === 0 && (<div className="text-sm text-orange-600 font-medium mt-1">
                    ⚠️ No students found in database for this hostel
                  </div>)}
              </div>
              <button onClick={function () { return setSelectedHostel(null); }} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6"/>
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-120px)]">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">DOB</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Father</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mother</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Native</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">College</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Income</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">12th %</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Caste</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {realStudents.length === 0 ? (<tr>
                      <td colSpan={12} className="px-4 py-8 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <div className="text-4xl mb-2">📋</div>
                          <div className="text-lg font-medium mb-1">No students found in database</div>
                          <div className="text-sm">This hostel location may not have any registered students yet.</div>
                        </div>
                      </td>
                    </tr>) : (realStudents.map(function (student, index) { return (<tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={function () { return router.push("/admin/students/".concat(student.id || student._id)); }}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{student.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{student.dateOfBirth}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{student.fatherName}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{student.motherName}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 font-mono bg-yellow-50">{student.phone}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 text-xs">{student.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{student.native}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{student.course}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 text-xs">{student.college}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{student.income}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{student.percentage12th}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={"px-2 py-1 text-xs rounded-full ".concat(student.caste === 'SC' ? 'bg-red-100 text-red-800' :
                    student.caste === 'MBC' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800')}>
                            {student.caste}
                          </span>
                        </td>
                      </tr>); }))}
                </tbody>
              </table>
            </div>
          </div>
        </div>)}

      {/* Add Student Form Modal */}
      {showAddForm && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Add New Student</h2>
              <button onClick={function () {
                setShowAddForm(false);
                setNewStudent({
                    name: '', phone: '', dateOfBirth: '', fatherName: '', motherName: '',
                    email: '', native: '', address: '', course: '', college: '',
                    income: '', percentage12th: '', bankDetails: '', caste: '', hostelLocation: ''
                });
            }} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6"/>
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-120px)] p-6">
              <form onSubmit={function (e) { return __awaiter(_this, void 0, void 0, function () {
                var res, data, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            e.preventDefault();
                            setSaving(true);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, 5, 6]);
                            return [4 /*yield*/, fetch('/api/students/add', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(newStudent)
                                })];
                        case 2:
                            res = _a.sent();
                            return [4 /*yield*/, res.json()];
                        case 3:
                            data = _a.sent();
                            if (data.success) {
                                alert('Student added successfully! They can now login with phone: ' + newStudent.phone + ' and DOB: ' + newStudent.dateOfBirth);
                                setShowAddForm(false);
                                fetchStudents(); // Refresh the list
                                setNewStudent({
                                    name: '', phone: '', dateOfBirth: '', fatherName: '', motherName: '',
                                    email: '', native: '', address: '', course: '', college: '',
                                    income: '', percentage12th: '', bankDetails: '', caste: '', hostelLocation: ''
                                });
                            }
                            else {
                                alert(data.message);
                            }
                            return [3 /*break*/, 6];
                        case 4:
                            error_6 = _a.sent();
                            alert('Failed to add student');
                            return [3 /*break*/, 6];
                        case 5:
                            setSaving(false);
                            return [7 /*endfinally*/];
                        case 6: return [2 /*return*/];
                    }
                });
            }); }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input type="text" value={newStudent.name} onChange={function (e) { return setNewStudent(__assign(__assign({}, newStudent), { name: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input type="tel" value={newStudent.phone} onChange={function (e) { return setNewStudent(__assign(__assign({}, newStudent), { phone: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                    <input type="date" value={newStudent.dateOfBirth} onChange={function (e) { return setNewStudent(__assign(__assign({}, newStudent), { dateOfBirth: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                    <input type="text" value={newStudent.fatherName} onChange={function (e) { return setNewStudent(__assign(__assign({}, newStudent), { fatherName: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                    <input type="text" value={newStudent.motherName} onChange={function (e) { return setNewStudent(__assign(__assign({}, newStudent), { motherName: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value={newStudent.email} onChange={function (e) { return setNewStudent(__assign(__assign({}, newStudent), { email: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Native District</label>
                    <input type="text" value={newStudent.native} onChange={function (e) { return setNewStudent(__assign(__assign({}, newStudent), { native: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <select value={newStudent.course} onChange={function (e) { return setNewStudent(__assign(__assign({}, newStudent), { course: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Select Course</option>
                      <option value="B.A English">B.A English</option>
                      <option value="B.A Tamil">B.A Tamil</option>
                      <option value="B.A History">B.A History</option>
                      <option value="B.A Economics">B.A Economics</option>
                      <option value="B.A Political Science">B.A Political Science</option>
                      <option value="B.A Geography">B.A Geography</option>
                      <option value="B.Sc Mathematics">B.Sc Mathematics</option>
                      <option value="B.Sc Physics">B.Sc Physics</option>
                      <option value="B.Sc Chemistry">B.Sc Chemistry</option>
                      <option value="B.Sc Biology">B.Sc Biology</option>
                      <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                      <option value="B.Sc Statistics">B.Sc Statistics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                    <input type="text" value={newStudent.college} onChange={function (e) { return setNewStudent(__assign(__assign({}, newStudent), { college: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Government Arts College"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Family Income</label>
                    <input type="text" value={newStudent.income} onChange={function (e) { return setNewStudent(__assign(__assign({}, newStudent), { income: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="₹50000 per annum"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">12th Percentage</label>
                    <input type="text" value={newStudent.percentage12th} onChange={function (e) { return setNewStudent(__assign(__assign({}, newStudent), { percentage12th: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="85%"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Caste</label>
                    <select value={newStudent.caste} onChange={function (e) { return setNewStudent(__assign(__assign({}, newStudent), { caste: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Select Caste</option>
                      <option value="BC">BC</option>
                      <option value="MBC">MBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hostel Location</label>
                    <select value={newStudent.hostelLocation} onChange={function (e) { return setNewStudent(__assign(__assign({}, newStudent), { hostelLocation: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Select Hostel</option>
                      <option value="Perur">Perur</option>
                      <option value="Singanallur">Singanallur</option>
                      <option value="Peelamedu">Peelamedu</option>
                      <option value="Goundampalayam">Goundampalayam</option>
                      <option value="Vellakinar">Vellakinar</option>
                      <option value="Kinathukadavu">Kinathukadavu</option>
                      <option value="Nayakkanpalayam">Nayakkanpalayam</option>
                      <option value="Thondamuthur">Thondamuthur</option>
                      <option value="Masakkalipalayam">Masakkalipalayam</option>
                      <option value="Ondipudur">Ondipudur</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea value={newStudent.address} onChange={function (e) { return setNewStudent(__assign(__assign({}, newStudent), { address: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={2}/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Details</label>
                  <input type="text" value={newStudent.bankDetails} onChange={function (e) { return setNewStudent(__assign(__assign({}, newStudent), { bankDetails: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="SBI - 123456789"/>
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button type="button" onClick={function () { return setShowAddForm(false); }} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
                    {saving ? 'Adding...' : 'Add Student'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>)}

      {/* Add Warden Form Modal */}
      {showWardenForm && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Add New Warden</h2>
              <button onClick={function () {
                setShowWardenForm(false);
                setNewWarden({ name: '', username: '', phone: '', password: '', hostelId: '' });
            }} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6"/>
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-120px)] p-6">
              <form onSubmit={function (e) { return __awaiter(_this, void 0, void 0, function () {
                var token, headers, res, data, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            e.preventDefault();
                            setSaving(true);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, 5, 6]);
                            token = localStorage.getItem('token');
                            headers = { 'Content-Type': 'application/json' };
                            if (token) {
                                headers['Authorization'] = "Bearer ".concat(token);
                            }
                            return [4 /*yield*/, fetch('/api/wardens/add', {
                                    method: 'POST',
                                    headers: headers,
                                    body: JSON.stringify(newWarden)
                                })];
                        case 2:
                            res = _a.sent();
                            return [4 /*yield*/, res.json()];
                        case 3:
                            data = _a.sent();
                            if (data.success) {
                                alert('Warden created successfully! Login credentials:\nUsername: ' + newWarden.username + '\nPassword: ' + newWarden.password);
                                setShowWardenForm(false);
                                fetchWardens();
                                setNewWarden({ name: '', username: '', phone: '', password: '', hostelId: '' });
                            }
                            else {
                                alert('Error: ' + data.message);
                            }
                            return [3 /*break*/, 6];
                        case 4:
                            error_7 = _a.sent();
                            console.error('Warden creation error:', error_7);
                            alert('Failed to create warden. Please check your connection and try again.');
                            return [3 /*break*/, 6];
                        case 5:
                            setSaving(false);
                            return [7 /*endfinally*/];
                        case 6: return [2 /*return*/];
                    }
                });
            }); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input type="text" value={newWarden.name} onChange={function (e) { return setNewWarden(__assign(__assign({}, newWarden), { name: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                  <input type="text" value={newWarden.username} onChange={function (e) { return setNewWarden(__assign(__assign({}, newWarden), { username: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="warden123" required/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" value={newWarden.phone} onChange={function (e) { return setNewWarden(__assign(__assign({}, newWarden), { phone: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="9876543210" required/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <input type="password" value={newWarden.password} onChange={function (e) { return setNewWarden(__assign(__assign({}, newWarden), { password: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter password" required/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign Hostel</label>
                  <select value={newWarden.hostelId} onChange={function (e) { return setNewWarden(__assign(__assign({}, newWarden), { hostelId: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Select Hostel (Optional)</option>
                    {hostelsForWarden.map(function (hostel) { return (<option key={hostel._id} value={hostel._id}>
                        {hostel.name} - {hostel.location}
                      </option>); })}
                  </select>
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button type="button" onClick={function () { return setShowWardenForm(false); }} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50">
                    {saving ? 'Creating...' : 'Create Warden'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>)}

      {/* Add Hostel Form Modal */}
      {showHostelForm && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Add New Hostel</h2>
              <button onClick={function () {
                setShowHostelForm(false);
                setNewHostel({ name: '', location: '', type: 'girls', totalCapacity: 35, totalRooms: 7, bedsPerRoom: 5 });
            }} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6"/>
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-120px)] p-6">
              <form onSubmit={function (e) { return __awaiter(_this, void 0, void 0, function () {
                var token, headers, res, data, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            e.preventDefault();
                            setSaving(true);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, 5, 6]);
                            token = localStorage.getItem('token');
                            headers = { 'Content-Type': 'application/json' };
                            if (token) {
                                headers['Authorization'] = "Bearer ".concat(token);
                            }
                            return [4 /*yield*/, fetch('/api/hostels', {
                                    method: 'POST',
                                    headers: headers,
                                    body: JSON.stringify(newHostel)
                                })];
                        case 2:
                            res = _a.sent();
                            return [4 /*yield*/, res.json()];
                        case 3:
                            data = _a.sent();
                            if (data.success) {
                                alert('Hostel created successfully!');
                                setShowHostelForm(false);
                                fetchStats();
                                fetchHostelsForWarden();
                                setNewHostel({ name: '', location: '', type: 'girls', totalCapacity: 35, totalRooms: 7, bedsPerRoom: 5 });
                            }
                            else {
                                alert('Error: ' + data.message);
                            }
                            return [3 /*break*/, 6];
                        case 4:
                            error_8 = _a.sent();
                            console.error('Hostel creation error:', error_8);
                            alert('Failed to create hostel. Please try again.');
                            return [3 /*break*/, 6];
                        case 5:
                            setSaving(false);
                            return [7 /*endfinally*/];
                        case 6: return [2 /*return*/];
                    }
                });
            }); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hostel Name *</label>
                  <input type="text" value={newHostel.name} onChange={function (e) { return setNewHostel(__assign(__assign({}, newHostel), { name: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Elite Hostel" required/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input type="text" value={newHostel.location} onChange={function (e) { return setNewHostel(__assign(__assign({}, newHostel), { location: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Perur, Coimbatore" required/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select value={newHostel.type} onChange={function (e) { return setNewHostel(__assign(__assign({}, newHostel), { type: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                    <option value="girls">Girls Hostel</option>
                    <option value="boys">Boys Hostel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Capacity *</label>
                  <input type="number" value={newHostel.totalCapacity} onChange={function (e) { return setNewHostel(__assign(__assign({}, newHostel), { totalCapacity: parseInt(e.target.value) || 0 })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" min="1" required/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Rooms *</label>
                  <input type="number" value={newHostel.totalRooms} onChange={function (e) { return setNewHostel(__assign(__assign({}, newHostel), { totalRooms: parseInt(e.target.value) || 0 })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" min="1" required/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beds per Room *</label>
                  <input type="number" value={newHostel.bedsPerRoom} onChange={function (e) { return setNewHostel(__assign(__assign({}, newHostel), { bedsPerRoom: parseInt(e.target.value) || 0 })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" min="1" required/>
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button type="button" onClick={function () { return setShowHostelForm(false); }} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50">
                    {saving ? 'Creating...' : 'Create Hostel'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>)}
    </>);
}
