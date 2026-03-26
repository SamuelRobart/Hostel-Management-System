import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();

    const students = await User.find({ role: 'student' }).select('-password');

    const formattedStudents = students.map(student => ({
      _id: student._id,
      name: student.name,
      phone: student.phone,
      email: student.email,
      dob: student.dateOfBirth,
      father_name: student.fatherName,
      mother_name: student.motherName,
      native: student.native,
      address: student.address,
      course: student.course,
      college: student.college,
      income: student.income,
      twelfth_percentage: student.percentage12th,
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
    console.error('Students list error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch students', 
      details: error.message 
    }, { status: 500 });
  }
}