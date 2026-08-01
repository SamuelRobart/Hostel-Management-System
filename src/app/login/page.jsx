'use client';
import Link from 'next/link';
import { Users, Shield, Building2 } from 'lucide-react';
export default function LoginPage() {
    return (<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Hostel Management System
          </h1>
          <p className="text-xl text-gray-600">
            Select your role to login
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Student Login Card */}
          <Link href="/student-login" className="group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white text-center hover:from-blue-600 hover:to-blue-700 transition-all transform group-hover:scale-105 shadow-lg">
              <Users className="h-16 w-16 mx-auto mb-4"/>
              <h3 className="text-2xl font-bold mb-3">Student Login</h3>
              <p className="text-blue-100 mb-4">
                Access your hostel profile, view menu, and submit issues
              </p>
              <div className="text-sm text-blue-200 bg-blue-500 bg-opacity-50 rounded px-3 py-2">
                Phone + Date of Birth
              </div>
            </div>
          </Link>

          {/* Warden Login Card */}
          <Link href="/warden-login" className="group">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-8 text-white text-center hover:from-green-600 hover:to-green-700 transition-all transform group-hover:scale-105 shadow-lg">
              <Shield className="h-16 w-16 mx-auto mb-4"/>
              <h3 className="text-2xl font-bold mb-3">Warden Login</h3>
              <p className="text-green-100 mb-4">
                Manage students, handle issues, oversee hostel
              </p>
              <div className="text-sm text-green-200 bg-green-500 bg-opacity-50 rounded px-3 py-2">
                Phone + Password
              </div>
            </div>
          </Link>

          {/* Admin Login Card */}
          <Link href="/admin-login" className="group">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-8 text-white text-center hover:from-purple-600 hover:to-purple-700 transition-all transform group-hover:scale-105 shadow-lg">
              <Building2 className="h-16 w-16 mx-auto mb-4"/>
              <h3 className="text-2xl font-bold mb-3">Admin Login</h3>
              <p className="text-purple-100 mb-4">
                Full system access, manage all hostels
              </p>
              <div className="text-sm text-purple-200 bg-purple-500 bg-opacity-50 rounded px-3 py-2">
                Username + Password
              </div>
            </div>
          </Link>
        </div>

        {/* Back to Home Link */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-500 font-medium">
            Back to Home
          </Link>
        </div>
      </div>
    </div>);
}
