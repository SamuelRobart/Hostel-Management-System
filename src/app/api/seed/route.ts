import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    await connectToDatabase();

    // Create admin user
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const admin = new User({
        name: 'System Administrator',
        phone: 'admin',
        role: 'admin',
        password: 'admin123'
      });
      await admin.save();
      console.log('Admin user created');
    }

    // Create wardens for each hostel
    const hostelLocations = [
      'Perur', 'Singanallur', 'Peelamedu', 'Goundampalayam', 'Vellakinar',
      'Kinathukadavu', 'Nayakkanpalayam', 'Thondamuthur', 'Masakkalipalayam', 'Ondipudur'
    ];

    const wardenNames = [
      'Mrs. Priya Devi', 'Mrs. Lakshmi Rani', 'Mrs. Meera Bai', 'Mrs. Kavitha Devi', 'Mrs. Sita Rani',
      'Mr. Rajesh Kumar', 'Mrs. Radha Devi', 'Mrs. Geetha Rani', 'Mrs. Sunitha Devi', 'Mr. Suresh Kumar'
    ];

    for (let i = 0; i < hostelLocations.length; i++) {
      const location = hostelLocations[i];
      const wardenExists = await User.findOne({ 
        role: 'warden', 
        hostelLocation: location 
      });

      if (!wardenExists) {
        const warden = new User({
          name: wardenNames[i],
          phone: `9876543${(210 + i).toString()}`,
          role: 'warden',
          password: 'warden123',
          hostelLocation: location
        });
        await warden.save();
      }
    }

    // Create sample students
    const sampleStudents = [
      {
        name: 'Aishwarya Lakshmi',
        phone: '9876543001',
        dateOfBirth: new Date('2003-05-15'),
        fatherName: 'Raman',
        motherName: 'Kamala',
        email: 'aishwarya@gmail.com',
        native: 'Coimbatore',
        course: 'B.A English',
        college: 'Government Arts College',
        income: '₹45000',
        percentage12th: '85%',
        caste: 'BC',
        hostelLocation: 'Perur'
      },
      {
        name: 'Divya Bharathi',
        phone: '9876543002',
        dateOfBirth: new Date('2003-08-22'),
        fatherName: 'Murugan',
        motherName: 'Meera',
        email: 'divya@gmail.com',
        native: 'Salem',
        course: 'B.Sc Computer Science',
        college: 'Government Arts College',
        income: '₹38000',
        percentage12th: '92%',
        caste: 'MBC',
        hostelLocation: 'Singanallur'
      },
      {
        name: 'Priya Dharshini',
        phone: '9876543003',
        dateOfBirth: new Date('2003-12-10'),
        fatherName: 'Selvam',
        motherName: 'Devi',
        email: 'priya@gmail.com',
        native: 'Erode',
        course: 'B.A Tamil',
        college: 'Government Arts College',
        income: '₹42000',
        percentage12th: '78%',
        caste: 'SC',
        hostelLocation: 'Peelamedu'
      },
      {
        name: 'Arjun Kumar',
        phone: '9876543004',
        dateOfBirth: new Date('2003-03-18'),
        fatherName: 'Krishnan',
        motherName: 'Sita',
        email: 'arjun@gmail.com',
        native: 'Tirupur',
        course: 'B.Sc Mathematics',
        college: 'Government Arts College',
        income: '₹55000',
        percentage12th: '88%',
        caste: 'BC',
        hostelLocation: 'Kinathukadavu'
      },
      {
        name: 'Karthik Raj',
        phone: '9876543005',
        dateOfBirth: new Date('2003-07-25'),
        fatherName: 'Ravi',
        motherName: 'Latha',
        email: 'karthik@gmail.com',
        native: 'Madurai',
        course: 'B.Sc Physics',
        college: 'Government Arts College',
        income: '₹48000',
        percentage12th: '82%',
        caste: 'MBC',
        hostelLocation: 'Ondipudur'
      }
    ];

    for (const studentData of sampleStudents) {
      const exists = await User.findOne({ 
        phone: studentData.phone, 
        role: 'student' 
      });
      
      if (!exists) {
        const student = new User({
          ...studentData,
          role: 'student'
        });
        await student.save();
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        admin: 'admin / admin123',
        wardens: `${hostelLocations.length} wardens created with password: warden123`,
        students: `${sampleStudents.length} sample students created`
      }
    });

  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ 
      error: 'Failed to seed database', 
      details: error.message 
    }, { status: 500 });
  }
}