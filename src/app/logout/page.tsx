'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LogoutPage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    // Auto-logout on page load
    handleLogout();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setLoggedOut(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      console.error('Logout error:', error);
      // Still redirect even if API call fails
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {loggingOut && !loggedOut ? (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Logging out...</h2>
              <p className="text-gray-600">Please wait while we securely end your session.</p>
            </>
          ) : loggedOut ? (
            <>
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Logged Out Successfully</h2>
              <p className="text-gray-600 mb-6">You have been securely logged out. Redirecting to login page...</p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Login
              </Link>
            </>
          ) : (
            <>
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <LogOut className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Logout</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
              <div className="flex gap-3">
                <Link
                  href="/"
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Cancel
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          Elite Hostel Group • Government Certified
        </p>
      </div>
    </div>
  );
}
