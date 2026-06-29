# Quick Start Guide — Nexora LMS

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

---

### Step 1: Install Dependencies
```bash
npm install
```

---

### Step 2: Set Up Database & Environment
Run the automated database setup script to configure `.env`, initialize embedded PostgreSQL, run migrations, and seed initial curriculum and admin data:
```bash
npm run db:setup
```

---

### Step 3: Start Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

### Step 4: Login Credentials

- **Administrator Portal:**
  - **Email:** `admin@nexoralearning.com`
  - **Password:** `password123`
  - **URL:** [http://localhost:5173/#/login-educator](http://localhost:5173/#/login-educator)

- **Student Portal:**
  - Self-register on the student signup page or register via Admin Portal.

---

## 📚 Project Structure

```
Nexora/
├── prisma/
│   ├── schema.prisma       # Database schema (20+ models)
│   ├── seed.ts             # Initial data seeder
│   └── tnsb-data.ts        # Tamil Nadu State Board curriculum data
├── server/                 # Express API server
│   ├── index.ts            # Entry point
│   ├── lib/                # Database and mail services
│   ├── middleware/         # Auth & role verification
│   └── routes/             # REST API endpoints
├── src/                    # React frontend application
│   ├── components/         # UI Components (Admin, Student, Teacher, Live Classroom)
│   ├── services/           # API service client
│   └── store/              # Zustand state management
├── scripts/
│   └── setup-db.ts         # Embedded PostgreSQL setup script
└── README.md               # Main repository documentation
```

---

## 🎯 Key Features

### For Students
- **Interactive Dashboard**: Track learning progress, streaks, and XP points.
- **Deep Lectures & Video Player**: Stream protected lecture videos with progress tracking.
- **Quiz Assessment Center**: Attempt topic-aligned multiple choice quizzes.
- **AI Tutor Assistant**: 24/7 AI learning support powered by Google Gemini.

### For Educators & Administrators
- **Admin Management Portal**: Manage academic hierarchy (Boards, Classes, Subjects, Units, Topics).
- **Scholar & Educator Directory**: Register new scholars, issue credentials, and activate student access passes.
- **Live Classroom Hub**: Host real-time video sessions with LiveKit streaming.
- **DRM Video Shield Console**: Oversee video encryption and content delivery security.

---

## 🛠️ Essential Development Commands

```bash
# Start both client and server concurrently
npm run dev

# Open Prisma Studio GUI
npm run db:studio

# Run database setup & seeding again
npm run db:setup

# Build production application
npm run build
```

---

**Happy coding with Nexora LMS! 🎉**
