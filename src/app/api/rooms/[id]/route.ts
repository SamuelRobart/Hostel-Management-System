import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Room from '@/models/Room';
import User from '@/models/User';
import { getAuthUser } from '@/utils/auth-helpers';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const room = await Room.findById(params.id)
      .populate('hostelId', 'name location')
      .populate('beds.studentId', 'name phone email')
      .lean();

    if (!room) {
      return NextResponse.json(
        { success: false, error: 'Room not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      room
    });

  } catch (error: any) {
    console.error('Error fetching room:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch room', details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const room = await Room.findById(params.id);

    if (!room) {
      return NextResponse.json(
        { success: false, error: 'Room not found' },
        { status: 404 }
      );
    }

    // Update room details
    if (data.amenities !== undefined) room.amenities = data.amenities;
    if (data.block !== undefined) room.block = data.block;

    await room.save();

    return NextResponse.json({
      success: true,
      message: 'Room updated successfully',
      room
    });

  } catch (error: any) {
    console.error('Error updating room:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update room', details: error.message },
      { status: 500 }
    );
  }
}
