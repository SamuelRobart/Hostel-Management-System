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
import Link from 'next/link';
import { Building2, Users, Shield, BookOpen, MapPin, Phone, Mail, ArrowRight, Star, Award, Heart } from 'lucide-react';
export default function Home() {
    var _a, _b, _c;
    var _d = useState(null), stats = _d[0], setStats = _d[1];
    var _e = useState([]), hostels = _e[0], setHostels = _e[1];
    var _f = useState(true), loading = _f[0], setLoading = _f[1];
    useEffect(function () {
        function fetchStats() {
            return __awaiter(this, void 0, void 0, function () {
                var res, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, 4, 5]);
                            return [4 /*yield*/, fetch('/api/admin/stats')];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, res.json()];
                        case 2:
                            data = _a.sent();
                            if (data.success) {
                                setStats(__assign(__assign({}, data.summary), { wardenCount: data.hostels.filter(function (h) { return h.warden; }).length }));
                                setHostels(data.hostels);
                            }
                            return [3 /*break*/, 5];
                        case 3:
                            error_1 = _a.sent();
                            console.error('Failed to fetch stats:', error_1);
                            return [3 /*break*/, 5];
                        case 4:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        fetchStats();
    }, []);
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md">
              <Building2 className="w-6 h-6 text-white"/>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Hostel Management
              </span>
              <span className="block text-xs text-gray-500">Stay with Comfort</span>
            </div>
          </div>
          <Link href="/login" className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 font-medium flex items-center gap-2">
            Sign In
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex flex-col md:flex-row items-center justify-center mb-8 gap-8">
            {/* Premium Logo 1: Elite Housing Emblem */}
            <div className="relative flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 border border-amber-400/30 shadow-2xl p-4 overflow-hidden group hover:border-amber-400/60 transition-all duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative flex flex-col items-center justify-center text-center">
                <Building2 className="w-12 h-12 text-amber-400 mb-1"/>
                <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-amber-400">ELITE</span>
                <span className="text-[9px] uppercase tracking-[0.1em] font-medium text-slate-300">HOUSING</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Award className="w-4 h-4"/>
                  Government Certified              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                Elite Hostel
                
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
                Hostel Management System
              </h2>
              <div className="flex flex-wrap justify-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500"/>
                  <span className="font-medium">Head Quarters, Chennai</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500"/>
                  <span className="font-medium">EliteHostel@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-500"/>
                  <span className="font-medium">0422-23004104</span>
                </div>
              </div>
            </div>

            {/* Premium Logo 2: Certified Seal */}
            <div className="relative flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-zinc-900 border border-cyan-500/30 shadow-2xl p-4 overflow-hidden group hover:border-cyan-500/60 transition-all duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative flex flex-col items-center justify-center text-center">
                <Shield className="w-12 h-12 text-cyan-400 mb-1"/>
                <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-cyan-400">SAFETY</span>
                <span className="text-[9px] uppercase tracking-[0.1em] font-medium text-slate-300">VERIFIED</span>
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive digital solution for managing hostels across India,
            providing modern facilities and efficient administration for student and Professionals.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/login" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
              Access Portal
              <ArrowRight className="w-5 h-5"/>
            </Link>
            <button className="px-8 py-3 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white hover:border-blue-200 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
              <Building2 className="h-8 w-8 text-white"/>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {loading ? '...' : ((stats === null || stats === void 0 ? void 0 : stats.totalHostels) || 12)}
            </h3>
            <p className="text-gray-600 font-medium">Hostels</p>
            <p className="text-sm text-gray-500 mt-1">
              {loading ? '...' : "".concat((_a = stats === null || stats === void 0 ? void 0 : stats.girlsHostels) !== null && _a !== void 0 ? _a : 6, " Girls & ").concat((_b = stats === null || stats === void 0 ? void 0 : stats.boysHostels) !== null && _b !== void 0 ? _b : 6, " Boys")}
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white hover:border-green-200 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
              <Users className="h-8 w-8 text-white"/>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {loading ? '...' : ((stats === null || stats === void 0 ? void 0 : stats.totalCapacity) || 720)}
            </h3>
            <p className="text-gray-600 font-medium">Total Capacity</p>
            <p className="text-sm text-gray-500 mt-1">Student accommodation</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white hover:border-purple-200 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
              <Shield className="h-8 w-8 text-white"/>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {loading ? '...' : ((stats === null || stats === void 0 ? void 0 : stats.wardenCount) || 12)}
            </h3>
            <p className="text-gray-600 font-medium">Wardens</p>
            <p className="text-sm text-gray-500 mt-1">Dedicated staff</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white hover:border-amber-200 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
              <BookOpen className="h-8 w-8 text-white"/>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {loading ? '...' : ((_c = stats === null || stats === void 0 ? void 0 : stats.totalOccupied) !== null && _c !== void 0 ? _c : 721)}
            </h3>
            <p className="text-gray-600 font-medium">Enrolled</p>
            <p className="text-sm text-gray-500 mt-1">Currently staying</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl">
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6">
              <Users className="h-7 w-7"/>
            </div>
            <h3 className="text-2xl font-bold mb-3">For Students</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Access your profile, view hostel menu, submit complaints, and track their status.
            </p>
            <ul className="space-y-3 text-blue-100">
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400"/>
                Profile Management
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400"/>
                Issue Reporting
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400"/>
                Weekly Menu
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-3xl p-8 text-white shadow-2xl">
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6">
              <Shield className="h-7 w-7"/>
            </div>
            <h3 className="text-2xl font-bold mb-3">For Wardens</h3>
            <p className="text-green-100 mb-6 leading-relaxed">
              Manage students in your hostel, handle issues, and oversee daily operations.
            </p>
            <ul className="space-y-3 text-green-100">
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400"/>
                Student Management
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400"/>
                Issue Resolution
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400"/>
                Hostel Dashboard
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-violet-700 rounded-3xl p-8 text-white shadow-2xl">
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6">
              <Building2 className="h-7 w-7"/>
            </div>
            <h3 className="text-2xl font-bold mb-3">For Administrators</h3>
            <p className="text-purple-100 mb-6 leading-relaxed">
              Complete system access with full control over all hostels and user management.
            </p>
            <ul className="space-y-3 text-purple-100">
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400"/>
                All Hostel Stats
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400"/>
                Student Records
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400"/>
                Warden Directory
              </li>
            </ul>
          </div>
        </div>

        {/* Hostel Locations */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Our Hostel Network</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Girls Hostels */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white"/>
                </div>
                <h4 className="text-xl font-bold text-pink-700">Girls Hostels ({hostels.filter(function (h) { return h.type === 'girls'; }).length})</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {loading ? (<div className="col-span-2 text-center text-gray-400 py-4 italic text-sm">Loading...</div>) : (hostels.filter(function (h) { return h.type === 'girls'; }).map(function (h, i) { return (<div key={i} className="bg-white rounded-xl p-3 text-center shadow-sm border border-pink-100 hover:shadow-md hover:border-pink-300 transition-all">
                      <span className="text-pink-700 font-semibold">{h.name}</span>
                    </div>); }))}
              </div>
            </div>

            {/* Boys Hostels */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white"/>
                </div>
                <h4 className="text-xl font-bold text-blue-700">Boys Hostels ({hostels.filter(function (h) { return h.type === 'boys'; }).length})</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {loading ? (<div className="col-span-2 text-center text-gray-400 py-4 italic text-sm">Loading...</div>) : (hostels.filter(function (h) { return h.type === 'boys'; }).map(function (h, i) { return (<div key={i} className="bg-white rounded-xl p-3 text-center shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-300 transition-all">
                      <span className="text-blue-700 font-semibold">{h.name}</span>
                    </div>); }))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          
          <p className="text-gray-500">
            © 2026 Elite Hostel
          </p>
        </div>
      </div>
    </div>);
}
