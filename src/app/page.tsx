'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Building2, Users, Shield, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Thiru from './assets/thiruvalluvar.png'
import TN from './assets/tamilnadulogo.png';

interface Stats {
  totalHostels: number;
  totalCapacity: number;
  totalOccupied: number;
  girlsHostels: number;
  boysHostels: number;
  wardenCount: number;
}

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [hostels, setHostels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (data.success) {
          setStats({
            ...data.summary,
            wardenCount: data.hostels.filter((h: any) => h.warden).length
          });
          setHostels(data.hostels);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Sign In Button */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">
            Hostel Management
          </div>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            {/* Thiruvalluvar Photo - Left */}
            <div className="mr-12">
              <Image 
                src={Thiru}
                alt="Thiruvalluvar" 
                className="w-36 h-36 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                District Backward Classes Welfare Department
              </h1>
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                Hostel Management System
              </h2>
              <div className="text-lg text-gray-600 space-y-1 font-bold">
                <p>Collectorate Building, Coimbatore</p>
                <p>dbcwocbe@gmail.com</p>
                <p>0422-2300404</p>
              </div>
            </div>
            
            {/* Tamil Nadu Logo - Right */}
            <div className="ml-12">
              <Image 
                src={TN} 
                alt="Tamil Nadu Government Logo" 
                className="w-36 h-36 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive digital solution for managing hostels across Coimbatore district,
            serving students with modern facilities and efficient administration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <Building2 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {loading ? '...' : (stats?.totalHostels || 10)} Hostels
            </h3>
            <p className="text-gray-600">
              {loading ? 'Loading...' : `${stats?.girlsHostels} Girls & ${stats?.boysHostels} Boys hostels`}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <Users className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {loading ? '...' : (stats?.totalCapacity || 350)} Capacity
            </h3>
            <p className="text-gray-600">Total accommodation for students</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <Shield className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {loading ? '...' : (stats?.wardenCount || 10)} Wardens
            </h3>
            <p className="text-gray-600">Dedicated staff for student care</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <BookOpen className="h-16 w-16 text-orange-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Live Status</h3>
            <p className="text-gray-600">
              {loading ? 'Updating...' : `${stats?.totalOccupied} students currently enrolled`}
            </p>
          </div>
        </div>

        {/* <div className="bg-white rounded-2xl shadow-xl p-12 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Access Your Dashboard</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/student-login" className="group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white text-center hover:from-blue-600 hover:to-blue-700 transition-all transform group-hover:scale-105">
                <Users className="h-16 w-16 mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-2">Student Login</h4>
                <p className="text-blue-100">Access your profile, view menu, report issues</p>
                <div className="mt-4 text-sm text-blue-200">
                  Login with Phone & Date of Birth
                </div>
              </div>
            </Link>

            <Link href="/warden-login" className="group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-8 text-white text-center hover:from-green-600 hover:to-green-700 transition-all transform group-hover:scale-105">
                <Shield className="h-16 w-16 mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-2">Warden Login</h4>
                <p className="text-green-100">Manage students, handle issues, oversee hostel</p>
                <div className="mt-4 text-sm text-green-200">
                  Login with Phone & Password
                </div>
              </div>
            </Link>

            <Link href="/admin-login" className="group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-8 text-white text-center hover:from-purple-600 hover:to-purple-700 transition-all transform group-hover:scale-105">
                <Building2 className="h-16 w-16 mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-2">Admin Login</h4>
                <p className="text-purple-100">Full system access, manage all hostels</p>
                <div className="mt-4 text-sm text-purple-200">
                  Login with Username & Password
                </div>
              </div>
            </Link>
          </div>
        </div> */}

        <div className="bg-white rounded-2xl shadow-xl p-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Hostel Locations</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-pink-600 mb-4">Girls Hostels</h4>
              <div className="grid grid-cols-2 gap-3">
                {loading ? (
                  <div className="col-span-2 text-center text-gray-400 py-4 italic text-sm">Loading hostel locations...</div>
                ) : (
                  hostels.filter(h => h.type === 'girls').map((h) => (
                    <div key={h.name} className="bg-pink-50 border border-pink-200 rounded-lg p-3 text-center">
                      <span className="text-pink-800 font-medium">{h.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-blue-600 mb-4">Boys Hostels</h4>
              <div className="grid grid-cols-2 gap-3">
                {loading ? (
                  <div className="col-span-2 text-center text-gray-400 py-4 italic text-sm">Loading hostel locations...</div>
                ) : (
                  hostels.filter(h => h.type === 'boys').map((h) => (
                    <div key={h.name} className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                      <span className="text-blue-800 font-medium">{h.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600">
            © 2024 District Backward Classes Welfare Department, Government of Tamil Nadu. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}