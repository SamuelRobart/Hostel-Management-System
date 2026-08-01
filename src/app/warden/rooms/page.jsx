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
import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Bed, Plus, Search, RefreshCw } from 'lucide-react';
export default function WardenRooms() {
    var _this = this;
    var _a;
    var router = useRouter();
    var _b = useState([]), rooms = _b[0], setRooms = _b[1];
    var _c = useState([]), students = _c[0], setStudents = _c[1];
    var _d = useState(true), loading = _d[0], setLoading = _d[1];
    var _e = useState(''), searchTerm = _e[0], setSearchTerm = _e[1];
    var _f = useState(false), showAssignForm = _f[0], setShowAssignForm = _f[1];
    var _g = useState(''), selectedRoom = _g[0], setSelectedRoom = _g[1];
    var _h = useState(0), selectedBed = _h[0], setSelectedBed = _h[1];
    var _j = useState(''), selectedStudent = _j[0], setSelectedStudent = _j[1];
    var _k = useState(null), refreshingId = _k[0], setRefreshingId = _k[1];
    var _l = useState(false), globalRefreshing = _l[0], setGlobalRefreshing = _l[1];
    var _m = useState(new Date()), lastUpdated = _m[0], setLastUpdated = _m[1];
    var pollingRef = useRef(null);
    var fetchRooms = useCallback(function () {
        var args_1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_1[_i] = arguments[_i];
        }
        return __awaiter(_this, __spreadArray([], args_1, true), void 0, function (silent) {
            var res, data, error_1;
            if (silent === void 0) { silent = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        if (!silent)
                            setLoading(true);
                        else
                            setGlobalRefreshing(true);
                        return [4 /*yield*/, fetch('/api/rooms')];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        if (data.success) {
                            setRooms(data.rooms);
                            setLastUpdated(new Date());
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching rooms:', error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        setGlobalRefreshing(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }, []);
    var fetchStudents = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/warden/students')];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (data.success)
                        setStudents(data.students);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error fetching students:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    // Refresh a single room card in real-time
    var refreshRoom = function (roomId) { return __awaiter(_this, void 0, void 0, function () {
        var res, data_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setRefreshingId(roomId);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/rooms')];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data_1 = _a.sent();
                    if (data_1.success) {
                        setRooms(function (prev) {
                            return prev.map(function (r) {
                                var updated = data_1.rooms.find(function (nr) { return nr._id === r._id; });
                                return updated || r;
                            });
                        });
                        setLastUpdated(new Date());
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_3 = _a.sent();
                    console.error('Error refreshing room:', error_3);
                    return [3 /*break*/, 6];
                case 5:
                    setRefreshingId(null);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        fetchRooms();
        fetchStudents();
    }, []);
    // Auto-refresh every 30 seconds
    useEffect(function () {
        pollingRef.current = setInterval(function () {
            fetchRooms(true);
        }, 30000);
        return function () {
            if (pollingRef.current)
                clearInterval(pollingRef.current);
        };
    }, [fetchRooms]);
    var handleAssignBed = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedRoom || !selectedBed || !selectedStudent) {
                        alert('Please select room, bed, and student');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/rooms/assign', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ roomId: selectedRoom, bedNumber: selectedBed, studentId: selectedStudent })
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (data.success) {
                        setShowAssignForm(false);
                        setSelectedRoom('');
                        setSelectedBed(0);
                        setSelectedStudent('');
                        fetchRooms();
                        fetchStudents();
                    }
                    else {
                        alert(data.error || 'Failed to assign bed');
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error('Error assigning bed:', error_4);
                    alert('Error assigning bed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleUnassignBed = function (studentId) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are you sure you want to unassign this bed?'))
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("/api/rooms/assign?studentId=".concat(studentId), { method: 'DELETE' })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (data.success) {
                        fetchRooms();
                        fetchStudents();
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    console.error('Error unassigning bed:', error_5);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var filteredRooms = rooms.filter(function (room) {
        return room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    });
    var availableBeds = selectedRoom
        ? ((_a = rooms.find(function (r) { return r._id === selectedRoom; })) === null || _a === void 0 ? void 0 : _a.beds.filter(function (b) { return !b.isOccupied; })) || []
        : [];
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading rooms…</p>
        </div>
      </div>);
    }
    return (<div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <button onClick={function () { return router.push('/warden/dashboard'); }} className="text-blue-600 hover:text-blue-800 mr-2 text-sm">
                ← Dashboard
              </button>
              <h1 className="text-xl font-bold text-gray-900">Room &amp; Bed Management</h1>
              {globalRefreshing && (<span className="flex items-center gap-1 text-xs text-blue-500">
                  <RefreshCw className="h-3 w-3 animate-spin"/> Syncing…
                </span>)}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 hidden sm:block">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <button onClick={function () { return fetchRooms(true); }} disabled={globalRefreshing} className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 disabled:opacity-60 text-sm">
                <RefreshCw className={"h-4 w-4 ".concat(globalRefreshing ? 'animate-spin' : '')}/>
                Refresh All
              </button>
              <button onClick={function () { return setShowAssignForm(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                <Plus className="h-4 w-4"/>
                Assign Bed
              </button>
              <button onClick={function () { return router.push('/warden/profile'); }} className="text-gray-600 hover:text-blue-600 text-sm">
                Profile
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Legend */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-sm text-gray-600">Occupied Bed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-sm text-gray-600">Vacant Bed</span>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"/>
            <input type="text" placeholder="Search rooms..." value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"/>
          </div>
        </div>

        {/* Assign Bed Form */}
        {showAssignForm && (<div className="bg-white rounded-lg shadow mb-6 p-6">
            <h2 className="text-lg font-semibold mb-4">Assign Bed to Student</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                <select value={selectedRoom} onChange={function (e) { setSelectedRoom(e.target.value); setSelectedBed(0); }} className="w-full px-4 py-2 border rounded-md">
                  <option value="">Select Room</option>
                  {rooms.filter(function (r) { return r.currentOccupancy < r.capacity; }).map(function (room) { return (<option key={room._id} value={room._id}>
                      {room.roomNumber} ({room.currentOccupancy}/{room.capacity})
                    </option>); })}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bed</label>
                <select value={selectedBed} onChange={function (e) { return setSelectedBed(parseInt(e.target.value)); }} disabled={!selectedRoom} className="w-full px-4 py-2 border rounded-md disabled:bg-gray-100">
                  <option value="0">Select Bed</option>
                  {availableBeds.map(function (bed) { return (<option key={bed.bedNumber} value={bed.bedNumber}>Bed {bed.bedNumber}</option>); })}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
                <select value={selectedStudent} onChange={function (e) { return setSelectedStudent(e.target.value); }} className="w-full px-4 py-2 border rounded-md">
                  <option value="">Select Student</option>
                  {students.filter(function (s) { return !s.roomNumber; }).map(function (student) { return (<option key={student._id || student.id} value={student._id || student.id}>
                      {student.name} - {student.phone}
                    </option>); })}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={handleAssignBed} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Assign
              </button>
              <button onClick={function () { setShowAssignForm(false); setSelectedRoom(''); setSelectedBed(0); setSelectedStudent(''); }} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </div>)}

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map(function (room) {
            var isRefreshing = refreshingId === room._id;
            var occupiedCount = room.beds.filter(function (b) { return b.isOccupied; }).length;
            var vacantCount = room.beds.filter(function (b) { return !b.isOccupied; }).length;
            return (<div key={room._id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-blue-600"/>
                    <h3 className="text-lg font-bold text-gray-900">Room {room.roomNumber}</h3>
                    {room.block && <span className="text-sm text-gray-400">({room.block})</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={"px-2 py-1 text-xs font-semibold rounded-full ".concat(room.currentOccupancy === room.capacity
                    ? 'bg-red-100 text-red-800'
                    : room.currentOccupancy > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800')}>
                      {room.currentOccupancy}/{room.capacity}
                    </span>
                    {/* Per-Card Refresh Button */}
                    <button onClick={function () { return refreshRoom(room._id); }} disabled={isRefreshing} title="Refresh this room" className="p-1.5 rounded-md text-blue-500 hover:bg-blue-50 disabled:opacity-50 transition">
                      <RefreshCw className={"h-4 w-4 ".concat(isRefreshing ? 'animate-spin' : '')}/>
                    </button>
                  </div>
                </div>

                {/* Room Info */}
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Floor:</span>
                    <span className="font-medium text-gray-800">{room.floor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium text-gray-800 capitalize">{room.roomType}</span>
                  </div>
                </div>

                {/* Beds Section */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Beds</p>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium">
                        {occupiedCount} Occupied
                      </span>
                      <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">
                        {vacantCount} Vacant
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {room.beds.map(function (bed) { return (<div key={bed.bedNumber} className={"p-2.5 rounded-lg border-2 flex items-center justify-between transition-all ".concat(bed.isOccupied
                        ? 'bg-red-50 border-red-400'
                        : 'bg-green-50 border-green-400')}>
                        <div className="flex items-center gap-2 min-w-0">
                          <Bed className={"h-4 w-4 flex-shrink-0 ".concat(bed.isOccupied ? 'text-red-600' : 'text-green-600')}/>
                          <div className="min-w-0">
                            <span className={"text-sm font-bold ".concat(bed.isOccupied ? 'text-red-700' : 'text-green-700')}>
                              Bed {bed.bedNumber}
                            </span>
                            {bed.isOccupied && bed.studentId && (<span className="text-xs text-red-500 ml-1 truncate">
                                — {bed.studentId.name || 'Occupied'}
                              </span>)}
                            {!bed.isOccupied && (<span className="text-xs text-green-500 ml-1">— Vacant</span>)}
                          </div>
                        </div>
                        {bed.isOccupied && bed.studentId && (<button onClick={function () { return handleUnassignBed(bed.studentId._id || bed.studentId); }} className="text-xs text-red-600 hover:text-red-800 font-medium ml-2 flex-shrink-0 bg-red-50 border border-red-300 rounded px-1.5 py-0.5 hover:bg-red-100 transition">
                            Unassign
                          </button>)}
                      </div>); })}
                  </div>
                </div>
              </div>);
        })}
        </div>

        {filteredRooms.length === 0 && (<div className="text-center py-16 text-gray-500">
            <Bed className="h-12 w-12 mx-auto text-gray-300 mb-3"/>
            <p className="text-lg font-medium">No rooms found.</p>
          </div>)}
      </div>
    </div>);
}
