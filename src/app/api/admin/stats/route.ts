import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Hostel from '@/models/Hostel';

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch hostels from database
    const hostelsData = (await Hostel.find({}).lean()) as any[];

    const hostels = [];
    const mongoose = require('mongoose');
    const db = mongoose.connection.db;

    for (const hostelDoc of hostelsData) {
      const location = hostelDoc.location;

      // Count students - try both unified users collection and individual hostel collections
      let studentCount = await User.countDocuments({
        role: 'student',
        $or: [
          { hostelId: hostelDoc._id },
          { hostelLocation: location }
        ]
      });

      // If no students in users collection, check individual hostel collection
      if (studentCount === 0 && db) {
        try {
          const collectionName = `students_${location.toLowerCase()}`;
          const collections = await db.listCollections({ name: collectionName }).toArray();
          if (collections.length > 0) {
            studentCount = await db.collection(collectionName).countDocuments({});
          }
        } catch (error) {
          console.log(`No collection found for ${location}`);
        }
      }

      // Find warden for this hostel
      const warden = await User.findOne({
        role: 'warden',
        $or: [
          { hostelId: hostelDoc._id },
          { hostelLocation: location }
        ]
      });

      hostels.push({
        _id: hostelDoc._id.toString(),
        name: location,
        type: hostelDoc.name.toLowerCase().includes('girls') ? 'girls' : 'boys',
        capacity: hostelDoc.totalCapacity || 35,
        occupied: studentCount,
        warden: warden ? {
          _id: warden._id.toString(),
          name: warden.name,
          phone: warden.phone
        } : null,
        wardenId: hostelDoc.wardenId?.toString()
      });
    }

    return NextResponse.json({
      success: true,
      hostels,
      summary: {
        totalHostels: hostels.length,
        totalCapacity: hostels.reduce((sum, h) => sum + h.capacity, 0),
        totalOccupied: hostels.reduce((sum, h) => sum + h.occupied, 0),
        girlsHostels: hostels.filter(h => h.type === 'girls').length,
        boysHostels: hostels.filter(h => h.type === 'boys').length
      }
    });

  } catch (error: any) {
    console.error('Stats API Error:', error);
    return NextResponse.json({
      error: 'Failed to fetch stats',
      details: error.message
    }, { status: 500 });
  }
}