import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Hostel from '@/models/Hostel';
import Issue from '@/models/Issue';
import Menu from '@/models/Menu';
import Room from '@/models/Room';
import bcrypt from 'bcryptjs';

const HOSTEL_DATA = [
    { name: 'Perur Girls Hostel', location: 'Perur', totalCapacity: 35, type: 'girls' },
    { name: 'Singanallur Girls Hostel', location: 'Singanallur', totalCapacity: 35, type: 'girls' },
    { name: 'Peelamedu Girls Hostel', location: 'Peelamedu', totalCapacity: 35, type: 'girls' },
    { name: 'Goundampalayam Girls Hostel', location: 'Goundampalayam', totalCapacity: 35, type: 'girls' },
    { name: 'Vellakinar Girls Hostel', location: 'Vellakinar', totalCapacity: 35, type: 'girls' },
    { name: 'Nayakkanpalayam Girls Hostel', location: 'Nayakkanpalayam', totalCapacity: 35, type: 'girls' },
    { name: 'Thondamuthur Girls Hostel', location: 'Thondamuthur', totalCapacity: 35, type: 'girls' },
    { name: 'Masakkalipalayam Girls Hostel', location: 'Masakkalipalayam', totalCapacity: 35, type: 'girls' },
    { name: 'Kinathukadavu Boys Hostel', location: 'Kinathukadavu', totalCapacity: 35, type: 'boys' },
    { name: 'Ondipudur Boys Hostel', location: 'Ondipudur', totalCapacity: 35, type: 'boys' }
];

const WARDEN_NAMES = [
    'Mrs. Priya Devi', 'Mrs. Lakshmi Rani', 'Mrs. Meera Bai', 'Mrs. Kavitha Devi', 'Mrs. Sita Rani',
    'Mrs. Radha Devi', 'Mrs. Geetha Rani', 'Mrs. Sunitha Devi', 'Mr. Rajesh Kumar', 'Mr. Suresh Kumar'
];

const GIRLS_NAMES = [
    'Aishwarya Lakshmi', 'Divya Bharathi', 'Priya Dharshini', 'Kavitha Raj', 'Meera Devi',
    'Lakshmi Priya', 'Saroja Bai', 'Geetha Rani', 'Shanti Devi', 'Radha Krishnan',
    'Kamala Devi', 'Sita Rani', 'Uma Devi', 'Latha Priya', 'Malathi Devi',
    'Rani Kumari', 'Vijaya Lakshmi', 'Padma Devi', 'Saraswathi Bai', 'Parvathi Devi'
];

const BOYS_NAMES = [
    'Arjun Kumar', 'Karthik Raj', 'Raman Kumar', 'Suresh Babu', 'Arun Raj',
    'Vijay Kumar', 'Senthil Kumar', 'Murugan Raj', 'Prakash Raj', 'Mohan Kumar',
    'Rajesh Kumar', 'Ravi Kumar', 'Sathish Kumar', 'Ganesh Kumar', 'Dinesh Kumar'
];

const FATHER_NAMES = [
    'Raman', 'Murugan', 'Selvam', 'Krishnan', 'Ravi', 'Suresh', 'Rajesh', 'Kumar', 'Mohan', 'Prakash'
];

const MOTHER_NAMES = [
    'Kamala', 'Meera', 'Devi', 'Lakshmi', 'Priya', 'Sita', 'Radha', 'Geetha', 'Shanti', 'Uma'
];

const COURSES = [
    'B.A English', 'B.A Tamil', 'B.A History', 'B.A Economics', 'B.Sc Computer Science',
    'B.Sc Mathematics', 'B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Biology', 'B.Com'
];

const COLLEGES = [
    'Government Arts College', 'Government Arts and Science College', 'Avinashilingam College',
    'PSG College of Arts and Science', 'Sri Ramakrishna College'
];

const CASTES = ['BC', 'MBC', 'SC', 'ST'];

const NATIVE_PLACES = [
    'Coimbatore', 'Salem', 'Erode', 'Tirupur', 'Madurai', 'Chennai', 'Trichy', 'Dindigul', 'Theni', 'Karur'
];

// Generate random date of birth between 2003-2005
function randomDOB() {
    const year = 2003 + Math.floor(Math.random() * 3);
    const month = Math.floor(Math.random() * 12);
    const day = Math.floor(Math.random() * 28) + 1;
    return new Date(year, month, day);
}

// Generate phone number
function generatePhone(hostelIndex: number, studentIndex: number): string {
    return `9876543${(hostelIndex * 100 + studentIndex).toString().padStart(3, '0')}`;
}

