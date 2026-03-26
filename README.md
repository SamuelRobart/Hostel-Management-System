# Hostel Management System

A comprehensive web application for managing hostel operations for the Social Justice Department, Government of Tamil Nadu. Built with Next.js, MongoDB, and TypeScript.

## 🏢 System Overview

- **Total Hostels**: 10 (8 Girls, 2 Boys)
- **Total Capacity**: 350 students (35 per hostel)
- **Locations**: Coimbatore district
- **Wardens**: 10 dedicated staff members

## 🚀 Features

### For Students
- **Authentication**: Login with phone number and date of birth
- **Profile Management**: View personal details and hostel information
- **Issue Reporting**: Submit complaints and track their status
- **Menu Viewing**: Check weekly hostel menu
- **Dashboard**: Personalized student dashboard

### For Wardens
- **Student Management**: View and manage students in their hostel
- **Issue Management**: Handle student complaints and issues
- **Dashboard**: Hostel-specific management interface

### For Administrators
- **Complete System Access**: Manage all hostels and users
- **Student Management**: Add, view, and manage all students
- **Issue Oversight**: Monitor all issues across hostels
- **Statistics**: Real-time hostel occupancy and statistics
- **Warden Directory**: Manage warden assignments

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT with HTTP-only cookies
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud)
- npm or yarn

## ⚡ Quick Setup

### 1. Clone and Install
```bash
git clone <repository-url>
cd hostel-management-system
npm install
```

### 2. Database Setup
```bash
# Start MongoDB (if local)
mongod

# Initialize database with sample data
node init-db.js
```

### 3. Environment Configuration
Create `.env.local`:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/hostel-management
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### 4. Run Application
```bash
npm run dev
```

Visit `http://localhost:3000`

## 🔐 Default Login Credentials

### Admin Access
- **Username**: `admin`
- **Password**: `admin123`

### Warden Access
- **Phone**: `9876543210` to `9876543219`
- **Password**: `warden123`

### Student Access (Sample)
- **Phone**: `9876543001`, **DOB**: `2003-05-15` (Aishwarya Lakshmi)
- **Phone**: `9876543002`, **DOB**: `2003-08-22` (Divya Bharathi)
- **Phone**: `9876543003`, **DOB**: `2003-12-10` (Priya Dharshini)

## 🏠 Hostel Locations

### Girls Hostels (8)
1. Perur
2. Singanallur  
3. Peelamedu
4. Goundampalayam
5. Vellakinar
6. Nayakkanpalayam
7. Thondamuthur
8. Masakkalipalayam

### Boys Hostels (2)
1. Kinathukadavu
2. Ondipudur

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Students
- `GET /api/students/list` - Get all students
- `POST /api/students/add` - Add new student
- `GET /api/student/profile` - Get student profile

### Admin
- `GET /api/admin/stats` - Get hostel statistics

### Wardens
- `GET /api/warden/students` - Get warden's hostel students

### Issues
- `GET /api/issues` - Get issues (role-based)
- `POST /api/issues` - Create new issue
- `PATCH /api/issues/[id]` - Update issue status

### Menu
- `GET /api/menu` - Get weekly menu

### Database Seeding
- `POST /api/seed` - Initialize database with sample data

## 🗂️ Project Structure

```
src/
├── app/
│   ├── admin/           # Admin pages
│   ├── student/         # Student pages  
│   ├── warden/          # Warden pages
│   ├── api/             # API routes
│   ├── login/           # Login page
│   └── page.tsx         # Home page
├── lib/
│   ├── mongodb.ts       # Database connection
│   └── config.ts        # Configuration
├── models/              # MongoDB schemas
├── utils/               # Utility functions
└── middleware.ts        # Route protection
```

## 🔧 Development

### Adding New Students
1. Use admin dashboard "Add Student" feature
2. Or use API endpoint `/api/students/add`
3. Or run database scripts

### Managing Issues
- Students can report issues through their dashboard
- Wardens can manage issues for their hostel
- Admins have oversight of all issues

### Database Operations
```bash
# Reset database
node init-db.js

# Check database via API
curl http://localhost:3000/api/admin/stats
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables (Production)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostel-management
JWT_SECRET=your-production-secret-key
NODE_ENV=production
```

## 📊 Features in Detail

### Student Dashboard
- Personal profile information
- Hostel assignment details
- Quick access to menu and issues
- Room allocation information

### Warden Dashboard  
- List of assigned hostel students
- Issue management interface
- Student search functionality
- Hostel statistics

### Admin Dashboard
- Complete system overview
- All hostel statistics
- Student management across hostels
- Issue monitoring and resolution
- Warden directory

### Issue Management System
- Category-based issue reporting
- Priority levels (Low, Medium, High, Urgent)
- Status tracking (Pending, In Progress, Resolved, Closed)
- Role-based access and management

## 🔒 Security Features

- JWT-based authentication
- HTTP-only cookies
- Role-based access control
- Input validation and sanitization
- Protected API routes

## 📞 Support

For technical support or questions about the hostel management system, contact the system administrator.

## 📄 License

This project is developed for the Social Justice Department, Government of Tamil Nadu.

---

**Government of Tamil Nadu - Social Justice Department**  
*Digital India Initiative - Hostel Management System*