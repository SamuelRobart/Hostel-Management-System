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
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
export function GET(req) {
    return __awaiter(this, void 0, void 0, function () {
        var now, year, week, currentWeek, defaultMenu, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _a.sent();
                    now = new Date();
                    year = now.getFullYear();
                    week = getWeekNumber(now);
                    currentWeek = "".concat(year, "-W").concat(week.toString().padStart(2, '0'));
                    defaultMenu = [
                        {
                            day: 'monday',
                            breakfast: 'Semiya Kichadi + Chutney/Sambar',
                            lunch: 'Rice + Sambar + Poriyal + Rasam + Mor + Muttai/Muttai Masala',
                            dinner: 'Rice + Sambar + Vegetable'
                        },
                        {
                            day: 'tuesday',
                            breakfast: 'Poori + Masala',
                            lunch: 'Veg Biryani + Veg Kuruma + Egg',
                            dinner: 'Idli + Sambar + Chutney'
                        },
                        {
                            day: 'wednesday',
                            breakfast: 'Idli + Sambar + Chutney',
                            lunch: 'Rice + Mutton/Chicken Kuruma + Mor',
                            dinner: 'Veg Pulav + Kuruma/Raitha'
                        },
                        {
                            day: 'thursday',
                            breakfast: 'Idli + Sambar + Chutney',
                            lunch: 'Tomato/Lemon/Curd Rice + Potato Poriyal + Egg',
                            dinner: 'Othappam + Chutney + Sambar'
                        },
                        {
                            day: 'friday',
                            breakfast: 'Pongal/Varagu Pongal + Kathirikai Kozhju + Vada',
                            lunch: 'Rice + Kara Kulambu + Poriyal/Koottu + Rasam + Mor + Egg',
                            dinner: 'Wheat Dosa + Tomato Chutney'
                        },
                        {
                            day: 'saturday',
                            breakfast: 'Rava Kichadi + Coconut Chutney',
                            lunch: 'Pudhina/Carrot/Curry Leaf Rice + Egg + Appalam/Paruppu Sadam',
                            dinner: 'Rice + Sambar + Vegetable'
                        },
                        {
                            day: 'sunday',
                            breakfast: 'Dosa/Navadhaniya Dosa + Sambar + Chutney',
                            lunch: 'Rice + Veg Kuruma + Rasam + Mor',
                            dinner: 'Tomato/Sambar Rice + Varuval'
                        }
                    ];
                    return [2 /*return*/, NextResponse.json({
                            success: true,
                            menu: defaultMenu,
                            week: currentWeek
                        })];
                case 2:
                    error_1 = _a.sent();
                    console.error('Menu fetch error:', error_1);
                    return [2 /*return*/, NextResponse.json({
                            error: 'Failed to fetch menu',
                            details: error_1.message
                        }, { status: 500 })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getWeekNumber(date) {
    var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}
