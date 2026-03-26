import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Hostel from '@/models/Hostel';
import User from '@/models/User';

export async function GET() {
    try {
        await connectToDatabase();

        // 1. Fetch all Hostels and populate warden info
        const hostels = await Hostel.find({}).populate('wardenId', 'name phone');

        // 2. Build Dashboard Data
        const dashboardData = await Promise.all(hostels.map(async (hostel) => {
            // Count students in this hostel
            const studentCount = await User.countDocuments({ role: 'student', hostelId: hostel._id });

            return {
                hostelId: hostel._id,
                hostelName: hostel.name,
                location: hostel.location,
                wardenName: hostel.wardenId ? (hostel.wardenId as any).name : 'N/A',
                wardenPhone: hostel.wardenId ? (hostel.wardenId as any).phone : 'N/A',
                type: hostel.name.toLowerCase().includes('boys') ? 'Boys' : 'Girls',
                occupied: studentCount,
                capacity: hostel.totalCapacity,
                vacancy: hostel.totalCapacity - studentCount
            };
        }));

        // 3. Fetch all wardens for the list section
        const wardens = await User.find({ role: 'warden' });

        return NextResponse.json({
            success: true,
            dashboard: dashboardData,
            wardensList: wardens
        });

    } catch (error: any) {
        console.error('Dashboard API Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch dashboard data', details: error.message }, { status: 500 });
    }
}

