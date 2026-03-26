'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, Building, Phone, Mail, MapPin } from 'lucide-react';

export default function WardenProfile() {
  const router = useRouter();
  const [warden, setWarden] = useState<any>(null);
  const [hostel, setHostel] = useState<any>(null);
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
          setWarden(data.user);
          
          // Fetch hostel details
          if (data.user.hostelId) {
            const hostelRes = await fetch(`/api/hostels?id=${data.user.hostelId}`);
            const hostelData = await hostelRes.json();
            if (hostelData.success && hostelData.hostels?.[0]) {
              setHostel(hostelData.hostels[0]);
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

  if (!warden) {
    return <div className="min-h-screen flex items-center justify-center">Profile not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Warden Profile</p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{warden.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push('/warden/dashboard')}
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
          <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-full p-4">
                <User className="h-12 w-12 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{warden.name}</h2>
                <p className="text-green-100 mt-1">Hostel Warden</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-gray-900 font-medium">{warden.name}</p>
                  </div>
                </div>

                {warden.username && (
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="text-gray-900 font-mono">{warden.username}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900 font-mono">{warden.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Assigned Hostel</p>
                    <p className="text-gray-900 capitalize">{warden.hostelLocation || hostel?.name || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Hostel Details</h3>
                
                {hostel ? (
                  <>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-gray-900">{hostel.location}</p>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-green-900 mb-2">Hostel Statistics</p>
                      <div className="grid grid-cols-2 gap-2 text-sm text-green-800">
                        <div>
                          <span className="font-medium">Capacity:</span> {hostel.totalCapacity}
                        </div>
                        <div>
                          <span className="font-medium">Occupied:</span> {hostel.currentOccupancy}
                        </div>
                        <div>
                          <span className="font-medium">Rooms:</span> {hostel.totalRooms || 0}
                        </div>
                        <div>
                          <span className="font-medium">Beds:</span> {hostel.totalBeds || 0}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500">Hostel information not available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
