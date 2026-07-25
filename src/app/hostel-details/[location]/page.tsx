'use client'

import { useState, useEffect } from 'react'
import { Building2, Users, MapPin, ArrowLeft, Calendar, Utensils } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function IndividualHostelPage() {
  const params = useParams()
  const location = params.location as string
  const [hostelData, setHostelData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockData: any = {
      perur: {
        name: 'Elite Hostel - Girls',
        location: 'Perur',
        totalCapacity: 70,
        currentOccupancy: 52,
        wardenName: 'Ms. Kamala Devi',
        images: [
          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&h=600&fit=crop'
        ],
        facilities: ['WiFi', 'Mess', 'Library', 'Recreation Room', 'Laundry'],
        description: 'Modern hostel facility with all amenities for comfortable stay.'
      },
      goundampalayam: {
        name: 'Elite Hostel - Girls',
        location: 'Goundampalayam',
        totalCapacity: 65,
        currentOccupancy: 48,
        wardenName: 'Ms. Radha Krishnan',
        images: [
          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&h=600&fit=crop'
        ],
        facilities: ['WiFi', 'Mess', 'Library', 'Recreation Room', 'Laundry'],
        description: 'Well-maintained hostel with excellent facilities and security.'
      },
      nayakkanpalayam: {
        name: 'Elite Hostel - Girls',
        location: 'Nayakkanpalayam',
        totalCapacity: 65,
        currentOccupancy: 47,
        wardenName: 'Ms. Geetha Rani',
        images: [
          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&h=600&fit=crop'
        ],
        facilities: ['WiFi', 'Mess', 'Library', 'Recreation Room', 'Laundry'],
        description: 'Spacious hostel with modern amenities and peaceful environment.'
      }
    }

    setTimeout(() => {
      setHostelData(mockData[location] || mockData.perur)
      setLoading(false)
    }, 1000)
  }, [location])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hostel details...</p>
        </div>
      </div>
    )
  }

  const occupancyPercentage = ((hostelData.currentOccupancy / hostelData.totalCapacity) * 100).toFixed(1)
  const vacancy = hostelData.totalCapacity - hostelData.currentOccupancy

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/hostel-details" className="mr-4 text-purple-600 hover:text-purple-700">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{hostelData.name}</h1>
            </div>
            <div className="text-sm text-gray-500">
              {hostelData.location}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {hostelData.images.map((image: string, index: number) => (
            <div key={index} className="relative h-64 rounded-lg overflow-hidden">
              <img 
                src={image} 
                alt={`${hostelData.location} Hostel ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Hostel</h2>
              <p className="text-gray-600 mb-4">{hostelData.description}</p>
              
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{hostelData.location}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>Warden: {hostelData.wardenName}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Facilities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hostelData.facilities.map((facility: string, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Occupancy Details</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Capacity</span>
                  <span className="font-semibold">{hostelData.totalCapacity}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Occupancy</span>
                  <span className="font-semibold text-blue-600">{hostelData.currentOccupancy}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Vacancy</span>
                  <span className="font-semibold text-green-600">{vacancy}</span>
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Occupancy Rate</span>
                    <span className="text-sm font-medium">{occupancyPercentage}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        parseFloat(occupancyPercentage) > 90 
                          ? 'bg-red-500' 
                          : parseFloat(occupancyPercentage) > 75 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${occupancyPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/hostel-application" className="w-full flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                  Apply Now
                </Link>
                <Link href="/hostel-details" className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Back to All Hostels
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}