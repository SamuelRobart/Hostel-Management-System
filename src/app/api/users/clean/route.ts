import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    await connectToDatabase();
    
    const result = await User.deleteMany({ role: 'student' });
    
    return NextResponse.json({ 
      message: `Removed ${result.deletedCount} students from users collection`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to clean users' }, { status: 500 });
  }
}