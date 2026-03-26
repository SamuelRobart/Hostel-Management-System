'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Users, Search, AlertCircle, Home, Bed, User, X, Plus, RefreshCw } from 'lucide-react';

interface Student {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  dateOfBirth: string;
  native?: string;
  course?: string;
  college?: string;
  date_of_joining?: string;
  roomNumber?: string;
  bedNumber?: number;
  roomId?: string;
  hostelLocation?: string;
}

interface Room {
  _id: string;
  roomNumber: string;
  floor: number;
  capacity: number;
  currentOccupancy: number;
  beds: Array<{
    bedNumber: number;
    isOccupied: boolean;
    studentId?: { _id: string; name: string; phone?: string } | string | null;
  }>;
}

export default function WardenDashboard() {
    const [students, setStudents] = useState<Student[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [hostelName, setHostelName] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [issueStats, setIssueStats] = useState({ pending: 0, inProgress: 0, resolved: 0, closed: 0 });
    const [roomStats, setRoomStats] = useState({ rooms: 0, bedsTotal: 0, bedsOccupied: 0 });
    const [showBedModal, setShowBedModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<string>('');
    const [selectedBed, setSelectedBed] = useState<number | ''>('');
    const [assigning, setAssigning] = useState(false);
    const [bedOccupancy, setBedOccupancy] = useState<{ [key: string]: number }>({});
    const router = useRouter();

    const calculateBedOccupancy = (studentsList: Student[]) => {
        const occupancy: { [key: string]: number } = {};
        studentsList.forEach(student => {
            if (student.roomNumber && student.bedNumber) {
                const key = `${student.roomNumber}-${student.bedNumber}`;
                occupancy[key] = (occupancy[key] || 0) + 1;
            }
        });
        setBedOccupancy(occupancy);
    };

    // Helper: fetch with auth token from both cookie and Authorization header
    const authFetch = (url: string) => {
        const token = localStorage.getItem('token');
        const headers: HeadersInit = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        return fetch(url, { credentials: 'include', headers });
    };

    const fetchAllData = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        try {
            // Check localStorage for session info
            const user = localStorage.getItem('user');
            if (!user) {
                // Only redirect on initial load, not on manual refresh
                if (!isRefresh) router.push('/warden-login');
                return;
            }

            const userData = JSON.parse(user);
            if (userData.role !== 'warden') {
                if (!isRefresh) router.push('/login');
                return;
            }

            const [studentsRes, issuesRes, roomsRes] = await Promise.all([
                authFetch('/api/warden/students'),
                authFetch('/api/issues'),
                authFetch('/api/rooms'),
            ]);

            // On 401: only force-logout on initial page load, NOT on manual refresh
            const anyUnauthorized =
                studentsRes.status === 401 ||
                issuesRes.status === 401 ||
                roomsRes.status === 401;

            if (anyUnauthorized) {
                if (!isRefresh) {
                    router.push('/warden-login');
                }
                // During refresh: silently stop — don't wipe out existing data
                return;
            }

            const studentsData = await studentsRes.json();
            if (studentsData.success && studentsData.data?.students) {
                setStudents(studentsData.data.students);
                setHostelName(studentsData.data.hostelName);
                calculateBedOccupancy(studentsData.data.students);
            } else if (studentsData.students) {
                setStudents(studentsData.students);
                setHostelName(studentsData.hostelName);
                calculateBedOccupancy(studentsData.students);
            }

            const issuesData = await issuesRes.json();
            if (issuesData.success && Array.isArray(issuesData.data?.issues)) {
                const next = { pending: 0, inProgress: 0, resolved: 0, closed: 0 };
                for (const i of issuesData.data.issues) {
                    if (i.status === 'pending') next.pending += 1;
                    else if (i.status === 'in-progress') next.inProgress += 1;
                    else if (i.status === 'resolved') next.resolved += 1;
                    else if (i.status === 'closed') next.closed += 1;
                }
                setIssueStats(next);
            }

            const roomsData = await roomsRes.json();
            if (roomsData.success && Array.isArray(roomsData.data?.rooms)) {
                const roomsList = roomsData.data.rooms;
                setRooms(roomsList);
                const bedsTotal = roomsList.reduce((sum: number, r: any) => sum + (r.capacity || 0), 0);
                const bedsOccupied = roomsList.reduce((sum: number, r: any) => sum + (r.currentOccupancy || 0), 0);
                setRoomStats({ rooms: roomsList.length, bedsTotal, bedsOccupied });
            } else if (Array.isArray(roomsData.rooms)) {
                setRooms(roomsData.rooms);
                const bedsTotal = roomsData.rooms.reduce((sum: number, r: any) => sum + (r.capacity || 0), 0);
                const bedsOccupied = roomsData.rooms.reduce((sum: number, r: any) => sum + (r.currentOccupancy || 0), 0);
                setRoomStats({ rooms: roomsData.rooms.length, bedsTotal, bedsOccupied });
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            if (isRefresh) setRefreshing(false);
            else setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, [router]);

    const handleLogout = () => {
        router.push('/logout');
    };

    const handleAssignBed = async () => {
        if (!selectedStudent || !selectedRoom || selectedBed === '') {
            alert('Please select student, room, and bed');
            return;
        }

        setAssigning(true);
        try {
            const res = await fetch('/api/warden/assign-bed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId: selectedStudent._id,
                    roomId: selectedRoom,
                    bedNumber: selectedBed
                }),
                credentials: 'include'
            });

            const data = await res.json();
            if (data.success) {
                // Refresh students list
                const studentsRes = await fetch('/api/warden/students', { credentials: 'include' });
                const studentsData = await studentsRes.json();
                if (studentsData.success && studentsData.data?.students) {
                    setStudents(studentsData.data.students);
                    calculateBedOccupancy(studentsData.data.students);
                } else if (studentsData.students) {
                    setStudents(studentsData.students);
                    calculateBedOccupancy(studentsData.students);
                }
                setShowBedModal(false);
                setSelectedStudent(null);
                setSelectedRoom('');
                setSelectedBed('');
            } else {
                alert('Error: ' + (data.error || 'Failed to assign bed'));
            }
        } catch (err: any) {
            alert('Error: ' + err.message);
        } finally {
            setAssigning(false);
        }
    };

    const filteredStudents = students.filter(student =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone?.includes(searchTerm)
    );

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="bg-white/80 backdrop-blur border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Warden Dashboard</p>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                {hostelName || 'Assigned Hostel'}
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Track students, beds, and issues in one place.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => fetchAllData(true)}
                                disabled={refreshing}
                                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400 flex items-center gap-2 text-sm"
                            >
                                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                                {refreshing ? 'Refreshing' : 'Refresh'}
                            </button>
                            <button
                                onClick={() => router.push('/warden/rooms')}
                                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 text-sm"
                            >
                                <Bed className="h-4 w-4" />
                                Rooms & Beds
                            </button>
                            <button
                                onClick={() => router.push('/warden/issues')}
                                className="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700 flex items-center gap-2 text-sm"
                            >
                                <AlertCircle className="h-4 w-4" />
                                Issues
                            </button>
                            <button
                                onClick={() => router.push('/warden/profile')}
                                className="px-4 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center gap-2 text-sm"
                            >
                                <User className="h-4 w-4" />
                                Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center gap-2 text-sm"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                                <p className="text-sm text-gray-500">Beds Occupied</p>
                                <p className="text-2xl font-bold text-gray-900">{roomStats.bedsOccupied}/{roomStats.bedsTotal}</p>
                            </div>
                            <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                                <Bed className="h-5 w-5 text-indigo-600" />
                            </div>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div
                                className="h-2 bg-indigo-600 rounded-full"
                                style={{ width: `${roomStats.bedsTotal ? Math.min(100, (roomStats.bedsOccupied / roomStats.bedsTotal) * 100) : 0}%` }}
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Pending Issues</p>
                                <p className="text-2xl font-bold text-gray-900">{issueStats.pending}</p>
                            </div>
                            <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center">
                                <AlertCircle className="h-5 w-5 text-orange-600" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            In progress: {issueStats.inProgress} • Resolved: {issueStats.resolved} • Closed: {issueStats.closed}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Rooms</p>
                                <p className="text-2xl font-bold text-gray-900">{roomStats.rooms}</p>
                            </div>
                            <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                                <Home className="h-5 w-5 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Students</h2>
                            <p className="text-sm text-gray-500">Search and review student details.</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={() => fetchAllData(true)}
                                disabled={refreshing}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50"
                                title="Refresh students"
                            >
                                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                            </button>
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name or phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
                            />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room / Bed</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {filteredStudents.map((student, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                            <div className="text-xs text-gray-500">{student.native || '-'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.dateOfBirth}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{student.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {student.roomNumber ? (
                                                <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                                                    Room {student.roomNumber}{student.bedNumber ? ` • Bed ${student.bedNumber}` : ''}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-200">
                                                    Not assigned
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.course || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {student.date_of_joining ? new Date(student.date_of_joining).toLocaleDateString('en-GB') : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button
                                                onClick={() => {
                                                    setSelectedStudent(student);
                                                    setShowBedModal(true);
                                                }}
                                                className={`font-medium flex items-center gap-1 ${
                                                  student.bedNumber 
                                                    ? 'text-orange-600 hover:text-orange-800' 
                                                    : 'text-blue-600 hover:text-blue-800'
                                                }`}
                                            >
                                                <Plus className="h-4 w-4" />
                                                {student.bedNumber ? 'Reassign' : 'Assign'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredStudents.length === 0 && (
                            <div className="p-10 text-center text-gray-500">
                                No students found for your search.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bed Occupancy Section - Occupied */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Occupied Beds */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-red-100 bg-red-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-600"></div>
                                <h2 className="text-lg font-semibold text-red-900">Occupied Beds</h2>
                            </div>
                            <button
                                onClick={() => fetchAllData(true)}
                                disabled={refreshing}
                                className="p-1.5 text-red-600 hover:bg-red-100 rounded-md disabled:opacity-50"
                                title="Refresh"
                            >
                                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                        <p className="text-sm text-red-700 mt-1">Beds with allocated students.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-red-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Room</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Bed</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Students</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {(() => {
                                    const occupiedBeds = rooms.flatMap(room =>
                                        room.beds
                                            .filter(bed => bed.isOccupied)
                                            .map(bed => ({ room, bed }))
                                    );
                                    if (occupiedBeds.length === 0) {
                                        return (
                                            <tr>
                                                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                                    No occupied beds.
                                                </td>
                                            </tr>
                                        );
                                    }
                                    return occupiedBeds.map(({ room, bed }) => {
                                        const studentName =
                                            bed.studentId && typeof bed.studentId === 'object'
                                                ? (bed.studentId as any).name
                                                : 'Occupied';
                                        return (
                                            <tr key={`${room._id}-${bed.bedNumber}`} className="hover:bg-red-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center text-sm px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium">
                                                        {room.roomNumber}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    Bed {bed.bedNumber}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                                                        <span className="h-2 w-2 rounded-full bg-red-500 inline-block"></span>
                                                        {studentName}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    });
                                })()}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Vacant Beds */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-green-100 bg-green-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-600"></div>
                                <h2 className="text-lg font-semibold text-green-900">Vacant Beds</h2>
                            </div>
                            <button
                                onClick={() => fetchAllData(true)}
                                disabled={refreshing}
                                className="p-1.5 text-green-600 hover:bg-green-100 rounded-md disabled:opacity-50"
                                title="Refresh"
                            >
                                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                        <p className="text-sm text-green-700 mt-1">Available beds for students.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-green-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Room</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Bed</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {(() => {
                                    const vacantBeds = rooms.flatMap(room =>
                                        room.beds
                                            .filter(bed => !bed.isOccupied)
                                            .map(bed => ({ room, bed }))
                                    );
                                    if (vacantBeds.length === 0) {
                                        return (
                                            <tr>
                                                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                                    No vacant beds.
                                                </td>
                                            </tr>
                                        );
                                    }
                                    return vacantBeds.map(({ room, bed }) => (
                                        <tr key={`${room._id}-${bed.bedNumber}`} className="hover:bg-green-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center text-sm px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium">
                                                    {room.roomNumber}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                Bed {bed.bedNumber}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-100 text-green-700 border border-green-300 text-xs font-medium">
                                                    <span className="h-2 w-2 rounded-full bg-green-500 inline-block"></span>
                                                    Available
                                                </span>
                                            </td>
                                        </tr>
                                    ));
                                })()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showBedModal && selectedStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Assign Bed to {selectedStudent.name}</h2>
                            <button
                                onClick={() => {
                                    setShowBedModal(false);
                                    setSelectedStudent(null);
                                    setSelectedRoom('');
                                    setSelectedBed('');
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Room</label>
                                <select
                                    value={selectedRoom}
                                    onChange={(e) => {
                                        setSelectedRoom(e.target.value);
                                        setSelectedBed('');
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">-- Choose a room --</option>
                                    {rooms.map((room) => (
                                        <option key={room._id} value={room._id}>
                                            Room {room.roomNumber} (Floor {room.floor}, {room.currentOccupancy}/{room.capacity} beds)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedRoom && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Bed</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {rooms
                                            .find(r => r._id === selectedRoom)
                                            ?.beds.map((bed) => (
                                                <button
                                                    key={bed.bedNumber}
                                                    onClick={() => !bed.isOccupied && setSelectedBed(bed.bedNumber)}
                                                    disabled={bed.isOccupied && bed.studentId !== selectedStudent._id}
                                                    className={`py-2 px-3 rounded-md border font-medium transition ${
                                                        selectedBed === bed.bedNumber
                                                            ? 'bg-blue-600 text-white border-blue-600'
                                                            : bed.isOccupied && bed.studentId !== selectedStudent._id
                                                            ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 cursor-pointer'
                                                    }`}
                                                >
                                                    Bed {bed.bedNumber}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-2 mt-6">
                                <button
                                    onClick={() => {
                                        setShowBedModal(false);
                                        setSelectedStudent(null);
                                        setSelectedRoom('');
                                        setSelectedBed('');
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAssignBed}
                                    disabled={!selectedRoom || selectedBed === '' || assigning}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {assigning ? 'Assigning...' : 'Assign Bed'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
