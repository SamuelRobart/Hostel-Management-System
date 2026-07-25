import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  dateOfBirth: String,
  fatherName: String,
  motherName: String,
  email: String,
  native: String,
  address: String,
  course: String,
  college: String,
  income: String,
  percentage12th: String,
  bankDetails: String,
  caste: String,
  createdAt: Date
});

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');
    
    if (!phone) {
      return NextResponse.json({ error: 'Phone parameter required' });
    }
    
    const hostelLocations = ['perur', 'singanallur', 'peelamedu', 'goundampalayam', 'vellakinar', 'kinathukadavu', 'nayakkanpalayam', 'thondamuthur', 'masakkalipalayam', 'ondipudur'];
    
    for (const location of hostelLocations) {
      const collectionName = `students_${location}`;
      
      try {
        if (!mongoose.connection.db) continue;
        const collections = await mongoose.connection.db.listCollections({ name: collectionName }).toArray();
        if (collections.length === 0) continue;
        
        const StudentModel = mongoose.models[collectionName] || 
          mongoose.model(collectionName, studentSchema, collectionName);
        
        const student = await StudentModel.findOne({ phone: phone });
        if (student) {
          return NextResponse.json({
            found: true,
            student: {
              name: student.name,
              phone: student.phone,
              dateOfBirth: student.dateOfBirth,
              hostel: location
            }
          });
        }
      } catch (error) {
        continue;
      }
    }
    
    return NextResponse.json({ 
      found: false,
      message: `Phone number ${phone} not found in any hostel`
    });
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}