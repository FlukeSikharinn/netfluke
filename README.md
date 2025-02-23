# 🎬 Netfluke (Netflix Clone)

Netfluke เป็นเว็บแอปพลิเคชันที่ใช้ **Next.js + NestJS** จำลองระบบคล้าย Netflix เพื่อแสดงข้อมูลของหนังและรายการต่างๆ โดยจะใช้ Next.js + tailwind เป็น Frontend และใช้ NestJS เป็น Backend ในการทำ API Gateway เพื่อเชื่อมต่อกับ Free Movie API ในที่นี้จะใช้เป็น themoviedb (TMDB)

## 🚀 Features
- 🎥 **แสดงรายการหนัง**: ดึงข้อมูลจาก Free Movie API (TMDB) และแสดงผลแบบ Netflix UI โดยใช้ Tailwind CSS เป็น UI framework หลัก
- 📝 **รายละเอียดหนัง**: กดดูข้อมูลนักแสดง, แนวหนัง, และคะแนน
- 📡 **API Gateway**: ใช้ **NestJS** เป็น API Gateway ที่เชื่อมกับ Free Movie API (TMDB)
- 🛠 **CI/CD**: ใช้ **Vercel** ในการ Deploymentและใน Vercel ก็ทำ Auto Deployment ให้ ไม่ต้องมาทำ CI/CD เอง

## 🏗️ สถาปัตยกรรม (Architecture)

📂 Netfluke 
├── 🖥️ frontend (Next.js) 
│ ├── app
│ │ ├── components/ # UI Components 
│ │ ├── hooks/ # Custom Hooks 
│ │ ├── services/ # API Calls (Axios) 
│ │ └── types/ # Set types
│ ├── css # style tailwind
│ ├── layout 
│ ├── page # main page
├── 🖥️ backend (NestJS) 
│ ├── src/ 
│ │ ├── movies/
│ │ │ ├── controllers/ # API Controllers 
│ │ │ ├── services/ # Business Logic 
│ │ │ ├── modules/ # Feature Modules 
│ │ ├── main.ts # Entry Point 
│ ├── .env # Environment Variables


## 🛠 การติดตั้ง (Installation)

### 🔹 **1. Clone โปรเจค**
```sh
git clone https://github.com/FlukeSikharinn/netfluke.git
cd netfluke

### 🔹 **2. ติดตั้ง Dependencies**
# Frontend
cd netfluke-frontend
npm install

# Backend
cd ../netfluke-backend
npm install

### 🔹 **3. ตั้งค่า .env**
# Frontend
TMDB_API_IMAGE="https://image.tmdb.org/t/p/w500"
NEXT_PUBLIC_NEST_BACKEND_URL=YOUR_BACKEND_URL

# Backend
TMDB_API_KEY=YOUR_TMDB_API_KEY
TMDB_BASE_URL=https://api.themoviedb.org/3
PORT=4000
FRONTEND_URL=YOUR_FRONTEND_URL
CORS_ORIGINS=YOUR_FRONTEND_URL,YOUR_FRONTEND_URL

### 🔹 **4. รันโปรเจค**
# Frontend (Next.js)
cd frontend
npm run dev

# Backend (NestJS)
cd backend
npm run start

```

📌 Netfluke API Documentation  
🔗 ดู API และทดสอบได้ที่: https://ys2bwyexkr.apidog.io

Method |  Endpoint |  Description 
----- | ----- | ----- |
GET | https://netfluke-backend.vercel.app/movies/home | ดึงรายการหนังสำหรับหน้าแรก |
GET | https://netfluke-backend.vercel.app/movies/{id}/details | ดูรายละเอียดของหนัง |

🚀 สามารถกด "Try API" เพื่อยิง API ได้ทันที

##  🚀 Deployment
Frontend: Hosted on Vercel (🔗 Netfluke)
Backend: Hosted on Vercel (🔗 API)

## 🏗 Tech Stack
Frontend: Next.js, Tailwind CSS
Backend: NestJS, TMDB API
Deployment: Vercel, CI/CD

