import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Hostel from '@/models/Hostel';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const hostelLocation = searchParams.get('hostelLocation');
    const hostelId = searchParams.get('hostelId');

    let query: any = { role: 'student' };

    if (hostelId) {
      query.hostelId = hostelId;
    } else if (hostelLocation) {
      query.hostelLocation = new RegExp(hostelLocation, 'i');
    }

    const students = await User.find(query).select('-password').populate('hostelId').lean();

    return NextResponse.json({
      success: true,
      count: students.length,
      students
    });
  } catch (error: any) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch students', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const data = await request.json();

    // If hostelId is provided, check capacity and update occupancy
    if (data.hostelId) {
      const hostel = await Hostel.findById(data.hostelId);
      if (!hostel) {
        return NextResponse.json({ success: false, message: 'Hostel not found' }, { status: 404 });
      }

      if (hostel.currentOccupancy >= hostel.totalCapacity) {
        return NextResponse.json({ success: false, message: 'Hostel is full' }, { status: 400 });
      }

      // Update hostel occupancy
      hostel.currentOccupancy += 1;
      await hostel.save();
    }

    const student = new User({
      ...data,
      role: 'student'
    });

    await student.save();

    return NextResponse.json({
      success: true,
      message: 'Student created successfully',
      student
    });
  } catch (error: any) {
    console.error('Error creating student:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create student',
      details: error.message
    }, { status: 500 });
  }
}