'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { User, Building, Phone, Mail, MapPin, Users, Home, Bed, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function WardenDetailPage() {
  const router = useRouter();
  const params = useParams();
  const wardenId = params.id as string;
  const [warden, setWarden] = useState<any>(null);
  const [hostel, setHostel] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch warden details
        const wardenRes = await fetch(`/api/wardens/list`);
        const wardenData = await wardenRes.json();
        
        if (wardenData.success && wardenData.wardens) {
          const foundWarden = wardenData.wardens.find((w: any) => w._id === wardenId);
          if (foundWarden) {
            setWarden(foundWarden);

            // Fetch hostel details
            if (foundWarden.hostelId) {
              const hostelRes = await fetch(`/api/hostels?id=${foundWarden.hostelId}`);
              const hostelData = await hostelRes.json();
              if (hostelData.success && hostelData.hostels?.[0]) {
                const h = hostelData.hostels[0];
                setHostel(h);

                // Fetch students in this hostel
                const studentsRes = await fetch(`/api/students?hostelLocation=${encodeURIComponent(h.location)}`);
                const studentsData = await studentsRes.json();
                if (studentsData.success) {
                  setStudents(studentsData.students || []);
                }

                // Fetch rooms
                const roomsRes = await fetch(`/api/rooms?hostelId=${h._id}`);
                const roomsData = await roomsRes.json();
                if (roomsData.success) {
                  setRooms(roomsData.rooms || []);
                }
              }
            }

            // Fetch issues for this hostel
            const issuesRes = await fetch(`/api/issues`);
            const issuesData = await issuesRes.json();
            if (issuesData.success && issuesData.issues) {
              // Filter issues by hostel location
              const hostelIssues = issuesData.issues.filter((i: any) => 
                i.studentId?.hostelLocation === foundWarden.hostelLocation ||
                i.hostelId === foundWarden.hostelId
              );
              setIssues(hostelIssues);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching warden details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (wardenId) {
      fetchData();
    }
  }, [wardenId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading warden details...</p>
        </div>
      </div>
    );
  }

  if (!warden) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Warden not found</p>
          <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const pendingIssues = issues.filter((i: any) => i.status === 'pending' || i.status === 'in-progress').length;
  const resolvedIssues = issues.filter((i: any) => i.status === 'resolved' || i.status === 'closed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
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
              <h1 className="text-3xl font-bold text-gray-900">{warden.name}</h1>
              <p className="text-gray-600 mt-1">Hostel Warden • {warden.hostelLocation || 'Assigned Hostel'}</p>
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
                <p className="text-sm text-gray-500">Assigned Hostel</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {warden.hostelLocation || 'N/A'}
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
                <Building className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Students</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Issues</p>
                <p className="text-2xl font-bold text-gray-900">{pendingIssues}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Resolved: {resolvedIssues}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rooms</p>
                <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Home className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Warden Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Warden Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-gray-900 font-medium">{warden.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900 font-mono">{warden.phone}</p>
                </div>
              </div>

              {warden.email && (
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{warden.email}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Assigned Hostel</p>
                  <p className="text-gray-900 capitalize">{warden.hostelLocation || 'Not assigned'}</p>
                </div>
              </div>

              {warden.createdAt && (
                <div>
                  <p className="text-sm text-gray-500">Joined Date</p>
                  <p className="text-gray-900">{new Date(warden.createdAt).toLocaleDateString('en-GB')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Hostel Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building className="h-5 w-5" />
              Hostel Details
            </h2>
            {hostel ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900 font-medium">{hostel.location}</p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-900 mb-3">Hostel Statistics</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-green-700">Capacity:</span>
                      <span className="font-semibold text-green-900 ml-2">{hostel.totalCapacity}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Occupied:</span>
                      <span className="font-semibold text-green-900 ml-2">{hostel.currentOccupancy}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Rooms:</span>
                      <span className="font-semibold text-green-900 ml-2">{hostel.totalRooms || rooms.length}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Beds:</span>
                      <span className="font-semibold text-green-900 ml-2">{hostel.totalBeds || 0}</span>
                    </div>
                  </div>
                  {hostel.totalCapacity > 0 && (
                    <div className="mt-3">
                      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-2 bg-green-600 rounded-full"
                          style={{ width: `${(hostel.currentOccupancy / hostel.totalCapacity) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-green-700 mt-1">
                        {((hostel.currentOccupancy / hostel.totalCapacity) * 100).toFixed(1)}% Occupied
                      </p>
                    </div>
                  )}
                </div>

                {hostel.facilities && hostel.facilities.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Facilities</p>
                    <div className="flex flex-wrap gap-2">
                      {hostel.facilities.map((facility: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-100"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Hostel information not available</p>
            )}
          </div>
        </div>

        {/* Students List */}
        {students.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Students Under Management ({students.length})</h2>
              <p className="text-sm text-gray-500 mt-1">All students in this warden's hostel</p>
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
              {students.length > 10 && (
                <div className="p-4 text-center text-sm text-gray-500">
                  Showing 10 of {students.length} students
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Issues */}
        {issues.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recent Issues ({issues.length})</h2>
              <p className="text-sm text-gray-500 mt-1">Issues reported by students in this hostel</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-50">
                  {issues.slice(0, 10).map((issue: any) => (
                    <tr key={issue._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                        {issue.ticketNumber || issue._id.slice(-8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {issue.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {issue.studentId?.name || issue.reportedBy || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          issue.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          issue.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          issue.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {issue.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          issue.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                          issue.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {issue.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {issue.createdAt ? new Date(issue.createdAt).toLocaleDateString('en-GB') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {issues.length > 10 && (
                <div className="p-4 text-center text-sm text-gray-500">
                  Showing 10 of {issues.length} issues
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
