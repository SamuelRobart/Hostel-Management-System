import { NextResponse } from 'next/server';
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

export async function GET() {
  try {
    await connectToDatabase();
    
    const hostelLocations = ['perur', 'singanallur', 'peelamedu', 'goundampalayam', 'vellakinar'];
    const sampleStudents = [];
    
    for (const location of hostelLocations) {
      const collectionName = `students_${location}`;
      
      try {
        const collections = await mongoose.connection.db.listCollections({ name: collectionName }).toArray();
        if (collections.length === 0) continue;
        
        const StudentModel = mongoose.models[collectionName] || 
          mongoose.model(collectionName, studentSchema, collectionName);
        
        const student = await StudentModel.findOne({}).limit(1);
        if (student) {
          sampleStudents.push({
            name: student.name,
            phone: student.phone,
            dateOfBirth: student.dateOfBirth,
            hostel: location.charAt(0).toUpperCase() + location.slice(1)
          });
        }
      } catch (error) {
        continue;
      }
    }
    
    return NextResponse.json({ 
      message: 'Sample student credentials for testing',
      students: sampleStudents
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get sample students' }, { status: 500 });
  }
}