# 📌 Notice Board Application

Welcome to the **Notice Board Application**—a premium, production-ready announcements dashboard built to manage exams, events, and general updates. The application features a stunning glassmorphic interface, dark mode fallback by default, high-contrast dynamic components, and a local SQLite database that lets it run out-of-the-box.

---

## 🛠️ Tech Stack
* **Framework**: Next.js 16 (Pages Router)
* **Database Layer**: Prisma ORM with Neon (Serverless PostgreSQL)
* **Styling**: Tailwind CSS v4 + Custom Vanilla CSS for Glassmorphism
* **Icons**: FontAwesome v6
* **Components**: React Datepicker (Theme Contrast Integrated)

---

## 🚀 How to Run the Project Locally

Follow these step-by-step commands to get the application running on your local machine:

### 1. Install Dependencies
Run the installation with peer dependency fallbacks to ensure compatibility with React 19:
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables
Before running the application, make sure your `.env` file is set up (see [Environment Setup](#-environment-setup) below).

### 3. Initialize the Database
Push the Prisma schema to synchronize and create your local database file (`dev.db`):
```bash
npx prisma db push
```

### 4. Generate the Prisma Client
Generate the TypeScript client bindings for database access. *Note: Ensure your local dev server is stopped during client generation to prevent process locks.*
```bash
npx prisma generate
```

### 5. Start the Development Server
Launch the local Next.js dev server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

---

## 🔑 Environment Setup

Create a `.env` file in the root directory of your project. It should look like this:

```env
# Local SQLite development database URL (Used for fast local runs)
DATABASE_URL="file:./dev.db"

# Hosted Neon Database URL (For database synchronization and Vercel production deployment)
# DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
```

### Swapping to Neon (PostgreSQL) for Production:
1. Open `prisma/schema.prisma` and change the database provider from `"sqlite"` to `"postgresql"`.
2. Update the `DATABASE_URL` in your `.env` file with your Neon connection string.
3. Re-run `npx prisma db push` and `npx prisma generate` to sync the Neon cloud database.

---

## 💡 What We Would Improve With More Time

If we had more time to expand this notice board, we would focus on adding:
* **Authentication & Role-Based Access (RBAC)**: Currently, anyone visiting the app can create, edit, or delete notices. We would integrate **NextAuth.js** or **Clerk** to restrict edit/create permissions to Administrators (e.g., teachers, staff), while keeping the dashboard read-only for general users (e.g., students).
* **Search & Categorized Filtering**: Expand the dropdown filtering to include instant text search (fuzzy search on titles/bodies) and sorting selections (e.g., Sort by Date, Sort by Category).
* **Push Notifications**: Integrate web push notifications (or email alerts via Resend) so that users receive real-time notifications on their device the moment a notice marked **🔴 Urgent** is published.

---

## 🤖 Where and How AI Was Used

This project was built using **GitHub Copilot** as an AI pair programmer inside the code editor. It was utilized to:
* Speed up boilerplate JSX component creation and Tailwind layout configurations.
* Autocomplete structural vanilla CSS values for the glassmorphism theme components.
* Assist in writing utility functions, such as the title auto-capitalization logic.
* Draft API route structures and Prisma query logic quickly.

The AI acted as a supporting developer, accelerating implementation speed while the engineer directed the database schema design and UI aesthetics.
