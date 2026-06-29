# 🎓 Nexora LMS — Learning Management System

Nexora LMS is a comprehensive, modern full-stack Learning Management System tailored for Class 9–12 scholars and educators, featuring AI tutoring, interactive quizzes, video streaming, and robust administrator management.

---

## 🚀 Quick Start

Follow these simple commands to get the application up and running locally:

```bash
# 1. Install dependencies
npm install

# 2. Automatically initialize embedded PostgreSQL, apply migrations, and seed data
npm run db:setup

# 3. Start development server (Frontend + Backend concurrent)
npm run dev
```

- **Frontend Application:** [http://localhost:5173](http://localhost:5173)
- **Backend API Endpoint:** [http://localhost:3000/api](http://localhost:3000/api)

---

## 🔑 Default Administrator Credentials

After running `npm run db:setup` or `npx prisma db seed`, you can log into the **Educator / Admin Portal**:

| Portal Role | Academic Email | Password |
|---|---|---|
| **Administrator** | `admin@nexoralearning.com` | `password123` |

*(Note: Educators/Teachers are registered via the Admin Portal. Scholars self-register or are registered by admins).*

---

## 🛠️ Key Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs both Vite frontend and Express server concurrently |
| `npm run dev:client` | Runs frontend Vite server only (`localhost:5173`) |
| `npm run dev:server` | Runs backend Express API server only (`localhost:3000`) |
| `npm run db:setup` | Automates embedded PostgreSQL startup, schema synchronization, and seeding |
| `npm run db:studio` | Launches Prisma Studio GUI to view and edit database tables |
| `npm run build` | Builds production artifacts |

---

## 🗄️ Database Setup

Nexora LMS includes an **Embedded PostgreSQL** instance (`.pgdata`) that automatically runs locally on port `5432` without requiring a pre-installed standalone PostgreSQL server.

Alternatively, if using an external PostgreSQL server or Docker:
```bash
docker compose up -d
```
Update the `DATABASE_URL` in your `.env` file accordingly.

---

## 💻 Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS, Lucide Icons, Zustand
- **Backend:** Node.js, Express, TypeScript, Prisma ORM, Nodemailer (Gmail SMTP)
- **Database:** PostgreSQL (with embedded local fallback support)
- **Integrations:** LiveKit (Interactive Classrooms), Google Gemini AI (AI Tutor)

---

## 📦 Repository

[https://github.com/Prathisha71/Nexora-Learning-Management-System.git](https://github.com/Prathisha71/Nexora-Learning-Management-System.git)
