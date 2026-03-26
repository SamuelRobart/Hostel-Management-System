import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { getAuthUser } from '@/utils/auth-helpers';

export async function GET(req: NextRequest) {
  try {
    // Read token from cookie OR Authorization header
    const authUser = getAuthUser(req);

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (authUser.role !== 'student') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    await connectToDatabase();

    const student = await User.findById(authUser.id);

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Always return the latest data from DB (room/bed reassignments are reflected here)
    const studentData = {
      name: student.name,
      phone: student.phone,
      email: student.email,
      dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('en-GB') : 'N/A',
      father_name: student.fatherName,
      mother_name: student.motherName,
      native: student.native,
      address: student.address,
      course: student.course,
      college: student.college,
      income: student.income,
      percentage12th: student.percentage12th,
      bankDetails: student.bankDetails,
      caste: student.caste,
      hostelLocation: student.hostelLocation,
      roomId: student.roomId,
      roomNumber: student.roomNumber,
      bedNumber: student.bedNumber
    };

    return NextResponse.json({
      success: true,
      student: studentData
    });

  } catch (error: any) {
    console.error('Student profile error:', error);
    return NextResponse.json({
      error: 'Failed to fetch profile',
      details: error.message
    }, { status: 500 });
  }
}