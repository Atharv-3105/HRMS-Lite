# HRMS Lite — Full Stack Coding Assignment

**HRMS Lite** is a lightweight, production-ready Human Resource Management System built to demonstrate end-to-end full-stack development skills.


The application allows an **admin user** to manage employee records and track daily attendance through a clean, intuitive web interface.

---

## Live Demo

- **Frontend (Vercel):** https://hrms-lite-tan-nu.vercel.app/
- **Backend API (Render):** https://hrms-lite-ds5d.onrender.com
>  The application is fully deployed and publicly accessible as required.

---

##  Features

### Employee Management
- Add new employees with:
  - Employee ID (unique)
  - Full name
  - Email (validated)
  - Department
- View all employees in a directory-style table
- Delete employees
- Display **total present days per employee** (bonus)

### Attendance Management
- Mark attendance for an employee:
  - Date
  - Status (Present / Absent)
- View attendance records per employee
- **Filter attendance records by date** (bonus)
- Prevent duplicate attendance entries for the same employee on the same date

---

##  Bonus Features Implemented

- ✅ Display total present days per employee  
- ✅ Filter attendance records by date  

These were implemented in a **backend-first, low-risk manner** without overcomplicating the UI.

---

##  Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router
- Plain CSS (clean, professional UI)

### Backend
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### Database
- PostgreSQL (Render)
- SQLite (local development fallback)

### Deployment
- **Frontend:** Vercel  
- **Backend:** Render  

---

## 📂 Project Structure
```
HRMS_LITE/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   └── main.py
│   └── requirements.txt
│   
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── styles/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```
---
## 🔗 Backend API Overview

### Employee APIs
- `POST /employees` — Add employee
- `GET /employees` — List employees
- `DELETE /employees/{id}` — Delete employee
- `GET /employees/{id}/present-days` — Get total present days (bonus feature)

### Attendance APIs
- `POST /attendance` — Mark attendance
- `GET /attendance/{employee_id}` — Get attendance records
- `GET /attendance/{employee_id}?date=YYYY-MM-DD` — Filter by date (bonus feature)

---

## 🧪 Validations & Error Handling

- Required field validation
- Email format validation
- Duplicate employee ID & email handling
- One attendance entry per employee per day
- Proper HTTP status codes
- Meaningful error messages
- Graceful handling of invalid requests

---
