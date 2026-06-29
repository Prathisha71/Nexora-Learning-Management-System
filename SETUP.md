# Setup Guide — Nexora LMS

This document details the configuration and initialization steps for local setup and production deployments of the Nexora LMS application.

---

## 1. Automated Quick Setup (Recommended)

Nexora LMS comes with an automated database and server setup script.

```bash
# Install dependencies
npm install

# Initialize embedded PostgreSQL database, run migrations, and seed default data
npm run db:setup

# Start development servers (Client + API)
npm run dev
```

---

## 2. PostgreSQL Database Setup

Nexora LMS uses PostgreSQL as its primary relational database.

### Embedded PostgreSQL Fallback
If local PostgreSQL is not installed on the system, the application automatically uses an **Embedded PostgreSQL** instance (`.pgdata`) which initializes, configures user/password (`postgres` / `postgres`), creates `lms_db` on port **5432**, and starts up alongside the application.

### Manual PostgreSQL Configuration (Optional)
If you prefer using an external PostgreSQL server or Docker container:
1. Ensure PostgreSQL (v14+) is running on port **5432**.
2. Create a database named `lms_db`.
3. Configure your `DATABASE_URL` in `.env`.

---

## 3. Environment Variables

Create a `.env` file in the project root directory and configure your variables:

```env
# Database URL (Port 5432)
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/lms_db"

# Backend Server Port
PORT=3000

# Authentication Secret
JWT_SECRET="eduverse-dev-secret-change-in-production"

# Frontend API Endpoint
VITE_API_URL="http://localhost:3000/api"

# Default Admin Seed Password
ADMIN_SEED_PASSWORD="password123"

# AI Tutor Integration (Optional)
GEMINI_API_KEY="your-gemini-api-key-here"

# LiveKit Classroom Integration (Optional)
LIVEKIT_URL="your-livekit-url"
LIVEKIT_API_KEY="your-livekit-key"
LIVEKIT_API_SECRET="your-livekit-secret"
VITE_LIVEKIT_URL="your-livekit-url"

# ─── Gmail SMTP Configuration (Optional for email dispatch) ───────────────────
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-16-character-gmail-app-password"
SMTP_FROM="Nexora Learning <your-email@gmail.com>"

# ─── MinIO (S3-compatible local object storage) ──────────────────────────────
MINIO_ENDPOINT="localhost"
MINIO_PORT=9000
MINIO_ACCESS_KEY="minioadmin"
MINIO_SECRET_KEY="minioadmin123"
MINIO_BUCKET="lms-files"
MINIO_USE_SSL=false
```

---

## 4. Initialization Commands Reference

| Command | Action |
|---|---|
| `npm install` | Installs all required Node modules |
| `npm run db:setup` | Starts database, pushes Prisma schema, and seeds data |
| `npx prisma db seed` | Re-seeds database with initial admin and curriculum data |
| `npx prisma studio` | Opens Prisma Studio GUI at `http://localhost:5555` |
| `npm run dev` | Starts frontend (`:5173`) and backend (`:3000`) |

---

## 5. Admin Portal Credentials

Once initialized, access the Administrator portal at **[http://localhost:5173/#/login-educator](http://localhost:5173/#/login-educator)**:
- **Academic Email:** `admin@nexoralearning.com`
- **Password:** `password123`
