import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Room from '@/models/Room';
import Hostel from '@/models/Hostel';
import User from '@/models/User';
import { getAuthUser } from '@/utils/auth-helpers';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const authUser = getAuthUser(request);

    const { searchParams } = new URL(request.url);
    const hostelId = searchParams.get('hostelId');
    const floor = searchParams.get('floor');
    const block = searchParams.get('block');

    let query: any = {};

    if (hostelId) {
      query.hostelId = hostelId;
    }

    if (floor) {
      query.floor = parseInt(floor);
    }

    if (block) {
      query.block = block;
    }

    // Wardens can only see their hostel's rooms
    if (authUser && authUser.role === 'warden') {
      if (authUser.hostelId) {
        query.hostelId = authUser.hostelId;
      } else if (authUser.hostelLocation) {
        // Fallback to finding rooms by hostel location via the hostel object
        const hostels = await Hostel.find({ location: authUser.hostelLocation }).select('_id');
        const hostelIds = hostels.map(h => h._id);
        if (hostelIds.length > 0) {
          query.hostelId = { $in: hostelIds };
        }
      }
    }

    const rooms = await Room.find(query)
      .populate('hostelId', 'name location')
      .populate('beds.studentId', 'name phone')
      .sort({ floor: 1, roomNumber: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: rooms.length,
      rooms
    });

  } catch (error: any) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rooms', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const authUser = getAuthUser(request);

    if (!authUser || (authUser.role !== 'admin' && authUser.role !== 'warden')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const data = await request.json();
    const { hostelId, roomNumber, floor, block, capacity, roomType, amenities } = data;

    // Verify hostel exists
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return NextResponse.json(
        { success: false, error: 'Hostel not found' },
        { status: 404 }
      );
    }

    // Wardens can only create rooms for their hostel
    if (authUser.role === 'warden' && authUser.hostelId?.toString() !== hostelId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized to create rooms for this hostel' },
        { status: 403 }
      );
    }

    // Create beds array
    const beds = [];
    for (let i = 1; i <= capacity; i++) {
      beds.push({
        bedNumber: i,
        isOccupied: false,
      });
    }

    const room = new Room({
      hostelId,
      roomNumber,
      floor,
      block,
      capacity,
      currentOccupancy: 0,
      beds,
      roomType: roomType || 'double',
      amenities: amenities || [],
    });

    await room.save();

    // Update hostel room count
    hostel.totalRooms = (hostel.totalRooms || 0) + 1;
    hostel.totalBeds = (hostel.totalBeds || 0) + capacity;
    await hostel.save();

    return NextResponse.json({
      success: true,
      message: 'Room created successfully',
      room
    });

  } catch (error: any) {
    console.error('Error creating room:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create room', details: error.message },
      { status: 500 }
    );
  }
}
