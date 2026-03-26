import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const data = await request.json();
    
    // Check for token in cookies or Authorization header
    let token = request.cookies.get('auth_token')?.value || request.cookies.get('token')?.value;
    const authHeader = request.headers.get('authorization');
    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }

    console.log('Warden creation request - Token found:', !!token);

    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized - No token provided' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (error) {
      console.log('Token verification failed:', error);
      return NextResponse.json({ success: false, message: 'Unauthorized - Invalid token' }, { status: 401 });
    }

    // Check if user is admin - try both Admin model and User model
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

    if (!data.name || !data.phone || !data.password || !data.username) {
      return NextResponse.json({ success: false, message: 'Name, username, phone and password are required' }, { status: 400 });
    }

    // Check if phone or username already exists
    const existing = await User.findOne({ 
      $or: [{ phone: data.phone }, { username: data.username }] 
    });
    if (existing) {
      return NextResponse.json({ 
        success: false, 
        message: existing.phone === data.phone ? 'Phone already exists' : 'Username already exists' 
      }, { status: 400 });
    }

    const warden = new User({
      name: data.name,
      username: data.username,
      phone: data.phone,
      password: data.password,
      role: 'warden',
      hostelId: data.hostelId,
      createdAt: new Date()
    });
    
    await warden.save();
    return NextResponse.json({ success: true, message: 'Warden created successfully', warden });
  } catch (error: any) {
    console.error('Error creating warden:', error);
    return NextResponse.json({ success: false, message: 'Failed to create warden', details: error.message }, { status: 500 });
  }
}