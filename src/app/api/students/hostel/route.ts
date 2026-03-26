import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');

    if (!location) {
      return NextResponse.json(
        { success: false, error: 'Location parameter is required' },
        { status: 400 }
      );
    }

    const students = await User.find({
      role: 'student',
      hostelLocation: new RegExp(location, 'i')
    }).select('-password').lean();

    const formattedStudents = students.map(student => ({
      _id: student._id,
      name: student.name,
      phone: student.phone,
      email: student.email,
      dob: student.dateOfBirth,
      dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('en-GB') : 'N/A',
      father_name: student.fatherName,
      fatherName: student.fatherName,
      mother_name: student.motherName,
      motherName: student.motherName,
      native: student.native,
      address: student.address,
      course: student.course,
      college: student.college,
      income: student.income,
      twelfth_percentage: student.percentage12th,
      percentage12th: student.percentage12th,
      bankDetails: student.bankDetails,
      caste: student.caste,
      hostelLocation: student.hostelLocation,
      createdAt: student.createdAt
    }));

    return NextResponse.json({
      success: true,
      students: formattedStudents,
      count: formattedStudents.length
    });

  } catch (error: any) {
    console.error('Error fetching hostel students:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch students', details: error.message },
      { status: 500 }
    );
  }
}
