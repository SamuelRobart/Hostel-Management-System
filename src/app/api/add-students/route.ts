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

export async function GET() {
  try {
    await connectToDatabase();
    
    const hostels = [
      { location: 'perur', count: 10 },
      { location: 'goundampalayam', count: 10 },
      { location: 'nayakkanpalayam', count: 10 }
    ];
    
    const girlsNames = ['Priya Sharma', 'Kavitha Raj', 'Meera Devi', 'Lakshmi Priya', 'Divya Kumar', 'Saroja Bai', 'Geetha Rani', 'Shanti Devi', 'Radha Krishnan', 'Kamala Devi'];
    const fatherNames = ['Rajesh Kumar', 'Suresh Babu', 'Raman Raj', 'Vijay Kumar', 'Arun Devi'];
    const motherNames = ['Kamala Devi', 'Priya Lakshmi', 'Meera Bai', 'Saroja Devi', 'Geetha Rani'];
    const courses = ['B.A English', 'B.Sc Mathematics', 'B.A History', 'B.Sc Physics', 'B.A Tamil'];
    const colleges = ['Government Arts College', 'Government Arts and Science College'];
    const castes = ['BC', 'MBC', 'SC'];
    
    let totalAdded = 0;
    
    for (const hostel of hostels) {
      const collectionName = `students_${hostel.location}`;
      
      const StudentModel = mongoose.models[collectionName] || 
        mongoose.model(collectionName, studentSchema, collectionName);
      
      // Clear existing
      await StudentModel.deleteMany({});
      
      const students = [];
      for (let i = 0; i < hostel.count; i++) {
        const birthDay = Math.floor(Math.random() * 28) + 1;
        const birthMonth = Math.floor(Math.random() * 12) + 1;
        const birthYear = 2003 + Math.floor(Math.random() * 3);
        
        students.push({
          name: girlsNames[i % girlsNames.length],
          phone: `9${Math.floor(Math.random() * 900000000 + 100000000)}`,
          dateOfBirth: `${birthDay.toString().padStart(2, '0')}/${birthMonth.toString().padStart(2, '0')}/${birthYear}`,
          fatherName: fatherNames[i % fatherNames.length],
          motherName: motherNames[i % motherNames.length],
          email: `${girlsNames[i % girlsNames.length].toLowerCase().replace(' ', '.')}${i}@gmail.com`,
          native: 'Salem District',
          address: `${i + 1}/123, Main Street, ${hostel.location}`,
          course: courses[i % courses.length],
          college: colleges[i % colleges.length],
          income: `₹${Math.floor(Math.random() * 150000 + 50000)} per annum`,
          percentage12th: `${Math.floor(Math.random() * 20 + 75)}%`,
          bankDetails: `SBI - 123456789${i}`,
          caste: castes[i % castes.length]
        });
      }
      
      await StudentModel.insertMany(students);
      totalAdded += students.length;
    }
    
    return NextResponse.json({ 
      success: true,
      message: `Added ${totalAdded} students to 3 hostels`,
      hostels: hostels.map(h => h.location)
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}