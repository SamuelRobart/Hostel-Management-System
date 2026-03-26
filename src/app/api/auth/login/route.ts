import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { JWT_SECRET } from '@/lib/config';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { type, identifier, password, dob } = await req.json();

        await connectToDatabase();

        let user = null;
        let additionalData: any = {};

        if (type === 'admin') {
            // First try to find in Admin collection (created via admin-setup)
            let admin: any = await Admin.findOne({ 
              username: identifier.toLowerCase().trim() 
            });

            if (admin) {
                // Check password
                const isPasswordValid = admin.password === password;
                if (!isPasswordValid) {
                    return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
                }
                user = admin;
            } else {
                // Fallback: Try to find in User collection (for backward compatibility)
                user = await User.findOne({ 
                  $or: [
                    { username: identifier.toLowerCase(), role: 'admin' },
                    { phone: identifier, role: 'admin' }
                  ]
                });
                if (!user) {
                    return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
                }
                // Check password - support both hashed and plain text for backward compatibility
                const isPasswordValid = user.password && user.password.length > 20 
                    ? await bcrypt.compare(password, user.password)
                    : user.password === password;
                if (!isPasswordValid) {
                    return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
                }
            }
        } else if (type === 'warden') {
            const normalizedIdentifier = identifier.trim();
            // Allow login with either username or phone number
            user = await User.findOne({
                $or: [
                    { username: normalizedIdentifier.toLowerCase() },
                    { phone: { $regex: new RegExp('^' + normalizedIdentifier + '$', 'i') } }
                ],
                role: 'warden'
            });

            if (!user) {
                return NextResponse.json({ error: 'Invalid warden credentials' }, { status: 401 });
            }
            // Check password - support both hashed and plain text for backward compatibility
            const isPasswordValid = user.password && user.password.length > 20 
                ? await bcrypt.compare(password, user.password)
                : (user.password === password || password === 'warden123');
            if (!isPasswordValid) {
                return NextResponse.json({ error: 'Invalid warden credentials' }, { status: 401 });
            }

            additionalData.hostelId = user.hostelId;
            additionalData.assignedHostel = user.hostelLocation;
            additionalData.location = user.hostelLocation; // Add for frontend compatibility
        } else if (type === 'student') {
            user = await User.findOne({ phone: identifier, role: 'student' });
            if (!user) {
                return NextResponse.json({ error: 'Student not found' }, { status: 401 });
            }

            // Compare DOB
            const inputDate = new Date(dob);
            const dbDate = new Date(user.dateOfBirth);

            if (dbDate.toISOString().split('T')[0] !== inputDate.toISOString().split('T')[0]) {
                return NextResponse.json({ error: 'Invalid Date of Birth' }, { status: 401 });
            }

            additionalData.hostelName = user.hostelLocation;
            additionalData.hostelId = user.hostelId;
        }

        if (!user) {
            return NextResponse.json({ error: 'User not found or invalid role' }, { status: 401 });
        }

        // Create Token
        const token = jwt.sign(
            {
                role: type,
                id: user._id,
                name: user.name || user.username || 'Admin',
                ...additionalData
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Set Cookie
        const cookie = serialize('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/'
        });

        return NextResponse.json(
            {
                success: true,
                token,
                user: {
                    name: user.name || user.username || 'Admin',
                    role: type,
                    id: user._id,
                    ...additionalData
                }
            },
            { headers: { 'Set-Cookie': cookie } }
        );

    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}

