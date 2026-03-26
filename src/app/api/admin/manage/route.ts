import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST(request: NextRequest) {
  try {
    const { action, username, password, adminPassword } = await request.json();

    // Only allow initialization with correct admin password
    const ADMIN_INIT_PASSWORD = process.env.ADMIN_INIT_PASSWORD || 'init@2024';

    if (action === 'init') {
      // Initialize default admins
      if (adminPassword !== ADMIN_INIT_PASSWORD) {
        return NextResponse.json(
          { success: false, message: 'Invalid initialization password' },
          { status: 401 }
        );
      }

      await connectToDatabase();

      const defaultAdmins = [
        { username: 'admin', password: 'admin123' },
        { username: 'superadmin', password: 'superadmin@2024' },
        { username: 'hostel_admin', password: 'hostel@123' }
      ];

      // Clear existing admins
      await Admin.deleteMany({});

      // Insert default admins
      const result = await Admin.insertMany(defaultAdmins);

      return NextResponse.json({
        success: true,
        message: 'Admin accounts initialized',
        count: result.length,
        admins: result.map(a => ({ username: a.username, _id: a._id }))
      });
    } else if (action === 'add') {
      // Add single admin
      if (!username || !password) {
        return NextResponse.json(
          { success: false, message: 'Username and password required' },
          { status: 400 }
        );
      }

      await connectToDatabase();

      const existingAdmin = await Admin.findOne({ 
        username: username.toLowerCase().trim() 
      });

      if (existingAdmin) {
        return NextResponse.json(
          { success: false, message: 'Admin username already exists' },
          { status: 400 }
        );
      }

      const newAdmin = await Admin.create({
        username: username.toLowerCase().trim(),
        password: password
      });

      return NextResponse.json({
        success: true,
        message: 'Admin added successfully',
        admin: { username: newAdmin.username, _id: newAdmin._id }
      });

    } else if (action === 'list') {
      // List all admins
      await connectToDatabase();

      const admins = await Admin.find({}).select('username createdAt').lean();

      return NextResponse.json({
        success: true,
        admins: admins,
        count: admins.length
      });

    } else if (action === 'delete') {
      // Delete admin by username
      if (!username) {
        return NextResponse.json(
          { success: false, message: 'Username required' },
          { status: 400 }
        );
      }

      await connectToDatabase();

      const result = await Admin.deleteOne({ 
        username: username.toLowerCase().trim() 
      });

      if (result.deletedCount === 0) {
        return NextResponse.json(
          { success: false, message: 'Admin not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Admin deleted successfully'
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Admin management error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', details: error.message },
      { status: 500 }
    );
  }
}
