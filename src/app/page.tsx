'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Building2, Users, Shield, BookOpen, MapPin, Phone, Mail, ArrowRight, Star, Award, Heart } from 'lucide-react';


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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Hostel Management
              </span>
              <span className="block text-xs text-gray-500">Stay with Comfort</span>
            </div>
          </div>
          <Link
            href="/login"
            className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 font-medium flex items-center gap-2"
          >
            Sign In
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex flex-col md:flex-row items-center justify-center mb-8 gap-8">
            {/* Premium Logo 1: Elite Housing Emblem */}
            <div className="relative flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 border border-amber-400/30 shadow-2xl p-4 overflow-hidden group hover:border-amber-400/60 transition-all duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative flex flex-col items-center justify-center text-center">
                <Building2 className="w-12 h-12 text-amber-400 mb-1" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-amber-400">ELITE</span>
                <span className="text-[9px] uppercase tracking-[0.1em] font-medium text-slate-300">HOUSING</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Award className="w-4 h-4" />
                  Government Certified              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                Elite Hostel
                
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
                Hostel Management System
              </h2>
              <div className="flex flex-wrap justify-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Head Quarters, Chennai</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">EliteHostel@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">0422-23004104</span>
                </div>
              </div>
            </div>

            {/* Premium Logo 2: Certified Seal */}
            <div className="relative flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-zinc-900 border border-cyan-500/30 shadow-2xl p-4 overflow-hidden group hover:border-cyan-500/60 transition-all duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative flex flex-col items-center justify-center text-center">
                <Shield className="w-12 h-12 text-cyan-400 mb-1" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-cyan-400">SAFETY</span>
                <span className="text-[9px] uppercase tracking-[0.1em] font-medium text-slate-300">VERIFIED</span>
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive digital solution for managing hostels across India,
            providing modern facilities and efficient administration for student and Professionals.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
            >
              Access Portal
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-3 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white hover:border-blue-200 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {loading ? '...' : (stats?.totalHostels || 10)}
            </h3>
            <p className="text-gray-600 font-medium">Hostels</p>
            <p className="text-sm text-gray-500 mt-1">
              {loading ? '...' : `${stats?.girlsHostels} Girls & ${stats?.boysHostels} Boys`}
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white hover:border-green-200 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {loading ? '...' : (stats?.totalCapacity || 350)}
            </h3>
            <p className="text-gray-600 font-medium">Total Capacity</p>
            <p className="text-sm text-gray-500 mt-1">Student accommodation</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white hover:border-purple-200 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {loading ? '...' : (stats?.wardenCount || 10)}
            </h3>
            <p className="text-gray-600 font-medium">Wardens</p>
            <p className="text-sm text-gray-500 mt-1">Dedicated staff</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white hover:border-amber-200 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {loading ? '...' : (stats?.totalOccupied || 0)}
            </h3>
            <p className="text-gray-600 font-medium">Enrolled</p>
            <p className="text-sm text-gray-500 mt-1">Currently staying</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl">
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6">
              <Users className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3">For Students</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Access your profile, view hostel menu, submit complaints, and track their status.
            </p>
            <ul className="space-y-3 text-blue-100">
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                Profile Management
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                Issue Reporting
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                Weekly Menu
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-3xl p-8 text-white shadow-2xl">
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6">
              <Shield className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3">For Wardens</h3>
            <p className="text-green-100 mb-6 leading-relaxed">
              Manage students in your hostel, handle issues, and oversee daily operations.
            </p>
            <ul className="space-y-3 text-green-100">
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                Student Management
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                Issue Resolution
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                Hostel Dashboard
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-violet-700 rounded-3xl p-8 text-white shadow-2xl">
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6">
              <Building2 className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3">For Administrators</h3>
            <p className="text-purple-100 mb-6 leading-relaxed">
              Complete system access with full control over all hostels and user management.
            </p>
            <ul className="space-y-3 text-purple-100">
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                All Hostel Stats
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                Student Records
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                Warden Directory
              </li>
            </ul>
          </div>
        </div>

        {/* Hostel Locations */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Our Hostel Network</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Girls Hostels */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold text-pink-700">Girls Hostels ({hostels.filter(h => h.type === 'girls').length})</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {loading ? (
                  <div className="col-span-2 text-center text-gray-400 py-4 italic text-sm">Loading...</div>
                ) : (
                  hostels.filter(h => h.type === 'girls').map((h, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 text-center shadow-sm border border-pink-100 hover:shadow-md hover:border-pink-300 transition-all">
                      <span className="text-pink-700 font-semibold">{h.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Boys Hostels */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold text-blue-700">Boys Hostels ({hostels.filter(h => h.type === 'boys').length})</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {loading ? (
                  <div className="col-span-2 text-center text-gray-400 py-4 italic text-sm">Loading...</div>
                ) : (
                  hostels.filter(h => h.type === 'boys').map((h, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 text-center shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-300 transition-all">
                      <span className="text-blue-700 font-semibold">{h.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="flex items-center justify-center gap-2 text-gray-500 mb-2">
            <Heart className="w-4 h-4 text-red-400" />
            <span>Serving the students of Tamil Nadu</span>
          </div>
          <p className="text-gray-500">
            © 2024 District Backward Classes Welfare Department, Government of Tamil Nadu
          </p>
        </div>
      </div>
    </div>
  );
}