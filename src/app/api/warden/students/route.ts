import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';
import { successResponse, unauthorizedResponse, forbiddenResponse, serverErrorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    // Extract token from cookies
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return unauthorizedResponse('No authentication token');
    }

    // Verify and decode token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return unauthorizedResponse('Invalid or expired token');
    }
    
    if (decoded.role !== 'warden') {
      return forbiddenResponse('Only wardens can access this resource');
    }

    await connectToDatabase();

    // Get warden details
    const warden = await User.findById(decoded.id);
    if (!warden) {
      return successResponse({ students: [], hostelName: '', wardenName: '' }, 'No warden found');
    }

    // Get students in warden's hostel (filter by hostelId or hostelLocation)
    let query: any = { role: 'student' };
    
    if (warden.hostelId) {
      query.hostelId = warden.hostelId;
    } else if (warden.hostelLocation) {
      query.hostelLocation = warden.hostelLocation;
    }

    const students = await User.find(query).select('-password').lean();

    // Format student data with room numbers starting from 1
    const formattedStudents = students.map(student => ({
      _id: student._id,
      name: student.name,
      phone: student.phone,
      email: student.email,
      dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('en-GB') : 'N/A',
      native: student.native,
      course: student.course,
      college: student.college,
      date_of_joining: student.createdAt,
      roomNumber: student.roomNumber ? String(student.roomNumber).padStart(3, '0') : null,
      bedNumber: student.bedNumber ? student.bedNumber : null,
      roomId: student.roomId,
      hostelLocation: student.hostelLocation,
    }));

    return successResponse(
      {
        students: formattedStudents,
        hostelName: warden.hostelLocation || 'Assigned Hostel',
        wardenName: warden.name
      },
      'Students fetched successfully'
    );

  } catch (error: any) {
    console.error('Warden students error:', error);
    return serverErrorResponse('Failed to fetch students');
  }
}