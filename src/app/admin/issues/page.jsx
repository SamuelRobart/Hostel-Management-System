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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Clock, CheckCircle, Users, Filter } from 'lucide-react';
export default function AdminIssues() {
    var _this = this;
    var _a = useState([]), issues = _a[0], setIssues = _a[1];
    var _b = useState([]), filteredIssues = _b[0], setFilteredIssues = _b[1];
    var _c = useState(true), loading = _c[0], setLoading = _c[1];
    var _d = useState({
        status: 'all',
        priority: 'all',
        category: 'all',
        hostel: 'all'
    }), filters = _d[0], setFilters = _d[1];
    var router = useRouter();
    useEffect(function () {
        fetchIssues();
    }, []);
    useEffect(function () {
        applyFilters();
    }, [issues, filters]);
    var fetchIssues = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, fetch('/api/issues')];
                case 1:
                    res = _a.sent();
                    if (res.status === 401) {
                        router.push('/login');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (data.success) {
                        setIssues(data.issues);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching issues:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var applyFilters = function () {
        var filtered = __spreadArray([], issues, true);
        if (filters.status !== 'all') {
            filtered = filtered.filter(function (issue) { return issue.status === filters.status; });
        }
        if (filters.priority !== 'all') {
            filtered = filtered.filter(function (issue) { return issue.priority === filters.priority; });
        }
        if (filters.category !== 'all') {
            filtered = filtered.filter(function (issue) { return issue.category === filters.category; });
        }
        if (filters.hostel !== 'all') {
            filtered = filtered.filter(function (issue) { var _a; return ((_a = issue.studentId) === null || _a === void 0 ? void 0 : _a.hostelLocation) === filters.hostel; });
        }
        setFilteredIssues(filtered);
    };
    var getUniqueHostels = function () {
        var hostels = issues
            .map(function (issue) { var _a; return (_a = issue.studentId) === null || _a === void 0 ? void 0 : _a.hostelLocation; })
            .filter(function (loc) { return !!loc; });
        return Array.from(new Set(hostels));
    };
    var getStatusColor = function (status) {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'resolved': return 'bg-green-100 text-green-800';
            case 'closed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    var getPriorityColor = function (priority) {
        switch (priority) {
            case 'urgent': return 'bg-red-100 text-red-800';
            case 'high': return 'bg-orange-100 text-orange-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    return (<div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button onClick={function () { return router.push('/admin/dashboard'); }} className="text-blue-600 hover:text-blue-800 mr-4">
                ← Back to Dashboard
              </button>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <AlertCircle className="h-6 w-6"/>
                All Issues Management
              </h1>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1"/>
              {filteredIssues.length} of {issues.length} Issues
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-gray-600"/>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-2xl font-bold text-gray-900">{issues.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600"/>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {issues.filter(function (i) { return i.status === 'pending'; }).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-blue-600"/>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {issues.filter(function (i) { return i.status === 'in-progress'; }).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600"/>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {issues.filter(function (i) { return i.status === 'resolved'; }).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600"/>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Urgent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {issues.filter(function (i) { return i.priority === 'urgent'; }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500"/>
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={filters.status} onChange={function (e) { return setFilters(__assign(__assign({}, filters), { status: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select value={filters.priority} onChange={function (e) { return setFilters(__assign(__assign({}, filters), { priority: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={filters.category} onChange={function (e) { return setFilters(__assign(__assign({}, filters), { category: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="all">All Categories</option>
                <option value="maintenance">Maintenance</option>
                <option value="food">Food</option>
                <option value="security">Security</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hostel</label>
              <select value={filters.hostel} onChange={function (e) { return setFilters(__assign(__assign({}, filters), { hostel: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="all">All Hostels</option>
                {getUniqueHostels().map(function (hostel) { return (<option key={hostel} value={hostel}>{hostel}</option>); })}
              </select>
            </div>
          </div>
        </div>

        {/* Issues List */}
        {filteredIssues.length === 0 ? (<div className="text-center py-12 bg-white rounded-lg shadow">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
            <p className="text-gray-500">No issues match your current filters.</p>
          </div>) : (<div className="space-y-4">
            {filteredIssues.map(function (issue) {
                var _a;
                return (<div key={issue._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{issue.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                      <span>Student: <span className="font-medium">{issue.reportedBy}</span></span>
                      <span>Hostel: <span className="font-medium">{(_a = issue.studentId) === null || _a === void 0 ? void 0 : _a.hostelLocation}</span></span>
                      <span>Category: <span className="capitalize font-medium">{issue.category}</span></span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={"px-2 py-1 text-xs rounded-full ".concat(getPriorityColor(issue.priority))}>
                      {issue.priority}
                    </span>
                    <span className={"px-2 py-1 text-xs rounded-full ".concat(getStatusColor(issue.status))}>
                      {issue.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{issue.description}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Reported: {new Date(issue.createdAt).toLocaleDateString()}</span>
                  {issue.assignedTo && (<span>Assigned to: {issue.assignedTo.name}</span>)}
                </div>
              </div>);
            })}
          </div>)}
      </div>
    </div>);
}
