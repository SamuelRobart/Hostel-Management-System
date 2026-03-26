import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    await connectToDatabase();
    
    // Clear existing students
    await User.deleteMany({ role: 'student' });
    
    const locations = ['Perur', 'Singanallur', 'Peelamedu', 'Goundampalayam', 'Vellakinar', 'Kinathukadavu', 'Nayakkanpalayam', 'Thondamuthur', 'Masakkalipalayam', 'Ondipudur'];
    const girlsNames = ['Priya Sharma', 'Kavitha Raj', 'Meera Devi', 'Lakshmi Priya', 'Divya Kumar', 'Saroja Bai', 'Geetha Rani', 'Shanti Devi', 'Radha Krishnan', 'Kamala Devi'];
    const boysNames = ['Raman Kumar', 'Suresh Babu', 'Arun Raj', 'Vijay Kumar', 'Karthik Raman', 'Senthil Kumar', 'Murugan Raj', 'Prakash Raj', 'Mohan Kumar', 'Rajesh Kumar'];
    const fatherNames = ['Rajesh Kumar', 'Suresh Babu', 'Raman Raj', 'Vijay Kumar', 'Arun Devi', 'Karthik Raman', 'Mohan Kumar', 'Prakash Raj', 'Senthil Kumar', 'Murugan Raj'];
    const motherNames = ['Kamala Devi', 'Priya Lakshmi', 'Meera Bai', 'Saroja Devi', 'Geetha Rani', 'Shanti Bai', 'Radha Devi', 'Lakshmi Priya', 'Divya Devi', 'Kavitha Bai'];
    const courses = ['B.A English', 'B.Sc Mathematics', 'B.A History', 'B.Sc Physics', 'B.A Tamil', 'B.Sc Chemistry', 'B.A Economics', 'B.Sc Biology'];
    const colleges = ['Government Arts College', 'Government Arts and Science College', 'Avinashilingam College'];
    const castes = ['BC', 'MBC', 'SC'];
    
    const students = [];
    
    // Generate students for each location
    for (let locIndex = 0; locIndex < locations.length; locIndex++) {
      const location = locations[locIndex];
      const isGirlsHostel = locIndex < 8; // First 8 are girls hostels
      const names = isGirlsHostel ? girlsNames : boysNames;
      const studentsPerHostel = Math.floor(Math.random() * 20) + 40; // 40-60 students per hostel
      
      for (let i = 0; i < studentsPerHostel; i++) {
        const birthYear = 2003 + Math.floor(Math.random() * 3);
        const birthMonth = Math.floor(Math.random() * 12);
        const birthDay = Math.floor(Math.random() * 28);
        
        const student = {
          phone: `9${Math.floor(Math.random() * 900000000 + 100000000)}`,
          role: 'student',
          name: names[i % names.length],
          dateOfBirth: new Date(birthYear, birthMonth, birthDay),
          fatherName: fatherNames[i % fatherNames.length],
          motherName: motherNames[i % motherNames.length],
          email: `${names[i % names.length].toLowerCase().replace(' ', '.')}${i}@gmail.com`,
          native: `${location} District`,
          address: `${i + 1}/123, Main Street, ${location}, Tamil Nadu - 641001`,
          course: courses[i % courses.length],
          college: colleges[i % colleges.length],
          income: `₹${Math.floor(Math.random() * 150000 + 50000)} per annum`,
          percentage12th: `${Math.floor(Math.random() * 20 + 75)}%`,
          bankDetails: `SBI - 1234567890${locIndex}${i}`,
          caste: castes[i % castes.length]
        };
        
        students.push(student);
      }
    }
    
    await User.insertMany(students);
    
    return NextResponse.json({ 
      message: `Successfully seeded ${students.length} students`,
      count: students.length 
    });
  } catch (error) {
    console.error('Error seeding students:', error);
    return NextResponse.json(
      { error: 'Failed to seed students' },
      { status: 500 }
    );
  }
}