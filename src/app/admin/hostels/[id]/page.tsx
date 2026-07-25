'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Building2, Users, Home, Bed, MapPin, Phone, Mail, ArrowLeft, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function HostelDetailPage() {
  const router = useRouter();
  const params = useParams();
  const hostelId = params.id as string;
  const [hostel, setHostel] = useState<any>(null);
  const [warden, setWarden] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hostelRes, studentsRes, roomsRes] = await Promise.all([
          fetch(`/api/hostels?id=${hostelId}`),
          fetch(`/api/students?hostelId=${hostelId}`),
          fetch(`/api/rooms?hostelId=${hostelId}`)
        ]);

        const hostelData = await hostelRes.json();
        if (hostelData.success && hostelData.hostels?.[0]) {
          const h = hostelData.hostels[0];
          setHostel(h);
          
          // Use populated warden data from hostel
          if (h.wardenId && typeof h.wardenId === 'object' && h.wardenId.name) {
            setWarden(h.wardenId);
          } else if (h.warden) {
            setWarden(h.warden);
          } else if (h.wardenId) {
            // If wardenId is just an ID, fetch warden details
            const wardenRes = await fetch(`/api/wardens/list`);
            const wardenData = await wardenRes.json();
            if (wardenData.success && wardenData.wardens) {
              const foundWarden = wardenData.wardens.find((w: any) => w._id === h.wardenId);
              if (foundWarden) {
                setWarden(foundWarden);
              }
            }
          }
        }

        const studentsData = await studentsRes.json();
        if (studentsData.success) {
          setStudents(studentsData.students || []);
        }

        const roomsData = await roomsRes.json();
        if (roomsData.success) {
          setRooms(roomsData.rooms || []);
        }
      } catch (error) {
        console.error('Error fetching hostel details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hostelId) {
      fetchData();
    }
  }, [hostelId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hostel details...</p>
        </div>
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Hostel not found</p>
          <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const occupancyPercentage = hostel.totalCapacity > 0 
    ? ((hostel.currentOccupancy / hostel.totalCapacity) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{hostel.name}</h1>
              <p className="text-gray-600 mt-1">{hostel.location} • Elite Hostel Group</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Capacity</p>
                <p className="text-2xl font-bold text-gray-900">{hostel.totalCapacity}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Current Occupancy</p>
                <p className="text-2xl font-bold text-gray-900">{hostel.currentOccupancy}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-2 bg-green-600 rounded-full transition-all"
                style={{ width: `${occupancyPercentage}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Rooms</p>
                <p className="text-2xl font-bold text-gray-900">{hostel.totalRooms || rooms.length || 0}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Home className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Beds</p>
                <p className="text-2xl font-bold text-gray-900">{hostel.totalBeds || 0}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Bed className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hostel Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hostel Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900 font-medium">{hostel.location}</p>
                </div>
              </div>

              {hostel.address && (
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-900">{hostel.address}</p>
                  </div>
                </div>
              )}

              {hostel.contactNumber && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="text-gray-900 font-mono">{hostel.contactNumber}</p>
                  </div>
                </div>
              )}

              {hostel.facilities && hostel.facilities.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Facilities</p>
                  <div className="flex flex-wrap gap-2">
                    {hostel.facilities.map((facility: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-100"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {hostel.floors && (
                <div>
                  <p className="text-sm text-gray-500">Floors</p>
                  <p className="text-gray-900">{hostel.floors}</p>
                </div>
              )}

              {hostel.blocks && hostel.blocks.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500">Blocks</p>
                  <p className="text-gray-900">{hostel.blocks.join(', ')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Warden Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Warden Information</h2>
            {warden ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <UserCheck className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-gray-900 font-medium">{warden.name}</p>
                  </div>
                </div>

                {warden.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900 font-mono">{warden.phone}</p>
                    </div>
                  </div>
                )}

                {warden.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{warden.email}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Warden information not available</p>
            )}
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Students ({students.length})</h2>
            <p className="text-sm text-gray-500 mt-1">All students registered in this hostel</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room/Bed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {students.slice(0, 10).map((student: any) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                      {student.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.roomNumber ? (
                        <span className="text-sm text-gray-600">
                          Room {student.roomNumber}{student.bedNumber ? ` • Bed ${student.bedNumber}` : ''}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.course || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.createdAt ? new Date(student.createdAt).toLocaleDateString('en-GB') : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {students.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No students found in this hostel.
              </div>
            )}
            {students.length > 10 && (
              <div className="p-4 text-center text-sm text-gray-500">
                Showing 10 of {students.length} students
              </div>
            )}
          </div>
        </div>

        {/* Rooms Overview */}
        {rooms.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Rooms Overview ({rooms.length})</h2>
              <p className="text-sm text-gray-500 mt-1">Room and bed allocation status</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {rooms.slice(0, 9).map((room: any) => (
                <div key={room._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Room {room.roomNumber}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      room.currentOccupancy === room.capacity ? 'bg-red-100 text-red-800' :
                      room.currentOccupancy > 0 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {room.currentOccupancy}/{room.capacity}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Floor {room.floor} {room.block ? `• Block ${room.block}` : ''} • {room.roomType}
                  </div>
                </div>
              ))}
            </div>
            {rooms.length > 9 && (
              <div className="p-4 text-center text-sm text-gray-500">
                Showing 9 of {rooms.length} rooms
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
