import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  role: String,
  hostelId: String,
  createdAt: { type: Date, default: Date.now }
});

export async function POST() {
  try {
    await connectToDatabase();
    
    const User = mongoose.models.User || mongoose.model('User', userSchema);
    
    // Delete existing wardens
    await User.deleteMany({ role: 'warden' });
    
    const wardens = [
      { name: 'Ms. Kamala Devi', phone: '9876543210', password: 'warden123', role: 'warden', hostelId: 'Perur' },
      { name: 'Ms. Radha Krishnan', phone: '9876543211', password: 'warden123', role: 'warden', hostelId: 'Singanallur' },
      { name: 'Ms. Geetha Rani', phone: '9876543212', password: 'warden123', role: 'warden', hostelId: 'Peelamedu' },
      { name: 'Ms. Priya Sharma', phone: '9876543213', password: 'warden123', role: 'warden', hostelId: 'Goundampalayam' },
      { name: 'Ms. Meera Devi', phone: '9876543214', password: 'warden123', role: 'warden', hostelId: 'Vellakinar' },
      { name: 'Ms. Lakshmi Priya', phone: '9876543215', password: 'warden123', role: 'warden', hostelId: 'Kinathukadavu' },
      { name: 'Ms. Divya Kumar', phone: '9876543216', password: 'warden123', role: 'warden', hostelId: 'Nayakkanpalayam' },
      { name: 'Ms. Saroja Bai', phone: '9876543217', password: 'warden123', role: 'warden', hostelId: 'Thondamuthur' },
      { name: 'Mr. Raman Kumar', phone: '9876543218', password: 'warden123', role: 'warden', hostelId: 'Masakkalipalayam' },
      { name: 'Mr. Suresh Babu', phone: '9876543219', password: 'warden123', role: 'warden', hostelId: 'Ondipudur' }
    ];
    
    await User.insertMany(wardens);
    
    return NextResponse.json({ 
      message: `Created ${wardens.length} wardens`,
      wardens: wardens.map(w => ({ name: w.name, phone: w.phone, hostel: w.hostelId }))
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to seed wardens' }, { status: 500 });
  }
}