import { NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Room from '@/models/Room';
import RoomAssignmentLog from '@/models/RoomAssignmentLog';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';
import { successResponse, badRequestResponse, forbiddenResponse, notFoundResponse, serverErrorResponse } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    // Extract and verify token
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return forbiddenResponse('No authentication token');
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return forbiddenResponse('Invalid or expired token');
    }
    
    if (decoded.role !== 'warden') {
      return forbiddenResponse('Only wardens can assign beds');
    }

    await connectToDatabase();

    // Get warden details
    const warden = await User.findById(decoded.id);
    if (!warden) {
      return notFoundResponse('Warden not found');
    }

    const { studentId, roomId, bedNumber } = await request.json();

    if (!studentId || !roomId || bedNumber === undefined || bedNumber === '') {
      return badRequestResponse('Missing required fields: studentId, roomId, bedNumber');
    }

    // Convert bedNumber to number if it's a string
    const bedNum = typeof bedNumber === 'string' ? parseInt(bedNumber, 10) : bedNumber;
    if (isNaN(bedNum)) {
      return badRequestResponse('Invalid bed number');
    }

    // Get room and verify it belongs to warden's hostel
    const room = await Room.findById(roomId);
    if (!room) {
      return notFoundResponse('Room not found');
    }

    // Verify room belongs to warden's hostel (check both hostelId and hostelLocation)
    if (warden.hostelId && room.hostelId && room.hostelId.toString() !== warden.hostelId.toString()) {
      return forbiddenResponse('Room does not belong to your hostel');
    }
    if (warden.hostelLocation && room.hostelLocation && room.hostelLocation !== warden.hostelLocation) {
      return forbiddenResponse('Room does not belong to your hostel');
    }

    // Get student and verify they belong to warden's hostel
    const student = await User.findById(studentId);
    if (!student) {
      return notFoundResponse('Student not found');
    }

    if (student.role !== 'student') {
      return badRequestResponse('User is not a student');
    }

    // Verify student belongs to warden's hostel (check both hostelId and hostelLocation)
    if (warden.hostelId && student.hostelId && student.hostelId.toString() !== warden.hostelId.toString()) {
      return forbiddenResponse('Student does not belong to your hostel');
    }
    if (warden.hostelLocation && student.hostelLocation && student.hostelLocation !== warden.hostelLocation) {
      return forbiddenResponse('Student does not belong to your hostel');
    }

    // Check if bed is within valid range (1 to capacity)
    if (bedNum < 1 || bedNum > room.capacity) {
      return badRequestResponse(`Bed number must be between 1 and ${room.capacity}`);
    }

    // Find the bed
    const bedIndex = room.beds.findIndex((b: any) => b.bedNumber === bedNum);
    if (bedIndex === -1) {
      return badRequestResponse('Bed not found in room');
    }

    // Check if bed is already occupied by another student
    const bed = room.beds[bedIndex];
    if (bed.isOccupied && bed.studentId && bed.studentId.toString() !== studentId) {
      return badRequestResponse('Bed is already occupied by another student');
    }

    // Track previous assignment for logging
    let previousRoomId = null;
    let previousRoomNumber = null;
    let previousBedNumber = null;
    let isReassignment = false;

    // If student already had a bed, free it
    if (student.roomId) {
      isReassignment = true;
      previousRoomId = student.roomId;
      previousRoomNumber = student.roomNumber;
      previousBedNumber = student.bedNumber;

      const oldRoom = await Room.findById(student.roomId);
      if (oldRoom) {
        const oldBedIndex = oldRoom.beds.findIndex((b: any) => b.studentId && b.studentId.toString() === studentId);
        if (oldBedIndex !== -1) {
          oldRoom.beds[oldBedIndex].isOccupied = false;
          oldRoom.beds[oldBedIndex].studentId = undefined;
          oldRoom.beds[oldBedIndex].occupiedAt = undefined;
          oldRoom.currentOccupancy = Math.max(0, oldRoom.currentOccupancy - 1);
          await oldRoom.save();
        }
      }
    }

    // Assign new bed
    room.beds[bedIndex].isOccupied = true;
    room.beds[bedIndex].studentId = student._id;
    room.beds[bedIndex].occupiedAt = new Date();

    // Update room occupancy if this is a new assignment
    if (!student.roomId || student.roomId.toString() !== roomId) {
      room.currentOccupancy = (room.currentOccupancy || 0) + 1;
    }

    // Update student with room and bed info
    student.roomId = room._id;
    student.roomNumber = room.roomNumber;
    student.bedNumber = bedNum;

    await Promise.all([room.save(), student.save()]);

    // Log the room assignment
    const logEntry = new RoomAssignmentLog({
      studentId: student._id,
      studentName: student.name,
      studentPhone: student.phone,
      hostelId: room.hostelId,
      roomId: room._id,
      roomNumber: room.roomNumber,
      bedNumber: bedNum,
      floor: room.floor,
      wardenId: warden._id,
      wardenName: warden.name,
      action: isReassignment ? 'reassign' : 'assign',
      previousRoomId: previousRoomId,
      previousRoomNumber: previousRoomNumber,
      previousBedNumber: previousBedNumber,
      assignedAt: new Date(),
    });
    await logEntry.save();

    return successResponse(
      {
        student: {
          id: student._id,
          name: student.name,
          roomNumber: room.roomNumber,
          bedNumber: bedNumber,
          roomId: room._id
        },
        room: {
          id: room._id,
          roomNumber: room.roomNumber,
          currentOccupancy: room.currentOccupancy
        }
      },
      'Bed assigned successfully'
    );

  } catch (error: any) {
    console.error('Bed assignment error:', error);
    return serverErrorResponse('Failed to assign bed');
  }
}
