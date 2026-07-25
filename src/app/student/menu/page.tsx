'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, ChefHat } from 'lucide-react';

interface MenuItem {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

export default function StudentMenu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      if (data.success) {
        setMenu(data.menu);
        setCurrentWeek(data.week);
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading menu...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/student/dashboard')}
                className="text-blue-600 hover:text-blue-800 mr-4"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ChefHat className="h-6 w-6" />
                Weekly Hostel Menu
              </h1>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
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
          {menu.map((dayMenu, index) => {
            const isToday = dayMenu.day === getCurrentDay();
            
            return (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-md overflow-hidden ${
                  isToday ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                }`}
              >
                <div className={`px-6 py-4 ${
                  isToday ? 'bg-blue-600 text-white' : 'bg-gray-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {getDayName(dayMenu.day)}
                      {isToday && (
                        <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded-full">
                          Today
                        </span>
                      )}
                    </h3>
                    <Clock className="h-5 w-5" />
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
              </div>
            );
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
    </div>
  );
}