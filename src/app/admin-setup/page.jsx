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
import { useState } from 'react';
import Link from 'next/link';
export default function AdminSetupPage() {
    var _this = this;
    var _a = useState('init'), action = _a[0], setAction = _a[1];
    var _b = useState(''), username = _b[0], setUsername = _b[1];
    var _c = useState(''), password = _c[0], setPassword = _c[1];
    var _d = useState(''), adminPassword = _d[0], setAdminPassword = _d[1];
    var _e = useState(false), loading = _e[0], setLoading = _e[1];
    var _f = useState(''), message = _f[0], setMessage = _f[1];
    var _g = useState(''), error = _g[0], setError = _g[1];
    var _h = useState([]), admins = _h[0], setAdmins = _h[1];
    var handleInitialize = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError('');
                    setMessage('');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, 8, 9]);
                    return [4 /*yield*/, fetch('/api/admin/manage', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                action: 'init',
                                adminPassword: adminPassword
                            })
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (!data.success) return [3 /*break*/, 5];
                    setMessage("\u2713 ".concat(data.message, ". Created ").concat(data.count, " admin accounts"));
                    return [4 /*yield*/, handleListAdmins()];
                case 4:
                    _a.sent();
                    setAdminPassword('');
                    return [3 /*break*/, 6];
                case 5:
                    setError(data.message || 'Initialization failed');
                    _a.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7:
                    err_1 = _a.sent();
                    setError('Failed to initialize');
                    return [3 /*break*/, 9];
                case 8:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    var handleAddAdmin = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!username || !password) {
                        setError('Username and password required');
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    setError('');
                    setMessage('');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, 8, 9]);
                    return [4 /*yield*/, fetch('/api/admin/manage', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                action: 'add',
                                username: username,
                                password: password
                            })
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (!data.success) return [3 /*break*/, 5];
                    setMessage("\u2713 Admin added: ".concat(data.admin.username));
                    setUsername('');
                    setPassword('');
                    return [4 /*yield*/, handleListAdmins()];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    setError(data.message || 'Failed to add admin');
                    _a.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7:
                    err_2 = _a.sent();
                    setError('Failed to add admin');
                    return [3 /*break*/, 9];
                case 8:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    var handleListAdmins = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/admin/manage', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ action: 'list' })
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (data.success) {
                        setAdmins(data.admins);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    console.error('Failed to list admins');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleDeleteAdmin = function (adminUsername) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm("Delete admin: ".concat(adminUsername, "?")))
                        return [2 /*return*/];
                    setLoading(true);
                    setError('');
                    setMessage('');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, 8, 9]);
                    return [4 /*yield*/, fetch('/api/admin/manage', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                action: 'delete',
                                username: adminUsername
                            })
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (!data.success) return [3 /*break*/, 5];
                    setMessage('✓ Admin deleted');
                    return [4 /*yield*/, handleListAdmins()];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    setError(data.message || 'Failed to delete');
                    _a.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7:
                    err_4 = _a.sent();
                    setError('Failed to delete admin');
                    return [3 /*break*/, 9];
                case 8:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-gray-600 mt-2">Initialize or manage admin accounts</p>
          <p className="text-sm text-gray-500 mt-1">No seed file needed - manage directly from database</p>
        </div>

        {error && (<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>)}

        {message && (<div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700">{message}</p>
          </div>)}

        {/* Initialize Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Initialize Default Admins</h2>
          <p className="text-sm text-gray-600 mb-4">
            Create default admin accounts: admin, superadmin, hostel_admin
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initialization Password
            </label>
            <input type="password" value={adminPassword} onChange={function (e) { return setAdminPassword(e.target.value); }} placeholder="Enter initialization password " className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"/>
            {/* <p className="text-xs text-gray-500 mt-1">Default password: sam2025</p> */}
          </div>
          <button onClick={handleInitialize} disabled={loading} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 font-medium">
            {loading ? 'Initializing...' : 'Initialize Default Admins'}
          </button>
        </div>

        {/* Add Single Admin */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Admin</h2>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input type="text" value={username} onChange={function (e) { return setUsername(e.target.value); }} placeholder="Enter username" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input type="password" value={password} onChange={function (e) { return setPassword(e.target.value); }} placeholder="Enter password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"/>
            </div>
          </div>
          <button onClick={handleAddAdmin} disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium">
            {loading ? 'Adding...' : 'Add Admin'}
          </button>
        </div>

        {/* List Admins */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Existing Admins</h2>
            <button onClick={handleListAdmins} className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Refresh
            </button>
          </div>

          {admins.length === 0 ? (<p className="text-gray-600 text-center py-4">No admins found</p>) : (<div className="space-y-2">
              {admins.map(function (admin) { return (<div key={admin._id} className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">{admin.username}</p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(admin.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button onClick={function () { return handleDeleteAdmin(admin.username); }} className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Delete
                  </button>
                </div>); })}
            </div>)}
        </div>

        <div className="mt-8 text-center">
          <Link href="/admin-login" className="text-purple-600 hover:text-purple-700 font-medium">
            Go to Admin Login
          </Link>
        </div>
      </div>
    </div>);
}
