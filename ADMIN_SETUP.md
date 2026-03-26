# Admin Setup Guide - Database Validation Only

This guide explains how to set up and manage admin accounts without using the `seed-admins.js` file. All validation is done directly from the database.

## Method 1: Using the Admin Setup Page (Recommended)

### Step 1: Initialize Default Admins

1. Navigate to: `http://localhost:3000/admin-setup`
2. Scroll to "Initialize Default Admins" section
3. Enter the initialization password: `2026`
4. Click "Initialize Default Admins"

This will create three default admin accounts:
- Username: `admin` | Password: `admin123`
- Username: `samuel` | Password: `samuel2026`
- Username: `hostel_admin` | Password: `hostel123`

### Step 2: Add Additional Admins (Optional)

1. Fill in the "Add New Admin" form
2. Enter desired username and password
3. Click "Add Admin"

### Step 3: View and Manage Existing Admins

The page shows all existing admins with options to delete them.

---

## Method 2: Using API Endpoints

### Initialize Default Admins

```bash
curl -X POST http://localhost:3000/api/admin/manage \
  -H "Content-Type: application/json" \
  -d '{
    "action": "init",
    "adminPassword": "init@2024"
  }'
```

### Add a New Admin

```bash
curl -X POST http://localhost:3000/api/admin/manage \
  -H "Content-Type: application/json" \
  -d '{
    "action": "add",
    "username": "newadmin",
    "password": "newpassword123"
  }'
```

### List All Admins

```bash
curl -X POST http://localhost:3000/api/admin/manage \
  -H "Content-Type: application/json" \
  -d '{
    "action": "list"
  }'
```

### Delete an Admin

```bash
curl -X POST http://localhost:3000/api/admin/manage \
  -H "Content-Type: application/json" \
  -d '{
    "action": "delete",
    "username": "adminname"
  }'
```

---

## Admin Login

After setting up admins:

1. Navigate to: `http://localhost:3000/admin-login`
2. Enter admin username and password
3. Click "Login"

The system validates credentials directly from the MongoDB database.

---

## Database Validation

### Admin Model (`src/models/Admin.ts`)

```typescript
interface IAdmin {
  _id: ObjectId;
  username: string;        // lowercase, unique, indexed
  password: string;        // plain text or hashed
  createdAt: Date;
  updatedAt: Date;
}
```

### Admin Login API (`src/app/api/auth/admin/route.ts`)

The API:
1. Connects to MongoDB
2. Finds admin by username (case-insensitive)
3. Compares password (supports both plain text and hashed)
4. Generates JWT token on success
5. Returns token and user info

---

## Environment Variables

Optional: Set custom initialization password in `.env.local`

```env
ADMIN_INIT_PASSWORD=your_custom_password
```

Default: `init@2024`

---

## Troubleshooting

### No admins in database
- Go to `/admin-setup` and click "Initialize Default Admins"
- Enter password: `init@2024`

### Login fails but admin exists
- Check browser console for error details
- Verify admin username and password
- Ensure MongoDB is connected

### Can't access admin setup page
- Verify application is running: `npm run dev`
- Check that MongoDB connection is working

---

## Notes

- ✅ All admin data is validated from MongoDB
- ✅ No .js seed files needed
- ✅ Admins can be managed through web interface
- ✅ Database-first architecture for security
- ✅ Admin credentials stored in database, not in code
