import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Hostel from '@/models/Hostel';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const data = await request.json();

    if (!data.name || !data.location || !data.totalCapacity) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const hostel = new Hostel({
      name: data.name,
      location: data.location,
      totalCapacity: data.totalCapacity,
      currentOccupancy: 0,
      wardenId: data.wardenId || undefined,
      totalRooms: data.totalRooms || 0,
      totalBeds: data.totalBeds || 0,
      floors: data.floors || 1,
      blocks: data.blocks || [],
      address: data.address || '',
      contactNumber: data.contactNumber || '',
      facilities: data.facilities || [],
      createdAt: new Date()
    });
    await hostel.save();
    return NextResponse.json({ success: true, message: 'Hostel created successfully', hostel });
  } catch (error: any) {
    console.error('Error creating hostel:', error);
    return NextResponse.json({ success: false, message: 'Failed to create hostel', details: error.message }, { status: 500 });
  }
}
