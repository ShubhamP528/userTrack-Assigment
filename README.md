# 📦 User Submission Tracker – MERN Stack Developer Assignment

## 🚀 Project Overview

This is a **MERN stack backend application** built to manage user form submissions with **file uploads (PDFs & images)**, including **metadata extraction** and **MongoDB aggregation-based analytics**.

It is developed as part of a technical assignment for a MERN Stack Developer role, following clean code architecture and industry best practices.

---

## 🛠️ Tech Stack

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **Multer** – file upload
- **pdf-parse** – PDF metadata
- **image-size** – image metadata
- **JWT** – authentication
- **express-rate-limit** – API protection
- **dotenv** – environment management

---

## 📁 Folder Structure

```
├── controllers
├── models
├── routes
├── middleware
├── utils
├── uploads
├── index.js
├── .env
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ShubhamP528/userTrack-Assigment.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file using the template provided:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/submission-tracker
JWT_SECRET=your_jwt_secret
```

### 4. Start the Server

```bash
npm run dev
```

---

## 🔐 JWT Authentication

- Register via `POST /api/auth/register`
- Login via `POST /api/auth/login`
- Use the token in `Authorization: Bearer <token>` header for protected routes

---

## 📤 File Upload + Metadata Extraction

- Accepts `.jpg`, `.png`, `.pdf`
- Images: extracts width and height
- PDFs: extracts page count

Files are saved in `/uploads` directory with extracted metadata saved in MongoDB.

---

## 📊 Analytics via MongoDB Aggregation

### 🔹 Top 3 Users by Submissions

`GET /api/analytics/top-users`

```json
[{ "userId": "...", "name": "John", "totalSubmissions": 5 }]
```

### 🔹 Files Report Grouped by Category & Type

`GET /api/analytics/files-report`

```json
{
  "Research": { "pdf": 4, "image": 2 },
  "Application": { "pdf": 1, "image": 3 }
}
```

---

## 📌 API Endpoints

### 📄 Submissions

- `POST /api/submissions` – Create submission (protected)
- `GET /api/submissions/:id` – Get submission details (protected)

### 📈 Analytics

- `GET /api/analytics/top-users`
- `GET /api/analytics/files-report`

### 🔑 Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

---

## ⏱️ Rate Limiting

- Limits requests to **100 per 15 minutes** per IP using `express-rate-limit`

---

## 📋 Assumptions

- User must be authenticated before submitting files
- File upload limit is enforced by Multer
- No frontend is included – this is a backend-only implementation

---

## ⏳ Time Taken

- \~6–8 hours for core features
- +2 hours for bonuses (JWT, rate limit, Docker, docs)

---

## 🔚 Final Notes

- Production-ready code structure
- Follows MVC pattern and separation of concerns
- Easily extensible for frontend, admin panel, or CI/CD

---

## 📬 Submission

Submit the public GitHub link to:
**[info@easesmith.com](mailto:info@easesmith.com)**
Subject: `MERN Assignment – Shubham Prajapati`
