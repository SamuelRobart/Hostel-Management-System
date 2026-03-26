'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, Building, Phone, Calendar, Mail, MapPin, Home, Bed } from 'lucide-react';

export default function StudentProfile() {
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers: HeadersInit = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const fetchOpts = { credentials: 'include' as RequestCredentials, headers };

        const res = await fetch('/api/student/profile', fetchOpts);
        if (res.status === 401) {
          const hasLocalUser = localStorage.getItem('user');
          if (!hasLocalUser) router.push('/student-login');
          return;
        }
        const data = await res.json();
        if (data.student) {
          setStudent(data.student);
          // Sync localStorage with fresh room/bed data from DB
          try {
            const localUser = JSON.parse(localStorage.getItem('user') || '{}');
            localStorage.setItem('user', JSON.stringify({
              ...localUser,
              roomNumber: data.student.roomNumber,
              bedNumber: data.student.bedNumber,
              hostelLocation: data.student.hostelLocation,
            }));
          } catch {}

          // Fetch room details if assigned
          if (data.student.roomId) {
            const roomRes = await fetch(`/api/rooms/${data.student.roomId}`, fetchOpts);
            const roomData = await roomRes.json();
            if (roomData.success) {
              setRoom(roomData.room);
            }
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!student) {
    return <div className="min-h-screen flex items-center justify-center">Profile not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">My Profile</p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{student.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push('/student/dashboard')}
                className="px-4 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm"
              >
                Dashboard
              </button>
              <button
                onClick={() => router.push('/logout')}
                className="px-4 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center gap-2 text-sm"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-full p-4">
                <User className="h-12 w-12 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{student.name}</h2>
                <p className="text-blue-100 mt-1">{student.course} - {student.college}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Details</h3>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="text-gray-900">{student.dateOfBirth}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900 font-mono">{student.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{student.email || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Parents</p>
                    <p className="text-gray-900">Father: {student.father_name || student.fatherName || 'N/A'}</p>
                    <p className="text-gray-900">Mother: {student.mother_name || student.motherName || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Native Place</p>
                    <p className="text-gray-900">{student.native || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Hostel & Room Details</h3>

                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Hostel Location</p>
                    <p className="text-gray-900 capitalize">{student.hostelLocation || 'Not Assigned'}</p>
                  </div>
                </div>

                {room ? (
                  <>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Home className="h-5 w-5 text-blue-600" />
                        <p className="text-sm font-medium text-blue-900">Room Assignment</p>
                      </div>
                      <div className="space-y-2 text-sm text-blue-800">
                        <div>
                          <span className="font-medium">Room Number:</span> {room.roomNumber}
                          {room.block && ` (Block ${room.block})`}
                        </div>
                        <div>
                          <span className="font-medium">Floor:</span> {room.floor}
                        </div>
                        <div>
                          <span className="font-medium">Room Type:</span> {room.roomType}
                        </div>
                        {student.bedNumber && (
                          <div className="flex items-center gap-2 mt-2">
                            <Bed className="h-4 w-4" />
                            <span className="font-medium">Bed Number:</span> {student.bedNumber}
                          </div>
                        )}
                        {room.amenities && room.amenities.length > 0 && (
                          <div className="mt-2">
                            <span className="font-medium">Amenities:</span> {room.amenities.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Room not assigned yet. Contact your warden for room allocation.</p>
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-2">Academic Information</p>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><span className="font-medium">Course:</span> {student.course || 'N/A'}</p>
                    <p><span className="font-medium">College:</span> {student.college || 'N/A'}</p>
                    <p><span className="font-medium">12th Percentage:</span> {student.percentage12th || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
