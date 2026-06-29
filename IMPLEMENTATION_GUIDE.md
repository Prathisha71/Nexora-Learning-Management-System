# Nexora Learning - Account Creation & Subscription Workflow Implementation

## Overview
This document describes the complete workflow for user account creation, email credential delivery, student access pass activation, and administrator user management in the Nexora Learning platform.

---

## Complete Workflow Flow

### 1. **User Registration (SignupPage)**
**Path:** `src/components/SignupPage.tsx`

**What Happens:**
- User fills in registration form with:
  - Full Name
  - Gmail / Academic Email Address
  - Location / State
  - Academic Role (Student/Teacher)
  - Class & Board Selection

**Process:**
```
User clicks "Create Account"
  ↓
Form validation
  ↓
API call: POST /api/auth/signup
  ↓
Backend creates user with:
  - Generated secure password (12 chars with special characters)
  - Hashed password stored in database
  ↓
Backend sends credentials email (via Gmail SMTP if configured)
  ↓
Frontend redirects to GetCredentialsPage / Subscription Pass
```

---

### 2. **Signup Backend (server/routes/auth.ts)**

**POST /api/auth/signup**

**Input:**
```json
{
  "email": "student@gmail.com",
  "firstName": "Aarav",
  "lastName": "Sharma",
  "role": "STUDENT",
  "boardId": "tnsb",
  "classId": "class-12"
}
```

**Backend Process:**
```typescript
1. Validate email doesn't exist
2. Generate secure password (12 chars)
3. Hash password with bcrypt
4. Create user in database with associated Student Profile
5. Return success response
```

---

### 3. **Administrator Student Activation Workflow**

**Path:** `src/components/AdminPortal.tsx`

**What Happens:**
- Administrators log into the Admin Portal (`http://localhost:5173/#/login-educator`).
- Admin registers scholars directly or locates registered students in the **Scholar Directory**.
- Admin clicks the **Activate / Edit Subscription (Pencil)** icon.
- Admin inputs a temporary password and clicks **Send Activation Email**.

**API Endpoint:** `POST /api/auth/users/:id/activate`
- Hashes and updates student password in database.
- Marks student subscription status to `ACTIVE`.
- Sends subscription confirmation email with portal login instructions.

---

### 4. **Email Service (server/lib/emailService.ts)**

**Email Functions:**
1. `sendCredentialsEmail()` — Dispatched upon registration to deliver initial credentials.
2. `sendSubscriptionConfirmationEmail()` — Dispatched upon subscription activation.
3. `sendOtpEmail()` — Dispatched for password recovery OTP generation.

**Gmail SMTP Configuration (`.env`):**
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-16-character-app-password"
SMTP_FROM="Nexora Learning <your-email@gmail.com>"
```

---

### 5. **Environment Configuration**

**File:** `.env`

```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/lms_db"
PORT=3000
JWT_SECRET="eduverse-dev-secret-change-in-production"
VITE_API_URL="http://localhost:3000/api"
ADMIN_SEED_PASSWORD="password123"
```

---

### 6. **Database & Seeding**

- **Database Engine:** Embedded PostgreSQL (`.pgdata` running on port 5432).
- **Default Seeded Admin Account:** `admin@nexoralearning.com` / `password123`.
- **Command:** `npm run db:setup` or `npx prisma db seed`.

---

**Last Updated:** June 2026  
**Status:** Implemented & Operational
