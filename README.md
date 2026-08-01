# 🏨 Elite Hostel Management System

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

> **Live Deployment:** [https://hostel-management-system-one-taupe.vercel.app/](https://hostel-management-system-one-taupe.vercel.app/)

A premium, comprehensive web application for managing modern hostel operations. Built with a focus on performance, user experience, and scalability, this Elite Hostel Management System streamlines administrative workflows, simplifies issue tracking, and provides dedicated dashboards for Students, Wardens, and Administrators.

---

## 🌟 Key Features

### 🎓 For Students
- **Secure Authentication**: Password-less login using Phone Number and Date of Birth.
- **Personalized Dashboard**: View personal profile, allocated room details, and hostel information.
- **Smart Issue Tracking**: Submit maintenance or administrative complaints and monitor resolution status in real-time.
- **Weekly Menu Viewer**: Quick access to the updated hostel dining menu.

### 🛡️ For Wardens
- **Hostel Overview**: Dedicated interface for managing students assigned to their specific hostel.
- **Complaint Resolution**: Review, assign priority, and update statuses of student issues.
- **Student Directory**: Easily search and monitor student records within their jurisdiction.

### 👑 For Administrators
- **Global Dashboard**: Comprehensive analytics, occupancy rates, and real-time statistics across all hostels.
- **Complete User Management**: Add, update, and manage records for all students and wardens.
- **System Oversight**: Track global issue resolution metrics and manage warden assignments.

---

## 🏗️ System Architecture & Technology Stack

The application leverages a modern, full-stack JavaScript architecture:

- **Frontend**: Next.js 14 (App Router) with React, styled using Tailwind CSS and Lucide React icons for a responsive, premium UI.
- **Backend**: Next.js API Routes (Serverless Functions) providing a robust RESTful API.
- **Database**: MongoDB (Atlas) integrated via Mongoose with strict schema validation.
- **Authentication**: Custom JWT-based authentication utilizing HTTP-only cookies for enhanced security.
- **Type Safety**: End-to-end TypeScript implementation.

---

## 🏢 Infrastructure Overview

The system currently scales to manage:
- **Total Capacity**: 350 students across 10 distinct properties (8 Girls, 2 Boys Hostels).
- **Dedicated Staff**: 10 Warden accounts.

---

## 🚀 Live Deployment

The application is deployed on Vercel's Edge Network for optimal global performance.

- **Production URL**: [https://hostel-management-system-one-taupe.vercel.app/](https://hostel-management-system-one-taupe.vercel.app/)
- **Hosting**: Vercel (Serverless Next.js deployment)
- **Database**: MongoDB Atlas Cloud Cluster

---

## 💻 Local Development Setup

To run this project locally, ensure you have **Node.js 18+** installed.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd hostel-management-system
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory and add the following variables:
```env
# Database Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/hostel-management
# Or use MongoDB Atlas URI for cloud connection:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hostel-management

# Security
JWT_SECRET=your_super_secret_jwt_key_here

# Environment
NODE_ENV=development
```

### 3. Database Seeding (Optional)
To populate the database with sample data (students, wardens, hostels):
```bash
node init-db.js
```

### 4. Start Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the application.

---

## 🔐 Demo Credentials

Use these credentials to explore the different role-based views in the application:

### Admin Access
- **Username**: `admin`
- **Password**: `admin123`

### Warden Access
- **Phone**: `9876543210` *(Any number up to 9876543219)*
- **Password**: `warden123`

### Student Access
- **Phone**: `9876543001`
- **DOB**: `2003-05-15` *(Format: YYYY-MM-DD)*

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── admin/           # Administrator dashboard & routes
│   ├── student/         # Student portal & routes
│   ├── warden/          # Warden management & routes
│   ├── api/             # Serverless API endpoints
│   ├── login/           # Authentication interfaces
│   └── page.tsx         # Landing page
├── lib/
│   ├── mongodb.ts       # MongoDB connection client & utilities
│   └── config.ts        # Global configuration constants
├── models/              # Mongoose database schemas
├── utils/               # Helper functions & shared logic
└── middleware.ts        # Next.js edge middleware for route protection
```

---

## 🔒 Security Practices

- **Route Protection**: Next.js Middleware intercepts and validates JWT tokens before granting route access.
- **Data Integrity**: Mongoose schemas enforce strict data validation before database insertion.
- **XSS & CSRF Prevention**: Utilizing React's built-in escaping and secure, HTTP-only cookies for token storage.

---

*Engineered for Excellence — Elite Hostel Management System*