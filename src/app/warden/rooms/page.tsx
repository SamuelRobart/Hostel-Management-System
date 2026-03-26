'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Bed, Plus, Search, RefreshCw } from 'lucide-react';

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
}

export default function WardenRooms() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [selectedBed, setSelectedBed] = useState<number>(0);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [refreshingId, setRefreshingId] = useState<string | null>(null);
  const [globalRefreshing, setGlobalRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRooms = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      else setGlobalRefreshing(true);
      const res = await fetch('/api/rooms');
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
  }, []);

  const fetchStudents = useCallback(async () => {
    try {
      const res = await fetch('/api/warden/students');
      const data = await res.json();
      if (data.success) setStudents(data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }, []);

  // Refresh a single room card in real-time
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
    fetchRooms();
    fetchStudents();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    pollingRef.current = setInterval(() => {
      fetchRooms(true);
    }, 30000);
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [fetchRooms]);

  const handleAssignBed = async () => {
    if (!selectedRoom || !selectedBed || !selectedStudent) {
      alert('Please select room, bed, and student');
      return;
    }
    try {
      const res = await fetch('/api/rooms/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: selectedRoom, bedNumber: selectedBed, studentId: selectedStudent })
      });
      const data = await res.json();
      if (data.success) {
        setShowAssignForm(false);
        setSelectedRoom('');
        setSelectedBed(0);
        setSelectedStudent('');
        fetchRooms();
        fetchStudents();
      } else {
        alert(data.error || 'Failed to assign bed');
      }
    } catch (error) {
      console.error('Error assigning bed:', error);
      alert('Error assigning bed');
    }
  };

  const handleUnassignBed = async (studentId: string) => {
    if (!confirm('Are you sure you want to unassign this bed?')) return;
    try {
      const res = await fetch(`/api/rooms/assign?studentId=${studentId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchRooms();
        fetchStudents();
      }
    } catch (error) {
      console.error('Error unassigning bed:', error);
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableBeds = selectedRoom
    ? rooms.find(r => r._id === selectedRoom)?.beds.filter(b => !b.isOccupied) || []
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading rooms…</p>
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
              <button
                onClick={() => router.push('/warden/dashboard')}
                className="text-blue-600 hover:text-blue-800 mr-2 text-sm"
              >
                ← Dashboard
              </button>
              <h1 className="text-xl font-bold text-gray-900">Room &amp; Bed Management</h1>
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
                onClick={() => setShowAssignForm(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
              >
                <Plus className="h-4 w-4" />
                Assign Bed
              </button>
              <button
                onClick={() => router.push('/warden/profile')}
                className="text-gray-600 hover:text-blue-600 text-sm"
              >
                Profile
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

        {/* Search */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
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

        {/* Assign Bed Form */}
        {showAssignForm && (
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <h2 className="text-lg font-semibold mb-4">Assign Bed to Student</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                <select
                  value={selectedRoom}
                  onChange={(e) => { setSelectedRoom(e.target.value); setSelectedBed(0); }}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Select Room</option>
                  {rooms.filter(r => r.currentOccupancy < r.capacity).map(room => (
                    <option key={room._id} value={room._id}>
                      {room.roomNumber} ({room.currentOccupancy}/{room.capacity})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bed</label>
                <select
                  value={selectedBed}
                  onChange={(e) => setSelectedBed(parseInt(e.target.value))}
                  disabled={!selectedRoom}
                  className="w-full px-4 py-2 border rounded-md disabled:bg-gray-100"
                >
                  <option value="0">Select Bed</option>
                  {availableBeds.map(bed => (
                    <option key={bed.bedNumber} value={bed.bedNumber}>Bed {bed.bedNumber}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Select Student</option>
                  {students.filter(s => !s.roomNumber).map(student => (
                    <option key={student._id || student.id} value={student._id || student.id}>
                      {student.name} - {student.phone}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAssignBed}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Assign
              </button>
              <button
                onClick={() => { setShowAssignForm(false); setSelectedRoom(''); setSelectedBed(0); setSelectedStudent(''); }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
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

                  <div className="space-y-2">
                    {room.beds.map(bed => (
                      <div
                        key={bed.bedNumber}
                        className={`p-2.5 rounded-lg border-2 flex items-center justify-between transition-all ${
                          bed.isOccupied
                            ? 'bg-red-50 border-red-400'
                            : 'bg-green-50 border-green-400'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Bed className={`h-4 w-4 flex-shrink-0 ${
                            bed.isOccupied ? 'text-red-600' : 'text-green-600'
                          }`} />
                          <div className="min-w-0">
                            <span className={`text-sm font-bold ${
                              bed.isOccupied ? 'text-red-700' : 'text-green-700'
                            }`}>
                              Bed {bed.bedNumber}
                            </span>
                            {bed.isOccupied && bed.studentId && (
                              <span className="text-xs text-red-500 ml-1 truncate">
                                — {bed.studentId.name || 'Occupied'}
                              </span>
                            )}
                            {!bed.isOccupied && (
                              <span className="text-xs text-green-500 ml-1">— Vacant</span>
                            )}
                          </div>
                        </div>
                        {bed.isOccupied && bed.studentId && (
                          <button
                            onClick={() => handleUnassignBed(bed.studentId._id || bed.studentId)}
                            className="text-xs text-red-600 hover:text-red-800 font-medium ml-2 flex-shrink-0 bg-red-50 border border-red-300 rounded px-1.5 py-0.5 hover:bg-red-100 transition"
                          >
                            Unassign
                          </button>
                        )}
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
          </div>
        )}
      </div>
    </div>
  );
}
