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
import { AlertCircle, Clock, CheckCircle, Users, X } from 'lucide-react';
export default function WardenIssues() {
    var _this = this;
    var _a = useState([]), issues = _a[0], setIssues = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(''), hostelName = _c[0], setHostelName = _c[1];
    var router = useRouter();
    useEffect(function () {
        fetchIssues();
    }, []);
    var fetchIssues = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, issuesData, error_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, fetch('/api/issues', {
                            credentials: 'include'
                        })];
                case 1:
                    res = _d.sent();
                    if (res.status === 401) {
                        router.push('/login');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _d.sent();
                    issuesData = [];
                    if (data.success && ((_a = data.data) === null || _a === void 0 ? void 0 : _a.issues)) {
                        issuesData = data.data.issues;
                    }
                    else if ((_b = data.data) === null || _b === void 0 ? void 0 : _b.issues) {
                        issuesData = data.data.issues;
                    }
                    else if (Array.isArray(data.issues)) {
                        issuesData = data.issues;
                    }
                    else if (Array.isArray(data)) {
                        issuesData = data;
                    }
                    setIssues(issuesData);
                    if (issuesData.length > 0) {
                        setHostelName(((_c = issuesData[0].studentId) === null || _c === void 0 ? void 0 : _c.hostelLocation) || 'Hostel');
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _d.sent();
                    console.error('Error fetching issues:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var _d = useState(null), selectedIssue = _d[0], setSelectedIssue = _d[1];
    var _e = useState(''), resolutionNotes = _e[0], setResolutionNotes = _e[1];
    var updateIssueStatus = function (issueId, newStatus, notes) { return __awaiter(_this, void 0, void 0, function () {
        var res, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("/api/issues/".concat(issueId), {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status: newStatus, resolutionNotes: notes || '' })
                        })];
                case 1:
                    res = _a.sent();
                    if (res.ok) {
                        fetchIssues(); // Refresh the list
                        setSelectedIssue(null);
                        setResolutionNotes('');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error updating issue:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleCloseTicket = function (issueId) {
        if (resolutionNotes.trim()) {
            updateIssueStatus(issueId, 'closed', resolutionNotes);
        }
        else {
            alert('Please add resolution notes before closing the ticket.');
        }
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
    var getStatusIcon = function (status) {
        switch (status) {
            case 'pending': return <Clock className="h-4 w-4"/>;
            case 'in-progress': return <AlertCircle className="h-4 w-4"/>;
            case 'resolved': return <CheckCircle className="h-4 w-4"/>;
            default: return <Clock className="h-4 w-4"/>;
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
              <button onClick={function () { return router.push('/warden/dashboard'); }} className="text-blue-600 hover:text-blue-800 mr-4">
                ← Back to Dashboard
              </button>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <AlertCircle className="h-6 w-6"/>
                Issues Management - {hostelName}
              </h1>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1"/>
              {issues.length} Total Issues
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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

        {issues.length === 0 ? (<div className="text-center py-12 bg-white rounded-lg shadow">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No issues reported</h3>
            <p className="text-gray-500">All clear! No issues from your hostel students.</p>
          </div>) : (<div className="space-y-4">
            {issues.map(function (issue) { return (<div key={issue._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(issue.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Reported by: <span className="font-medium">{issue.reportedBy}</span>
                      <span className="mx-2">•</span>
                      Category: <span className="capitalize">{issue.category}</span>
                    </p>
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
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Reported: {new Date(issue.createdAt).toLocaleDateString()}
                  </span>
                  
                  {issue.status !== 'closed' && (<div className="flex gap-2">
                      {issue.status === 'pending' && (<button onClick={function () { return updateIssueStatus(issue._id, 'in-progress'); }} className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                          Start Working
                        </button>)}
                      {issue.status === 'in-progress' && (<>
                          <button onClick={function () {
                            setSelectedIssue(issue._id);
                        }} className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                            Resolve & Close
                          </button>
                        </>)}
                      {issue.status === 'resolved' && (<button onClick={function () {
                            setSelectedIssue(issue._id);
                        }} className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">
                          Close Ticket
                        </button>)}
                    </div>)}
                  {issue.status === 'closed' && (<span className="text-sm text-gray-500">Ticket Closed</span>)}
                </div>
              </div>); })}
          </div>)}

        {/* Resolution Modal */}
        {selectedIssue && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Close Ticket</h3>
                <button onClick={function () {
                setSelectedIssue(null);
                setResolutionNotes('');
            }} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5"/>
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution Notes (Required)
                </label>
                <textarea value={resolutionNotes} onChange={function (e) { return setResolutionNotes(e.target.value); }} placeholder="Describe how the issue was resolved..." className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" rows={4} required/>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={function () {
                setSelectedIssue(null);
                setResolutionNotes('');
            }} className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                  Cancel
                </button>
                <button onClick={function () { return handleCloseTicket(selectedIssue); }} disabled={!resolutionNotes.trim()} className="px-4 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
                  Close Ticket
                </button>
              </div>
            </div>
          </div>)}
      </div>
    </div>);
}
