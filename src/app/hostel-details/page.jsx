'use client';
import { useState, useEffect } from 'react';
import { Building2, Users, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
export default function HostelDetailsPage() {
    var _a = useState([]), hostels = _a[0], setHostels = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    useEffect(function () {
        var mockHostels = [
            // GIRLS HOSTELS (7)
            { _id: '1', name: 'Elite Hostel - Girls', location: 'Chennai', totalCapacity: 50, currentOccupancy: 38, wardenName: 'Mrs. Kamala Devi', wardenPhone: '9876543200' },
            { _id: '2', name: 'Elite Hostel - Girls', location: 'Bangalore', totalCapacity: 50, currentOccupancy: 42, wardenName: 'Mrs. Priya Lakshmi', wardenPhone: '9876543205' },
            { _id: '3', name: 'Elite Hostel - Girls', location: 'Trichy', totalCapacity: 50, currentOccupancy: 40, wardenName: 'Mrs. Meena Kumari', wardenPhone: '9876543210' },
            { _id: '4', name: 'Elite Hostel - Girls', location: 'Coimbatore', totalCapacity: 50, currentOccupancy: 36, wardenName: 'Mrs. Geetha Rani', wardenPhone: '9876543215' },
            { _id: '5', name: 'Elite Hostel - Girls', location: 'Hyderabad', totalCapacity: 50, currentOccupancy: 45, wardenName: 'Mrs. Meera Bai', wardenPhone: '9876543220' },
            { _id: '6', name: 'Elite Hostel - Girls', location: 'Ernakulam', totalCapacity: 50, currentOccupancy: 39, wardenName: 'Mrs. Shanthi Kumar', wardenPhone: '9876543225' },
            { _id: '7', name: 'Elite Hostel - Girls', location: 'Mysuru', totalCapacity: 50, currentOccupancy: 43, wardenName: 'Mrs. Radha Krishnan', wardenPhone: '9876543230' },
            // BOYS HOSTELS (7)
            { _id: '8', name: 'Elite Hostel - Boys', location: 'Chennai', totalCapacity: 50, currentOccupancy: 35, wardenName: 'Mr. Ravi Shankar', wardenPhone: '9876543235' },
            { _id: '9', name: 'Elite Hostel - Boys', location: 'Bangalore', totalCapacity: 50, currentOccupancy: 41, wardenName: 'Mr. Sanjay Sharma', wardenPhone: '9876543240' },
            { _id: '10', name: 'Elite Hostel - Boys', location: 'Madurai', totalCapacity: 50, currentOccupancy: 38, wardenName: 'Mr. Raman Kumar', wardenPhone: '9876543245' },
            { _id: '11', name: 'Elite Hostel - Boys', location: 'Kanniyakumari', totalCapacity: 50, currentOccupancy: 44, wardenName: 'Mr. Vikram Singh', wardenPhone: '9876543250' },
            { _id: '12', name: 'Elite Hostel - Boys', location: 'Kochin', totalCapacity: 50, currentOccupancy: 37, wardenName: 'Mr. Suresh Babu', wardenPhone: '9876543255' },
            { _id: '13', name: 'Elite Hostel - Boys', location: 'Trivandrum', totalCapacity: 50, currentOccupancy: 46, wardenName: 'Mr. Ajay Kumar', wardenPhone: '9876543260' },
            { _id: '14', name: 'Elite Hostel - Boys', location: 'Mangalore', totalCapacity: 50, currentOccupancy: 40, wardenName: 'Mr. Arun Kumar', wardenPhone: '9876543265' }
        ];
        setTimeout(function () {
            setHostels(mockHostels);
            setLoading(false);
        }, 1000);
    }, []);
    var totalCapacity = hostels.reduce(function (sum, hostel) { return sum + hostel.totalCapacity; }, 0);
    var totalOccupancy = hostels.reduce(function (sum, hostel) { return sum + hostel.currentOccupancy; }, 0);
    var totalVacancy = totalCapacity - totalOccupancy;
    if (loading) {
        return (<div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hostel details...</p>
        </div>
      </div>);
    }
    return (<div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="mr-4 text-purple-600 hover:text-purple-700">
                <ArrowLeft className="h-6 w-6"/>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Hostel Details</h1>
            </div>
            <div className="text-sm text-gray-500">
              Elite Hostel Group
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-purple-600"/>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Hostels</p>
                <p className="text-2xl font-bold text-gray-900">{hostels.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600"/>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Capacity</p>
                <p className="text-2xl font-bold text-gray-900">{totalCapacity}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600"/>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Current Occupancy</p>
                <p className="text-2xl font-bold text-gray-900">{totalOccupancy}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-600"/>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Available Vacancy</p>
                <p className="text-2xl font-bold text-gray-900">{totalVacancy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Girls Hostels */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-pink-50">
            <h2 className="text-xl font-bold text-gray-900">Girls College Hostels ({hostels.filter(function (hostel) { return hostel.name.includes('Girls'); }).length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {hostels.filter(function (hostel) { return hostel.name.includes('Girls'); }).map(function (hostel) {
            var occupancyPercentage = ((hostel.currentOccupancy / hostel.totalCapacity) * 100).toFixed(1);
            var vacancy = hostel.totalCapacity - hostel.currentOccupancy;
            return (<Link key={hostel._id} href={"/hostel-details/".concat(hostel.location.toLowerCase())} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Elite Hostel</h3>
                    <span className={"px-3 py-1 text-sm rounded-full ".concat(parseFloat(occupancyPercentage) > 90
                    ? 'bg-red-100 text-red-800'
                    : parseFloat(occupancyPercentage) > 75
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800')}>
                      {occupancyPercentage}% Full
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2"/>
                      <span>{hostel.location}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-500">Capacity</p>
                        <p className="font-semibold">{hostel.totalCapacity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Occupied</p>
                        <p className="font-semibold text-blue-600">{hostel.currentOccupancy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Vacancy</p>
                        <p className="font-semibold text-green-600">{vacancy}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-sm text-gray-600 mb-2">Warden: {hostel.wardenName}</p>
                      <div className="bg-gray-200 rounded-full h-3">
                        <div className={"h-3 rounded-full ".concat(parseFloat(occupancyPercentage) > 90
                    ? 'bg-red-500'
                    : parseFloat(occupancyPercentage) > 75
                        ? 'bg-yellow-500'
                        : 'bg-green-500')} style={{ width: "".concat(occupancyPercentage, "%") }}></div>
                      </div>
                    </div>
                  </div>
                </Link>);
        })}
          </div>
        </div>

        {/* Boys Hostels */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
            <h2 className="text-xl font-bold text-gray-900">Boys College Hostels ({hostels.filter(function (hostel) { return hostel.name.includes('Boys'); }).length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {hostels.filter(function (hostel) { return hostel.name.includes('Boys'); }).map(function (hostel) {
            var occupancyPercentage = ((hostel.currentOccupancy / hostel.totalCapacity) * 100).toFixed(1);
            var vacancy = hostel.totalCapacity - hostel.currentOccupancy;
            return (<Link key={hostel._id} href={"/hostel-details/".concat(hostel.location.toLowerCase())} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Elite Hostel</h3>
                    <span className={"px-3 py-1 text-sm rounded-full ".concat(parseFloat(occupancyPercentage) > 90
                    ? 'bg-red-100 text-red-800'
                    : parseFloat(occupancyPercentage) > 75
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800')}>
                      {occupancyPercentage}% Full
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2"/>
                      <span>{hostel.location}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-500">Capacity</p>
                        <p className="font-semibold">{hostel.totalCapacity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Occupied</p>
                        <p className="font-semibold text-blue-600">{hostel.currentOccupancy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Vacancy</p>
                        <p className="font-semibold text-green-600">{vacancy}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-sm text-gray-600 mb-2">Warden: {hostel.wardenName}</p>
                      <div className="bg-gray-200 rounded-full h-3">
                        <div className={"h-3 rounded-full ".concat(parseFloat(occupancyPercentage) > 90
                    ? 'bg-red-500'
                    : parseFloat(occupancyPercentage) > 75
                        ? 'bg-yellow-500'
                        : 'bg-green-500')} style={{ width: "".concat(occupancyPercentage, "%") }}></div>
                      </div>
                    </div>
                  </div>
                </Link>);
        })}
          </div>
        </div>
      </div>
    </div>);
}
