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
  createdAt: { type: Date, default: Date.now }
});

export async function POST() {
  try {
    await connectToDatabase();
    
    const collectionName = 'students_perur';
    const StudentModel = mongoose.models[collectionName] || 
      mongoose.model(collectionName, studentSchema, collectionName);
    
    // Delete existing test student
    await StudentModel.deleteOne({ phone: '9999999999' });
    
    // Create test student
    const testStudent = {
      name: 'Test Student',
      phone: '9999999999',
      dateOfBirth: '01/01/2004',
      fatherName: 'Test Father',
      motherName: 'Test Mother',
      email: 'test@gmail.com',
      native: 'Salem District',
      address: '123 Test Street, Perur',
      course: 'B.A English',
      college: 'Government Arts College',
      income: '₹75000 per annum',
      percentage12th: '85%',
      bankDetails: 'SBI - 123456789',
      caste: 'BC'
    };
    
    await StudentModel.create(testStudent);
    
    return NextResponse.json({ 
      success: true,
      message: 'Test student created',
      credentials: {
        phone: '9999999999',
        dateOfBirth: '2004-01-01',
        note: 'Use these exact credentials for student login'
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}