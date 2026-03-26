import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Hostel from '@/models/Hostel';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const {
      name,
      phone,
      alternatePhone,
      dateOfBirth,
      email,
      fatherName,
      motherName,
      native,
      address,
      course,
      college,
      appliedColleges,
      income,
      percentage12th,
      bankDetails,
      caste,
      aadhaarNumber,
      communityCertificateNumber,
      photoUrl,
      documents,
      hostelLocation
    } = await request.json();

    // Validation
    if (!name || !phone || !dateOfBirth) {
      return NextResponse.json(
        { success: false, message: 'Name, Phone, and Date of Birth are required' },
        { status: 400 }
      );
    }

    if (!hostelLocation) {
      return NextResponse.json(
        { success: false, message: 'Hostel location is required' },
        { status: 400 }
      );
    }

    // Phone validation
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { success: false, message: 'Phone number must be 10 digits' },
        { status: 400 }
      );
    }

    if (alternatePhone && !/^\d{10}$/.test(alternatePhone)) {
      return NextResponse.json(
        { success: false, message: 'Alternate phone must be 10 digits' },
        { status: 400 }
      );
    }

    // Aadhaar validation
    if (aadhaarNumber && !/^\d{12}$/.test(aadhaarNumber)) {
      return NextResponse.json(
        { success: false, message: 'Aadhaar number must be 12 digits' },
        { status: 400 }
      );
    }

    // Check if student already exists
    const existingStudent = await User.findOne({ phone: phone.trim() });
    if (existingStudent) {
      return NextResponse.json(
        { success: false, message: 'Student with this phone number already exists' },
        { status: 400 }
      );
    }

    // Check if alternate phone already exists (if provided)
    if (alternatePhone) {
      const existingAltPhone = await User.findOne({ alternatePhone: alternatePhone.trim() });
      if (existingAltPhone) {
        return NextResponse.json(
          { success: false, message: 'Student with this alternate phone already exists' },
          { status: 400 }
        );
      }
    }

    // Check if Aadhaar already exists (if provided)
    if (aadhaarNumber) {
      const existingAadhaar = await User.findOne({ aadhaarNumber: aadhaarNumber.trim() });
      if (existingAadhaar) {
        return NextResponse.json(
          { success: false, message: 'Student with this Aadhaar number already registered' },
          { status: 400 }
        );
      }
    }

    // Get hostel ID from location
    let hostelId = undefined;
    const hostel = await Hostel.findOne({ location: hostelLocation.trim() });
    if (hostel) {
      hostelId = hostel._id;
    }

    // Create new student
    const newStudent = new User({
      name: name.trim(),
      phone: phone.trim(),
      alternatePhone: alternatePhone?.trim() || undefined,
      dateOfBirth: new Date(dateOfBirth),
      role: 'student',
      email: email?.trim() || undefined,
      fatherName: fatherName?.trim() || undefined,
      motherName: motherName?.trim() || undefined,
      native: native?.trim() || undefined,
      address: address?.trim() || undefined,
      course: course?.trim() || undefined,
      college: college?.trim() || undefined,
      appliedColleges: appliedColleges || [],
      income: income?.trim() || undefined,
      percentage12th: percentage12th?.trim() || undefined,
      bankDetails: bankDetails?.trim() || undefined,
      caste: caste?.trim() || undefined,
      aadhaarNumber: aadhaarNumber?.trim() || undefined,
      communityCertificateNumber: communityCertificateNumber?.trim() || undefined,
      photoUrl: photoUrl?.trim() || undefined,
      documents: documents || [],
      hostelLocation: hostelLocation?.trim() || undefined,
      hostelId: hostelId
    });

    const savedStudent = await newStudent.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Student registered successfully',
        student: {
          id: savedStudent._id.toString(),
          name: savedStudent.name,
          phone: savedStudent.phone,
          role: savedStudent.role,
          hostelName: savedStudent.hostelLocation
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Student signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', details: error.message },
      { status: 500 }
    );
  }
}
