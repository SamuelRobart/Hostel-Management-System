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
import { Building2, Users, Home, Bed, MapPin, Phone, Mail, ArrowLeft, UserCheck } from 'lucide-react';
import Link from 'next/link';
export default function HostelDetailPage() {
    var _this = this;
    var router = useRouter();
    var params = useParams();
    var hostelId = params.id;
    var _a = useState(null), hostel = _a[0], setHostel = _a[1];
    var _b = useState(null), warden = _b[0], setWarden = _b[1];
    var _c = useState([]), students = _c[0], setStudents = _c[1];
    var _d = useState([]), rooms = _d[0], setRooms = _d[1];
    var _e = useState(true), loading = _e[0], setLoading = _e[1];
    useEffect(function () {
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, hostelRes, studentsRes, roomsRes, hostelData, h_1, wardenRes, wardenData, foundWarden, studentsData, roomsData, error_1;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 10, 11, 12]);
                        return [4 /*yield*/, Promise.all([
                                fetch("/api/hostels?id=".concat(hostelId)),
                                fetch("/api/students?hostelId=".concat(hostelId)),
                                fetch("/api/rooms?hostelId=".concat(hostelId))
                            ])];
                    case 1:
                        _a = _c.sent(), hostelRes = _a[0], studentsRes = _a[1], roomsRes = _a[2];
                        return [4 /*yield*/, hostelRes.json()];
                    case 2:
                        hostelData = _c.sent();
                        if (!(hostelData.success && ((_b = hostelData.hostels) === null || _b === void 0 ? void 0 : _b[0]))) return [3 /*break*/, 7];
                        h_1 = hostelData.hostels[0];
                        setHostel(h_1);
                        if (!(h_1.wardenId && typeof h_1.wardenId === 'object' && h_1.wardenId.name)) return [3 /*break*/, 3];
                        setWarden(h_1.wardenId);
                        return [3 /*break*/, 7];
                    case 3:
                        if (!h_1.warden) return [3 /*break*/, 4];
                        setWarden(h_1.warden);
                        return [3 /*break*/, 7];
                    case 4:
                        if (!h_1.wardenId) return [3 /*break*/, 7];
                        return [4 /*yield*/, fetch("/api/wardens/list")];
                    case 5:
                        wardenRes = _c.sent();
                        return [4 /*yield*/, wardenRes.json()];
                    case 6:
                        wardenData = _c.sent();
                        if (wardenData.success && wardenData.wardens) {
                            foundWarden = wardenData.wardens.find(function (w) { return w._id === h_1.wardenId; });
                            if (foundWarden) {
                                setWarden(foundWarden);
                            }
                        }
                        _c.label = 7;
                    case 7: return [4 /*yield*/, studentsRes.json()];
                    case 8:
                        studentsData = _c.sent();
                        if (studentsData.success) {
                            setStudents(studentsData.students || []);
                        }
                        return [4 /*yield*/, roomsRes.json()];
                    case 9:
                        roomsData = _c.sent();
                        if (roomsData.success) {
                            setRooms(roomsData.rooms || []);
                        }
                        return [3 /*break*/, 12];
                    case 10:
                        error_1 = _c.sent();
                        console.error('Error fetching hostel details:', error_1);
                        return [3 /*break*/, 12];
                    case 11:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        }); };
        if (hostelId) {
            fetchData();
        }
    }, [hostelId]);
    if (loading) {
        return (<div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hostel details...</p>
        </div>
      </div>);
    }
    if (!hostel) {
        return (<div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Hostel not found</p>
          <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800">
            Back to Dashboard
          </Link>
        </div>
      </div>);
    }
    var occupancyPercentage = hostel.totalCapacity > 0
        ? ((hostel.currentOccupancy / hostel.totalCapacity) * 100).toFixed(1)
        : 0;
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-6 w-6"/>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{hostel.name}</h1>
              <p className="text-gray-600 mt-1">{hostel.location} • Elite Hostel Group</p>
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
                <p className="text-sm text-gray-500">Total Capacity</p>
                <p className="text-2xl font-bold text-gray-900">{hostel.totalCapacity}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600"/>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Current Occupancy</p>
                <p className="text-2xl font-bold text-gray-900">{hostel.currentOccupancy}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-green-600"/>
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-2 bg-green-600 rounded-full transition-all" style={{ width: "".concat(occupancyPercentage, "%") }}/>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Rooms</p>
                <p className="text-2xl font-bold text-gray-900">{hostel.totalRooms || rooms.length || 0}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Home className="h-5 w-5 text-purple-600"/>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Beds</p>
                <p className="text-2xl font-bold text-gray-900">{hostel.totalBeds || 0}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Bed className="h-5 w-5 text-indigo-600"/>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hostel Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hostel Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5"/>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900 font-medium">{hostel.location}</p>
                </div>
              </div>

              {hostel.address && (<div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-gray-400 mt-0.5"/>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-900">{hostel.address}</p>
                  </div>
                </div>)}

              {hostel.contactNumber && (<div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5"/>
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="text-gray-900 font-mono">{hostel.contactNumber}</p>
                  </div>
                </div>)}

              {hostel.facilities && hostel.facilities.length > 0 && (<div>
                  <p className="text-sm text-gray-500 mb-2">Facilities</p>
                  <div className="flex flex-wrap gap-2">
                    {hostel.facilities.map(function (facility, idx) { return (<span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-100">
                        {facility}
                      </span>); })}
                  </div>
                </div>)}

              {hostel.floors && (<div>
                  <p className="text-sm text-gray-500">Floors</p>
                  <p className="text-gray-900">{hostel.floors}</p>
                </div>)}

              {hostel.blocks && hostel.blocks.length > 0 && (<div>
                  <p className="text-sm text-gray-500">Blocks</p>
                  <p className="text-gray-900">{hostel.blocks.join(', ')}</p>
                </div>)}
            </div>
          </div>

          {/* Warden Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Warden Information</h2>
            {warden ? (<div className="space-y-4">
                <div className="flex items-start gap-3">
                  <UserCheck className="h-5 w-5 text-gray-400 mt-0.5"/>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-gray-900 font-medium">{warden.name}</p>
                  </div>
                </div>

                {warden.phone && (<div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5"/>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900 font-mono">{warden.phone}</p>
                    </div>
                  </div>)}

                {warden.email && (<div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5"/>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{warden.email}</p>
                    </div>
                  </div>)}
              </div>) : (<p className="text-gray-500">Warden information not available</p>)}
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Students ({students.length})</h2>
            <p className="text-sm text-gray-500 mt-1">All students registered in this hostel</p>
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
            {students.length === 0 && (<div className="p-8 text-center text-gray-500">
                No students found in this hostel.
              </div>)}
            {students.length > 10 && (<div className="p-4 text-center text-sm text-gray-500">
                Showing 10 of {students.length} students
              </div>)}
          </div>
        </div>

        {/* Rooms Overview */}
        {rooms.length > 0 && (<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Rooms Overview ({rooms.length})</h2>
              <p className="text-sm text-gray-500 mt-1">Room and bed allocation status</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {rooms.slice(0, 9).map(function (room) { return (<div key={room._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Room {room.roomNumber}</span>
                    <span className={"text-xs px-2 py-1 rounded-full ".concat(room.currentOccupancy === room.capacity ? 'bg-red-100 text-red-800' :
                    room.currentOccupancy > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800')}>
                      {room.currentOccupancy}/{room.capacity}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Floor {room.floor} {room.block ? "\u2022 Block ".concat(room.block) : ''} • {room.roomType}
                  </div>
                </div>); })}
            </div>
            {rooms.length > 9 && (<div className="p-4 text-center text-sm text-gray-500">
                Showing 9 of {rooms.length} rooms
              </div>)}
          </div>)}
      </div>
    </div>);
}
