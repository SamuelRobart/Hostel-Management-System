import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Hostel from '@/models/Hostel';

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        let query: any = {};
        if (id) {
            query._id = id;
        }
        
        const hostels = await Hostel.find(query).populate('wardenId', 'name phone email').lean();

        return NextResponse.json({
            success: true,
            count: hostels.length,
            hostels
        });
    } catch (error: any) {
        console.error('Error fetching hostels:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch hostels', details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const data = await request.json();
        
        // Calculate totalBeds from totalRooms and bedsPerRoom
        const totalBeds = (data.totalRooms || 0) * (data.bedsPerRoom || 0);
        
        const hostelData = {
            name: data.name,
            location: data.location,
            totalCapacity: data.totalCapacity || totalBeds,
            totalRooms: data.totalRooms || 0,
            totalBeds: totalBeds,
            currentOccupancy: 0,
            facilities: data.facilities || [],
            address: data.address,
            contactNumber: data.contactNumber
        };

        const hostel = new Hostel(hostelData);
        await hostel.save();

        return NextResponse.json({
            success: true,
            message: 'Hostel created successfully',
            hostel
        });
    } catch (error: any) {
        console.error('Error creating hostel:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create hostel', details: error.message },
            { status: 500 }
        );
    }
}
