import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Hostel from '@/models/Hostel';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectToDatabase();

    const userCount = await User.countDocuments();
    const hostelCount = await Hostel.countDocuments();

    return NextResponse.json({
      success: true,
      message: 'MongoDB connection working',
      database: mongoose.connection.db?.databaseName,
      stats: {
        users: userCount,
        hostels: hostelCount
      }
    });

  } catch (error: any) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}