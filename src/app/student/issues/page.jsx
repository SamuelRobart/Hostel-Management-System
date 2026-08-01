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
import { AlertCircle, Plus, CheckCircle, X, Lock } from 'lucide-react';
export default function StudentIssues() {
    var _this = this;
    var _a = useState([]), issues = _a[0], setIssues = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(false), showForm = _c[0], setShowForm = _c[1];
    var _d = useState(false), submitting = _d[0], setSubmitting = _d[1];
    var _e = useState(''), error = _e[0], setError = _e[1];
    var _f = useState(''), success = _f[0], setSuccess = _f[1];
    var _g = useState(null), user = _g[0], setUser = _g[1];
    var _h = useState({
        title: '',
        description: '',
        category: 'maintenance',
        priority: 'medium'
    }), newIssue = _h[0], setNewIssue = _h[1];
    var router = useRouter();
    useEffect(function () {
        fetchUserInfo();
        fetchIssues();
    }, []);
    // Check if user is a student (role-based access control)
    useEffect(function () {
        if (user && user.role !== 'student') {
            // Non-students cannot access this page
            router.push('/login');
        }
    }, [user, router]);
    var fetchUserInfo = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/auth/me', {
                            credentials: 'include'
                        })];
                case 1:
                    res = _a.sent();
                    if (res.status === 401) {
                        router.push('/student-login');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (data.success && data.data) {
                        setUser(data.data);
                    }
                    else if (data.data) {
                        setUser(data.data);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error('Error fetching user info:', err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var fetchIssues = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, issues_1, err_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, 4, 5]);
                    setError('');
                    return [4 /*yield*/, fetch('/api/issues', {
                            credentials: 'include'
                        })];
                case 1:
                    res = _c.sent();
                    if (res.status === 401) {
                        router.push('/student-login');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _c.sent();
                    console.log('Issues fetch response:', { status: res.status, data: data });
                    issues_1 = [];
                    if (data.success && ((_a = data.data) === null || _a === void 0 ? void 0 : _a.issues)) {
                        issues_1 = data.data.issues;
                    }
                    else if ((_b = data.data) === null || _b === void 0 ? void 0 : _b.issues) {
                        issues_1 = data.data.issues;
                    }
                    else if (Array.isArray(data.issues)) {
                        issues_1 = data.issues;
                    }
                    else if (Array.isArray(data)) {
                        issues_1 = data;
                    }
                    setIssues(issues_1);
                    if (!res.ok && !issues_1.length) {
                        setError(data.error || data.message || 'Failed to load issues');
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _c.sent();
                    console.error('Error fetching issues:', err_2);
                    setError('Failed to load issues. Please refresh the page.');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, errorMessage, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setError('');
                    setSuccess('');
                    // Role validation - only students can submit issues
                    if ((user === null || user === void 0 ? void 0 : user.role) !== 'student') {
                        setError('Only students can report issues');
                        return [2 /*return*/];
                    }
                    // Hostel validation - student must be assigned to hostel
                    if (!(user === null || user === void 0 ? void 0 : user.hostelId)) {
                        setError('You must be assigned to a hostel to report issues. Please contact administration.');
                        return [2 /*return*/];
                    }
                    // Validation
                    if (!newIssue.title.trim()) {
                        setError('Title is required');
                        return [2 /*return*/];
                    }
                    if (!newIssue.description.trim()) {
                        setError('Description is required');
                        return [2 /*return*/];
                    }
                    if (newIssue.title.trim().length < 3) {
                        setError('Title must be at least 3 characters');
                        return [2 /*return*/];
                    }
                    if (newIssue.description.trim().length < 10) {
                        setError('Description must be at least 10 characters');
                        return [2 /*return*/];
                    }
                    setSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/issues', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(newIssue),
                            credentials: 'include'
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    console.log('Issue submission response:', { status: res.status, data: data });
                    // Check for errors
                    if (!res.ok) {
                        errorMessage = data.error || data.message || 'Failed to submit issue. Please try again.';
                        setError(errorMessage);
                        return [2 /*return*/];
                    }
                    // Check for success
                    if (data.success || res.status === 201) {
                        setSuccess('Issue reported successfully!');
                        setShowForm(false);
                        setNewIssue({
                            title: '',
                            description: '',
                            category: 'maintenance',
                            priority: 'medium'
                        });
                        // Refresh issues list
                        setTimeout(function () {
                            fetchIssues();
                            setSuccess('');
                        }, 1500);
                    }
                    else {
                        setError(data.error || data.message || 'Failed to submit issue');
                    }
                    return [3 /*break*/, 6];
                case 4:
                    err_3 = _a.sent();
                    console.error('Error creating issue:', err_3);
                    setError("Network error: ".concat(err_3.message || 'Please check your connection and try again'));
                    return [3 /*break*/, 6];
                case 5:
                    setSubmitting(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
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
        return <div className="min-h-screen flex items-center justify-center">Loading issues...</div>;
    }
    return (<div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button onClick={function () { return router.push('/student/dashboard'); }} className="text-blue-600 hover:text-blue-800 mr-4">
                ← Back to Dashboard
              </button>
              <h1 className="text-xl font-bold text-gray-900">My Issues & Complaints</h1>
            </div>
            <div className="flex items-center gap-3">
              {!(user === null || user === void 0 ? void 0 : user.hostelId) && (<div className="text-sm px-3 py-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4"/>
                  Assign hostel to raise tickets
                </div>)}
              <button onClick={function () { return (user === null || user === void 0 ? void 0 : user.hostelId) ? setShowForm(true) : null; }} disabled={!(user === null || user === void 0 ? void 0 : user.hostelId)} title={!(user === null || user === void 0 ? void 0 : user.hostelId) ? "You must be assigned to a hostel to report issues. Please contact administration." : ""} className={"px-4 py-2 rounded-md flex items-center gap-2 transition-colors ".concat((user === null || user === void 0 ? void 0 : user.hostelId)
            ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
            : 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-50')}>
                {(user === null || user === void 0 ? void 0 : user.hostelId) ? (<>
                    <Plus className="h-4 w-4"/>
                    Report Issue
                  </>) : (<>
                    <Lock className="h-4 w-4"/>
                    Report Issue
                  </>)}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {success && (<div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center gap-2">
            <CheckCircle className="h-5 w-5"/>
            {success}
          </div>)}

        {(user === null || user === void 0 ? void 0 : user.role) === 'student' && !(user === null || user === void 0 ? void 0 : user.hostelId) && (<div className="mb-6 p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0"/>
              <div>
                <h3 className="font-semibold text-orange-900">Hostel Assignment Required</h3>
                <p className="text-sm text-orange-800 mt-1">
                  You haven't been assigned to a hostel yet. Please contact your hostel administration to complete your hostel assignment. Once assigned, you'll be able to report issues and complaints.
                </p>
              </div>
            </div>
          </div>)}

        {issues.length === 0 ? (<div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No issues reported</h3>
            <p className="text-gray-500">Click "Report Issue" to submit your first complaint.</p>
          </div>) : (<div className="space-y-4">
            {issues.map(function (issue) { return (<div key={issue._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                    <p className="text-sm text-gray-500 capitalize">{issue.category}</p>
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
              </div>); })}
          </div>)}
      </div>

      {/* Report Issue Modal */}
      {showForm && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Report New Issue</h2>
              <button onClick={function () {
                setShowForm(false);
                setError('');
            }} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6"/>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (<div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4"/>
                  {error}
                </div>)}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input type="text" value={newIssue.title} onChange={function (e) {
                setNewIssue(__assign(__assign({}, newIssue), { title: e.target.value }));
                setError('');
            }} placeholder="Brief title of the issue" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required minLength={3}/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={newIssue.category} onChange={function (e) { return setNewIssue(__assign(__assign({}, newIssue), { category: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="maintenance">Maintenance</option>
                  <option value="food">Food</option>
                  <option value="security">Security</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select value={newIssue.priority} onChange={function (e) { return setNewIssue(__assign(__assign({}, newIssue), { priority: e.target.value })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea value={newIssue.description} onChange={function (e) {
                setNewIssue(__assign(__assign({}, newIssue), { description: e.target.value }));
                setError('');
            }} placeholder="Describe the issue in detail (minimum 10 characters)" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} required minLength={10}/>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={function () {
                setShowForm(false);
                setError('');
            }} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50" disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Issue'}
                </button>
              </div>
            </form>
          </div>
        </div>)}
    </div>);
}
