import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        
        // Check for token in cookies or Authorization header
        let token = request.cookies.get('auth_token')?.value || request.cookies.get('token')?.value;
        const authHeader = request.headers.get('authorization');
        if (!token && authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }

        if (!token) {
            return NextResponse.json({ success: false, message: 'Unauthorized - No token provided' }, { status: 401 });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET) as any;
        } catch (error) {
            return NextResponse.json({ success: false, message: 'Unauthorized - Invalid token' }, { status: 401 });
        }

        // Check if user is admin
        let admin = null;
        if (decoded.role === 'admin') {
            admin = await Admin.findById(decoded.id || decoded.userId);
        } else {
            const user = await User.findById(decoded.id || decoded.userId);
            if (user && user.role === 'admin') {
                admin = user;
            }
        }
        
        if (!admin) {
            return NextResponse.json({ success: false, message: 'Admin access required' }, { status: 403 });
        }

        const wardens = await User.find({ role: 'warden' }).populate('hostelId');

        return NextResponse.json({
            success: true,
            wardens,
            count: wardens.length
        });
    } catch (error: any) {
        console.error('Error fetching wardens:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch wardens', details: error.message },
            { status: 500 }
        );
    }
}

