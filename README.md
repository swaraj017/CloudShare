# ☁️ CloudShare

CloudShare is a scalable cloud file storage platform that allows users to securely upload, manage, and share files with full access control.

Built using modern web technologies and powered by cloud object storage infrastructure.

---

## 🚀 Features

- 🔐 Secure Cloud Storage
- 📁 Public & Private File Access
- 🔎 Real-time File Search
- ⬇️ Instant File Downloads
- 🔑 API Key Management
- ⚡ Fast CDN Delivery
- 📱 Fully Responsive Dashboard
- 🧑‍💻 Developer API Support

---

## 🏗 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Backblaze B2 (Cloud Storage)

### Deployment
- Vercel (Frontend)
- Node Server (Backend)

---

## 📂 Project Structure

```
CloudShare/
│
├── backend/                     # Express Backend Server
│   ├── node_modules/
│   ├── src/
│   │   ├── connections/         # Database & cloud connections
│   │   ├── controllers/         # Route logic
│   │   ├── middleware/          # Auth & validation middleware
│   │   ├── models/              # Mongoose models
│   │   └── routes/              # API route definitions
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── index.js                 # Server entry point
│   └── package.json
│
├── client/                      # React Frontend (Vite)
│   ├── dist/                    # Production build output
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── API/                 # API request handlers
│   │   ├── assets/              # Images, fonts, icons
│   │   ├── components/          # React components
│   │   │   ├── AuthPages/       # Login/Register pages
│   │   │   ├── sideBar/         # Docs and Sidebar components
│   │   │   ├── Upload/          # File upload components
│   │   │   ├── Home.jsx
│   │   │   ├── LandPage.jsx
│   │   │   └── SharePage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── vercel.json              # SPA routing for Vercel
│   └── vite.config.js
│
├── sdk/                         # Future NPM SDK package
│
└── README.md
```


---

## 🖥 Local Development Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/CloudShare.git
cd CloudShare
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside `backend/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
B2_KEY_ID=your_backblaze_key_id
B2_APP_KEY=your_backblaze_app_key
B2_BUCKET_ID=your_bucket_id
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

```
POST   /api/file/upload-url
POST   /api/file/metadata
GET    /api/file/download/:fileId
PATCH  /api/file/toggle-access/:fileId
DELETE /api/file/:fileId
```

---

## 🔐 Access Control

Each file can be:

- **Private** → Accessible only by owner
- **Public** → Generates shareable link

Upcoming features:
- Expiring links
- Signed URLs
- Advanced sharing permissions

---

## 📦 Storage Plans

| Plan      | Storage | Price |
|-----------|---------|-------|
| Free      | 400 MB  | Free  |
| Pro       | 10 GB   | $5/mo |
| Business  | 100 GB  | $15/mo |

---

## 📚 Developer SDK (Coming Soon)

```bash
npm install cloudshare-sdk
```

Example usage:

```js
import { uploadFile } from "cloudshare-sdk"

await uploadFile(file, {
  apiKey: "YOUR_API_KEY",
  isPublic: true
})
```

---

## 🔒 Security

- Authenticated API requests
- Secure cloud infrastructure
- Access-controlled file visibility
- Encrypted file transfers

---

## 🛣 Comming Soon

- [ ] Paid subscription tiers
- [ ] Custom bucket management
- [ ] Expiring public links
- [ ] Role-based access control
- [ ] Official NPM SDK release
- [ ] Analytics dashboard

---

## 🌍 Live  

https://cloud-share-sys.vercel.app/

---
 

