'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Building, Plus, Search, Home, Bed, RefreshCw } from 'lucide-react';

interface Room {
  _id: string;
  roomNumber: string;
  floor: number;
  block?: string;
  capacity: number;
  currentOccupancy: number;
  roomType: string;
  beds: Array<{
    bedNumber: number;
    isOccupied: boolean;
    studentId?: any;
  }>;
  hostelId: {
    name: string;
    location: string;
  };
}

export default function AdminRooms() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hostels, setHostels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHostel, setSelectedHostel] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshingId, setRefreshingId] = useState<string | null>(null);
  const [globalRefreshing, setGlobalRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const [newRoom, setNewRoom] = useState({
    hostelId: '',
    roomNumber: '',
    floor: 1,
    block: '',
    capacity: 2,
    roomType: 'double',
    amenities: ''
  });

  const fetchHostels = useCallback(async () => {
    try {
      const res = await fetch('/api/hostels');
      const data = await res.json();
      if (data.success) setHostels(data.hostels);
    } catch (error) {
      console.error('Error fetching hostels:', error);
    }
  }, []);

  const fetchRooms = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      else setGlobalRefreshing(true);
      const url = selectedHostel
        ? `/api/rooms?hostelId=${selectedHostel}`
        : '/api/rooms';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setRooms(data.rooms);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
      setGlobalRefreshing(false);
    }
  }, [selectedHostel]);

  // Refresh a single room card
  const refreshRoom = async (roomId: string) => {
    setRefreshingId(roomId);
    try {
      const res = await fetch('/api/rooms');
      const data = await res.json();
      if (data.success) {
        setRooms(prev =>
          prev.map(r => {
            const updated = data.rooms.find((nr: Room) => nr._id === r._id);
            return updated || r;
          })
        );
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error refreshing room:', error);
    } finally {
      setRefreshingId(null);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, [fetchHostels]);

  useEffect(() => {
    fetchRooms();
  }, [selectedHostel]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    pollingRef.current = setInterval(() => {
      fetchRooms(true);
    }, 30000);
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [fetchRooms]);

  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newRoom,
          amenities: newRoom.amenities.split(',').map(a => a.trim()).filter(Boolean)
        })
      });
      const data = await res.json();
      if (data.success) {
        setShowAddForm(false);
        setNewRoom({ hostelId: '', roomNumber: '', floor: 1, block: '', capacity: 2, roomType: 'double', amenities: '' });
        fetchRooms();
        fetchHostels();
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.hostelId?.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <Home className="h-5 w-5 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Room Management</h1>
              {globalRefreshing && (
                <span className="flex items-center gap-1 text-xs text-blue-500">
                  <RefreshCw className="h-3 w-3 animate-spin" /> Syncing…
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 hidden sm:block">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <button
                onClick={() => fetchRooms(true)}
                disabled={globalRefreshing}
                className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 disabled:opacity-60 text-sm"
              >
                <RefreshCw className={`h-4 w-4 ${globalRefreshing ? 'animate-spin' : ''}`} />
                Refresh All
              </button>
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="text-gray-600 hover:text-blue-600 text-sm"
              >
                Dashboard
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
              >
                <Plus className="h-4 w-4" />
                Add Room
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Legend */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-sm text-gray-600">Occupied Bed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-sm text-gray-600">Vacant Bed</span>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <select
              value={selectedHostel}
              onChange={(e) => setSelectedHostel(e.target.value)}
              className="px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Hostels</option>
              {hostels.map(hostel => (
                <option key={hostel._id} value={hostel._id}>{hostel.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Room Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <h2 className="text-lg font-semibold mb-4">Add New Room</h2>
            <form onSubmit={handleAddRoom} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hostel</label>
                  <select
                    required
                    value={newRoom.hostelId}
                    onChange={(e) => setNewRoom({ ...newRoom, hostelId: e.target.value })}
                    className="mt-1 w-full px-4 py-2 border rounded-md"
                  >
                    <option value="">Select Hostel</option>
                    {hostels.map(hostel => (
                      <option key={hostel._id} value={hostel._id}>{hostel.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Room Number</label>
                  <input
                    type="text"
                    required
                    value={newRoom.roomNumber}
                    onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                    className="mt-1 w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Floor</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newRoom.floor}
                    onChange={(e) => setNewRoom({ ...newRoom, floor: parseInt(e.target.value) })}
                    className="mt-1 w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Block</label>
                  <input
                    type="text"
                    value={newRoom.block}
                    onChange={(e) => setNewRoom({ ...newRoom, block: e.target.value })}
                    className="mt-1 w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacity</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="4"
                    value={newRoom.capacity}
                    onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) })}
                    className="mt-1 w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Room Type</label>
                  <select
                    value={newRoom.roomType}
                    onChange={(e) => setNewRoom({ ...newRoom, roomType: e.target.value })}
                    className="mt-1 w-full px-4 py-2 border rounded-md"
                  >
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="triple">Triple</option>
                    <option value="quad">Quad</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amenities (comma-separated)</label>
                <input
                  type="text"
                  value={newRoom.amenities}
                  onChange={(e) => setNewRoom({ ...newRoom, amenities: e.target.value })}
                  placeholder="AC, WiFi, Attached Bathroom"
                  className="mt-1 w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Create Room
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map(room => {
            const isRefreshing = refreshingId === room._id;
            const occupiedCount = room.beds.filter(b => b.isOccupied).length;
            const vacantCount = room.beds.filter(b => !b.isOccupied).length;

            return (
              <div
                key={room._id}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Room {room.roomNumber}</h3>
                    {room.block && <span className="text-sm text-gray-400">({room.block})</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      room.currentOccupancy === room.capacity
                        ? 'bg-red-100 text-red-800'
                        : room.currentOccupancy > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {room.currentOccupancy}/{room.capacity}
                    </span>
                    {/* Per-Card Refresh Button */}
                    <button
                      onClick={() => refreshRoom(room._id)}
                      disabled={isRefreshing}
                      title="Refresh this room"
                      className="p-1.5 rounded-md text-blue-500 hover:bg-blue-50 disabled:opacity-50 transition"
                    >
                      <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Room Info */}
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Hostel:</span>
                    <span className="font-medium text-gray-800">{room.hostelId?.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Floor:</span>
                    <span className="font-medium text-gray-800">{room.floor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium text-gray-800 capitalize">{room.roomType}</span>
                  </div>
                </div>

                {/* Beds Section */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Beds</p>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium">
                        {occupiedCount} Occupied
                      </span>
                      <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">
                        {vacantCount} Vacant
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {room.beds.map(bed => (
                      <div
                        key={bed.bedNumber}
                        className={`p-2.5 rounded-lg border-2 flex items-start gap-2 transition-all ${
                          bed.isOccupied
                            ? 'bg-red-50 border-red-400 text-red-800'
                            : 'bg-green-50 border-green-400 text-green-800'
                        }`}
                      >
                        <Bed className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          bed.isOccupied ? 'text-red-600' : 'text-green-600'
                        }`} />
                        <div className="min-w-0">
                          <p className={`text-xs font-bold ${
                            bed.isOccupied ? 'text-red-700' : 'text-green-700'
                          }`}>
                            Bed {bed.bedNumber}
                          </p>
                          <p className={`text-xs truncate ${
                            bed.isOccupied ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {bed.isOccupied
                              ? (bed.studentId?.name || 'Occupied')
                              : 'Vacant'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <Bed className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-lg font-medium">No rooms found.</p>
            <p className="text-sm">{selectedHostel ? 'Try selecting a different hostel.' : 'Add your first room to get started.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
