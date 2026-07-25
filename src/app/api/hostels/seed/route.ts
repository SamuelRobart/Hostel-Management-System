import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  dateOfBirth: { type: String, required: true }, // Store as DD/MM/YYYY string
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  email: { type: String, required: true },
  native: { type: String, required: true },
  address: { type: String, required: true },
  course: { type: String, required: true },
  college: { type: String, required: true },
  income: { type: String, required: true },
  percentage12th: { type: String, required: true },
  bankDetails: { type: String, required: true },
  caste: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export async function POST() {
  try {
    await connectToDatabase();
    if (!mongoose.connection.db) {
      return NextResponse.json({ error: 'Database connection not ready' }, { status: 500 });
    }
    
    const hostels = [
      // GIRLS HOSTELS (7)
      { location: 'Perur', capacity: 50, type: 'Girls' },
      { location: 'Singanallur', capacity: 50, type: 'Girls' },
      { location: 'Peelamedu', capacity: 50, type: 'Girls' },
      { location: 'Goundampalayam', capacity: 50, type: 'Girls' },
      { location: 'Vellakinar', capacity: 50, type: 'Girls' },
      { location: 'Nayakkanpalayam', capacity: 50, type: 'Girls' },
      { location: 'Thondamuthur', capacity: 50, type: 'Girls' },
      // BOYS HOSTELS (6)
      { location: 'Kinathukadavu', capacity: 50, type: 'Boys' },
      { location: 'Masakkalipalayam', capacity: 50, type: 'Boys' },
      { location: 'Ondipudur', capacity: 50, type: 'Boys' },
      { location: 'Karamadai', capacity: 50, type: 'Boys' },
      { location: 'Sulur', capacity: 50, type: 'Boys' },
      { location: 'Pappanaickenpalayam', capacity: 50, type: 'Boys' }
    ];
    
    const girlsNames = [
      'Priya Sharma', 'Kavitha Raj', 'Meera Devi', 'Lakshmi Priya', 'Divya Kumar', 
      'Saroja Bai', 'Geetha Rani', 'Shanti Devi', 'Radha Krishnan', 'Kamala Devi',
      'Anitha Kumar', 'Bhavani Devi', 'Chitra Raj', 'Deepa Lakshmi', 'Eswari Bai',
      'Fathima Begum', 'Gayathri Devi', 'Hema Priya', 'Indira Rani', 'Janaki Devi',
      'Kalpana Raj', 'Latha Kumar', 'Malathi Devi', 'Nirmala Bai', 'Oviya Priya',
      'Padma Lakshmi', 'Quency Mary', 'Revathi Devi', 'Sujatha Raj', 'Thenmozhi Devi',
      'Uma Rani', 'Vasantha Priya', 'Wincy Rose', 'Yamuna Devi', 'Zarina Begum',
      'Aarthi Kumar', 'Bavani Raj', 'Chithra Devi', 'Dhanya Priya', 'Elakkiya Bai',
      'Farhana Begum', 'Gowri Devi', 'Harini Raj', 'Ishwarya Priya', 'Jothika Devi',
      'Keerthana Kumar', 'Lavanya Raj', 'Mythili Devi', 'Nandhini Priya', 'Oviya Kumar'
    ];
    const boysNames = [
      'Raman Kumar', 'Suresh Babu', 'Arun Raj', 'Vijay Kumar', 'Karthik Raman', 
      'Senthil Kumar', 'Murugan Raj', 'Prakash Raj', 'Mohan Kumar', 'Rajesh Kumar',
      'Arjun Devi', 'Bala Krishna', 'Chandran Raj', 'Dinesh Kumar', 'Ezhil Raman',
      'Ganesh Babu', 'Hari Krishnan', 'Ilango Raj', 'Jagan Kumar', 'Kiran Raman',
      'Lokesh Kumar', 'Manoj Raj', 'Naveen Kumar', 'Omkar Raman', 'Prasad Kumar',
      'Qasim Ali', 'Ramesh Raj', 'Santhosh Kumar', 'Tarun Raman', 'Uday Kumar',
      'Vinoth Raj', 'Wasim Khan', 'Xavier John', 'Yogesh Kumar', 'Zubair Ali',
      'Ashwin Kumar', 'Bharath Raj', 'Charan Kumar', 'Deepak Raman', 'Elango Kumar',
      'Fazil Ahmed', 'Gowtham Raj', 'Harish Kumar', 'Imran Ali', 'Jeeva Kumar',
      'Kamal Raj', 'Lenin Kumar', 'Mahesh Raman', 'Nithin Kumar', 'Omar Ali'
    ];
    const fatherNames = [
      'Rajesh Kumar', 'Suresh Babu', 'Raman Raj', 'Vijay Kumar', 'Arun Devi',
      'Krishnan Pillai', 'Murugan Raman', 'Selvam Kumar', 'Pandian Raj', 'Durai Babu',
      'Shankar Devi', 'Ravi Kumar', 'Balan Raj', 'Ganesan Babu', 'Mani Kumar',
      'Subash Raj', 'Kannan Devi', 'Velu Kumar', 'Siva Raj', 'Kumar Babu'
    ];
    const motherNames = [
      'Kamala Devi', 'Priya Lakshmi', 'Meera Bai', 'Saroja Devi', 'Geetha Rani',
      'Shanti Lakshmi', 'Radha Bai', 'Lakshmi Devi', 'Parvathi Rani', 'Devi Bai',
      'Sita Lakshmi', 'Uma Devi', 'Valli Bai', 'Janaki Rani', 'Kala Devi',
      'Mala Lakshmi', 'Nila Bai', 'Oviya Devi', 'Prema Rani', 'Quency Devi'
    ];
    const courses = [
      'B.A English', 'B.Sc Mathematics', 'B.A History', 'B.Sc Physics', 'B.A Tamil',
      'B.Sc Chemistry', 'B.A Economics', 'B.Sc Biology', 'B.A Political Science', 'B.Sc Computer Science',
      'B.Com General', 'B.Com Computer Applications', 'B.A Geography', 'B.Sc Statistics', 'B.A Psychology'
    ];
    const colleges = [
      'Government Arts College', 'Government Arts and Science College', 'Government College for Women',
      'PSG Arts and Science College', 'Sri Krishna Arts and Science College', 'Kongu Arts and Science College',
      'CMS College of Science and Commerce', 'Dr. N.G.P. Arts and Science College'
    ];
    const castes = ['BC', 'MBC', 'SC'];
    const nativeDistricts = ['Salem', 'Erode', 'Tirupur', 'Karur', 'Namakkal', 'Dharmapuri', 'Krishnagiri', 'Tiruvannamalai', 'Vellore', 'Cuddalore'];
    
    let totalStudents = 0;
    
    for (const hostel of hostels) {
      const collectionName = `students_${hostel.location.toLowerCase()}`;
      
      try {
        await mongoose.connection.db.dropCollection(collectionName);
      } catch (error) {}
      
      const StudentModel = mongoose.model(collectionName, studentSchema, collectionName);
      const names = hostel.type === 'Girls' ? girlsNames : boysNames;
      const students = [];
      
      for (let i = 0; i < hostel.capacity; i++) {
        const birthDay = Math.floor(Math.random() * 28) + 1;
        const birthMonth = Math.floor(Math.random() * 12) + 1;
        const birthYear = 2003 + Math.floor(Math.random() * 3);
        const dateOfBirth = `${birthDay.toString().padStart(2, '0')}/${birthMonth.toString().padStart(2, '0')}/${birthYear}`;
        
        // Generate unique phone number
        const phoneNumber = `9${Math.floor(Math.random() * 900000000 + 100000000)}`;
        
        // Select names in order, not random
        const selectedName = names[i % names.length];
        const selectedFather = fatherNames[i % fatherNames.length];
        const selectedMother = motherNames[i % motherNames.length];
        const selectedCourse = courses[i % courses.length];
        const selectedCollege = colleges[i % colleges.length];
        const selectedCaste = castes[i % castes.length];
        const selectedNative = nativeDistricts[Math.floor(Math.random() * nativeDistricts.length)];
        
        students.push({
          name: selectedName,
          phone: phoneNumber,
          dateOfBirth: dateOfBirth,
          fatherName: selectedFather,
          motherName: selectedMother,
          email: `${selectedName.toLowerCase().replace(' ', '.')}${i + 1}@gmail.com`,
          native: `${selectedNative} District`,
          address: `${Math.floor(Math.random() * 999) + 1}/${Math.floor(Math.random() * 99) + 1}, ${['Main Street', 'Gandhi Road', 'Anna Nagar', 'Bharathi Street', 'Nehru Road'][i % 5]}, ${hostel.location}, Tamil Nadu - ${641000 + Math.floor(Math.random() * 100)}`,
          course: selectedCourse,
          college: selectedCollege,
          income: `₹${Math.floor(Math.random() * 150000 + 50000)} per annum`,
          percentage12th: `${Math.floor(Math.random() * 20 + 75)}%`,
          bankDetails: `${['SBI', 'IOB', 'Canara Bank', 'ICICI', 'HDFC'][i % 5]} - ${hostel.location}${(i + 1).toString().padStart(3, '0')}${Math.floor(Math.random() * 9000 + 1000)}`,
          caste: selectedCaste
        });
      }
      
      await StudentModel.insertMany(students);
      totalStudents += students.length;
      delete mongoose.models[collectionName];
    }
    
    return NextResponse.json({ 
      message: `Seeded ${totalStudents} students in ${hostels.length} collections`,
      totalStudents
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to seed' }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}