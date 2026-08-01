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
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { User, Building, Phone, Mail, MapPin, Users, Home, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';
export default function WardenDetailPage() {
    var _this = this;
    var router = useRouter();
    var params = useParams();
    var wardenId = params.id;
    var _a = useState(null), warden = _a[0], setWarden = _a[1];
    var _b = useState(null), hostel = _b[0], setHostel = _b[1];
    var _c = useState([]), students = _c[0], setStudents = _c[1];
    var _d = useState([]), rooms = _d[0], setRooms = _d[1];
    var _e = useState([]), issues = _e[0], setIssues = _e[1];
    var _f = useState(true), loading = _f[0], setLoading = _f[1];
    useEffect(function () {
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            var wardenRes, wardenData, foundWarden_1, hostelRes, hostelData, h, studentsRes, studentsData, roomsRes, roomsData, issuesRes, issuesData, hostelIssues, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 13, 14, 15]);
                        return [4 /*yield*/, fetch("/api/wardens/list")];
                    case 1:
                        wardenRes = _b.sent();
                        return [4 /*yield*/, wardenRes.json()];
                    case 2:
                        wardenData = _b.sent();
                        if (!(wardenData.success && wardenData.wardens)) return [3 /*break*/, 12];
                        foundWarden_1 = wardenData.wardens.find(function (w) { return w._id === wardenId; });
                        if (!foundWarden_1) return [3 /*break*/, 12];
                        setWarden(foundWarden_1);
                        if (!foundWarden_1.hostelId) return [3 /*break*/, 9];
                        return [4 /*yield*/, fetch("/api/hostels?id=".concat(foundWarden_1.hostelId))];
                    case 3:
                        hostelRes = _b.sent();
                        return [4 /*yield*/, hostelRes.json()];
                    case 4:
                        hostelData = _b.sent();
                        if (!(hostelData.success && ((_a = hostelData.hostels) === null || _a === void 0 ? void 0 : _a[0]))) return [3 /*break*/, 9];
                        h = hostelData.hostels[0];
                        setHostel(h);
                        return [4 /*yield*/, fetch("/api/students?hostelLocation=".concat(encodeURIComponent(h.location)))];
                    case 5:
                        studentsRes = _b.sent();
                        return [4 /*yield*/, studentsRes.json()];
                    case 6:
                        studentsData = _b.sent();
                        if (studentsData.success) {
                            setStudents(studentsData.students || []);
                        }
                        return [4 /*yield*/, fetch("/api/rooms?hostelId=".concat(h._id))];
                    case 7:
                        roomsRes = _b.sent();
                        return [4 /*yield*/, roomsRes.json()];
                    case 8:
                        roomsData = _b.sent();
                        if (roomsData.success) {
                            setRooms(roomsData.rooms || []);
                        }
                        _b.label = 9;
                    case 9: return [4 /*yield*/, fetch("/api/issues")];
                    case 10:
                        issuesRes = _b.sent();
                        return [4 /*yield*/, issuesRes.json()];
                    case 11:
                        issuesData = _b.sent();
                        if (issuesData.success && issuesData.issues) {
                            hostelIssues = issuesData.issues.filter(function (i) {
                                var _a;
                                return ((_a = i.studentId) === null || _a === void 0 ? void 0 : _a.hostelLocation) === foundWarden_1.hostelLocation ||
                                    i.hostelId === foundWarden_1.hostelId;
                            });
                            setIssues(hostelIssues);
                        }
                        _b.label = 12;
                    case 12: return [3 /*break*/, 15];
                    case 13:
                        error_1 = _b.sent();
                        console.error('Error fetching warden details:', error_1);
                        return [3 /*break*/, 15];
                    case 14:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        }); };
        if (wardenId) {
            fetchData();
        }
    }, [wardenId]);
    if (loading) {
        return (<div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading warden details...</p>
        </div>
      </div>);
    }
    if (!warden) {
        return (<div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Warden not found</p>
          <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800">
            Back to Dashboard
          </Link>
        </div>
      </div>);
    }
    var pendingIssues = issues.filter(function (i) { return i.status === 'pending' || i.status === 'in-progress'; }).length;
    var resolvedIssues = issues.filter(function (i) { return i.status === 'resolved' || i.status === 'closed'; }).length;
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-6 w-6"/>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{warden.name}</h1>
              <p className="text-gray-600 mt-1">Hostel Warden • {warden.hostelLocation || 'Assigned Hostel'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Assigned Hostel</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {warden.hostelLocation || 'N/A'}
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
                <Building className="h-5 w-5 text-green-600"/>
              </div>
            </div>
          </div>

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
                <p className="text-sm text-gray-500">Pending Issues</p>
                <p className="text-2xl font-bold text-gray-900">{pendingIssues}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-orange-600"/>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Resolved: {resolvedIssues}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rooms</p>
                <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Home className="h-5 w-5 text-purple-600"/>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Warden Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="h-5 w-5"/>
              Warden Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5"/>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-gray-900 font-medium">{warden.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5"/>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900 font-mono">{warden.phone}</p>
                </div>
              </div>

              {warden.email && (<div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5"/>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{warden.email}</p>
                  </div>
                </div>)}

              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-gray-400 mt-0.5"/>
                <div>
                  <p className="text-sm text-gray-500">Assigned Hostel</p>
                  <p className="text-gray-900 capitalize">{warden.hostelLocation || 'Not assigned'}</p>
                </div>
              </div>

              {warden.createdAt && (<div>
                  <p className="text-sm text-gray-500">Joined Date</p>
                  <p className="text-gray-900">{new Date(warden.createdAt).toLocaleDateString('en-GB')}</p>
                </div>)}
            </div>
          </div>

          {/* Hostel Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building className="h-5 w-5"/>
              Hostel Details
            </h2>
            {hostel ? (<div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5"/>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900 font-medium">{hostel.location}</p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-900 mb-3">Hostel Statistics</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-green-700">Capacity:</span>
                      <span className="font-semibold text-green-900 ml-2">{hostel.totalCapacity}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Occupied:</span>
                      <span className="font-semibold text-green-900 ml-2">{hostel.currentOccupancy}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Rooms:</span>
                      <span className="font-semibold text-green-900 ml-2">{hostel.totalRooms || rooms.length}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Beds:</span>
                      <span className="font-semibold text-green-900 ml-2">{hostel.totalBeds || 0}</span>
                    </div>
                  </div>
                  {hostel.totalCapacity > 0 && (<div className="mt-3">
                      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-2 bg-green-600 rounded-full" style={{ width: "".concat((hostel.currentOccupancy / hostel.totalCapacity) * 100, "%") }}/>
                      </div>
                      <p className="text-xs text-green-700 mt-1">
                        {((hostel.currentOccupancy / hostel.totalCapacity) * 100).toFixed(1)}% Occupied
                      </p>
                    </div>)}
                </div>

                {hostel.facilities && hostel.facilities.length > 0 && (<div>
                    <p className="text-sm text-gray-500 mb-2">Facilities</p>
                    <div className="flex flex-wrap gap-2">
                      {hostel.facilities.map(function (facility, idx) { return (<span key={idx} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-100">
                          {facility}
                        </span>); })}
                    </div>
                  </div>)}
              </div>) : (<p className="text-gray-500">Hostel information not available</p>)}
          </div>
        </div>

        {/* Students List */}
        {students.length > 0 && (<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Students Under Management ({students.length})</h2>
              <p className="text-sm text-gray-500 mt-1">All students in this warden's hostel</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room/Bed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-50">
                  {students.slice(0, 10).map(function (student) { return (<tr key={student._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                        {student.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.roomNumber ? (<span className="text-sm text-gray-600">
                            Room {student.roomNumber}{student.bedNumber ? " \u2022 Bed ".concat(student.bedNumber) : ''}
                          </span>) : (<span className="text-sm text-gray-400">Not assigned</span>)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {student.course || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {student.createdAt ? new Date(student.createdAt).toLocaleDateString('en-GB') : '-'}
                      </td>
                    </tr>); })}
                </tbody>
              </table>
              {students.length > 10 && (<div className="p-4 text-center text-sm text-gray-500">
                  Showing 10 of {students.length} students
                </div>)}
            </div>
          </div>)}

        {/* Recent Issues */}
        {issues.length > 0 && (<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recent Issues ({issues.length})</h2>
              <p className="text-sm text-gray-500 mt-1">Issues reported by students in this hostel</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-50">
                  {issues.slice(0, 10).map(function (issue) {
                var _a;
                return (<tr key={issue._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                        {issue.ticketNumber || issue._id.slice(-8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {issue.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {((_a = issue.studentId) === null || _a === void 0 ? void 0 : _a.name) || issue.reportedBy || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={"px-2 py-1 text-xs rounded-full ".concat(issue.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        issue.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            issue.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800')}>
                          {issue.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={"px-2 py-1 text-xs rounded-full ".concat(issue.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                        issue.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                            issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800')}>
                          {issue.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {issue.createdAt ? new Date(issue.createdAt).toLocaleDateString('en-GB') : '-'}
                      </td>
                    </tr>);
            })}
                </tbody>
              </table>
              {issues.length > 10 && (<div className="p-4 text-center text-sm text-gray-500">
                  Showing 10 of {issues.length} issues
                </div>)}
            </div>
          </div>)}
      </div>
    </div>);
}
