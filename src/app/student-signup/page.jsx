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
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Upload, X } from 'lucide-react';
// Coimbatore Colleges List
var COIMBATORE_COLLEGES = [
    'Government Arts College',
    'Government Commerce College',
    'Government Science College',
    'PSG College of Arts and Science',
    'PSG College of Technology',
    'Sri Ramakrishna College of Arts and Science',
    'Sri Ramakrishna Engineering College',
    'KPR Institute of Engineering and Technology',
    'Amrita School of Engineering - Coimbatore',
    'VSB Engineering College',
    'Nitte Meenakshi Institute of Technology - Coimbatore',
    'Kongu Engineering College',
    'KMCT College of Engineering',
    'Skct College of Engineering',
    'Anna University Chennai - Coimbatore Cluster',
    'Bhaktavatsalam Institute of Technology',
    'Nallamuthu Gounder Mahalingam College of Engineering',
    'Coimbatore Institute of Technology',
    'SNS College of Engineering',
    'Nehru College of Engineering and Research Institute'
];
// Caste categories
var CASTES = ['General', 'OBC', 'OBC-NC', 'SC', 'ST', 'BC', 'MBC', 'Prefer not to say'];
export default function StudentSignUpPage() {
    var _this = this;
    var router = useRouter();
    var _a = useState(false), loading = _a[0], setLoading = _a[1];
    var _b = useState(''), error = _b[0], setError = _b[1];
    var _c = useState(''), success = _c[0], setSuccess = _c[1];
    var _d = useState([]), hostels = _d[0], setHostels = _d[1];
    var _e = useState(1), currentStep = _e[0], setCurrentStep = _e[1];
    var _f = useState({}), uploadedFiles = _f[0], setUploadedFiles = _f[1];
    var _g = useState({
        name: '',
        phone: '',
        alternatePhone: '',
        dateOfBirth: '',
        hostelLocation: '',
        email: '',
        native: '',
        fatherName: '',
        motherName: '',
        college: '',
        appliedColleges: [],
        course: '',
        percentage12th: '',
        address: '',
        income: '',
        caste: '',
        bankDetails: '',
        aadhaarNumber: '',
        communityCertificateNumber: '',
        photoUrl: '',
        documents: []
    }), formData = _g[0], setFormData = _g[1];
    useEffect(function () {
        var fetchHostels = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, data, err_1;
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
                        if (data.success && data.hostels) {
                            setHostels(data.hostels);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error('Error fetching hostels:', err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchHostels();
    }, []);
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleMultiSelect = function (e) {
        var options = e.target.options;
        var selectedValues = [];
        for (var i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }
        setFormData(function (prev) { return (__assign(__assign({}, prev), { appliedColleges: selectedValues })); });
    };
    var handleFileUpload = function (e, fieldName) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            // In production, you would upload to a server/cloud storage
            // For now, we'll store the filename
            // This is a placeholder - implement actual file upload to your backend
            if (fieldName === 'photo') {
                setUploadedFiles(function (prev) { return (__assign(__assign({}, prev), { photo: file.name })); });
                setFormData(function (prev) { return (__assign(__assign({}, prev), { photoUrl: file.name })); });
            }
            else {
                // Add document
                var docType_1 = fieldName;
                setUploadedFiles(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[fieldName] = file.name, _a)));
                });
                var existingDocs_1 = formData.documents.filter(function (doc) { return doc.type !== docType_1; });
                setFormData(function (prev) { return (__assign(__assign({}, prev), { documents: __spreadArray(__spreadArray([], existingDocs_1, true), [
                        {
                            type: docType_1,
                            documentUrl: file.name
                        }
                    ], false) })); });
            }
            setSuccess("File uploaded: ".concat(file.name));
            setTimeout(function () { return setSuccess(''); }, 3000);
        }
    };
    var removeFile = function (fieldName) {
        setUploadedFiles(function (prev) {
            var newFiles = __assign({}, prev);
            delete newFiles[fieldName];
            return newFiles;
        });
        if (fieldName === 'photo') {
            setFormData(function (prev) { return (__assign(__assign({}, prev), { photoUrl: '' })); });
        }
        else {
            setFormData(function (prev) { return (__assign(__assign({}, prev), { documents: prev.documents.filter(function (doc) { return doc.type !== fieldName; }) })); });
        }
    };
    var validateStep = function (step) {
        switch (step) {
            case 1:
                if (!formData.name.trim()) {
                    setError('Name is required');
                    return false;
                }
                if (!formData.phone.match(/^\d{10}$/)) {
                    setError('Phone number must be 10 digits');
                    return false;
                }
                if (!formData.alternatePhone.match(/^\d{10}$/)) {
                    setError('Alternate phone must be 10 digits');
                    return false;
                }
                if (!formData.dateOfBirth) {
                    setError('Date of Birth is required');
                    return false;
                }
                if (!formData.hostelLocation) {
                    setError('Please select a hostel');
                    return false;
                }
                return true;
            case 2:
                if (!formData.appliedColleges.length) {
                    setError('Please select at least one college');
                    return false;
                }
                if (!formData.caste) {
                    setError('Please select your caste');
                    return false;
                }
                return true;
            case 3:
                if (!formData.aadhaarNumber.match(/^\d{12}$/)) {
                    setError('Aadhaar number must be 12 digits');
                    return false;
                }
                return true;
            case 4:
                if (!uploadedFiles.photo) {
                    setError('Please upload a photo');
                    return false;
                }
                return true;
            default:
                return true;
        }
    };
    var handleNextStep = function () {
        setError('');
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
        }
    };
    var handlePrevStep = function () {
        setCurrentStep(currentStep - 1);
        setError('');
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setError('');
                    setSuccess('');
                    if (!validateStep(4))
                        return [2 /*return*/];
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/auth/student/signup', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(formData),
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (res.ok) {
                        setSuccess('Registration successful! Redirecting to login...');
                        localStorage.setItem('student', JSON.stringify(data.student));
                        setTimeout(function () {
                            router.push('/login');
                        }, 2000);
                    }
                    else {
                        setError(data.message || 'Registration failed');
                    }
                    return [3 /*break*/, 6];
                case 4:
                    err_2 = _a.sent();
                    setError('An error occurred. Please try again.');
                    console.error('Signup error:', err_2);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Student Registration</h2>
          <p className="mt-2 text-sm text-gray-600">Step {currentStep} of 4 - Create your account</p>
          <div className="mt-4 flex justify-center gap-2">
            {[1, 2, 3, 4].map(function (step) { return (<div key={step} className={"h-2 w-8 rounded-full ".concat(step <= currentStep ? 'bg-blue-600' : 'bg-gray-300')}/>); })}
          </div>
        </div>

        {error && (<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>)}

        {success && (<div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">{success}</p>
          </div>)}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: Basic Information */}
          {currentStep === 1 && (<div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
                    <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Enter your full name"/>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                    <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="10-digit mobile number" maxLength={10}/>
                  </div>

                  <div>
                    <label htmlFor="alternatePhone" className="block text-sm font-medium text-gray-700">Alternate Phone *</label>
                    <input id="alternatePhone" name="alternatePhone" type="tel" required value={formData.alternatePhone} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="10-digit alternate number" maxLength={10}/>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="your.email@example.com"/>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                    <input id="dateOfBirth" name="dateOfBirth" type="date" required value={formData.dateOfBirth} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="hostelLocation" className="block text-sm font-medium text-gray-700">Select Hostel *</label>
                    <select id="hostelLocation" name="hostelLocation" required value={formData.hostelLocation} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                      <option value="">-- Select your hostel --</option>
                      {hostels.map(function (hostel) { return (<option key={hostel._id} value={hostel.location}>
                          {hostel.name} ({hostel.location})
                        </option>); })}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="native" className="block text-sm font-medium text-gray-700">Native Place</label>
                    <input id="native" name="native" type="text" value={formData.native} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Your native place"/>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Family Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father's Name</label>
                    <input id="fatherName" name="fatherName" type="text" value={formData.fatherName} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Father's name"/>
                  </div>

                  <div>
                    <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">Mother's Name</label>
                    <input id="motherName" name="motherName" type="text" value={formData.motherName} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Mother's name"/>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Current Address</label>
                    <textarea id="address" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Your current address" rows={2}/>
                  </div>
                </div>
              </div>
            </div>)}

          {/* STEP 2: Academic & Social Information */}
          {currentStep === 2 && (<div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="college" className="block text-sm font-medium text-gray-700">Current College</label>
                    <input id="college" name="college" type="text" value={formData.college} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="College name"/>
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
                    <input id="course" name="course" type="text" value={formData.course} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Course name"/>
                  </div>

                  <div>
                    <label htmlFor="percentage12th" className="block text-sm font-medium text-gray-700">12th Percentage</label>
                    <input id="percentage12th" name="percentage12th" type="text" value={formData.percentage12th} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="e.g., 85.5"/>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="appliedColleges" className="block text-sm font-medium text-gray-700">Applied Colleges in Coimbatore * (Select multiple)</label>
                    <select id="appliedColleges" multiple value={formData.appliedColleges} onChange={handleMultiSelect} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                      {COIMBATORE_COLLEGES.map(function (college) { return (<option key={college} value={college}>{college}</option>); })}
                    </select>
                    <p className="mt-2 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple colleges</p>
                    {formData.appliedColleges.length > 0 && (<div className="mt-2 flex flex-wrap gap-2">
                        {formData.appliedColleges.map(function (college) { return (<span key={college} className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            {college}
                          </span>); })}
                      </div>)}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="caste" className="block text-sm font-medium text-gray-700">Caste *</label>
                    <select id="caste" name="caste" required value={formData.caste} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                      <option value="">-- Select Caste --</option>
                      {CASTES.map(function (caste) { return (<option key={caste} value={caste}>{caste}</option>); })}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="income" className="block text-sm font-medium text-gray-700">Family Annual Income</label>
                    <input id="income" name="income" type="text" value={formData.income} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="e.g., ₹200000"/>
                  </div>
                </div>
              </div>
            </div>)}

          {/* STEP 3: Documents & Details */}
          {currentStep === 3 && (<div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Government ID & Financial Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700">Aadhaar Number *</label>
                    <input id="aadhaarNumber" name="aadhaarNumber" type="text" required value={formData.aadhaarNumber} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="12-digit Aadhaar number" maxLength={12}/>
                  </div>

                  <div>
                    <label htmlFor="communityCertificateNumber" className="block text-sm font-medium text-gray-700">Community Certificate Number</label>
                    <input id="communityCertificateNumber" name="communityCertificateNumber" type="text" value={formData.communityCertificateNumber} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Community Certificate number"/>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="bankDetails" className="block text-sm font-medium text-gray-700">Bank Details</label>
                    <textarea id="bankDetails" name="bankDetails" value={formData.bankDetails} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Bank name, Account number, IFSC code" rows={3}/>
                  </div>
                </div>
              </div>
            </div>)}

          {/* STEP 4: Photo & Documents Upload */}
          {currentStep === 4 && (<div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Photo Upload</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <label className="flex justify-center cursor-pointer">
                    <input type="file" accept="image/*" onChange={function (e) { return handleFileUpload(e, 'photo'); }} className="hidden"/>
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2"/>
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF (Max 5MB)</p>
                    </div>
                  </label>
                  {uploadedFiles.photo && (<div className="mt-4 flex items-center justify-between bg-green-100 p-3 rounded">
                      <span className="text-sm text-green-800">{uploadedFiles.photo}</span>
                      <button type="button" onClick={function () { return removeFile('photo'); }} className="text-green-800 hover:text-green-600">
                        <X className="h-4 w-4"/>
                      </button>
                    </div>)}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Uploads</h3>
                <div className="space-y-4">
                  {['aadhaar', 'birth_certificate', '10th_marksheet', '12th_marksheet', 'bank_passbook', 'community_certificate'].map(function (docType) { return (<div key={docType}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {docType.replace(/_/g, ' ').toUpperCase()}
                      </label>
                      <label className="flex justify-center cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500">
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={function (e) { return handleFileUpload(e, docType); }} className="hidden"/>
                        <div className="text-center">
                          <Upload className="h-6 w-6 text-gray-400 mx-auto mb-1"/>
                          <p className="text-sm text-gray-600">Click to upload</p>
                        </div>
                      </label>
                      {uploadedFiles[docType] && (<div className="mt-2 flex items-center justify-between bg-green-100 p-3 rounded">
                          <span className="text-sm text-green-800">{uploadedFiles[docType]}</span>
                          <button type="button" onClick={function () { return removeFile(docType); }} className="text-green-800 hover:text-green-600">
                            <X className="h-4 w-4"/>
                          </button>
                        </div>)}
                    </div>); })}
                </div>
              </div>
            </div>)}

          {/* Navigation and Submit Buttons */}
          <div className="flex gap-4">
            {currentStep > 1 && (<button type="button" onClick={handlePrevStep} className="flex-1 bg-gray-200 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-300 font-medium transition">
                Previous
              </button>)}
            
            {currentStep < 4 && (<button type="button" onClick={handleNextStep} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium transition">
                Next
              </button>)}

            {currentStep === 4 && (<button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 font-medium transition">
                {loading ? 'Registering...' : 'Register'}
              </button>)}
          </div>

          {currentStep === 1 && (<p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                Login here
              </Link>
            </p>)}
        </form>
      </div>
    </div>);
}
