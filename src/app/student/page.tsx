'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StudentPage() {
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<any>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch('/api/auth/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, dateOfBirth }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await res.json();

      if (data.success) {
        setStudent(data.student);
        localStorage.setItem('student', JSON.stringify(data.student));
      } else {
        alert(data.message);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        alert('Login timeout. Please try again.');
      } else {
        alert('Login failed. Please check your connection.');
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (student) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Student Details</h2>
              <button
                onClick={() => setStudent(null)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <h2 className="text-2xl font-bold text-center">Student Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {loading && (
            <div className="text-center text-sm text-gray-500">
              Searching student records...
            </div>
          )}
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
    </div>
  )
}