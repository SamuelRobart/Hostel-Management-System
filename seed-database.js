const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/hostel-management';

const sampleData = {
  // Sample Hostels - 7 Girls + 6 Boys (Each with 10 rooms, 5 beds per room = 50 capacity)
  hostels: [
    // GIRLS HOSTELS (7)
    {
      name: 'Social Justice Hostel - Girls',
      location: 'Perur',
      totalCapacity: 50,
      currentOccupancy: 38,
      totalRooms: 10,
      totalBeds: 50,
      floors: 3,
      facilities: ['WiFi', 'Mess', 'Library', 'Recreation Room', 'Laundry', 'Medical Room'],
      address: 'Perur, Coimbatore District',
      contactNumber: '0422-2345678'
    },
    {
      name: 'Social Justice Hostel - Girls',
      location: 'Singanallur',
      totalCapacity: 50,
      currentOccupancy: 42,
      totalRooms: 10,
      totalBeds: 50,
      floors: 3,
      facilities: ['WiFi', 'Mess', 'Study Hall', 'Medical Room', 'Computer Lab', 'Gym'],
      address: 'Singanallur, Coimbatore District',
      contactNumber: '0422-2345679'
    },
    {
      name: 'Social Justice Hostel - Girls',
      location: 'Peelamedu',
      totalCapacity: 50,
      currentOccupancy: 40,
      totalRooms: 10,
      totalBeds: 50,
      floors: 3,
      facilities: ['WiFi', 'Mess', 'Library', 'Gym', 'Recreation Room', 'Counseling Room'],
      address: 'Peelamedu, Coimbatore District',
      contactNumber: '0422-2345681'
    },
    {
      name: 'Social Justice Hostel - Girls',
      location: 'Goundampalayam',
      totalCapacity: 50,
      currentOccupancy: 36,
      totalRooms: 10,
      totalBeds: 50,
      floors: 3,
      facilities: ['WiFi', 'Mess', 'Study Hall', 'Laundry', 'Medical Room', 'Recreation Room'],
      address: 'Goundampalayam, Coimbatore District',
      contactNumber: '0422-2345682'
    },
    {
      name: 'Social Justice Hostel - Girls',
      location: 'Vellakinar',
      totalCapacity: 50,
      currentOccupancy: 45,
      totalRooms: 10,
      totalBeds: 50,
      floors: 3,
      facilities: ['WiFi', 'Mess', 'Library', 'Computer Lab', 'Laundry', 'Medical Room'],
      address: 'Vellakinar, Coimbatore District',
      contactNumber: '0422-2345683'
    },
    {
      name: 'Social Justice Hostel - Girls',
      location: 'Nayakkanpalayam',
      totalCapacity: 50,
      currentOccupancy: 39,
      totalRooms: 10,
      totalBeds: 50,
      floors: 3,
      facilities: ['WiFi', 'Mess', 'Study Hall', 'Gym', 'Laundry', 'Medical Room'],
      address: 'Nayakkanpalayam, Coimbatore District',
      contactNumber: '0422-2345684'
    },
    {
      name: 'Social Justice Hostel - Girls',
      location: 'Thondamuthur',
      totalCapacity: 50,
      currentOccupancy: 43,
      totalRooms: 10,
      totalBeds: 50,
      floors: 3,
      facilities: ['WiFi', 'Mess', 'Library', 'Recreation Room', 'Medical Room', 'Computer Lab'],
      address: 'Thondamuthur, Coimbatore District',
      contactNumber: '0422-2345685'
    },
    // BOYS HOSTELS (6)
    {
      name: 'Social Justice Hostel - Boys',
      location: 'Kinathukadavu',
      totalCapacity: 50,
      currentOccupancy: 35,
      totalRooms: 10,
      totalBeds: 50,
      floors: 3,
      facilities: ['WiFi', 'Mess', 'Sports Room', 'Computer Lab', 'Laundry', 'Medical Room'],
      address: 'Kinathukadavu, Coimbatore District',
      contactNumber: '0422-2345690'
    },
    {
      name: 'Social Justice Hostel - Boys',
      location: 'Masakkalipalayam',
      totalCapacity: 50,
      currentOccupancy: 41,
      totalRooms: 10,
      totalBeds: 50,
      floors: 3,
      facilities: ['WiFi', 'Mess', 'Gym', 'Sports Room', 'Computer Lab', 'Recreation Room'],
      address: 'Masakkalipalayam, Coimbatore District',
      contactNumber: '0422-2345691'
    },
    {
      name: 'Social Justice Hostel - Boys',
      location: 'Ondipudur',
      totalCapacity: 50,
      currentOccupancy: 38,
      totalRooms: 10,
      totalBeds: 50,
      floors: 3,
      facilities: ['WiFi', 'Mess', 'Study Hall', 'Medical Room', 'Laundry', 'Recreation Room'],
      address: 'Ondipudur, Coimbatore District',
      contactNumber: '0422-2345692'
    },
    {
      name: 'Social Justice Hostel - Boys',
      location: 'Karamadai',
      totalCapacity: 50,
      currentOccupancy: 44,
      totalRooms: 10,
      totalBeds: 50,
      floors: 3,
      facilities: ['WiFi', 'Mess', 'Sports Room', 'Gym', 'Computer Lab', 'Medical Room'],
      address: 'Karamadai, Coimbatore District',
      contactNumber: '0422-2345693'
    },
    {
      name: 'Social Justice Hostel - Boys',
      location: 'Sulur',
      totalCapacity: 50,
      currentOccupancy: 37,
      totalRooms: 10,
      totalBeds: 50,
      floors: 3,
      facilities: ['WiFi', 'Mess', 'Library', 'Recreation Room', 'Laundry', 'Medical Room'],
      address: 'Sulur, Coimbatore District',
      contactNumber: '0422-2345694'
    },
    {
      name: 'Social Justice Hostel - Boys',
      location: 'Pappanaickenpalayam',
      totalCapacity: 50,
      currentOccupancy: 46,
      totalRooms: 10,
      totalBeds: 50,
      floors: 3,
      facilities: ['WiFi', 'Mess', 'Sports Room', 'Study Hall', 'Computer Lab', 'Medical Room'],
      address: 'Pappanaickenpalayam, Coimbatore District',
      contactNumber: '0422-2345695'
    }
  ],

  // Sample Users (Students and Wardens)
  users: [
    // Students
    {
      name: 'Aishwarya Lakshmi',
      phone: '9876543001',
      role: 'student',
      dateOfBirth: new Date('2003-05-15'),
      fatherName: 'Raman',
      motherName: 'Lakshmi',
      email: 'aishwarya@email.com',
      alternatePhone: '9876543050',
      native: 'Tirupur',
      address: '123 Main St, Tirupur',
      course: 'B.A English',
      college: 'Government Arts College',
      appliedColleges: ['Government Arts College', 'PSG College of Arts and Science', 'Sri Ramakrishna College of Arts and Science'],
      income: '₹45000 per annum',
      percentage12th: '85%',
      caste: 'BC',
      aadhaarNumber: '123456789012',
      communityCertificateNumber: 'CC-TN-2020-0001',
      photoUrl: 'aishwarya_photo.jpg',
      documents: [
        { type: 'aadhaar', documentUrl: 'aishwarya_aadhaar.pdf' },
        { type: 'birth_certificate', documentUrl: 'aishwarya_birth_cert.pdf' },
        { type: '10th_marksheet', documentUrl: 'aishwarya_10th.pdf' },
        { type: '12th_marksheet', documentUrl: 'aishwarya_12th.pdf' },
        { type: 'bank_passbook', documentUrl: 'aishwarya_bank.pdf' },
        { type: 'community_certificate', documentUrl: 'aishwarya_community_cert.pdf' }
      ],
      bankDetails: 'SBI Account: 12345678901234, IFSC: SBIN0001234',
      hostelLocation: 'Perur'
    },
    {
      name: 'Divya Bharathi',
      phone: '9876543002',
      role: 'student',
      dateOfBirth: new Date('2003-08-22'),
      fatherName: 'Kumar',
      motherName: 'Bharathi',
      email: 'divya@email.com',
      alternatePhone: '9876543051',
      native: 'Salem',
      address: '456 Park Ave, Salem',
      course: 'B.Sc Mathematics',
      college: 'Government Science College',
      appliedColleges: ['Government Science College', 'PSG College of Arts and Science', 'Sri Ramakrishna Engineering College'],
      income: '₹38000 per annum',
      percentage12th: '78%',
      caste: 'MBC',
      aadhaarNumber: '234567890123',
      communityCertificateNumber: 'CC-TN-2020-0002',
      photoUrl: 'divya_photo.jpg',
      documents: [
        { type: 'aadhaar', documentUrl: 'divya_aadhaar.pdf' },
        { type: 'birth_certificate', documentUrl: 'divya_birth_cert.pdf' },
        { type: '10th_marksheet', documentUrl: 'divya_10th.pdf' },
        { type: '12th_marksheet', documentUrl: 'divya_12th.pdf' },
        { type: 'bank_passbook', documentUrl: 'divya_bank.pdf' }
      ],
      bankDetails: 'HDFC Account: 23456789012345, IFSC: HDFC0001234',
      hostelLocation: 'Singanallur'
    },
    {
      name: 'Priya Dharshini',
      phone: '9876543003',
      role: 'student',
      dateOfBirth: new Date('2003-12-10'),
      fatherName: 'Selvam',
      motherName: 'Meera',
      email: 'priya@email.com',
      alternatePhone: '9876543052',
      native: 'Erode',
      address: '789 Gandhi St, Erode',
      course: 'B.A Tamil',
      college: 'Government Arts College',
      appliedColleges: ['Government Arts College', 'PSG College of Arts and Science', 'Kongu Engineering College'],
      income: '₹42000 per annum',
      percentage12th: '82%',
      caste: 'SC',
      aadhaarNumber: '345678901234',
      communityCertificateNumber: 'CC-TN-2020-0003',
      photoUrl: 'priya_photo.jpg',
      documents: [
        { type: 'aadhaar', documentUrl: 'priya_aadhaar.pdf' },
        { type: 'birth_certificate', documentUrl: 'priya_birth_cert.pdf' },
        { type: '12th_marksheet', documentUrl: 'priya_12th.pdf' },
        { type: 'bank_passbook', documentUrl: 'priya_bank.pdf' },
        { type: 'community_certificate', documentUrl: 'priya_community_cert.pdf' }
      ],
      bankDetails: 'ICICI Account: 34567890123456, IFSC: ICIC0001234',
      hostelLocation: 'Peelamedu'
    },
    {
      name: 'Rajesh Kumar',
      phone: '9876543004',
      role: 'student',
      dateOfBirth: new Date('2003-03-18'),
      fatherName: 'Murugan',
      motherName: 'Kamala',
      email: 'rajesh@email.com',
      alternatePhone: '9876543053',
      native: 'Pollachi',
      address: '321 Temple St, Pollachi',
      course: 'B.Sc Computer Science',
      college: 'Government Arts College',
      appliedColleges: ['Government Science College', 'KPR Institute of Engineering and Technology', 'Amrita School of Engineering - Coimbatore'],
      income: '₹50000 per annum',
      percentage12th: '88%',
      caste: 'BC',
      aadhaarNumber: '456789012345',
      communityCertificateNumber: 'CC-TN-2020-0004',
      photoUrl: 'rajesh_photo.jpg',
      documents: [
        { type: 'aadhaar', documentUrl: 'rajesh_aadhaar.pdf' },
        { type: 'birth_certificate', documentUrl: 'rajesh_birth_cert.pdf' },
        { type: '10th_marksheet', documentUrl: 'rajesh_10th.pdf' },
        { type: '12th_marksheet', documentUrl: 'rajesh_12th.pdf' },
        { type: 'bank_passbook', documentUrl: 'rajesh_bank.pdf' },
        { type: 'community_certificate', documentUrl: 'rajesh_community_cert.pdf' }
      ],
      bankDetails: 'Axis Account: 45678901234567, IFSC: AXIS0001234',
      hostelLocation: 'Kinathukadavu'
    },
    // Wardens for all 13 hostels (2 per hostel = 26 total)
    // GIRLS HOSTELS - Perur
    {
      name: 'Mrs. Kamala Devi',
      username: 'warden1_perur',
      phone: '9876543210',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Perur'
    },
    {
      name: 'Mrs. Priya Lakshmi',
      username: 'warden2_perur',
      phone: '9876543250',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Perur'
    },
    // GIRLS HOSTELS - Singanallur
    {
      name: 'Mrs. Meena Kumari',
      username: 'warden1_singanallur',
      phone: '9876543211',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Singanallur'
    },
    {
      name: 'Mrs. Geetha Rani',
      username: 'warden2_singanallur',
      phone: '9876543251',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Singanallur'
    },
    // GIRLS HOSTELS - Peelamedu
    {
      name: 'Mrs. Meera Bai',
      username: 'warden1_peelamedu',
      phone: '9876543212',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Peelamedu'
    },
    {
      name: 'Mrs. Shanthi Kumar',
      username: 'warden2_peelamedu',
      phone: '9876543252',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Peelamedu'
    },
    // GIRLS HOSTELS - Goundampalayam
    {
      name: 'Mrs. Radha Krishnan',
      username: 'warden1_goundampalayam',
      phone: '9876543213',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Goundampalayam'
    },
    {
      name: 'Mrs. Savitri Devi',
      username: 'warden2_goundampalayam',
      phone: '9876543253',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Goundampalayam'
    },
    // GIRLS HOSTELS - Vellakinar
    {
      name: 'Mrs. Saroja Devi',
      username: 'warden1_vellakinar',
      phone: '9876543214',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Vellakinar'
    },
    {
      name: 'Mrs. Vandana Shakti',
      username: 'warden2_vellakinar',
      phone: '9876543254',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Vellakinar'
    },
    // GIRLS HOSTELS - Nayakkanpalayam
    {
      name: 'Mrs. Lakshmi Priya',
      username: 'warden1_nayakkanpalayam',
      phone: '9876543215',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Nayakkanpalayam'
    },
    {
      name: 'Mrs. Annapoorani Devi',
      username: 'warden2_nayakkanpalayam',
      phone: '9876543255',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Nayakkanpalayam'
    },
    // GIRLS HOSTELS - Thondamuthur
    {
      name: 'Mrs. Shanti Devi',
      username: 'warden1_thondamuthur',
      phone: '9876543216',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Thondamuthur'
    },
    {
      name: 'Mrs. Ravi Sangeeta',
      username: 'warden2_thondamuthur',
      phone: '9876543256',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Thondamuthur'
    },
    // BOYS HOSTELS - Kinathukadavu
    {
      name: 'Mr. Ravi Shankar',
      username: 'warden1_kinathukadavu',
      phone: '9876543217',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Kinathukadavu'
    },
    {
      name: 'Mr. Sanjay Sharma',
      username: 'warden2_kinathukadavu',
      phone: '9876543257',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Kinathukadavu'
    },
    // BOYS HOSTELS - Masakkalipalayam
    {
      name: 'Mr. Raman Kumar',
      username: 'warden1_masakkalipalayam',
      phone: '9876543218',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Masakkalipalayam'
    },
    {
      name: 'Mr. Vikram Singh',
      username: 'warden2_masakkalipalayam',
      phone: '9876543258',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Masakkalipalayam'
    },
    // BOYS HOSTELS - Ondipudur
    {
      name: 'Mr. Suresh Babu',
      username: 'warden1_ondipudur',
      phone: '9876543219',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Ondipudur'
    },
    {
      name: 'Mr. Ajay Kumar',
      username: 'warden2_ondipudur',
      phone: '9876543259',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Ondipudur'
    },
    // BOYS HOSTELS - Karamadai
    {
      name: 'Mr. Arun Kumar',
      username: 'warden1_karamadai',
      phone: '9876543220',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Karamadai'
    },
    {
      name: 'Mr. Deepak Nair',
      username: 'warden2_karamadai',
      phone: '9876543260',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Karamadai'
    },
    // BOYS HOSTELS - Sulur
    {
      name: 'Mr. Murugan Raj',
      username: 'warden1_sulur',
      phone: '9876543221',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Sulur'
    },
    {
      name: 'Mr. Janarth Vikram',
      username: 'warden2_sulur',
      phone: '9876543261',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Sulur'
    },
    // BOYS HOSTELS - Pappanaickenpalayam
    {
      name: 'Mr. Prakash Kumar',
      username: 'warden1_pappanaickenpalayam',
      phone: '9876543222',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Pappanaickenpalayam'
    },
    {
      name: 'Mr. Harish Reddy',
      username: 'warden2_pappanaickenpalayam',
      phone: '9876543262',
      password: 'warden123',
      role: 'warden',
      hostelLocation: 'Pappanaickenpalayam'
    },

    // SECURITY for all 13 hostels (3 per hostel = 39 total)
    // GIRLS HOSTELS - Perur Security
    {
      name: 'Mr. Murthy',
      username: 'security1_perur',
      phone: '9876543300',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Perur'
    },
    {
      name: 'Mr. Uthaman',
      username: 'security2_perur',
      phone: '9876543301',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Perur'
    },
    {
      name: 'Mr. Rajkumar',
      username: 'security3_perur',
      phone: '9876543302',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Perur'
    },
    // GIRLS HOSTELS - Singanallur Security
    {
      name: 'Mr. Raju',
      username: 'security1_singanallur',
      phone: '9876543303',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Singanallur'
    },
    {
      name: 'Mr. Karthik',
      username: 'security2_singanallur',
      phone: '9876543304',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Singanallur'
    },
    {
      name: 'Mr. Prakash',
      username: 'security3_singanallur',
      phone: '9876543305',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Singanallur'
    },
    // GIRLS HOSTELS - Peelamedu Security
    {
      name: 'Mr. Lokesh',
      username: 'security1_peelamedu',
      phone: '9876543306',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Peelamedu'
    },
    {
      name: 'Mr. Sandeep',
      username: 'security2_peelamedu',
      phone: '9876543307',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Peelamedu'
    },
    {
      name: 'Mr. Naveen',
      username: 'security3_peelamedu',
      phone: '9876543308',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Peelamedu'
    },
    // GIRLS HOSTELS - Goundampalayam Security
    {
      name: 'Mr. Arjun',
      username: 'security1_goundampalayam',
      phone: '9876543309',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Goundampalayam'
    },
    {
      name: 'Mr. Venkatesh',
      username: 'security2_goundampalayam',
      phone: '9876543310',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Goundampalayam'
    },
    {
      name: 'Mr. Balaji',
      username: 'security3_goundampalayam',
      phone: '9876543311',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Goundampalayam'
    },
    // GIRLS HOSTELS - Vellakinar Security
    {
      name: 'Mr. Sathish',
      username: 'security1_vellakinar',
      phone: '9876543312',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Vellakinar'
    },
    {
      name: 'Mr. Dinesh',
      username: 'security2_vellakinar',
      phone: '9876543313',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Vellakinar'
    },
    {
      name: 'Mr. Anand',
      username: 'security3_vellakinar',
      phone: '9876543314',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Vellakinar'
    },
    // GIRLS HOSTELS - Nayakkanpalayam Security
    {
      name: 'Mr. Harsh',
      username: 'security1_nayakkanpalayam',
      phone: '9876543315',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Nayakkanpalayam'
    },
    {
      name: 'Mr. Kumar',
      username: 'security2_nayakkanpalayam',
      phone: '9876543316',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Nayakkanpalayam'
    },
    {
      name: 'Mr. Ramesh',
      username: 'security3_nayakkanpalayam',
      phone: '9876543317',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Nayakkanpalayam'
    },
    // GIRLS HOSTELS - Thondamuthur Security
    {
      name: 'Mr. Ashok',
      username: 'security1_thondamuthur',
      phone: '9876543318',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Thondamuthur'
    },
    {
      name: 'Mr. Varun',
      username: 'security2_thondamuthur',
      phone: '9876543319',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Thondamuthur'
    },
    {
      name: 'Mr. Mohan',
      username: 'security3_thondamuthur',
      phone: '9876543320',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Thondamuthur'
    },
    // BOYS HOSTELS - Kinathukadavu Security
    {
      name: 'Mr. Devendra',
      username: 'security1_kinathukadavu',
      phone: '9876543321',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Kinathukadavu'
    },
    {
      name: 'Mr. Rajendra',
      username: 'security2_kinathukadavu',
      phone: '9876543322',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Kinathukadavu'
    },
    {
      name: 'Mr. Aditya',
      username: 'security3_kinathukadavu',
      phone: '9876543323',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Kinathukadavu'
    },
    // BOYS HOSTELS - Masakkalipalayam Security
    {
      name: 'Mr. Somesh',
      username: 'security1_masakkalipalayam',
      phone: '9876543324',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Masakkalipalayam'
    },
    {
      name: 'Mr. Prabhat',
      username: 'security2_masakkalipalayam',
      phone: '9876543325',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Masakkalipalayam'
    },
    {
      name: 'Mr. Sudhir',
      username: 'security3_masakkalipalayam',
      phone: '9876543326',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Masakkalipalayam'
    },
    // BOYS HOSTELS - Ondipudur Security
    {
      name: 'Mr. Abhishek',
      username: 'security1_ondipudur',
      phone: '9876543327',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Ondipudur'
    },
    {
      name: 'Mr. Ankit',
      username: 'security2_ondipudur',
      phone: '9876543328',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Ondipudur'
    },
    {
      name: 'Mr. Rohit',
      username: 'security3_ondipudur',
      phone: '9876543329',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Ondipudur'
    },
    // BOYS HOSTELS - Karamadai Security
    {
      name: 'Mr. Gaurav',
      username: 'security1_karamadai',
      phone: '9876543330',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Karamadai'
    },
    {
      name: 'Mr. Nitin',
      username: 'security2_karamadai',
      phone: '9876543331',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Karamadai'
    },
    {
      name: 'Mr. Mayank',
      username: 'security3_karamadai',
      phone: '9876543332',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Karamadai'
    },
    // BOYS HOSTELS - Sulur Security
    {
      name: 'Mr. Pradeep',
      username: 'security1_sulur',
      phone: '9876543333',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Sulur'
    },
    {
      name: 'Mr. Rajesh',
      username: 'security2_sulur',
      phone: '9876543334',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Sulur'
    },
    {
      name: 'Mr. Sachin',
      username: 'security3_sulur',
      phone: '9876543335',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Sulur'
    },
    // BOYS HOSTELS - Pappanaickenpalayam Security
    {
      name: 'Mr. Vivek',
      username: 'security1_pappanaickenpalayam',
      phone: '9876543336',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Pappanaickenpalayam'
    },
    {
      name: 'Mr. Aryan',
      username: 'security2_pappanaickenpalayam',
      phone: '9876543337',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Pappanaickenpalayam'
    },
    {
      name: 'Mr. Kunal',
      username: 'security3_pappanaickenpalayam',
      phone: '9876543338',
      password: 'security123',
      role: 'security',
      hostelLocation: 'Pappanaickenpalayam'
    },

    // Admin
    {
      name: 'System Administrator',
      username: 'admin',
      phone: '9876543000',
      password: 'admin123',
      role: 'admin',
      isActive: true
    }
  ],

  // Sample Rooms (will be generated dynamically)
  rooms: [],

  // Generate students per hostel
  generateStudents: function() {
    const studentNames = [
      'Aishwarya Lakshmi', 'Divya Bharathi', 'Priya Dharshini', 'Rajesh Kumar', 'Anitha Sharma',
      'Bharati Devi', 'Chitra Raj', 'Deepa Lakshmi', 'Eswari Bai', 'Fathima Begum',
      'Gayathri Devi', 'Hema Priya', 'Indira Rani', 'Janaki Devi', 'Kalpana Raj',
      'Latha Kumar', 'Malathi Devi', 'Nirmala Bai', 'Oviya Priya', 'Padma Lakshmi',
      'Quency Mary', 'Revathi Devi', 'Sujatha Raj', 'Thenmozhi Devi', 'Uma Rani',
      'Vasantha Priya', 'Wincy Rose', 'Yamuna Devi', 'Zarina Begum', 'Arjun Devi',
      'Bala Krishna', 'Chandran Raj', 'Dinesh Kumar', 'Ezhil Raman', 'Ganesh Babu',
      'Hari Krishnan', 'Ilango Raj', 'Jagan Kumar', 'Kiran Raman', 'Lokesh Kumar'
    ];

    const fatherNames = ['Raman Kumar', 'Kumar Raj', 'Selvam Devi', 'Murugan Raman', 'Krishnan Pillai',
      'Rajesh Kumar', 'Suresh Babu', 'Ravi Kumar', 'Balan Raj', 'Ganesan Babu'];
    
    const motherNames = ['Kamala Devi', 'Priya Lakshmi', 'Meera Bai', 'Saroja Devi', 'Geetha Rani',
      'Shanti Lakshmi', 'Radha Bai', 'Lakshmi Devi', 'Parvathi Rani', 'Devi Bai'];

    const courses = ['B.A English', 'B.Sc Mathematics', 'B.A Tamil', 'B.Sc Chemistry', 'B.A History',
      'B.Sc Physics', 'B.Com General', 'B.Sc Biology', 'B.Sc Computer Science', 'B.A Economics'];
    
    const colleges = ['Government Arts College', 'Government Science College', 'PSG College', 
      'Sri Ramakrishna College', 'KPR Institute', 'Amrita School of Engineering', 'Kongu Engineering'];

    const castes = ['BC', 'MBC', 'SC', 'ST', 'OBC', 'OBC-NC', 'General'];
    const natives = ['Tirupur', 'Salem', 'Erode', 'Karur', 'Namakkal', 'Dharmapuri', 'Krishnagiri'];

    const students = [];
    let phoneCounter = 9876543100;

    const hostels = [
      'Perur', 'Singanallur', 'Peelamedu', 'Goundampalayam', 'Vellakinar', 'Nayakkanpalayam', 'Thondamuthur',
      'Kinathukadavu', 'Masakkalipalayam', 'Ondipudur', 'Karamadai', 'Sulur', 'Pappanaickenpalayam'
    ];

    // Generate 40 students per hostel
    hostels.forEach(hostelLocation => {
      for (let i = 0; i < 40; i++) {
        const phoneNumber = String(phoneCounter++);
        const roomNumber = (i % 10) + 1; // Distribute across 10 rooms
        const bedNumber = Math.floor(i / 10) + 1; // 4 students per room (5 beds available)
        
        students.push({
          name: `${studentNames[i % studentNames.length]} ${i + 1}`,
          phone: phoneNumber,
          role: 'student',
          dateOfBirth: new Date(`${1999 + (i % 5)}-${(i % 12) + 1}-${(i % 28) + 1}`),
          fatherName: fatherNames[i % fatherNames.length],
          motherName: motherNames[i % motherNames.length],
          email: `student${phoneNumber}@email.com`,
          alternatePhone: String(9000000000 + phoneCounter),
          native: natives[i % natives.length],
          address: `${Math.floor(i / 10) + 1}/${(i % 10) + 1}, Street ${roomNumber}, ${hostelLocation}`,
          course: courses[i % courses.length],
          college: colleges[i % colleges.length],
          appliedColleges: [colleges[i % colleges.length], colleges[(i + 1) % colleges.length]],
          income: `₹${Math.floor(Math.random() * 150000 + 30000)} per annum`,
          percentage12th: `${Math.floor(Math.random() * 20 + 70)}%`,
          caste: castes[i % castes.length],
          aadhaarNumber: String(100000000000 + phoneNumber.slice(-10)),
          communityCertificateNumber: `CC-TN-${2020 + (i % 3)}-${String(i + 1).padStart(5, '0')}`,
          photoUrl: `student_${phoneNumber}_photo.jpg`,
          documents: [
            { type: 'aadhaar', documentUrl: `student_${phoneNumber}_aadhaar.pdf` },
            { type: 'birth_certificate', documentUrl: `student_${phoneNumber}_birth_cert.pdf` },
            { type: '12th_marksheet', documentUrl: `student_${phoneNumber}_12th.pdf` },
            { type: 'bank_passbook', documentUrl: `student_${phoneNumber}_bank.pdf` }
          ],
          bankDetails: `${['SBI', 'HDFC', 'ICICI', 'Axis'][i % 4]} Account: ${phoneNumber}${i}, IFSC: ${['SBIN', 'HDFC', 'ICIC', 'AXIS'][i % 4]}0001234`,
          hostelLocation: hostelLocation,
          roomNumber: String(roomNumber),
          bedNumber: bedNumber
        });
      }
    });

    return students;
  },

  // Sample Issues
  issues: [
    {
      title: 'WiFi Connection Problem',
      description: 'WiFi is not working in Room 101. Unable to access internet for studies.',
      category: 'Technical',
      priority: 'High',
      status: 'pending',
      studentName: 'Aishwarya Lakshmi',
      studentPhone: '9876543001',
      hostelLocation: 'Perur',
      roomNumber: '101',
      reportedAt: new Date(),
      expectedResolution: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
    },
    {
      title: 'Water Supply Issue',
      description: 'No water supply in the bathroom since morning. Need immediate attention.',
      category: 'Maintenance',
      priority: 'Urgent',
      status: 'in-progress',
      studentName: 'Divya Bharathi',
      studentPhone: '9876543002',
      hostelLocation: 'Singanallur',
      roomNumber: '201',
      reportedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      expectedResolution: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day from now
    },
    {
      title: 'Mess Food Quality',
      description: 'Food quality has been poor for the past week. Many students are falling sick.',
      category: 'Food',
      priority: 'Medium',
      status: 'resolved',
      studentName: 'Rajesh Kumar',
      studentPhone: '9876543004',
      hostelLocation: 'Kinathukadavu',
      roomNumber: '301',
      reportedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      resolvedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      expectedResolution: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Broken Study Table',
      description: 'Study table in Room 102 is broken. Need replacement or repair.',
      category: 'Furniture',
      priority: 'Low',
      status: 'closed',
      studentName: 'Priya Dharshini',
      studentPhone: '9876543003',
      hostelLocation: 'Peelamedu',
      roomNumber: '102',
      reportedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      resolvedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      closedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      expectedResolution: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ]
};

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    
    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      db.collection('hostels').deleteMany({}),
      db.collection('users').deleteMany({}),
      db.collection('rooms').deleteMany({}),
      db.collection('issues').deleteMany({})
    ]);
    
    // Insert hostels first
    console.log('Inserting hostels...');
    const hostelResult = await db.collection('hostels').insertMany(sampleData.hostels);
    const hostelIds = hostelResult.insertedIds;
    
    // Map all 13 locations to hostel IDs
    const locationToHostelId = {
      'Perur': hostelIds[0],
      'Singanallur': hostelIds[1],
      'Peelamedu': hostelIds[2],
      'Goundampalayam': hostelIds[3],
      'Vellakinar': hostelIds[4],
      'Nayakkanpalayam': hostelIds[5],
      'Thondamuthur': hostelIds[6],
      'Kinathukadavu': hostelIds[7],
      'Masakkalipalayam': hostelIds[8],
      'Ondipudur': hostelIds[9],
      'Karamadai': hostelIds[10],
      'Sulur': hostelIds[11],
      'Pappanaickenpalayam': hostelIds[12]
    };
    
    // Generate 10 rooms per hostel with 5 beds each
    console.log('Generating rooms for all 13 hostels...');
    const hostelLocations = Object.keys(locationToHostelId);
    const generatedRooms = [];
    
    hostelLocations.forEach(location => {
      // Each hostel gets 10 rooms
      for (let roomNum = 1; roomNum <= 10; roomNum++) {
        // Distribute rooms across 3 floors: 1-4 on floor 1, 5-7 on floor 2, 8-10 on floor 3
        const floor = roomNum <= 4 ? 1 : (roomNum <= 7 ? 2 : 3);
        
        generatedRooms.push({
          hostelId: locationToHostelId[location],
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
          hostelLocation: location // Keep for backward compatibility
        });
      }
    });
    
    // Generate all students (40 per hostel = 520 total)
    console.log('Generating 40 students per hostel (520 total students)...');
    const allStudents = sampleData.generateStudents();
    
    // Prepare users with hostelId and roomId assignments
    console.log('Preparing users with hostelId and room assignments...');
    const updatedUsers = [];
    
    // Add wardens from sampleData
    const wardens = sampleData.users.filter(u => u.role === 'warden');
    wardens.forEach(warden => {
      updatedUsers.push({
        ...warden,
        hostelId: warden.hostelLocation ? locationToHostelId[warden.hostelLocation] : undefined
      });
    });
    
    // Add admin from sampleData
    const admin = sampleData.users.filter(u => u.role === 'admin');
    admin.forEach(adm => {
      updatedUsers.push(adm);
    });
    
    // Add students with room assignments
    const roomMap = {}; // Track room occupancy
    generatedRooms.forEach(room => {
      const key = `${room.hostelLocation}-${room.roomNumber}`;
      roomMap[key] = { room, occupants: 0 };
    });
    
    allStudents.forEach((student, index) => {
      const roomKey = `${student.hostelLocation}-${student.roomNumber}`;
      const roomEntry = roomMap[roomKey];
      
      if (roomEntry && roomEntry.occupants < 5) {
        updatedUsers.push({
          ...student,
          hostelId: locationToHostelId[student.hostelLocation],
          roomNumber: student.roomNumber,
          bedNumber: roomEntry.occupants + 1 // Assign to next available bed
        });
        roomEntry.occupants++;
      }
    });
    
    // Update rooms with occupancy count and bed assignments
    console.log('Updating room occupancy information...');
    generatedRooms.forEach(room => {
      const key = `${room.hostelLocation}-${room.roomNumber}`;
      const occupants = roomMap[key]?.occupants || 0;
      room.currentOccupancy = occupants;
      
      // Mark beds as occupied
      for (let i = 0; i < occupants; i++) {
        room.beds[i].isOccupied = true;
      }
    });
    
    // Insert updated data
    console.log('Inserting sample data into database...');
    const userResult = await db.collection('users').insertMany(updatedUsers);
    const roomResult = await db.collection('rooms').insertMany(generatedRooms);
    const issueResult = await db.collection('issues').insertMany(sampleData.issues);
    
    console.log('\n✅ Database seeded successfully!');
    console.log(`✓ Inserted ${hostelResult.insertedCount} hostels (7 Girls + 6 Boys)`);
    console.log(`✓ Inserted ${userResult.insertedCount} users (520 students + 13 wardens + 1 admin)`);
    console.log(`✓ Inserted ${roomResult.insertedCount} rooms (10 rooms per hostel = 130 total)`);
    console.log(`✓ Inserted ${issueResult.insertedCount} issues`);
    
    console.log('\n📊 Statistics:');
    console.log('  - Hostels: 13 (7 Girls + 6 Boys)');
    console.log('  - Students per Hostel: 40');
    console.log('  - Total Students: 520');
    console.log('  - Rooms per Hostel: 10');
    console.log('  - Total Rooms: 130');
    console.log('  - Beds per Room: 5');
    console.log('  - Total Beds: 650');
    console.log('  - Average Occupancy: 40/50 (80%)');
    
    console.log('\n=== Sample Login Credentials ===');
    console.log('Admin: username=admin, password=admin123');
    console.log('Warden (Perur): username=warden_perur, password=warden123');
    console.log('Warden (Singanallur): username=warden_singanallur, password=warden123');
    console.log('Student: phone=9876543100, name=Student from generated data');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('\n✓ Database connection closed');
  }
}

// Run the seeding function
seedDatabase();