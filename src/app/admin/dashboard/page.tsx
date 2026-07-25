'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Users, AlertCircle, UserCheck, X, Plus, LogOut, User } from 'lucide-react';

interface HostelData {
  _id: string;
  name: string;
  location: string;
  totalCapacity: number;
  currentOccupancy: number;
  wardenName?: string;
  wardenPhone?: string;
  wardenId?: string;
}

interface StudentData {
  id: string;
  name: string;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  native: string;
  address: string;
  course: string;
  college: string;
  income: string;
  percentage12th: string;
  bankDetails: string;
  caste: string;
  dateOfBirth: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [hostels, setHostels] = useState<HostelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHostel, setSelectedHostel] = useState<string | null>(null);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [saving, setSaving] = useState(false);
  const [realStudents, setRealStudents] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showWardenForm, setShowWardenForm] = useState(false);
  const [showHostelForm, setShowHostelForm] = useState(false);
  const [wardens, setWardens] = useState<any[]>([]);
  const [hostelsForWarden, setHostelsForWarden] = useState<any[]>([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    phone: '',
    dateOfBirth: '',
    fatherName: '',
    motherName: '',
    email: '',
    native: '',
    address: '',
    course: '',
    college: '',
    income: '',
    percentage12th: '',
    bankDetails: '',
    caste: '',
    hostelLocation: ''
  });
  const [newWarden, setNewWarden] = useState({
    name: '',
    username: '',
    phone: '',
    password: '',
    hostelId: ''
  });
  const [newHostel, setNewHostel] = useState({
    name: '',
    location: '',
    type: 'girls',
    totalCapacity: 35,
    totalRooms: 7,
    bedsPerRoom: 5
  });

  // Fetch wardens
  const fetchWardens = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: any = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const res = await fetch('/api/wardens/list', { headers });
      const data = await res.json();
      if (data.success) {
        setWardens(data.wardens);
      }
    } catch (error) {
      console.error('Failed to fetch wardens:', error);
    }
  };

  // Fetch hostels for warden assignment
  const fetchHostelsForWarden = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: any = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const res = await fetch('/api/hostels', { headers });
      const data = await res.json();
      if (data.success) {
        setHostelsForWarden(data.hostels);
      }
    } catch (error) {
      console.error('Failed to fetch hostels:', error);
    }
  };
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.hostels) {
        // Transform the API response to match HostelData interface
        const formattedHostels = data.hostels.map((h: any, index: number) => ({
          _id: h._id || h.name, // Use _id if available, otherwise name
          name: `Elite Hostel (${h.type === 'girls' ? 'Girls' : 'Boys'})`,
          location: h.name || h.location, // The collection name is the location/identifier here
          totalCapacity: h.capacity || h.totalCapacity,
          currentOccupancy: h.occupied || h.currentOccupancy,
          wardenName: h.warden?.name || 'N/A',
          wardenPhone: h.warden?.phone || 'N/A',
          wardenId: h.warden?._id || h.wardenId
        }));
        setHostels(formattedHostels);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  // Fetch students from the database for the detailed view
  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students/list');
      const data = await res.json();
      if (data.students) {
        const formattedStudents = data.students.map((s: any) => ({
          ...s,
          id: s._id,
          // Map DB fields (snake_case) to Interface (camelCase)
          fatherName: s.father_name || s.fatherName,
          motherName: s.mother_name || s.motherName,
          percentage12th: s.twelfth_percentage || s.percentage12th,
          // Handle Date format if it's coming as ISO string
          dateOfBirth: s.dob ? new Date(s.dob).toLocaleDateString('en-GB') : (s.dateOfBirth ? new Date(s.dateOfBirth).toLocaleDateString('en-GB') : 'N/A')
        }));
        setStudents(formattedStudents);
        setRealStudents(formattedStudents);
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  // Fetch students for specific hostel
  const fetchHostelStudents = async (hostelLocation: string) => {
    try {
      const res = await fetch(`/api/students/hostel?location=${encodeURIComponent(hostelLocation)}`);
      const data = await res.json();
      if (data.success && data.students) {
        const formattedStudents = data.students.map((s: any) => ({
          ...s,
          id: s._id || s.id,
          fatherName: s.father_name || s.fatherName,
          motherName: s.mother_name || s.motherName,
          percentage12th: s.twelfth_percentage || s.percentage12th || s['12th_percentage'],
          dateOfBirth: s.dob ? new Date(s.dob).toLocaleDateString('en-GB') : (s.dateOfBirth ? new Date(s.dateOfBirth).toLocaleDateString('en-GB') : 'N/A')
        }));
        setRealStudents(formattedStudents);
        setSelectedHostel(hostelLocation);
      } else {
        setRealStudents([]);
        setSelectedHostel(hostelLocation);
      }
    } catch (error) {
      console.error('Failed to fetch hostel students:', error);
      setRealStudents([]);
      setSelectedHostel(hostelLocation);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchStudents(), fetchWardens(), fetchHostelsForWarden()]);
      setLoading(false);
    };
    init();
  }, []);

  // No need for client-side stats calculation since API provides it primarily,
  // but for reactivity we can keep using the hostels state.

  const totalCapacity = hostels.reduce((sum, hostel) => sum + hostel.totalCapacity, 0);
  const totalOccupancy = hostels.reduce((sum, hostel) => sum + hostel.currentOccupancy, 0);
  const totalVacancy = totalCapacity - totalOccupancy;

  const handleLogout = () => {
    router.push('/logout');
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white/80 backdrop-blur border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-gray-500">Administration</p>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  Admin Dashboard
                  <span className="px-3 py-1 text-xs font-medium bg-green-50 text-green-800 rounded-full border border-green-200">
                    Live data
                  </span>
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Elite Hostel Group • Government Certified
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => router.push('/admin/rooms')}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  <Building2 className="h-4 w-4" />
                  Rooms
                </button>
                <button
                  onClick={() => router.push('/admin/issues')}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 flex items-center gap-2 text-sm"
                >
                  <AlertCircle className="h-4 w-4" />
                  Issues
                </button>
                <button
                  onClick={() => router.push('/admin/profile')}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button
                  onClick={() => setShowHostelForm(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center gap-2 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Hostel
                </button>
                <button
                  onClick={() => setShowWardenForm(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Warden
                </button>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Student
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Weekly Menu Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 shadow-lg rounded-lg mb-8 border border-green-200">
            <div className="px-6 py-4 border-b border-green-200 bg-green-100">
              <h2 className="text-lg font-medium text-green-800">Weekly Hostel Menu</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-green-200">
                <thead className="bg-green-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Breakfast</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Lunch</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Dinner</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-green-100">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Hostels</p>
                  <p className="text-2xl font-bold text-gray-900">{hostels.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Capacity</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCapacity}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <UserCheck className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Current Occupancy</p>
                  <p className="text-2xl font-bold text-gray-900">{totalOccupancy}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Vacancy</p>
                  <p className="text-2xl font-bold text-gray-900">{totalVacancy}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hostels Grid */}
          <div className="space-y-8">
            {/* Girls Hostels */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200 bg-pink-50">
                <h2 className="text-lg font-medium text-gray-900">Girls College Hostels ({hostels.filter(hostel => hostel.name.includes('Girls')).length})</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {hostels.filter(hostel => hostel.name.includes('Girls')).map((hostel) => {
                  const occupancyPercentage = ((hostel.currentOccupancy / hostel.totalCapacity) * 100).toFixed(1);
                  const vacancy = hostel.totalCapacity - hostel.currentOccupancy;

                  return (
                    <div 
                      key={hostel._id} 
                      onClick={() => router.push(`/admin/hostels/${hostel._id}`)}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-900">Elite Hostel</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${parseFloat(occupancyPercentage) > 90
                          ? 'bg-red-100 text-red-800'
                          : parseFloat(occupancyPercentage) > 75
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                          }`}>
                          {occupancyPercentage}%
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">📍 {hostel.location}</p>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">{hostel.totalCapacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Occupied:</span>
                          <span className="font-medium text-blue-600">{hostel.currentOccupancy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vacancy:</span>
                          <span className="font-medium text-green-600">{vacancy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Warden:</span>
                          <span className="font-medium text-xs">{hostel.wardenName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium text-xs">{hostel.wardenPhone}</span>
                        </div>
                      </div>

                      <div className="mt-3 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${parseFloat(occupancyPercentage) > 90
                            ? 'bg-red-500'
                            : parseFloat(occupancyPercentage) > 75
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            }`}
                          style={{ width: `${occupancyPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Boys Hostels */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
                <h2 className="text-lg font-medium text-gray-900">Boys College Hostels ({hostels.filter(hostel => hostel.name.includes('Boys')).length})</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {hostels.filter(hostel => hostel.name.includes('Boys')).map((hostel) => {
                  const occupancyPercentage = ((hostel.currentOccupancy / hostel.totalCapacity) * 100).toFixed(1);
                  const vacancy = hostel.totalCapacity - hostel.currentOccupancy;

                  return (
                    <div 
                      key={hostel._id} 
                      onClick={() => router.push(`/admin/hostels/${hostel._id}`)}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">Elite Hostel</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${parseFloat(occupancyPercentage) > 90
                          ? 'bg-red-100 text-red-800'
                          : parseFloat(occupancyPercentage) > 75
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                          }`}>
                          {occupancyPercentage}%
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">📍 {hostel.location}</p>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">{hostel.totalCapacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Occupied:</span>
                          <span className="font-medium text-blue-600">{hostel.currentOccupancy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vacancy:</span>
                          <span className="font-medium text-green-600">{vacancy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Warden:</span>
                          <span className="font-medium">{hostel.wardenName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium">{hostel.wardenPhone}</span>
                        </div>
                      </div>

                      <div className="mt-3 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${parseFloat(occupancyPercentage) > 90
                            ? 'bg-red-500'
                            : parseFloat(occupancyPercentage) > 75
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            }`}
                          style={{ width: `${occupancyPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg mt-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Warden Management ({wardens.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {wardens.map((warden) => (
                    <tr key={warden._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {warden.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {warden.username || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {warden.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {warden.hostelId?.name || 'Not Assigned'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(warden.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {wardens.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No wardens found. Click "Add Warden" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg mt-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Warden Directory</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warden Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hostels.map((hostel) => (
                    <tr key={hostel._id} className="hover:bg-gray-50">
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                        onClick={() => router.push(`/admin/hostels/${hostel._id}`)}
                      >
                        Elite Hostel
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {hostel.location}
                      </td>
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:text-blue-600"
                        onClick={() => hostel.wardenId && router.push(`/admin/wardens/${hostel.wardenId}`)}
                      >
                        {hostel.wardenName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {hostel.wardenPhone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${hostel.name.includes('Girls')
                          ? 'bg-pink-100 text-pink-800'
                          : 'bg-blue-100 text-blue-800'
                          }`}>
                          {hostel.name.includes('Girls') ? 'Girls' : 'Boys'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg mt-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Student Details by Hostel</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupied</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacancy</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hostels.map((hostel) => {
                    const vacancy = hostel.totalCapacity - hostel.currentOccupancy;
                    return (
                      <tr key={hostel._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Elite Hostel ({hostel.name.includes('Girls') ? 'Girls' : 'Boys'})
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {hostel.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                          {hostel.currentOccupancy} students
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                          {vacancy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => fetchHostelStudents(hostel.location)}
                            className="text-blue-600 hover:text-blue-900 font-medium"
                          >
                            View {hostel.currentOccupancy} Students
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedHostel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h2 className="text-xl font-bold">Students in {selectedHostel} Hostel ({realStudents.length})</h2>
                <div className="text-sm text-green-600 font-medium mt-1">
                  📱 Phone numbers highlighted in yellow - use these for student login!
                </div>
                {realStudents.length === 0 && (
                  <div className="text-sm text-orange-600 font-medium mt-1">
                    ⚠️ No students found in database for this hostel
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedHostel(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-120px)]">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">DOB</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Father</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mother</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Native</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">College</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Income</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">12th %</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Caste</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {realStudents.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="px-4 py-8 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <div className="text-4xl mb-2">📋</div>
                          <div className="text-lg font-medium mb-1">No students found in database</div>
                          <div className="text-sm">This hostel location may not have any registered students yet.</div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    realStudents.map((student, index) => (
                      <tr 
                        key={index} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => router.push(`/admin/students/${student.id || student._id}`)}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{student.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{student.dateOfBirth}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{student.fatherName}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{student.motherName}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 font-mono bg-yellow-50">{student.phone}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 text-xs">{student.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{student.native}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{student.course}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 text-xs">{student.college}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{student.income}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{student.percentage12th}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 text-xs rounded-full ${student.caste === 'SC' ? 'bg-red-100 text-red-800' :
                            student.caste === 'MBC' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                            {student.caste}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Add New Student</h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewStudent({
                    name: '', phone: '', dateOfBirth: '', fatherName: '', motherName: '',
                    email: '', native: '', address: '', course: '', college: '',
                    income: '', percentage12th: '', bankDetails: '', caste: '', hostelLocation: ''
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-120px)] p-6">
              <form onSubmit={async (e) => {
                e.preventDefault();
                setSaving(true);
                try {
                  const res = await fetch('/api/students/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newStudent)
                  });
                  const data = await res.json();
                  if (data.success) {
                    alert('Student added successfully! They can now login with phone: ' + newStudent.phone + ' and DOB: ' + newStudent.dateOfBirth);
                    setShowAddForm(false);
                    fetchStudents(); // Refresh the list
                    setNewStudent({
                      name: '', phone: '', dateOfBirth: '', fatherName: '', motherName: '',
                      email: '', native: '', address: '', course: '', college: '',
                      income: '', percentage12th: '', bankDetails: '', caste: '', hostelLocation: ''
                    });
                  } else {
                    alert(data.message);
                  }
                } catch (error) {
                  alert('Failed to add student');
                } finally {
                  setSaving(false);
                }
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      value={newStudent.dateOfBirth}
                      onChange={(e) => setNewStudent({ ...newStudent, dateOfBirth: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                    <input
                      type="text"
                      value={newStudent.fatherName}
                      onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                    <input
                      type="text"
                      value={newStudent.motherName}
                      onChange={(e) => setNewStudent({ ...newStudent, motherName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Native District</label>
                    <input
                      type="text"
                      value={newStudent.native}
                      onChange={(e) => setNewStudent({ ...newStudent, native: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <select
                      value={newStudent.course}
                      onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Course</option>
                      <option value="B.A English">B.A English</option>
                      <option value="B.A Tamil">B.A Tamil</option>
                      <option value="B.A History">B.A History</option>
                      <option value="B.A Economics">B.A Economics</option>
                      <option value="B.A Political Science">B.A Political Science</option>
                      <option value="B.A Geography">B.A Geography</option>
                      <option value="B.Sc Mathematics">B.Sc Mathematics</option>
                      <option value="B.Sc Physics">B.Sc Physics</option>
                      <option value="B.Sc Chemistry">B.Sc Chemistry</option>
                      <option value="B.Sc Biology">B.Sc Biology</option>
                      <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                      <option value="B.Sc Statistics">B.Sc Statistics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                    <input
                      type="text"
                      value={newStudent.college}
                      onChange={(e) => setNewStudent({ ...newStudent, college: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Government Arts College"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Family Income</label>
                    <input
                      type="text"
                      value={newStudent.income}
                      onChange={(e) => setNewStudent({ ...newStudent, income: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="₹50000 per annum"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">12th Percentage</label>
                    <input
                      type="text"
                      value={newStudent.percentage12th}
                      onChange={(e) => setNewStudent({ ...newStudent, percentage12th: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="85%"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Caste</label>
                    <select
                      value={newStudent.caste}
                      onChange={(e) => setNewStudent({ ...newStudent, caste: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Caste</option>
                      <option value="BC">BC</option>
                      <option value="MBC">MBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hostel Location</label>
                    <select
                      value={newStudent.hostelLocation}
                      onChange={(e) => setNewStudent({ ...newStudent, hostelLocation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Hostel</option>
                      <option value="Perur">Perur</option>
                      <option value="Singanallur">Singanallur</option>
                      <option value="Peelamedu">Peelamedu</option>
                      <option value="Goundampalayam">Goundampalayam</option>
                      <option value="Vellakinar">Vellakinar</option>
                      <option value="Kinathukadavu">Kinathukadavu</option>
                      <option value="Nayakkanpalayam">Nayakkanpalayam</option>
                      <option value="Thondamuthur">Thondamuthur</option>
                      <option value="Masakkalipalayam">Masakkalipalayam</option>
                      <option value="Ondipudur">Ondipudur</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={newStudent.address}
                    onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Details</label>
                  <input
                    type="text"
                    value={newStudent.bankDetails}
                    onChange={(e) => setNewStudent({ ...newStudent, bankDetails: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="SBI - 123456789"
                  />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? 'Adding...' : 'Add Student'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Warden Form Modal */}
      {showWardenForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Add New Warden</h2>
              <button
                onClick={() => {
                  setShowWardenForm(false);
                  setNewWarden({ name: '', username: '', phone: '', password: '', hostelId: '' });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-120px)] p-6">
              <form onSubmit={async (e) => {
                e.preventDefault();
                setSaving(true);
                try {
                  const token = localStorage.getItem('token');
                  const headers: any = { 'Content-Type': 'application/json' };
                  if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                  }
                  
                  const res = await fetch('/api/wardens/add', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(newWarden)
                  });
                  const data = await res.json();
                  if (data.success) {
                    alert('Warden created successfully! Login credentials:\nUsername: ' + newWarden.username + '\nPassword: ' + newWarden.password);
                    setShowWardenForm(false);
                    fetchWardens();
                    setNewWarden({ name: '', username: '', phone: '', password: '', hostelId: '' });
                  } else {
                    alert('Error: ' + data.message);
                  }
                } catch (error) {
                  console.error('Warden creation error:', error);
                  alert('Failed to create warden. Please check your connection and try again.');
                } finally {
                  setSaving(false);
                }
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={newWarden.name}
                    onChange={(e) => setNewWarden({ ...newWarden, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                  <input
                    type="text"
                    value={newWarden.username}
                    onChange={(e) => setNewWarden({ ...newWarden, username: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="warden123"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={newWarden.phone}
                    onChange={(e) => setNewWarden({ ...newWarden, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="9876543210"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <input
                    type="password"
                    value={newWarden.password}
                    onChange={(e) => setNewWarden({ ...newWarden, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign Hostel</label>
                  <select
                    value={newWarden.hostelId}
                    onChange={(e) => setNewWarden({ ...newWarden, hostelId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Hostel (Optional)</option>
                    {hostelsForWarden.map((hostel) => (
                      <option key={hostel._id} value={hostel._id}>
                        {hostel.name} - {hostel.location}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowWardenForm(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving ? 'Creating...' : 'Create Warden'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Hostel Form Modal */}
      {showHostelForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Add New Hostel</h2>
              <button
                onClick={() => {
                  setShowHostelForm(false);
                  setNewHostel({ name: '', location: '', type: 'girls', totalCapacity: 35, totalRooms: 7, bedsPerRoom: 5 });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-120px)] p-6">
              <form onSubmit={async (e) => {
                e.preventDefault();
                setSaving(true);
                try {
                  const token = localStorage.getItem('token');
                  const headers: any = { 'Content-Type': 'application/json' };
                  if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                  }
                  
                  const res = await fetch('/api/hostels', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(newHostel)
                  });
                  const data = await res.json();
                  if (data.success) {
                    alert('Hostel created successfully!');
                    setShowHostelForm(false);
                    fetchStats();
                    fetchHostelsForWarden();
                    setNewHostel({ name: '', location: '', type: 'girls', totalCapacity: 35, totalRooms: 7, bedsPerRoom: 5 });
                  } else {
                    alert('Error: ' + data.message);
                  }
                } catch (error) {
                  console.error('Hostel creation error:', error);
                  alert('Failed to create hostel. Please try again.');
                } finally {
                  setSaving(false);
                }
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hostel Name *</label>
                  <input
                    type="text"
                    value={newHostel.name}
                    onChange={(e) => setNewHostel({ ...newHostel, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Elite Hostel"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    value={newHostel.location}
                    onChange={(e) => setNewHostel({ ...newHostel, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Perur, Coimbatore"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    value={newHostel.type}
                    onChange={(e) => setNewHostel({ ...newHostel, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="girls">Girls Hostel</option>
                    <option value="boys">Boys Hostel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Capacity *</label>
                  <input
                    type="number"
                    value={newHostel.totalCapacity}
                    onChange={(e) => setNewHostel({ ...newHostel, totalCapacity: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Rooms *</label>
                  <input
                    type="number"
                    value={newHostel.totalRooms}
                    onChange={(e) => setNewHostel({ ...newHostel, totalRooms: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beds per Room *</label>
                  <input
                    type="number"
                    value={newHostel.bedsPerRoom}
                    onChange={(e) => setNewHostel({ ...newHostel, bedsPerRoom: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="1"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowHostelForm(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                  >
                    {saving ? 'Creating...' : 'Create Hostel'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}