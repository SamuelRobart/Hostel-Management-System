'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { User, Building, Phone, Calendar, Mail, MapPin, Home, Bed, ArrowLeft, BookOpen, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function StudentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params.id as string;
  const [student, setStudent] = useState<any>(null);
  const [hostel, setHostel] = useState<any>(null);
  const [room, setRoom] = useState<any>(null);
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, issuesRes] = await Promise.all([
          fetch(`/api/students/list`),
          fetch(`/api/issues`)
        ]);

        const studentData = await studentRes.json();
        if (studentData.success && studentData.students) {
          const foundStudent = studentData.students.find((s: any) => s._id === studentId);
          if (foundStudent) {
            setStudent(foundStudent);

            // Fetch hostel details
            if (foundStudent.hostelId) {
              const hostelRes = await fetch(`/api/hostels?id=${foundStudent.hostelId}`);
              const hostelData = await hostelRes.json();
              if (hostelData.success && hostelData.hostels?.[0]) {
                setHostel(hostelData.hostels[0]);
              }
            }

            // Fetch room details
            if (foundStudent.roomId) {
              const roomRes = await fetch(`/api/rooms/${foundStudent.roomId}`);
              const roomData = await roomRes.json();
              if (roomData.success) {
                setRoom(roomData.room);
              }
            }
          }
        }

        const issuesData = await issuesRes.json();
        if (issuesData.success && issuesData.issues) {
          const studentIssues = issuesData.issues.filter((i: any) => 
            i.studentId?._id === studentId || i.studentId === studentId
          );
          setIssues(studentIssues);
        }
      } catch (error) {
        console.error('Error fetching student details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchData();
    }
  }, [studentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student details...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Student not found</p>
          <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
              <p className="text-gray-600 mt-1">
                {student.course || 'Student'} {student.college ? `• ${student.college}` : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Hostel</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              {student.hostelLocation || 'Not assigned'}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Room / Bed</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              {student.roomNumber ? (
                <>Room {student.roomNumber}{student.bedNumber ? ` • Bed ${student.bedNumber}` : ''}</>
              ) : (
                'Not assigned'
              )}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Open Issues</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {issues.filter((i: any) => i.status === 'pending' || i.status === 'in-progress').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Total Issues</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{issues.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="text-gray-900">
                    {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('en-GB') : 
                     student.dob ? new Date(student.dob).toLocaleDateString('en-GB') : 'N/A'}
                  </p>
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
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Native Place</p>
                  <p className="text-gray-900">{student.native || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Parents</p>
                  <p className="text-gray-900">Father: {student.fatherName || student.father_name || 'N/A'}</p>
                  <p className="text-gray-900">Mother: {student.motherName || student.mother_name || 'N/A'}</p>
                </div>
              </div>

              {student.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-900">{student.address}</p>
                  </div>
                </div>
              )}

              {student.caste && (
                <div>
                  <p className="text-sm text-gray-500">Caste</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm mt-1 ${
                    student.caste === 'SC' ? 'bg-red-100 text-red-800' :
                    student.caste === 'MBC' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {student.caste}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Academic & Hostel Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Academic & Hostel Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Course</p>
                  <p className="text-gray-900 font-medium">{student.course || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <GraduationCap className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">College</p>
                  <p className="text-gray-900">{student.college || 'N/A'}</p>
                </div>
              </div>

              {student.percentage12th && (
                <div>
                  <p className="text-sm text-gray-500">12th Percentage</p>
                  <p className="text-gray-900">{student.percentage12th}</p>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Hostel Location</p>
                  <p className="text-gray-900 capitalize">{student.hostelLocation || 'Not assigned'}</p>
                </div>
              </div>

              {room && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="h-5 w-5 text-blue-600" />
                    <p className="text-sm font-medium text-blue-900">Room Details</p>
                  </div>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>Room: {room.roomNumber} {room.block ? `(Block ${room.block})` : ''}</p>
                    <p>Floor: {room.floor} • Type: {room.roomType}</p>
                    {student.bedNumber && <p>Bed: {student.bedNumber}</p>}
                    {room.amenities && room.amenities.length > 0 && (
                      <p className="mt-2">Amenities: {room.amenities.join(', ')}</p>
                    )}
                  </div>
                </div>
              )}

              {student.income && (
                <div>
                  <p className="text-sm text-gray-500">Family Income</p>
                  <p className="text-gray-900">{student.income}</p>
                </div>
              )}

              {student.bankDetails && (
                <div>
                  <p className="text-sm text-gray-500">Bank Details</p>
                  <p className="text-gray-900 text-sm">{student.bankDetails}</p>
                </div>
              )}

              {student.createdAt && (
                <div>
                  <p className="text-sm text-gray-500">Joined Date</p>
                  <p className="text-gray-900">{new Date(student.createdAt).toLocaleDateString('en-GB')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Issues History */}
        {issues.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Issue History ({issues.length})</h2>
              <p className="text-sm text-gray-500 mt-1">All tickets raised by this student</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-50">
                  {issues.map((issue: any) => (
                    <tr key={issue._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                        {issue.ticketNumber || issue._id.slice(-8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {issue.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 capitalize">
                          {issue.category}
                        </span>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
