import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function GET() {
  try {
    await connectToDatabase();

    console.log('Testing admin collection...');

    // Count admins
    const count = await Admin.countDocuments();
    console.log('Admin count:', count);

    // List all admins
    const admins = await Admin.find({}).select('username createdAt').lean();

    if (count === 0) {
      return NextResponse.json(
        {
          status: 'warning',
          message: 'No admins found in database. Run: node seed-admins.js',
          admins: [],
          count: 0
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        status: 'success',
        message: `Found ${count} admins`,
        admins: admins,
        count: count
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Admin test error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Database error',
        details: error.message
      },
      { status: 500 }
    );
  }
}
