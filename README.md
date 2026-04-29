# 🦷 Sky Dental Hospital — Full-Stack Hospital Website

A complete full-stack web application for **Sky Dental Hospital** (skydentalhospital.in). Built with React.js on the frontend and Node.js + Express on the backend, backed by MongoDB and Cloudinary. The platform lets patients explore services, meet the dental team, browse the gallery, submit reviews, and book appointments — all managed through a secure admin dashboard with real-time analytics.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Database Schemas](#database-schemas)
- [Admin Panel](#admin-panel)
- [Analytics System](#analytics-system)
- [Docker & Deployment](#docker--deployment)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6 |
| Backend | Node.js, Express 5 |
| Database | MongoDB + Mongoose 9 |
| Authentication | JWT (jsonwebtoken) |
| Cloud Storage | Cloudinary |
| File Uploads | Multer (memory storage) |
| Password Hashing | bcryptjs |
| Web Server | Nginx (production) |
| Containerisation | Docker |

---

## ✨ Features

### Public Website
- **Home Page** — Hero banner, About section, CEO section, promotional video, Providers (doctors) grid, Services overview, Facilities section, and Testimonials
- **Services Pages** — Dedicated detail pages for Cosmetic & Advanced Dentistry, Dental Implants & Restorative Care, Braces & Invisalign, and Smile Makeover
- **Doctor Profiles** — Individual doctor profile pages with bio, designation, experience, and social links
- **Gallery** — Sectioned photo and video gallery managed by admin
- **Facility Detail** — Detailed facility information page
- **Review Page** — Public review submission form (star rating + text); displays admin-approved reviews
- **Book Appointment** — Appointment booking page with clinic contact details
- **Contact Page** — Contact form that saves messages to the database

### Admin Panel (`/admin`)
- JWT-secured login with role-based access (Admin / Superadmin)
- Contact Messages — view and delete incoming enquiries
- Video Management — upload/replace the homepage promotional video
- Team Management — add, edit, delete, and reorder doctor cards (with Cloudinary image upload)
- Team Details — manage each doctor's full profile (bio, designation, experience, social links)
- Review Management — approve/unapprove or delete patient reviews; toggle auto-approve setting
- Review QR Code — auto-generated QR code pointing to the public review submission page
- Gallery Management — create sections, add images/videos per section, delete items
- Analytics Dashboard — real-time visitor sessions, page analytics, geo-map, and CSV export
- User Management *(Superadmin only)* — create/deactivate/delete admin users

---

## 📁 Project Structure

```
Sky-Dental-Hospital/
├── client/                        ← React frontend
│   ├── Dockerfile                 ← Multi-stage build (Node → Nginx)
│   ├── nginx.conf                 ← Nginx config with SSL + API proxy
│   └── src/
│       ├── admin/                 ← Admin panel pages & styles
│       │   ├── auth/login.jsx
│       │   ├── adminlayout.jsx
│       │   ├── admincontact.jsx
│       │   ├── VideoManagement.jsx
│       │   ├── TeamManagement.jsx
│       │   ├── TeamDetails.jsx
│       │   ├── ReviewManagement.jsx
│       │   ├── ReviewQR.jsx
│       │   ├── GalleryManagement.jsx
│       │   ├── AnalyticsDashboard.jsx
│       │   ├── UserAnalyticsDetail.jsx
│       │   └── usermanagement.jsx
│       ├── components/            ← Reusable UI components
│       │   ├── Header.jsx
│       │   ├── Footer.jsx
│       │   ├── Hero.jsx
│       │   ├── AboutSection.jsx
│       │   ├── CEOSection.jsx
│       │   ├── VideoSection.jsx
│       │   ├── ProvidersGrid.jsx
│       │   ├── FacilitiesSection.jsx
│       │   ├── Testimonials.jsx
│       │   ├── ContactForm.jsx
│       │   ├── ScrollToTop.jsx
│       │   └── service/
│       │       ├── Services.jsx
│       │       ├── CosmeticDentistrySlider.jsx
│       │       ├── DentalImplantsSlider.jsx
│       │       ├── OrthodonticsSlider.jsx
│       │       └── SmileMakeoverSlider.jsx
│       ├── pages/                 ← Route-level pages
│       │   ├── Home.jsx
│       │   ├── About.jsx
│       │   ├── Contact.jsx
│       │   ├── Gallery.jsx
│       │   ├── DoctorProfile.jsx
│       │   ├── FacilityDetail.jsx
│       │   ├── BookAppointment.jsx
│       │   ├── ReviewPage.jsx
│       │   ├── adminpanel.jsx
│       │   └── ServiceDetail/
│       │       ├── ServiceDetail.jsx
│       │       ├── CosmeticAdvancedDentistry.jsx
│       │       ├── ImplantsRestorativeCare.jsx
│       │       ├── BracesInvisalign.jsx
│       │       └── SmileMakeover.jsx
│       └── styles/                ← CSS files
│
└── server/                        ← Express backend
    ├── Dockerfile
    ├── server.js                  ← App entry point
    ├── config/
    │   ├── db.js                  ← MongoDB connection
    │   └── cloudinary.js          ← Cloudinary SDK config
    ├── models/
    │   ├── User.js
    │   ├── Doctor.js
    │   ├── DoctorProfile.js
    │   ├── Review.js
    │   ├── GallerySection.js
    │   ├── Media.js
    │   ├── Message.js
    │   ├── Analytics.js
    │   └── GlobalSettings.js
    ├── routes/
    │   ├── userRoutes.js
    │   ├── doctorRoutes.js
    │   ├── doctorProfileRoutes.js
    │   ├── reviewRoutes.js
    │   ├── galleryRoutes.js
    │   ├── mediaRoutes.js
    │   ├── contactRoutes.js
    │   └── analyticsRoutes.js
    ├── controllers/               ← Business logic
    └── middleware/
        ├── auth.js                ← JWT verification
        └── errorHandler.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account

### 1. Clone the repository

```bash
git clone https://github.com/your-org/sky-dental-hospital.git
cd sky-dental-hospital
```

### 2. Set up environment variables

Create a `.env` file inside the `server/` directory.

### 3. Install dependencies and run in development

```bash
# Server
cd server && npm install
node server.js

# Client (new terminal)
cd client && npm install
npm start
```

The React app runs on `http://localhost:3000` and proxies `/api` requests to the Express server on `http://localhost:5000` (configured via `"proxy"` in `client/package.json`).

---

## 🔐 Environment Variables

Create `server/.env`:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/sky-dental

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=5000
```

---

## 📡 API Reference

Protected routes require `Authorization: Bearer <token>` header.

### Users / Auth — `/api/users`

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/users/login` | Public | Login and receive JWT |
| GET | `/api/users` | Admin | List all admin users |
| POST | `/api/users` | Admin | Create new admin user |
| PATCH | `/api/users/:id/toggle` | Admin | Activate / deactivate user |
| DELETE | `/api/users/:id` | Admin | Delete user |

### Doctors — `/api/doctors`

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/doctors` | Public | List all doctors |
| POST | `/api/doctors` | Admin | Add doctor (image upload) |
| PUT | `/api/doctors/:id` | Admin | Update doctor |
| DELETE | `/api/doctors/:id` | Admin | Delete doctor |

### Doctor Profiles — `/api/doctor-profiles`

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/doctor-profiles` | Public | List all profiles |
| GET | `/api/doctor-profiles/:doctorId` | Public | Get profile for a doctor |
| POST | `/api/doctor-profiles/:doctorId` | Admin | Create or update profile (upsert) |
| PUT | `/api/doctor-profiles/:doctorId` | Admin | Create or update profile (upsert) |
| DELETE | `/api/doctor-profiles/:doctorId` | Admin | Delete profile |

### Reviews — `/api/reviews`

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/reviews` | Public | Submit a patient review |
| GET | `/api/reviews/approved` | Public | Fetch approved reviews for display |
| GET | `/api/reviews` | Admin | Fetch all reviews |
| PATCH | `/api/reviews/:id/toggle` | Admin | Approve / unapprove a review |
| DELETE | `/api/reviews/:id` | Admin | Delete a review |
| GET | `/api/reviews/settings/auto-approve` | Admin | Get auto-approve status |
| PATCH | `/api/reviews/settings/auto-approve` | Admin | Toggle auto-approve |

### Gallery — `/api/gallery`

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/gallery` | Public | Get all gallery sections with items |
| POST | `/api/gallery` | Admin | Create a new gallery section |
| PUT | `/api/gallery/:id` | Admin | Update section title/order |
| DELETE | `/api/gallery/:id` | Admin | Delete section and all its items |
| POST | `/api/gallery/:sectionId/items` | Admin | Upload image or video to a section |
| DELETE | `/api/gallery/:sectionId/items/:itemId` | Admin | Delete a gallery item |

### Media (Video) — `/api/media`

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/media/upload` | Admin | Upload/replace homepage video |
| GET | `/api/media/latest` | Public | Get the current video URL |
| DELETE | `/api/media/:id` | Admin | Delete media |

### Contact — `/api/contact`

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/contact` | Public | Submit a contact message |
| GET | `/api/contact` | Admin | Fetch all messages |
| DELETE | `/api/contact/:id` | Admin | Delete a message |

### Analytics — `/api/analytics`

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/analytics/track-visit` | Public | Record a page visit |
| POST | `/api/analytics/update-location` | Public | Update visitor geo data |
| GET | `/api/analytics` | Admin | Full analytics dataset |
| GET | `/api/analytics/user/:sessionId` | Admin | Session-level visitor details |
| GET | `/api/analytics/geo-map` | Admin | Geographic distribution data |
| GET | `/api/analytics/export/visits` | Admin | Export visit data as CSV |
| GET | `/api/analytics/export/users` | Admin | Export user data as CSV |

---

## 🗄 Database Schemas

### User
```js
{
  username: String (unique, required),
  password: String (bcrypt hashed, required),
  role:     'Superadmin' | 'Admin',
  status:   'Active' | 'Inactive',
  lastLogin: Date
}
```

### Doctor
```js
{
  name:            String (required),
  specialty:       String (required),
  image_url:       String (Cloudinary URL, required),
  image_public_id: String (required),
  order:           Number,
  createdAt:       Date
}
```

### DoctorProfile
```js
{
  doctor:      ObjectId → Doctor (unique, required),
  designation: String,
  experience:  String,
  bio1:        String,
  bio2:        String,
  email:       String,
  facebook:    String,
  instagram:   String,
  createdAt:   Date
}
```

### Review
```js
{
  name:      String (required),
  rating:    Number (1–5, required),
  text:      String (required),
  approved:  Boolean (default: false),
  createdAt: Date
}
```

### GallerySection
```js
{
  title: String (required),
  order: Number,
  items: [{
    url:           String (Cloudinary URL),
    public_id:     String,
    resource_type: 'image' | 'video',
    createdAt:     Date
  }],
  timestamps
}
```

### Media
```js
{
  url:           String (Cloudinary URL, required),
  public_id:     String (required),
  resource_type: String (required),
  uploadedAt:    Date
}
```

### Message
```js
{
  name:       String (required),
  email:      String (required),
  phone:      String,
  message:    String (required),
  receivedOn: Date
}
```

### Analytics
```js
{
  username:  String (default: 'Anonymous'),
  sessionId: String (unique, required),
  visits: [{
    location:   String,
    timeSpent:  Number (seconds),
    exitReason: String,
    timestamp:  Date
  }],
  ipAddress: String,
  userAgent: String,
  location: { city, region, country, latitude, longitude },
  firstVisit: Date,
  lastVisit:  Date,
  indexes: [username, visits.timestamp, firstVisit]
}
```

### GlobalSettings
```js
{
  key:   String (unique, required),
  value: Mixed
  // Used for storing configurable settings e.g. review auto-approve toggle
}
```

---

## 🖥 Admin Panel

Access the admin panel at `/admin/login`.

| Module | What you can do |
|---|---|
| **Contact Messages** | View and delete incoming patient enquiries |
| **Video Management** | Upload or replace the homepage promotional video |
| **Team Management** | Add, edit, reorder, and delete doctor cards with photo upload |
| **Team Details** | Manage each doctor's full profile: bio, designation, experience, email, and social links |
| **Review Management** | Approve/unapprove or delete patient reviews; toggle global auto-approve setting |
| **Review QR Code** | Print or display a QR code linking patients to the public review submission page |
| **Gallery Management** | Create named sections, upload images/videos per section, delete items |
| **Analytics Dashboard** | Live session data, page visit stats, geo-map, per-user drill-down, CSV export |
| **User Management** | *(Superadmin only)* Create, activate/deactivate, and delete admin accounts |

---

## 📊 Analytics System

A client-side tracker silently records every visitor session without requiring login:

- Unique `sessionId` generated per browser session
- Every page navigation logged with page name, time spent, and exit reason
- Optional geo-location capture (city, region, country, coordinates)
- All data stored in the `Analytics` MongoDB collection
- Admin dashboard provides session tables, most-visited pages, average dwell time, geographic heat-map, and CSV exports

---

## 🐳 Docker & Deployment

Both services ship with individual Dockerfiles, ready for deployment on any container platform.

### Client — Multi-stage build

```
Stage 1 (node:18-alpine)  →  npm run build  →  React static files
Stage 2 (nginx:alpine)    →  Serves build/ on port 80
```

Nginx is configured to:
- Redirect HTTP → HTTPS automatically
- Serve the React SPA with `try_files` fallback for client-side routing
- Proxy all `/api/*` requests to the backend container on port 5000
- Accept request bodies up to **200 MB** for large media uploads
- Terminate SSL using Let's Encrypt certificates for `skydentalhospital.in`

### Server

```
node:18-alpine  →  npm install --production  →  node server.js (port 5000)
```

Request body limit is set to **200 MB** and server timeout to **600 seconds** to support large video uploads.

### Production Tips

- Set all environment variables as Docker secrets or host env vars — never commit `.env`
- Use MongoDB Atlas for a managed, cloud-hosted database
- Cloudinary free tier provides 25 GB storage, sufficient for most clinic media needs

---

## 📄 License

This project is proprietary software developed for Sky Dental Hospital. All rights reserved.
