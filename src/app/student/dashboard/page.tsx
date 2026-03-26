'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, Building, Phone, Calendar, Mail, MapPin, AlertCircle, Menu as MenuIcon, Ticket } from 'lucide-react';

export default function StudentDashboard() {
    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [issueStats, setIssueStats] = useState({ open: 0, inProgress: 0, resolved: 0, closed: 0 });
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers: HeadersInit = {};
                if (token) headers['Authorization'] = `Bearer ${token}`;
                const fetchOpts = { credentials: 'include' as RequestCredentials, headers };

                const [profileRes, issuesRes] = await Promise.all([
                    fetch('/api/student/profile', fetchOpts),
                    fetch('/api/issues', fetchOpts),
                ]);

                if (profileRes.status === 401) {
                    // Only redirect if there's truly no local session
                    const hasLocalUser = localStorage.getItem('user');
                    if (!hasLocalUser) {
                        router.push('/student-login');
                    }
                    return;
                }

                const data = await profileRes.json();
                if (data.student) {
                    setStudent(data.student);
                    // Always sync localStorage with the latest room/bed from DB
                    // This ensures warden reassignments are visible without re-login
                    try {
                        const localUser = JSON.parse(localStorage.getItem('user') || '{}');
                        localStorage.setItem('user', JSON.stringify({
                            ...localUser,
                            roomNumber: data.student.roomNumber,
                            bedNumber: data.student.bedNumber,
                            hostelLocation: data.student.hostelLocation,
                        }));
                    } catch {}
                }

                if (issuesRes.ok) {
                    const issuesData = await issuesRes.json();
                    if (issuesData.success && Array.isArray(issuesData.issues)) {
                        const next = { open: 0, inProgress: 0, resolved: 0, closed: 0 };
                        for (const i of issuesData.issues) {
                            if (i.status === 'pending') next.open += 1;
                            else if (i.status === 'in-progress') next.inProgress += 1;
                            else if (i.status === 'resolved') next.resolved += 1;
                            else if (i.status === 'closed') next.closed += 1;
                        }
                        setIssueStats(next);
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

    const handleLogout = () => {
        router.push('/logout');
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
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Student Dashboard</p>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{student.name}</h1>
                            <p className="text-sm text-gray-600 mt-1">
                                {student.course} {student.college ? `• ${student.college}` : ''}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => router.push('/student/issues')}
                                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 text-sm"
                            >
                                <Ticket className="h-4 w-4" />
                                Raise Ticket
                            </button>
                            <button
                                onClick={() => router.push('/student/menu')}
                                className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-2 text-sm"
                            >
                                <MenuIcon className="h-4 w-4" />
                                Menu
                            </button>
                            <button
                                onClick={() => router.push('/student/profile')}
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
                        <p className="text-sm text-gray-500">Hostel</p>
                        <p className="text-lg font-semibold text-gray-900 mt-1">{student.hostelLocation || 'Not assigned'}</p>
                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                            <Building className="h-4 w-4" />
                            Allocation managed by warden
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <p className="text-sm text-gray-500">Room / Bed</p>
                        {student.roomNumber ? (
                            <p className="text-lg font-semibold text-gray-900 mt-1">
                                Room {student.roomNumber}{student.bedNumber ? ` • Bed ${student.bedNumber}` : ''}
                            </p>
                        ) : (
                            <p className="text-lg font-semibold text-gray-900 mt-1">Not assigned</p>
                        )}
                        <div className="mt-3 text-xs text-gray-500">Keep your bed card details safe.</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <p className="text-sm text-gray-500">Open Tickets</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{issueStats.open + issueStats.inProgress}</p>
                        <p className="text-xs text-gray-500 mt-2">
                            Pending: {issueStats.open} • In progress: {issueStats.inProgress}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <p className="text-sm text-gray-500">Resolved</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{issueStats.resolved + issueStats.closed}</p>
                        <p className="text-xs text-gray-500 mt-2">
                            Resolved: {issueStats.resolved} • Closed: {issueStats.closed}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900">Quick details</h2>
                        <p className="text-sm text-gray-500 mt-1">Your account information.</p>

                        <div className="mt-5 space-y-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Date of birth</p>
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
                                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Native place</p>
                                    <p className="text-gray-900">{student.native || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900">Support</h2>
                        <p className="text-sm text-gray-500 mt-1">Need help? Raise a ticket with the right category.</p>

                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                                onClick={() => router.push('/student/issues')}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Raise a ticket</p>
                                        <p className="text-xs text-gray-500">Maintenance, food, security…</p>
                                    </div>
                                </div>
                            </button>
                            <button
                                onClick={() => router.push('/student/menu')}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <MenuIcon className="h-5 w-5 text-emerald-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">View menu</p>
                                        <p className="text-xs text-gray-500">Weekly breakfast/lunch/dinner</p>
                                    </div>
                                </div>
                            </button>
                            <button
                                onClick={() => router.push('/student/profile')}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-purple-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">My profile</p>
                                        <p className="text-xs text-gray-500">Room/bed and details</p>
                                    </div>
                                </div>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <LogOut className="h-5 w-5 text-red-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Logout</p>
                                        <p className="text-xs text-gray-500">End this session safely</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
