import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    await connectToDatabase();

    // Check if student already exists
    const existingStudent = await User.findOne({ 
      phone: data.phone, 
      role: 'student' 
    });

    if (existingStudent) {
      return NextResponse.json({ 
        success: false, 
        message: 'Student with this phone number already exists' 
      }, { status: 400 });
    }

    // Create new student
    const student = new User({
      name: data.name,
      phone: data.phone,
      role: 'student',
      dateOfBirth: new Date(data.dateOfBirth),
      fatherName: data.fatherName,
      motherName: data.motherName,
      email: data.email,
      native: data.native,
      address: data.address,
      course: data.course,
      college: data.college,
      income: data.income,
      percentage12th: data.percentage12th,
      bankDetails: data.bankDetails,
      caste: data.caste,
      hostelLocation: data.hostelLocation
    });

    await student.save();

    return NextResponse.json({
      success: true,
      message: 'Student added successfully',
      student: {
        id: student._id,
        name: student.name,
        phone: student.phone,
        hostelLocation: student.hostelLocation
      }
    });

  } catch (error: any) {
    console.error('Add student error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to add student', 
      details: error.message 
    }, { status: 500 });
  }
}