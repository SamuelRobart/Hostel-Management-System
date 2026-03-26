import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function POST() {
  try {
    await connectToDatabase();
    
    const hostelLocations = [
      'perur', 'singanallur', 'peelamedu', 'goundampalayam', 
      'vellakinar', 'kinathukadavu', 'nayakkanpalayam', 'thondamuthur',
      'masakkalipalayam', 'ondipudur'
    ];
    
    let deletedCount = 0;
    
    for (const location of hostelLocations) {
      const collectionName = `students_${location}`;
      try {
        await mongoose.connection.db.dropCollection(collectionName);
        deletedCount++;
      } catch (error) {
        // Collection doesn't exist, ignore
      }
    }
    
    return NextResponse.json({ 
      message: `Cleared ${deletedCount} collections. Now run seed again.`,
      deletedCount
    });
  } catch (error) {
    console.error('Error clearing collections:', error);
    return NextResponse.json({ error: 'Failed to clear' }, { status: 500 });
  }
}