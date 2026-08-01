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
import { useRouter } from 'next/navigation';
import { User, LogOut, Building, Phone, MapPin } from 'lucide-react';
export default function WardenProfile() {
    var _this = this;
    var router = useRouter();
    var _a = useState(null), warden = _a[0], setWarden = _a[1];
    var _b = useState(null), hostel = _b[0], setHostel = _b[1];
    var _c = useState(true), loading = _c[0], setLoading = _c[1];
    useEffect(function () {
        var fetchProfile = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, data, hostelRes, hostelData, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, 7, 8]);
                        return [4 /*yield*/, fetch('/api/auth/me')];
                    case 1:
                        res = _b.sent();
                        if (res.status === 401) {
                            router.push('/login');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _b.sent();
                        if (!data.user) return [3 /*break*/, 5];
                        setWarden(data.user);
                        if (!data.user.hostelId) return [3 /*break*/, 5];
                        return [4 /*yield*/, fetch("/api/hostels?id=".concat(data.user.hostelId))];
                    case 3:
                        hostelRes = _b.sent();
                        return [4 /*yield*/, hostelRes.json()];
                    case 4:
                        hostelData = _b.sent();
                        if (hostelData.success && ((_a = hostelData.hostels) === null || _a === void 0 ? void 0 : _a[0])) {
                            setHostel(hostelData.hostels[0]);
                        }
                        _b.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        error_1 = _b.sent();
                        console.error('Error loading profile:', error_1);
                        return [3 /*break*/, 8];
                    case 7:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        fetchProfile();
    }, [router]);
    var handleLogout = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/api/auth/logout', { method: 'POST' })];
                case 1:
                    _a.sent();
                    router.push('/login');
                    return [2 /*return*/];
            }
        });
    }); };
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    if (!warden) {
        return <div className="min-h-screen flex items-center justify-center">Profile not found.</div>;
    }
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Warden Profile</p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{warden.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={function () { return router.push('/warden/dashboard'); }} className="px-4 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm">
                Dashboard
              </button>
              <button onClick={function () { return router.push('/logout'); }} className="px-4 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center gap-2 text-sm">
                <LogOut className="h-4 w-4"/>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-full p-4">
                <User className="h-12 w-12 text-green-600"/>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{warden.name}</h2>
                <p className="text-green-100 mt-1">Hostel Warden</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5"/>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-gray-900 font-medium">{warden.name}</p>
                  </div>
                </div>

                {warden.username && (<div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-gray-400 mt-0.5"/>
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="text-gray-900 font-mono">{warden.username}</p>
                    </div>
                  </div>)}

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5"/>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900 font-mono">{warden.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-gray-400 mt-0.5"/>
                  <div>
                    <p className="text-sm text-gray-500">Assigned Hostel</p>
                    <p className="text-gray-900 capitalize">{warden.hostelLocation || (hostel === null || hostel === void 0 ? void 0 : hostel.name) || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Hostel Details</h3>
                
                {hostel ? (<>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5"/>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-gray-900">{hostel.location}</p>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-green-900 mb-2">Hostel Statistics</p>
                      <div className="grid grid-cols-2 gap-2 text-sm text-green-800">
                        <div>
                          <span className="font-medium">Capacity:</span> {hostel.totalCapacity}
                        </div>
                        <div>
                          <span className="font-medium">Occupied:</span> {hostel.currentOccupancy}
                        </div>
                        <div>
                          <span className="font-medium">Rooms:</span> {hostel.totalRooms || 0}
                        </div>
                        <div>
                          <span className="font-medium">Beds:</span> {hostel.totalBeds || 0}
                        </div>
                      </div>
                    </div>
                  </>) : (<p className="text-gray-500">Hostel information not available</p>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
