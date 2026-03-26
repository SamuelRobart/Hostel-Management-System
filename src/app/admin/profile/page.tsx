'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, Shield, Mail, Phone, Calendar } from 'lucide-react';

export default function AdminProfile() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        if (data.user) {
          setAdmin(data.user);
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

  if (!admin) {
    return <div className="min-h-screen flex items-center justify-center">Profile not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Admin Profile</p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{admin.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push('/admin/dashboard')}
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
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{admin.name}</h2>
                <p className="text-blue-100 mt-1">System Administrator</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Account Information</h3>
                
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="text-gray-900 font-medium capitalize">{admin.role}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone/Username</p>
                    <p className="text-gray-900 font-mono">{admin.phone || admin.id}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Account Created</p>
                    <p className="text-gray-900">
                      {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString('en-GB') : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Permissions</h3>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-2">System Access</p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>✓ Full system administration</li>
                    <li>✓ Manage all hostels and students</li>
                    <li>✓ View and resolve all issues</li>
                    <li>✓ Access all reports and statistics</li>
                    <li>✓ Manage wardens and staff</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
