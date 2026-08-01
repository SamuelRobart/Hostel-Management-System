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
import { Calendar, Clock, ChefHat } from 'lucide-react';
export default function StudentMenu() {
    var _this = this;
    var _a = useState([]), menu = _a[0], setMenu = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(''), currentWeek = _c[0], setCurrentWeek = _c[1];
    var router = useRouter();
    useEffect(function () {
        fetchMenu();
    }, []);
    var fetchMenu = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, fetch('/api/menu')];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (data.success) {
                        setMenu(data.menu);
                        setCurrentWeek(data.week);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching menu:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var getDayName = function (day) {
        return day.charAt(0).toUpperCase() + day.slice(1);
    };
    var getCurrentDay = function () {
        var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        return days[new Date().getDay()];
    };
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading menu...</div>;
    }
    return (<div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button onClick={function () { return router.push('/student/dashboard'); }} className="text-blue-600 hover:text-blue-800 mr-4">
                ← Back to Dashboard
              </button>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ChefHat className="h-6 w-6"/>
                Weekly Hostel Menu
              </h1>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1"/>
              Week: {currentWeek}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8 border border-green-200">
          <h2 className="text-2xl font-bold text-green-800 mb-2">Elite Hostel Weekly Menu</h2>
          <p className="text-green-700">Nutritious meals prepared with care for all hostel residents</p>
        </div>

        <div className="grid gap-6">
          {menu.map(function (dayMenu, index) {
            var isToday = dayMenu.day === getCurrentDay();
            return (<div key={index} className={"bg-white rounded-lg shadow-md overflow-hidden ".concat(isToday ? 'ring-2 ring-blue-500 ring-opacity-50' : '')}>
                <div className={"px-6 py-4 ".concat(isToday ? 'bg-blue-600 text-white' : 'bg-gray-100')}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {getDayName(dayMenu.day)}
                      {isToday && (<span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded-full">
                          Today
                        </span>)}
                    </h3>
                    <Clock className="h-5 w-5"/>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                  <div className="p-6">
                    <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                      🌅 Breakfast
                      <span className="text-xs text-gray-500">(7:00 - 9:00 AM)</span>
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{dayMenu.breakfast}</p>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                      ☀️ Lunch
                      <span className="text-xs text-gray-500">(12:00 - 2:00 PM)</span>
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{dayMenu.lunch}</p>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="font-semibold text-purple-600 mb-3 flex items-center gap-2">
                      🌙 Dinner
                      <span className="text-xs text-gray-500">(7:00 - 9:00 PM)</span>
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{dayMenu.dinner}</p>
                  </div>
                </div>
              </div>);
        })}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Notes</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              All meals are prepared following hygiene standards and nutritional guidelines
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              Special dietary requirements can be discussed with the hostel warden
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              Meal timings are strictly followed - please be punctual
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              Any food-related complaints can be reported through the Issues section
            </li>
          </ul>
        </div>
      </div>
    </div>);
}
