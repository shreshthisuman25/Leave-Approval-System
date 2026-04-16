# How to Create a Doctor Account

## Overview
Doctors are a special role in the system that can review medical leave requests and conduct virtual appointments with employees.

## Steps to Create a Doctor Account

### 1. Create Medical Review Department (if not exists)

First, you need to ensure a "Medical Review" department exists:

1. Log in as an **Admin**
2. Navigate to **Department Management** from the sidebar
3. Click **Add Department**
4. Create a department with:
   - **Name**: `Medical Review`
   - **Description**: `Department for medical review and virtual appointments`
5. Click **Create**

### 2. Create Doctor User Account

1. Log in as an **Admin** or **Manager**
2. Navigate to **User Management** from the sidebar
3. Click **Add User** button
4. Fill in the form:
   - **Name**: Doctor's full name (e.g., "Dr. John Smith")
   - **Email**: Doctor's email address
   - **Employee ID**: Unique employee ID (e.g., "DOC001")
   - **Department**: Select **Medical Review** (created in step 1)
   - **Role**: Select **Doctor** from the dropdown
   - **Manager**: Optional (can be left empty or assigned to a manager)
   - **Position**: Doctor's position/qualification (e.g., "MBBS", "MD", "Senior Medical Officer")
   - **Phone**: Doctor's contact number
5. Click **Create**

### 3. Set Up Google Calendar Integration (Optional but Recommended)

For doctors to create appointments with automatic Google Meet links:

1. Log in as the **Doctor** account
2. Navigate to **Profile** from the user menu (top right)
3. Scroll down to **Google Calendar Integration** section
4. Click **Connect Google Account**
5. Authorize the application to access Google Calendar
6. You'll be redirected back to the dashboard

### 4. Verify Doctor Account

After creating the doctor account, verify:

1. The doctor can log in with their email and password
2. The doctor sees **Medical Review** and **Appointments** in the sidebar
3. The doctor can access pending medical reviews
4. The doctor can create appointments (if Google is connected)

## Doctor Capabilities

Once a doctor account is created, doctors can:

- ✅ View pending leave requests requiring medical review
- ✅ Schedule virtual appointments with employees
- ✅ Automatically generate Google Meet links (if Google is connected)
- ✅ Approve or reject leave requests after medical review
- ✅ View all their scheduled appointments
- ✅ Join virtual meetings via provided links

## Important Notes

- **Department Requirement**: Doctors must be assigned to a department (preferably "Medical Review")
- **Google Integration**: While optional, connecting Google Calendar enables automatic Meet link generation
- **Role Permissions**: Doctors have access to:
  - Medical Review page (view pending reviews)
  - Appointments page (create/manage appointments)
  - All standard employee features (leave requests, records, etc.)

## Troubleshooting

**Issue**: Doctor role not showing in dropdown
- **Solution**: Make sure you're logged in as Admin or Manager, and refresh the page

**Issue**: Doctor can't see Medical Review page
- **Solution**: Verify the user's role is set to "doctor" in the database

**Issue**: Google Meet links not generating
- **Solution**: Ensure the doctor has connected their Google account in Profile settings

## API Endpoints for Doctors

- `GET /api/leaves/medical/pending` - Get pending medical reviews
- `POST /api/leaves/medical/approve/:id` - Approve/reject leave request
- `GET /api/leaves/medical/my-appointments` - Get doctor's appointments
- `POST /api/appointments/create` - Create appointment with Meet link
- `GET /api/google/status` - Check Google connection status
- `GET /api/google/auth` - Initiate Google OAuth

