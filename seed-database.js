const fs = require('fs');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');

let envUri = process.env.MONGODB_URI;
if (!envUri) {
  for (const envFile of ['.env', '.env.local']) {
    const envPath = path.resolve(__dirname, envFile);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^MONGODB_URI\s*=\s*(.+)$/m);
      if (match) {
        envUri = match[1].trim().replace(/^["']|["']$/g, '');
        break;
      }
    }
  }
}

const MONGODB_URI = envUri || 'mongodb://127.0.0.1:27017/hostel-management';
console.log(`Connecting to database URI: ${MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);

// 12 Cities with 14 hostels (Chennai and Bangalore have both Boys and Girls hostels)
const hostelsData = [
  // Girls Hostels (7)
  {
    name: 'Grand Girlsx Elite',
    location: 'Chennai',
    type: 'girls',
    totalCapacity: 50,
    currentOccupancy: 38,
    totalRooms: 10,
    totalBeds: 50,
    floors: 3,
    facilities: ['WiFi', 'Mess', 'Library', 'Recreation Room', 'Laundry', 'Medical Room'],
    address: 'No. 12, Poonamallee High Road, Chennai, Tamil Nadu',
    contactNumber: '044-2345678'
  },
  {
    name: 'Silicon Girls Elite',
    location: 'Bangalore',
    type: 'girls',
    totalCapacity: 50,
    currentOccupancy: 42,
    totalRooms: 10,
    totalBeds: 50,
    floors: 3,
    facilities: ['WiFi', 'Mess', 'Study Hall', 'Medical Room', 'Computer Lab', 'Gym'],
    address: '4th Block, Koramangala, Bangalore, Karnataka',
    contactNumber: '080-2345679'
  },
  {
    name: 'Rockfort Girls Elite',
    location: 'Trichy',
    type: 'girls',
    totalCapacity: 50,
    currentOccupancy: 40,
    totalRooms: 10,
    totalBeds: 50,
    floors: 3,
    facilities: ['WiFi', 'Mess', 'Library', 'Gym', 'Recreation Room', 'Counseling Room'],
    address: 'Main Guard Gate, Trichy, Tamil Nadu',
    contactNumber: '0431-2345681'
  },
  {
    name: 'Apex Girls Elite',
    location: 'Coimbatore',
    type: 'girls',
    totalCapacity: 50,
    currentOccupancy: 36,
    totalRooms: 10,
    totalBeds: 50,
    floors: 3,
    facilities: ['WiFi', 'Mess', 'Study Hall', 'Laundry', 'Medical Room', 'Recreation Room'],
    address: 'Avinashi Road, Coimbatore, Tamil Nadu',
    contactNumber: '0422-2345682'
  },
  {
    name: 'Pearl Girls Elite',
    location: 'Hyderabad',
    type: 'girls',
    totalCapacity: 50,
    currentOccupancy: 45,
    totalRooms: 10,
    totalBeds: 50,
    floors: 3,
    facilities: ['WiFi', 'Mess', 'Library', 'Computer Lab', 'Laundry', 'Medical Room'],
    address: 'Gachibowli, Hyderabad, Telangana',
    contactNumber: '040-2345683'
  },
  {
    name: 'Metro Girls Elite',
    location: 'Ernakulam',
    type: 'girls',
    totalCapacity: 50,
    currentOccupancy: 39,
    totalRooms: 10,
    totalBeds: 50,
    floors: 3,
    facilities: ['WiFi', 'Mess', 'Study Hall', 'Gym', 'Laundry', 'Medical Room'],
    address: 'MG Road, Ernakulam, Kerala',
    contactNumber: '0484-2345684'
  },
  {
    name: 'Palace Girls Elite',
    location: 'Mysuru',
    type: 'girls',
    totalCapacity: 50,
    currentOccupancy: 43,
    totalRooms: 10,
    totalBeds: 50,
    floors: 3,
    facilities: ['WiFi', 'Mess', 'Library', 'Recreation Room', 'Medical Room', 'Computer Lab'],
    address: 'Siddhartha Layout, Mysuru, Karnataka',
    contactNumber: '0821-2345685'
  },
  // Boys Hostels (7)
  {
    name: 'Nexus Boys Elite',
    location: 'Chennai',
    type: 'boys',
    totalCapacity: 50,
    currentOccupancy: 35,
    totalRooms: 10,
    totalBeds: 50,
    floors: 3,
    facilities: ['WiFi', 'Mess', 'Sports Room', 'Computer Lab', 'Laundry', 'Medical Room'],
    address: 'OMR Road, Chennai, Tamil Nadu',
    contactNumber: '044-2345690'
  },
  {
    name: 'Tech Boys Elite',
    location: 'Bangalore',
    type: 'boys',
    totalCapacity: 50,
    currentOccupancy: 41,
    totalRooms: 10,
    totalBeds: 50,
    floors: 3,
    facilities: ['WiFi', 'Mess', 'Gym', 'Sports Room', 'Computer Lab', 'Recreation Room'],
    address: 'Whitefield, Bangalore, Karnataka',
    contactNumber: '080-2345691'
  },
  {
    name: 'Temple Boys Elite',
    location: 'Madurai',
    type: 'boys',
    totalCapacity: 50,
    currentOccupancy: 38,
    totalRooms: 10,
    totalBeds: 50,
    floors: 3,
    facilities: ['WiFi', 'Mess', 'Study Hall', 'Medical Room', 'Laundry', 'Recreation Room'],
    address: 'KK Nagar, Madurai, Tamil Nadu',
    contactNumber: '0452-2345692'
  },
  {
    name: 'Oceanic Boys Elite',
    location: 'Kanniyakumari',
    type: 'boys',
    totalCapacity: 50,
    currentOccupancy: 44,
    totalRooms: 10,
    totalBeds: 50,
    floors: 3,
    facilities: ['WiFi', 'Mess', 'Sports Room', 'Gym', 'Computer Lab', 'Medical Room'],
    address: 'Beach Road, Kanniyakumari, Tamil Nadu',
    contactNumber: '04652-2345693'
  },
  {
    name: 'Marine Boys Elite',
    location: 'Kochin',
    type: 'boys',
    totalCapacity: 50,
    currentOccupancy: 37,
    totalRooms: 10,
    totalBeds: 50,
    floors: 3,
    facilities: ['WiFi', 'Mess', 'Library', 'Recreation Room', 'Laundry', 'Medical Room'],
    address: 'Marine Drive, Kochin, Kerala',
    contactNumber: '0484-2345694'
  },
  {
    name: 'Royal Boys Elite',
    location: 'Trivandrum',
    type: 'boys',
    totalCapacity: 50,
    currentOccupancy: 46,
    totalRooms: 10,
    totalBeds: 50,
    floors: 3,
    facilities: ['WiFi', 'Mess', 'Sports Room', 'Study Hall', 'Computer Lab', 'Medical Room'],
    address: 'Pattom, Trivandrum, Kerala',
    contactNumber: '0471-2345695'
  },
  {
    name: 'Coast Boys Elite',
    location: 'Mangalore',
    type: 'boys',
    totalCapacity: 50,
    currentOccupancy: 40,
    totalRooms: 10,
    totalBeds: 50,
    floors: 3,
    facilities: ['WiFi', 'Mess', 'Gym', 'Sports Room', 'Laundry', 'Medical Room'],
    address: 'Kadri, Mangalore, Karnataka',
    contactNumber: '0824-2345696'
  }
];

const femaleNames = [
  'Aishwarya', 'Divya', 'Priya', 'Anitha', 'Bharati', 'Chitra', 'Deepa', 'Eswari', 'Fathima', 'Gayathri',
  'Hema', 'Indira', 'Janaki', 'Kalpana', 'Latha', 'Malathi', 'Nirmala', 'Oviya', 'Padma', 'Revathi',
  'Sujatha', 'Thenmozhi', 'Uma', 'Vasantha', 'Yamuna', 'Zarina', 'Kavitha', 'Shanthi', 'Sandhiya', 'Vidya',
  'Archana', 'Pavithra', 'Saritha', 'Abirami', 'Preethi', 'Swetha', 'Nisha', 'Ramya', 'Gokila', 'Madhumitha'
];

const maleNames = [
  'Rajesh', 'Arjun', 'Bala', 'Chandran', 'Dinesh', 'Ezhil', 'Ganesh', 'Hari', 'Ilango', 'Jagan',
  'Kiran', 'Lokesh', 'Murugan', 'Naveen', 'Pradeep', 'Raman', 'Suresh', 'Vijay', 'Karthik', 'Sanjay',
  'Arun', 'Deepak', 'Sathish', 'Vikram', 'Ajay', 'Somesh', 'Abhishek', 'Gaurav', 'Nitin', 'Vivek',
  'Aryan', 'Mani', 'Shiva', 'Velu', 'Kathir', 'Sundar', 'Manish', 'Rahul', 'Aravind', 'Praveen'
];

const lastNamesFemale = ['Lakshmi', 'Devi', 'Priya', 'Rani', 'Kumari', 'Shree', 'Mary'];
const lastNamesMale = ['Kumar', 'Raj', 'Babu', 'Krishnan', 'Singh', 'Nair', 'Sharma'];

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('hostel-management');
    
    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      db.collection('hostels').deleteMany({}),
      db.collection('users').deleteMany({}),
      db.collection('rooms').deleteMany({}),
      db.collection('issues').deleteMany({})
    ]);
    
    // Insert Hostels
    console.log('Inserting hostels...');
    const insertedHostels = hostelsData.map(h => ({
      ...h,
      _id: new ObjectId(),
      createdAt: new Date()
    }));
    
    await db.collection('hostels').insertMany(insertedHostels);
    
    const generatedRooms = [];
    const generatedUsers = [];
    const roomOccupancyMap = {}; // Track room occupant counts
    
    let phoneCounter = 9876543100;
    
    console.log('Generating rooms, wardens, security, and students for each hostel...');
    
    for (const hostel of insertedHostels) {
      const isGirls = hostel.type === 'girls';
      const cityLower = hostel.location.toLowerCase();
      
      // 1. Generate 10 rooms per hostel
      for (let roomNum = 1; roomNum <= 10; roomNum++) {
        const floor = roomNum <= 4 ? 1 : (roomNum <= 7 ? 2 : 3);
        const roomId = new ObjectId();
        
        const roomObj = {
          _id: roomId,
          hostelId: hostel._id,
          roomNumber: String(roomNum),
          floor: floor,
          block: 'A',
          capacity: 5,
          currentOccupancy: 0,
          beds: [
            { bedNumber: 1, isOccupied: false },
            { bedNumber: 2, isOccupied: false },
            { bedNumber: 3, isOccupied: false },
            { bedNumber: 4, isOccupied: false },
            { bedNumber: 5, isOccupied: false }
          ],
          roomType: 'quad',
          amenities: ['Fan', 'Light', 'Study Table', 'Wardrobe', 'Attached Bathroom'],
          hostelLocation: hostel.location // Backward compatibility
        };
        
        generatedRooms.push(roomObj);
        roomOccupancyMap[roomId.toString()] = { roomObj, occupants: 0 };
      }
      
      // Get the rooms for this hostel
      const hostelRooms = generatedRooms.filter(r => r.hostelId.toString() === hostel._id.toString());
      
      // 2. Generate 2 Wardens
      for (let w = 1; w <= 2; w++) {
        const nameList = isGirls ? femaleNames : maleNames;
        const lastList = isGirls ? lastNamesFemale : lastNamesMale;
        const firstName = nameList[(w + phoneCounter) % nameList.length];
        const lastName = lastList[(w + phoneCounter) % lastList.length];
        
        const wardenObj = {
          _id: new ObjectId(),
          phone: String(phoneCounter++),
          role: 'warden',
          name: `${firstName} ${lastName}`,
          username: `warden${w}_${cityLower}_${hostel.type}`,
          password: 'warden123',
          isActive: true,
          hostelId: hostel._id,
          hostelLocation: hostel.location,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        generatedUsers.push(wardenObj);
        
        // Link the first warden as primary warden for the hostel
        if (w === 1) {
          await db.collection('hostels').updateOne(
            { _id: hostel._id },
            { $set: { wardenId: wardenObj._id } }
          );
        }
      }
      
      // 3. Generate 3 Security Guards
      for (let s = 1; s <= 3; s++) {
        const firstName = maleNames[(s + phoneCounter) % maleNames.length];
        const lastName = lastNamesMale[(s + phoneCounter) % lastNamesMale.length];
        
        const securityObj = {
          _id: new ObjectId(),
          phone: String(phoneCounter++),
          role: 'security',
          name: `${firstName} ${lastName}`,
          username: `security${s}_${cityLower}_${hostel.type}`,
          password: 'security123',
          isActive: true,
          hostelId: hostel._id,
          hostelLocation: hostel.location,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        generatedUsers.push(securityObj);
      }
      
      // 4. Generate 40 Students
      for (let st = 0; st < 40; st++) {
        const nameList = isGirls ? femaleNames : maleNames;
        const lastList = isGirls ? lastNamesFemale : lastNamesMale;
        const firstName = nameList[(st + phoneCounter) % nameList.length];
        const lastName = lastList[(st + phoneCounter) % lastList.length];
        const studentPhone = String(phoneCounter++);
        
        // Assign to a room (10 rooms, 4 students per room capacity)
        const roomIndex = st % 10;
        const assignedRoom = hostelRooms[roomIndex];
        const bedNumber = Math.floor(st / 10) + 1; // 1 to 4
        
        // Mark bed as occupied
        assignedRoom.beds[bedNumber - 1].isOccupied = true;
        assignedRoom.currentOccupancy++;
        
        const studentObj = {
          _id: new ObjectId(),
          phone: studentPhone,
          role: 'student',
          name: `${firstName} ${lastName}`,
          dateOfBirth: new Date(`${2001 + (st % 4)}-${(st % 12) + 1}-${(st % 28) + 1}`),
          isActive: true,
          hostelId: hostel._id,
          hostelLocation: hostel.location,
          roomId: assignedRoom._id,
          roomNumber: assignedRoom.roomNumber,
          bedNumber: bedNumber,
          fatherName: `${maleNames[(st + 3) % maleNames.length]} ${lastNamesMale[st % lastNamesMale.length]}`,
          motherName: `${femaleNames[(st + 5) % femaleNames.length]} ${lastNamesFemale[st % lastNamesFemale.length]}`,
          email: `student${studentPhone}@email.com`,
          alternatePhone: String(Number(studentPhone) + 10000),
          native: hostel.location,
          address: `No. ${st + 10}, Palace Street, ${hostel.location}`,
          course: ['B.A English', 'B.Sc Computer Science', 'B.Com General', 'B.Tech IT', 'B.Sc Mathematics'][st % 5],
          college: `${hostel.location} Government College`,
          appliedColleges: [`${hostel.location} Government College`, `${hostel.location} City College`],
          income: `₹${Math.floor(Math.random() * 120000 + 40000)} per annum`,
          percentage12th: `${Math.floor(Math.random() * 20 + 75)}%`,
          caste: ['BC', 'MBC', 'SC', 'ST', 'General'][st % 5],
          aadhaarNumber: `3${studentPhone.slice(0, 11)}`,
          communityCertificateNumber: `CC-ELITE-${st + 2024}`,
          photoUrl: `student_${studentPhone}_photo.jpg`,
          documents: [
            { type: 'aadhaar', documentUrl: `student_${studentPhone}_aadhaar.pdf` },
            { type: '12th_marksheet', documentUrl: `student_${studentPhone}_12th.pdf` }
          ],
          bankDetails: `SBI Account: ${studentPhone}99, IFSC: SBIN0007890`,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        generatedUsers.push(studentObj);
      }
    }
    
    // Add 1 System Admin
    const adminObj = {
      _id: new ObjectId(),
      name: 'System Administrator',
      username: 'admin',
      phone: '9876543000',
      password: 'admin123',
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    generatedUsers.push(adminObj);
    
    // Generate Sample Issues
    console.log('Generating sample issues...');
    const sampleIssues = [
      {
        title: 'WiFi Connection Issue',
        description: 'Internet is slow in Room 2. Unable to attend online college lectures.',
        category: 'Technical',
        priority: 'High',
        status: 'pending',
        studentName: 'Aishwarya Lakshmi',
        studentPhone: '9876543100',
        hostelLocation: 'Chennai',
        roomNumber: '2',
        reportedAt: new Date(),
        expectedResolution: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Water Tap Leaking',
        description: 'Washbasin tap is constantly dripping in Room 5 bathroom.',
        category: 'Maintenance',
        priority: 'Medium',
        status: 'in-progress',
        studentName: 'Rajesh Kumar',
        studentPhone: '9876543200',
        hostelLocation: 'Bangalore',
        roomNumber: '5',
        reportedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        expectedResolution: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      {
        title: 'Power Socket Failure',
        description: 'Charging socket near bed 3 is not working.',
        category: 'Electrical',
        priority: 'Low',
        status: 'resolved',
        studentName: 'Nisha Devi',
        studentPhone: '9876543300',
        hostelLocation: 'Trichy',
        roomNumber: '3',
        reportedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        resolvedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        expectedResolution: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ];
    
    // Insert Rooms, Users, Issues into DB
    console.log('Writing records to MongoDB Atlas...');
    const roomResult = await db.collection('rooms').insertMany(generatedRooms);
    const userResult = await db.collection('users').insertMany(generatedUsers);
    const issueResult = await db.collection('issues').insertMany(sampleIssues);
    
    console.log('\n✅ Database seeded successfully!');
    console.log(`✓ Inserted ${insertedHostels.length} hostels (7 Girls + 7 Boys) across 12 cities`);
    console.log(`✓ Inserted ${userResult.insertedCount} users (560 students + 28 wardens + 42 security + 1 admin)`);
    console.log(`✓ Inserted ${roomResult.insertedCount} rooms (140 total)`);
    console.log(`✓ Inserted ${issueResult.insertedCount} issues`);
    
    console.log('\n📊 Statistics:');
    console.log('  - Hostels: 14 (Chennai & Bangalore have both Girls & Boys)');
    console.log('  - Students per Hostel: 40');
    console.log('  - Total Students: 560');
    console.log('  - Rooms per Hostel: 10');
    console.log('  - Total Rooms: 140');
    console.log('  - Beds per Room: 5');
    console.log('  - Total Beds: 700');
    console.log('  - Occupancy: 560/700 (80%)');
    
    console.log('\n=== Sample Login Credentials ===');
    console.log('Admin: username=admin, password=admin123');
    console.log('Warden (Chennai Girls): username=warden1_chennai_girls, password=warden123');
    console.log('Warden (Chennai Boys): username=warden1_chennai_boys, password=warden123');
    console.log('Warden (Bangalore Girls): username=warden1_bangalore_girls, password=warden123');
    console.log('Warden (Bangalore Boys): username=warden1_bangalore_boys, password=warden123');
    console.log('Student: phone=9876543100, name=Aishwarya Lakshmi');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('\n✓ Database connection closed');
  }
}

seedDatabase();