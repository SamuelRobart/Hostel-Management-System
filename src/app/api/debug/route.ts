import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    const totalUsers = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: 'admin' });
    const wardenCount = await User.countDocuments({ role: 'warden' });
    const studentCount = await User.countDocuments({ role: 'student' });

    let foundUser = null;
    if (phone) {
      foundUser = await User.findOne({ phone });
    }

    const sampleStudents = await User.find({ role: 'student' }).limit(5).select('-password');
    const sampleWardens = await User.find({ role: 'warden' }).limit(5).select('-password');

    return NextResponse.json({
      success: true,
      stats: {
        total: totalUsers,
        admins: adminCount,
        wardens: wardenCount,
        students: studentCount
      },
      foundUser,
      samples: {
        students: sampleStudents,
        wardens: sampleWardens
      }
    });
  } catch (error: any) {
    console.error('Debug error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}