export async function POST() {
    try {
        console.log('🚀 Starting comprehensive database seeding...');
        await connectToDatabase();
        console.log('✅ Database connected');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await Promise.all([
            User.deleteMany({}),
            Hostel.deleteMany({}),
            Issue.deleteMany({}),
            Menu.deleteMany({}),
            Room.deleteMany({})
        ]);
        console.log('✅ Existing data cleared');

        // 1. Create Admin
        console.log('👤 Creating admin user...');
        const adminPassword = await bcrypt.hash('admin123', 10);
        const admin = await User.create({
            name: 'System Administrator',
            phone: 'admin',
            password: adminPassword,
            role: 'admin'
        });
        console.log('✅ Admin created');

        // 2. Create Hostels and Wardens
        console.log('🏠 Creating hostels and wardens...');
        const hostels = [];
        const wardenPassword = await bcrypt.hash('warden123', 10);

        for (let i = 0; i < HOSTEL_DATA.length; i++) {
            const data = HOSTEL_DATA[i];
            
            // Create Hostel
            const hostel = await Hostel.create({
                name: data.name,
                location: data.location,
                totalCapacity: data.totalCapacity,
                currentOccupancy: 0
            });
            hostels.push(hostel);

            // Create Warden
            const warden = await User.create({
                name: WARDEN_NAMES[i],
                phone: `98765432${i.toString().padStart(2, '0')}`,
                password: wardenPassword,
                role: 'warden',
                hostelId: hostel._id,
                hostelLocation: data.location
            });

            // Update hostel with warden
            hostel.wardenId = warden._id;
            await hostel.save();

            console.log(`✅ Created hostel: ${data.name} with warden: ${WARDEN_NAMES[i]}`);
        }

        // 3. Create Students
        console.log('👨‍🎓 Creating students...');
        let totalStudents = 0;

        for (let i = 0; i < hostels.length; i++) {
            const hostel = hostels[i];
            const hostelData = HOSTEL_DATA[i];
            const names = hostelData.type === 'girls' ? GIRLS_NAMES : BOYS_NAMES;
            
            // Create 30-35 students per hostel
            const studentCount = 30 + Math.floor(Math.random() * 6);
            const students = [];

            for (let j = 0; j < studentCount; j++) {
                const nameIndex = j % names.length;
                const student = {
                    name: names[nameIndex],
                    phone: generatePhone(i, j),
                    role: 'student' as const,
                    dateOfBirth: randomDOB(),
                    hostelId: hostel._id,
                    hostelLocation: hostel.location,
                    fatherName: FATHER_NAMES[j % FATHER_NAMES.length],
                    motherName: MOTHER_NAMES[j % MOTHER_NAMES.length],
                    email: `student${i}${j}@example.com`,
                    native: NATIVE_PLACES[j % NATIVE_PLACES.length],
                    address: `${NATIVE_PLACES[j % NATIVE_PLACES.length]}, Tamil Nadu`,
                    course: COURSES[j % COURSES.length],
                    college: COLLEGES[j % COLLEGES.length],
                    income: `${30000 + Math.floor(Math.random() * 50000)}`,
                    percentage12th: `${75 + Math.floor(Math.random() * 20)}%`,
                    bankDetails: `Account No: ${1000000000 + i * 1000 + j}`,
                    caste: CASTES[j % CASTES.length]
                };
                students.push(student);
            }

            await User.insertMany(students);
            hostel.currentOccupancy = studentCount;
            await hostel.save();
            totalStudents += studentCount;
            console.log(`✅ Created ${studentCount} students for ${hostel.name}`);
        }

        // 4. Create Rooms and Beds
        console.log('🏘️  Creating rooms and beds...');
        for (let i = 0; i < hostels.length; i++) {
            const hostel = hostels[i];
            const roomsPerHostel = Math.ceil(hostel.totalCapacity / 2); // Assuming 2 beds per room average
            let totalBedsCreated = 0;

            for (let j = 1; j <= roomsPerHostel; j++) {
                const capacity = j <= Math.floor(roomsPerHostel * 0.3) ? 2 : (j <= Math.floor(roomsPerHostel * 0.7) ? 3 : 4);
                const roomType = capacity === 2 ? 'double' : capacity === 3 ? 'triple' : 'quad';
                const floor = Math.floor((j - 1) / (roomsPerHostel / 3)) + 1;
                const block = j <= Math.floor(roomsPerHostel / 2) ? 'A' : 'B';

                const beds = [];
                for (let k = 1; k <= capacity; k++) {
                    beds.push({
                        bedNumber: k,
                        isOccupied: false,
                    });
                }

                await Room.create({
                    hostelId: hostel._id,
                    roomNumber: `${floor}${String(j).padStart(2, '0')}`,
                    floor: floor,
                    block: block,
                    capacity: capacity,
                    currentOccupancy: 0,
                    beds: beds,
                    roomType: roomType,
                    amenities: ['Fan', 'Light', 'Window']
                });

                totalBedsCreated += capacity;
            }

            // Update hostel room/bed counts
            hostel.totalRooms = roomsPerHostel;
            hostel.totalBeds = totalBedsCreated;
            hostel.floors = 3;
            hostel.blocks = ['A', 'B'];
            hostel.facilities = ['Mess', 'Library', 'Common Room', 'WiFi'];
            await hostel.save();

            console.log(`✅ Created ${roomsPerHostel} rooms for ${hostel.name}`);
        }
        console.log('✅ Rooms and beds created');

        // 5. Create Sample Issues
        console.log('📋 Creating sample issues...');
        const allStudents = await User.find({ role: 'student' }).limit(20);
        const issueCategories = ['maintenance', 'food', 'security', 'other'];
        const issueStatuses = ['pending', 'in-progress', 'resolved'];
        const issuePriorities = ['low', 'medium', 'high', 'urgent'];

        for (let i = 0; i < Math.min(15, allStudents.length); i++) {
            const student = allStudents[i];
            const hostel = await Hostel.findById(student.hostelId);
            
            if (hostel) {
                await Issue.create({
                    studentId: student._id,
                    hostelId: hostel._id,
                    title: `Issue ${i + 1}: ${issueCategories[i % issueCategories.length]} related`,
                    description: `Sample issue description for ${student.name}`,
                    category: issueCategories[i % issueCategories.length],
                    status: issueStatuses[i % issueStatuses.length],
                    priority: issuePriorities[i % issuePriorities.length],
                    reportedBy: student.name
                });
            }
        }
        console.log('✅ Sample issues created');

        // 6. Create Sample Menu
        console.log('🍽️  Creating sample menu...');
        const now = new Date();
        const year = now.getFullYear();
        const week = Math.ceil((now.getDate() + (now.getDay() || 7) - 1) / 7);
        const currentWeek = `${year}-W${week.toString().padStart(2, '0')}`;

        const defaultMenu = [
            { day: 'monday', breakfast: 'Semiya Kichadi + Chutney/Sambar', lunch: 'Rice + Sambar + Poriyal + Rasam + Mor + Muttai/Muttai Masala', dinner: 'Rice + Sambar + Vegetable' },
            { day: 'tuesday', breakfast: 'Poori + Masala', lunch: 'Veg Biryani + Veg Kuruma + Egg', dinner: 'Idli + Sambar + Chutney' },
            { day: 'wednesday', breakfast: 'Idli + Sambar + Chutney', lunch: 'Rice + Mutton/Chicken Kuruma + Mor', dinner: 'Veg Pulav + Kuruma/Raitha' },
            { day: 'thursday', breakfast: 'Idli + Sambar + Chutney', lunch: 'Tomato/Lemon/Curd Rice + Potato Poriyal + Egg', dinner: 'Othappam + Chutney + Sambar' },
            { day: 'friday', breakfast: 'Pongal/Varagu Pongal + Kathirikai Kozhju + Vada', lunch: 'Rice + Kara Kulambu + Poriyal/Koottu + Rasam + Mor + Egg', dinner: 'Wheat Dosa + Tomato Chutney' },
            { day: 'saturday', breakfast: 'Rava Kichadi + Coconut Chutney', lunch: 'Pudhina/Carrot/Curry Leaf Rice + Egg + Appalam/Paruppu Sadam', dinner: 'Rice + Sambar + Vegetable' },
            { day: 'sunday', breakfast: 'Dosa/Navadhaniya Dosa + Sambar + Chutney', lunch: 'Rice + Veg Kuruma + Rasam + Mor', dinner: 'Tomato/Sambar Rice + Varuval' }
        ];

        for (const hostel of hostels) {
            for (const menuItem of defaultMenu) {
                await Menu.create({
                    hostelId: hostel._id,
                    day: menuItem.day,
                    breakfast: menuItem.breakfast,
                    lunch: menuItem.lunch,
                    dinner: menuItem.dinner,
                    week: currentWeek
                });
            }
        }
        console.log('✅ Sample menu created');

        const finalStats = {
            admin: 1,
            hostels: hostels.length,
            wardens: hostels.length,
            students: totalStudents,
            rooms: await Room.countDocuments({}),
            issues: await Issue.countDocuments({}),
            menuEntries: await Menu.countDocuments({})
        };

        console.log('\n🎉 Database seeding completed successfully!');
        console.log('\n📊 Final Statistics:');
        console.log(JSON.stringify(finalStats, null, 2));
        console.log('\n🔐 Login Credentials:');
        console.log('Admin: phone=admin, password=admin123');
        console.log('Wardens: phone=9876543200-9876543209, password=warden123');
        console.log('Students: Use phone numbers starting from 9876543000 and their date of birth');

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
            stats: finalStats
        });

    } catch (error: any) {
        console.error('❌ Seeding error:', error);
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
