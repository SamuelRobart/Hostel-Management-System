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
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function StudentPage() {
    var _this = this;
    var _a = useState(''), phone = _a[0], setPhone = _a[1];
    var _b = useState(''), dateOfBirth = _b[0], setDateOfBirth = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(null), student = _d[0], setStudent = _d[1];
    var router = useRouter();
    var handleLogin = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var controller_1, timeoutId, res, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    controller_1 = new AbortController();
                    timeoutId = setTimeout(function () { return controller_1.abort(); }, 10000);
                    return [4 /*yield*/, fetch('/api/auth/student', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ phone: phone, dateOfBirth: dateOfBirth }),
                            signal: controller_1.signal
                        })];
                case 2:
                    res = _a.sent();
                    clearTimeout(timeoutId);
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (data.success) {
                        setStudent(data.student);
                        localStorage.setItem('student', JSON.stringify(data.student));
                    }
                    else {
                        alert(data.message);
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    if (error_1.name === 'AbortError') {
                        alert('Login timeout. Please try again.');
                    }
                    else {
                        alert('Login failed. Please check your connection.');
                    }
                    console.error('Login error:', error_1);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    if (student) {
        return (<div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Student Details</h2>
              <button onClick={function () { return setStudent(null); }} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Logout
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{student.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                  <p className="mt-1 text-sm text-gray-900">{student.fatherName || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
                  <p className="mt-1 text-sm text-gray-900">{student.motherName || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-sm text-gray-900">{student.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{student.email || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <p className="mt-1 text-sm text-gray-900">{student.dateOfBirth}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Course</label>
                  <p className="mt-1 text-sm text-gray-900">{student.course || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">College</label>
                  <p className="mt-1 text-sm text-gray-900">{student.college || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Native</label>
                  <p className="mt-1 text-sm text-gray-900">{student.native || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <p className="mt-1 text-sm text-gray-900">{student.address || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Family Income</label>
                  <p className="mt-1 text-sm text-gray-900">{student.income || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">12th Percentage</label>
                  <p className="mt-1 text-sm text-gray-900">{student.percentage12th || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Caste</label>
                  <p className="mt-1 text-sm text-gray-900">{student.caste || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bank Details</label>
                  <p className="mt-1 text-sm text-gray-900">{student.bankDetails || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Weekly Menu Section */}
            <div className="border-t pt-6">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 shadow-lg rounded-lg border border-orange-200 p-6">
                <h3 className="text-lg font-medium text-orange-800 mb-4">Weekly Hostel Menu</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-orange-200">
                    <thead className="bg-orange-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">Day</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">Breakfast</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">Lunch</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">Dinner</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-orange-100">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Monday</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Semiya Kichadi + Chutney/Sambar</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Rice + Sambar + Poriyal + Rasam + Mor + Muttai/Muttai Masala</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Rice + Sambar + Vegetable</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Tuesday</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Poori + Masala</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Veg Biryani + Veg Kuruma + Egg</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Idli + Sambar + Chutney</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Wednesday</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Idli + Sambar + Chutney</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Rice + Mutton/Chicken Kuruma + Mor</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Veg Pulav + Kuruma/Raitha</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Thursday</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Idli + Sambar + Chutney</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Tomato/Lemon/Curd Rice + Potato Poriyal + Egg</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Othappam + Chutney + Sambar</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Friday</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Pongal/Varagu Pongal + Kathirikai Kozhju + Vada</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Rice + Kara Kulambu + Poriyal/Koottu + Rasam + Mor + Egg</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Wheat Dosa + Tomato Chutney</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Saturday</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Rava Kichadi + Coconut Chutney</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Pudhina/Carrot/Curry Leaf Rice + Egg + Appalam/Paruppu Sadam</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Rice + Sambar + Vegetable</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Sunday</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Dosa/Navadhaniya Dosa + Sambar + Chutney</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Rice + Veg Kuruma + Rasam + Mor</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Tomato/Sambar Rice + Varuval</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
    return (<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <h2 className="text-2xl font-bold text-center">Student Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="tel" placeholder="Phone Number" value={phone} onChange={function (e) { return setPhone(e.target.value); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
          <input type="date" placeholder="Date of Birth" value={dateOfBirth} onChange={function (e) { return setDateOfBirth(e.target.value); }} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {loading && (<div className="text-center text-sm text-gray-500">
              Searching student records...
            </div>)}
        </form>
        <p className="text-sm text-gray-600 text-center">
          Enter your registered phone number and date of birth
        </p>
        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{' '}
          <Link href="/student-signup" className="text-blue-600 hover:text-blue-500 font-medium">
            Sign up here
          </Link>
        </p>
      </div>
    </div>);
}
