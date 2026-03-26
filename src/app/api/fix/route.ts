import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function POST() {
  try {
    await connectToDatabase();

    // Delete all users
    await User.deleteMany({});

    // Add wardens immediately
    const wardens = [
      { name: 'Ms. Kamala Devi', phone: '9876543210', role: 'warden', password: 'warden123', hostelLocation: 'perur', createdAt: new Date() },
      { name: 'Ms. Priya Lakshmi', phone: '9876543211', role: 'warden', password: 'warden123', hostelLocation: 'singanallur', createdAt: new Date() },
      { name: 'Ms. Meera Bai', phone: '9876543212', role: 'warden', password: 'warden123', hostelLocation: 'peelamedu', createdAt: new Date() },
      { name: 'Ms. Radha Krishnan', phone: '9876543213', role: 'warden', password: 'warden123', hostelLocation: 'goundampalayam', createdAt: new Date() },
      { name: 'Ms. Saroja Devi', phone: '9876543214', role: 'warden', password: 'warden123', hostelLocation: 'vellakinar', createdAt: new Date() },
      { name: 'Ms. Lakshmi Priya', phone: '9876543215', role: 'warden', password: 'warden123', hostelLocation: 'kinathukadavu', createdAt: new Date() },
      { name: 'Ms. Geetha Rani', phone: '9876543216', role: 'warden', password: 'warden123', hostelLocation: 'nayakkanpalayam', createdAt: new Date() },
      { name: 'Ms. Shanti Devi', phone: '9876543217', role: 'warden', password: 'warden123', hostelLocation: 'thondamuthur', createdAt: new Date() },
      { name: 'Mr. Raman Kumar', phone: '9876543218', role: 'warden', password: 'warden123', hostelLocation: 'masakkalipalayam_boys', createdAt: new Date() },
      { name: 'Mr. Suresh Babu', phone: '9876543219', role: 'warden', password: 'warden123', hostelLocation: 'ondipudur_boys', createdAt: new Date() }
    ];

    const result = await User.insertMany(wardens);

    return NextResponse.json({
      success: true,
      message: `SUCCESS! Added ${result.length} wardens to users collection`,
      count: result.length,
      wardens: result.map(w => ({ name: w.name, phone: w.phone, location: w.hostelLocation }))
    });
  } catch (error: any) {
    console.error('Fix error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error: ' + error.message,
      error: error.message
    }, { status: 500 });
  }
}