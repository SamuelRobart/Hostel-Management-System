import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Hostel from '@/models/Hostel';
import mongoose from 'mongoose';

const HOSTEL_DATA = [
    { name: 'Perur', location: 'Perur', totalCapacity: 60, type: 'girls' },
    { name: 'Singanallur', location: 'Singanallur', totalCapacity: 60, type: 'girls' },
    { name: 'Peelamedu', location: 'Peelamedu', totalCapacity: 60, type: 'girls' },
    { name: 'Goundampalayam', location: 'Goundampalayam', totalCapacity: 60, type: 'girls' },
    { name: 'Vellakinar', location: 'Vellakinar', totalCapacity: 60, type: 'girls' },
    { name: 'Kinathukadavu', location: 'Kinathukadavu', totalCapacity: 60, type: 'girls' },
    { name: 'Nayakkanpalayam', location: 'Nayakkanpalayam', totalCapacity: 60, type: 'girls' },
    { name: 'Thondamuthur', location: 'Thondamuthur', totalCapacity: 60, type: 'girls' },
    { name: 'Masakkalipalayam_Boys', location: 'Masakkalipalayam', totalCapacity: 60, type: 'boys' },
    { name: 'Ondipudur_Boys', location: 'Ondipudur', totalCapacity: 60, type: 'boys' }
];

const GIRLS_NAMES = ['Priya Sharma', 'Kavitha Raj', 'Meera Devi', 'Lakshmi Priya', 'Divya Kumar', 'Saroja Bai', 'Geetha Rani', 'Shanti Devi', 'Radha Krishnan', 'Kamala Devi'];
const BOYS_NAMES = ['Raman Kumar', 'Suresh Babu', 'Arun Raj', 'Vijay Kumar', 'Karthik Raman', 'Senthil Kumar', 'Murugan Raj', 'Prakash Raj', 'Mohan Kumar', 'Rajesh Kumar'];

export async function GET() {
    try {
        console.log('Seeding process started...');
        await connectToDatabase();
        console.log('Database connected for seeding.');

        // 1. Clear existing data
        console.log('Clearing existing data...');
        await Promise.all([
            User.deleteMany({}),
            Hostel.deleteMany({})
        ]);
        console.log('Existing data cleared.');

        // 2. Seed Admin
        console.log('Seeding Admin...');
        const admin = await User.create({
            name: 'Administrator',
            phone: 'admin',
            password: 'admin123',
            role: 'admin'
        });

        // 3. Seed Hostels and Wardens
        const hostels = [];
        for (let i = 0; i < HOSTEL_DATA.length; i++) {
            const data = HOSTEL_DATA[i];
            console.log(`Seeding Hostel: ${data.name}...`);

            // Create Hostel
            const hostel = await Hostel.create({
                name: data.name,
                location: data.location,
                totalCapacity: data.totalCapacity,
                currentOccupancy: 0
            });
            hostels.push(hostel);

            // Create Warden for this hostel
            const warden = await User.create({
                name: `Warden ${data.name}`,
                phone: `987654320${i}`,
                password: 'warden123',
                role: 'warden',
                hostelId: hostel._id,
                hostelLocation: data.name
            });

            // Update hostel with wardenId
            hostel.wardenId = warden._id;
            await hostel.save();

            // 4. Seed Students for this hostel
            const studentCount = 40 + Math.floor(Math.random() * 20); // 40-60 students
            const names = data.type === 'girls' ? GIRLS_NAMES : BOYS_NAMES;

            const students = [];
            for (let j = 0; j < studentCount; j++) {
                const birthYear = 2003 + Math.floor(Math.random() * 3);
                const birthMonth = Math.floor(Math.random() * 12);
                const birthDay = Math.floor(Math.random() * 28) + 1;

                students.push({
                    name: names[j % names.length],
                    phone: `8${i}${j.toString().padStart(8, '0')}`,
                    role: 'student',
                    dateOfBirth: new Date(birthYear, birthMonth, birthDay),
                    hostelId: hostel._id,
                    hostelLocation: hostel.name,
                    fatherName: 'Father Name',
                    motherName: 'Mother Name',
                    email: `student${i}${j}@example.com`,
                    native: 'Native Place',
                    address: 'Address line here',
                    course: 'Course Name',
                    college: 'College Name',
                    income: '100000',
                    percentage12th: '85%',
                    bankDetails: 'Bank Account Info',
                    caste: 'BC'
                });
            }
            await User.insertMany(students);

            // Update occupancy
            hostel.currentOccupancy = studentCount;
            await hostel.save();
        }

        console.log('Seeding completed successfully!');
        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
            stats: {
                hostels: HOSTEL_DATA.length,
                admin: 1,
                wardens: HOSTEL_DATA.length,
                students: await User.countDocuments({ role: 'student' })
            }
        });

    } catch (error: any) {
        console.error('Seeding error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
