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
import { Plus, Search, Home, Bed, RefreshCw } from 'lucide-react';
export default function AdminRooms() {
    var _this = this;
    var router = useRouter();
    var _a = useState([]), rooms = _a[0], setRooms = _a[1];
    var _b = useState([]), hostels = _b[0], setHostels = _b[1];
    var _c = useState(true), loading = _c[0], setLoading = _c[1];
    var _d = useState(''), selectedHostel = _d[0], setSelectedHostel = _d[1];
    var _e = useState(''), searchTerm = _e[0], setSearchTerm = _e[1];
    var _f = useState(false), showAddForm = _f[0], setShowAddForm = _f[1];
    var _g = useState(null), refreshingId = _g[0], setRefreshingId = _g[1];
    var _h = useState(false), globalRefreshing = _h[0], setGlobalRefreshing = _h[1];
    var _j = useState(new Date()), lastUpdated = _j[0], setLastUpdated = _j[1];
    var pollingRef = useRef(null);
    var _k = useState({
        hostelId: '',
        roomNumber: '',
        floor: 1,
        block: '',
        capacity: 2,
        roomType: 'double',
        amenities: ''
    }), newRoom = _k[0], setNewRoom = _k[1];
    var fetchHostels = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/hostels')];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (data.success)
                        setHostels(data.hostels);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching hostels:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    var fetchRooms = useCallback(function () {
        var args_1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_1[_i] = arguments[_i];
        }
        return __awaiter(_this, __spreadArray([], args_1, true), void 0, function (silent) {
            var url, res, data, error_2;
            if (silent === void 0) { silent = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        if (!silent)
                            setLoading(true);
                        else
                            setGlobalRefreshing(true);
                        url = selectedHostel
                            ? "/api/rooms?hostelId=".concat(selectedHostel)
                            : '/api/rooms';
                        return [4 /*yield*/, fetch(url)];
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
                        error_2 = _a.sent();
                        console.error('Error fetching rooms:', error_2);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        setGlobalRefreshing(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }, [selectedHostel]);
    // Refresh a single room card
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
        fetchHostels();
    }, [fetchHostels]);
    useEffect(function () {
        fetchRooms();
    }, [selectedHostel]);
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
    var handleAddRoom = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/rooms', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(__assign(__assign({}, newRoom), { amenities: newRoom.amenities.split(',').map(function (a) { return a.trim(); }).filter(Boolean) }))
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (data.success) {
                        setShowAddForm(false);
                        setNewRoom({ hostelId: '', roomNumber: '', floor: 1, block: '', capacity: 2, roomType: 'double', amenities: '' });
                        fetchRooms();
                        fetchHostels();
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error('Error creating room:', error_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var filteredRooms = rooms.filter(function (room) {
        var _a, _b;
        return room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ((_b = (_a = room.hostelId) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(searchTerm.toLowerCase()));
    });
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading rooms...</p>
        </div>
      </div>);
    }
    return (<div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <Home className="h-5 w-5 text-blue-600"/>
              <h1 className="text-xl font-bold text-gray-900">Room Management</h1>
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
              <button onClick={function () { return router.push('/admin/dashboard'); }} className="text-gray-600 hover:text-blue-600 text-sm">
                Dashboard
              </button>
              <button onClick={function () { return setShowAddForm(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                <Plus className="h-4 w-4"/>
                Add Room
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

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"/>
                <input type="text" placeholder="Search rooms..." value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"/>
              </div>
            </div>
            <select value={selectedHostel} onChange={function (e) { return setSelectedHostel(e.target.value); }} className="px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Hostels</option>
              {hostels.map(function (hostel) { return (<option key={hostel._id} value={hostel._id}>{hostel.name}</option>); })}
            </select>
          </div>
        </div>

        {/* Add Room Form */}
        {showAddForm && (<div className="bg-white rounded-lg shadow mb-6 p-6">
            <h2 className="text-lg font-semibold mb-4">Add New Room</h2>
            <form onSubmit={handleAddRoom} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hostel</label>
                  <select required value={newRoom.hostelId} onChange={function (e) { return setNewRoom(__assign(__assign({}, newRoom), { hostelId: e.target.value })); }} className="mt-1 w-full px-4 py-2 border rounded-md">
                    <option value="">Select Hostel</option>
                    {hostels.map(function (hostel) { return (<option key={hostel._id} value={hostel._id}>{hostel.name}</option>); })}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Room Number</label>
                  <input type="text" required value={newRoom.roomNumber} onChange={function (e) { return setNewRoom(__assign(__assign({}, newRoom), { roomNumber: e.target.value })); }} className="mt-1 w-full px-4 py-2 border rounded-md"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Floor</label>
                  <input type="number" required min="1" value={newRoom.floor} onChange={function (e) { return setNewRoom(__assign(__assign({}, newRoom), { floor: parseInt(e.target.value) })); }} className="mt-1 w-full px-4 py-2 border rounded-md"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Block</label>
                  <input type="text" value={newRoom.block} onChange={function (e) { return setNewRoom(__assign(__assign({}, newRoom), { block: e.target.value })); }} className="mt-1 w-full px-4 py-2 border rounded-md"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacity</label>
                  <input type="number" required min="1" max="4" value={newRoom.capacity} onChange={function (e) { return setNewRoom(__assign(__assign({}, newRoom), { capacity: parseInt(e.target.value) })); }} className="mt-1 w-full px-4 py-2 border rounded-md"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Room Type</label>
                  <select value={newRoom.roomType} onChange={function (e) { return setNewRoom(__assign(__assign({}, newRoom), { roomType: e.target.value })); }} className="mt-1 w-full px-4 py-2 border rounded-md">
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="triple">Triple</option>
                    <option value="quad">Quad</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amenities (comma-separated)</label>
                <input type="text" value={newRoom.amenities} onChange={function (e) { return setNewRoom(__assign(__assign({}, newRoom), { amenities: e.target.value })); }} placeholder="AC, WiFi, Attached Bathroom" className="mt-1 w-full px-4 py-2 border rounded-md"/>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Create Room
                </button>
                <button type="button" onClick={function () { return setShowAddForm(false); }} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </form>
          </div>)}

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map(function (room) {
            var _a;
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
                    <span>Hostel:</span>
                    <span className="font-medium text-gray-800">{(_a = room.hostelId) === null || _a === void 0 ? void 0 : _a.location}</span>
                  </div>
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
                  <div className="grid grid-cols-2 gap-2">
                    {room.beds.map(function (bed) {
                    var _a;
                    return (<div key={bed.bedNumber} className={"p-2.5 rounded-lg border-2 flex items-start gap-2 transition-all ".concat(bed.isOccupied
                            ? 'bg-red-50 border-red-400 text-red-800'
                            : 'bg-green-50 border-green-400 text-green-800')}>
                        <Bed className={"h-4 w-4 mt-0.5 flex-shrink-0 ".concat(bed.isOccupied ? 'text-red-600' : 'text-green-600')}/>
                        <div className="min-w-0">
                          <p className={"text-xs font-bold ".concat(bed.isOccupied ? 'text-red-700' : 'text-green-700')}>
                            Bed {bed.bedNumber}
                          </p>
                          <p className={"text-xs truncate ".concat(bed.isOccupied ? 'text-red-600' : 'text-green-600')}>
                            {bed.isOccupied
                            ? (((_a = bed.studentId) === null || _a === void 0 ? void 0 : _a.name) || 'Occupied')
                            : 'Vacant'}
                          </p>
                        </div>
                      </div>);
                })}
                  </div>
                </div>
              </div>);
        })}
        </div>

        {filteredRooms.length === 0 && (<div className="text-center py-16 text-gray-500">
            <Bed className="h-12 w-12 mx-auto text-gray-300 mb-3"/>
            <p className="text-lg font-medium">No rooms found.</p>
            <p className="text-sm">{selectedHostel ? 'Try selecting a different hostel.' : 'Add your first room to get started.'}</p>
          </div>)}
      </div>
    </div>);
}
