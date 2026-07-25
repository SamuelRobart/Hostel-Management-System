import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Room from '@/models/Room';
import User from '@/models/User';
import Hostel from '@/models/Hostel';
import { getAuthUser } from '@/utils/auth-helpers';

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

    const { roomId, bedNumber, studentId } = await request.json();

    const room = await Room.findById(roomId);
    if (!room) {
      return NextResponse.json(
        { success: false, error: 'Room not found' },
        { status: 404 }
      );
    }

    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    // Check if bed is available
    const bed = room.beds.find((b: any) => b.bedNumber === bedNumber);
    if (!bed) {
      return NextResponse.json(
        { success: false, error: 'Bed not found' },
        { status: 404 }
      );
    }

    if (bed.isOccupied) {
      return NextResponse.json(
        { success: false, error: 'Bed is already occupied' },
        { status: 400 }
      );
    }

    // Unassign previous bed if student has one
    if (student.roomId) {
      const prevRoom = await Room.findById(student.roomId);
      if (prevRoom) {
        const prevBed = prevRoom.beds.find((b: any) => b.studentId?.toString() === studentId);
        if (prevBed) {
          prevBed.isOccupied = false;
          prevBed.studentId = undefined;
          prevBed.occupiedAt = undefined;
          prevRoom.currentOccupancy -= 1;
          await prevRoom.save();
        }
      }
    }

    // Assign new bed
    bed.isOccupied = true;
    bed.studentId = student._id;
    bed.occupiedAt = new Date();
    room.currentOccupancy += 1;

    // Update student
    student.roomId = room._id;
    student.roomNumber = room.roomNumber;
    student.bedNumber = bedNumber;
    if (!student.hostelId) {
      student.hostelId = room.hostelId;
    }

    await Promise.all([room.save(), student.save()]);

    // Update hostel occupancy
    const hostel = await Hostel.findById(room.hostelId);
    if (hostel) {
      hostel.currentOccupancy = await User.countDocuments({ 
        hostelId: hostel._id, 
        role: 'student' 
      });
      await hostel.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Bed assigned successfully',
      room: await Room.findById(roomId).populate('beds.studentId', 'name phone')
    });

  } catch (error: any) {
    console.error('Error assigning bed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to assign bed', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();
    const authUser = getAuthUser(request);

    if (!authUser || (authUser.role !== 'admin' && authUser.role !== 'warden')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json(
        { success: false, error: 'Student ID is required' },
        { status: 400 }
      );
    }

    const student = await User.findById(studentId);
    if (!student || !student.roomId) {
      return NextResponse.json(
        { success: false, error: 'Student not assigned to any room' },
        { status: 404 }
      );
    }

    const room = await Room.findById(student.roomId);
    if (!room) {
      return NextResponse.json(
        { success: false, error: 'Room not found' },
        { status: 404 }
      );
    }

    // Unassign bed
    const bed = room.beds.find((b: any) => b.studentId?.toString() === studentId);
    if (bed) {
      bed.isOccupied = false;
      bed.studentId = undefined;
      bed.occupiedAt = undefined;
      room.currentOccupancy -= 1;
      await room.save();
    }

    // Update student
    student.roomId = undefined;
    student.roomNumber = undefined;
    student.bedNumber = undefined;
    await student.save();

    // Update hostel occupancy
    const hostel = await Hostel.findById(room.hostelId);
    if (hostel) {
      hostel.currentOccupancy = await User.countDocuments({ 
        hostelId: hostel._id, 
        role: 'student' 
      });
      await hostel.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Bed unassigned successfully'
    });

  } catch (error: any) {
    console.error('Error unassigning bed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to unassign bed', details: error.message },
      { status: 500 }
    );
  }
}
