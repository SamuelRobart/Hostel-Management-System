'use client';
import { useState } from 'react';

export default function WardenPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [warden, setWarden] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/warden', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
      });

      const data = await res.json();

      if (data.success) {
        setWarden(data.warden);
        fetchStudents(data.warden.location);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async (location: string) => {
    setLoadingStudents(true);
    try {
      console.log('Fetching students for location:', location);
      const response = await fetch(`/api/students/hostel?location=${location}`);
      const data = await response.json();

      console.log('API response:', data);

      if (data.success && data.students && data.students.length > 0) {
        console.log(`Found ${data.students.length} students from database`);
        setStudents(data.students);
      } else {
        console.log('No students found in database');
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  if (warden) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{warden.name}</h2>
                <p className="text-gray-600">{warden.location} Hostel</p>
              </div>
              <button
                onClick={() => setWarden(null)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Weekly Menu Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg rounded-lg mb-6 border border-blue-200">
            <div className="px-6 py-4 border-b border-blue-200 bg-blue-100">
              <h3 className="text-lg font-medium text-blue-800">Weekly Hostel Menu</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">Breakfast</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">Lunch</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">Dinner</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
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

          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Students in {warden.location} Hostel ({students.length})
              </h3>
            </div>

            {loadingStudents ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-2">Loading students...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">DOB</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Father</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mother</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Native</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">College</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Income</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">12th %</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Caste</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.fatherName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.motherName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.native}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.course}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.college}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.income}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.percentage12th}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${student.caste === 'SC' ? 'bg-red-100 text-red-800' :
                            student.caste === 'MBC' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                            {student.caste}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <h2 className="text-2xl font-bold text-center">Warden Login</h2>
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center">
          Default password: warden123
        </p>
      </div>
    </div>
  )
}