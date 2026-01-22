# 🧑‍💼 HRMS Lite – Full-Stack Coding Assignment

HRMS Lite is a lightweight **Human Resource Management System** built as part of a full-stack coding assignment.  
The application allows an admin to **manage employee records** and **track daily attendance** with a clean, professional, and production-ready interface.

---

## 🚀 Live Application

- **Frontend (Netlify)**  
  https://dolly-hrms-lite.netlify.app/

- **Backend API (Render)**  
  https://hrms-lite-7uyb.onrender.com  
  **Swagger Docs:** https://hrms-lite-7uyb.onrender.com/docs

- **GitHub Repository**  
  https://github.com/dollysingh42/hrms-lite

---

## 🧩 Features Implemented

### 👤 Employee Management
- Add new employee:
  - Employee ID (unique)
  - Full Name
  - Email Address (validated)
  - Department
- View all employees
- Delete employee
- Duplicate and validation handling

### 🕒 Attendance Management
- Mark attendance:
  - Date
  - Status (Present / Absent)
- View attendance records per employee
- Persistent storage in database

### 🖥️ UI & UX
- Clean admin dashboard UI
- Responsive layout
- Sidebar navigation
- Reusable components
- UI states:
  - Loading indicators
  - Empty states
  - Action-level loaders (delete employee)

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Axios
- Netlify (Deployment)

### Backend
- FastAPI (Python)
- SQLAlchemy
- MySQL
- Render (Deployment)

### Database
- MySQL

---

## 🧪 Backend API Overview

| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/employees` | Get all employees |
| POST | `/employees` | Add new employee |
| DELETE | `/employees/{id}` | Delete employee |
| POST | `/attendance` | Mark attendance |
| GET | `/attendance/{employee_id}` | Get attendance by employee |

- RESTful design
- Server-side validation
- Proper HTTP status codes
- Meaningful error messages

---

## 🗄️ Database Structure

### Employees Table

| Column Name | Type | Description |
|------------|------|-------------|
| id | INT (PK) | Auto-increment primary key |
| employee_id | VARCHAR | Unique employee identifier |
| full_name | VARCHAR | Employee full name |
| email | VARCHAR | Unique email address |
| department | VARCHAR | Department name |
| created_at | DATETIME | Record creation time |

---

### Attendance Table

| Column Name | Type | Description |
|------------|------|-------------|
| id | INT (PK) | Auto-increment primary key |
| employee_id | INT (FK) | References employees.id |
| date | DATE | Attendance date |
| status | ENUM | Present / Absent |
| created_at | DATETIME | Record creation time |

---

### Relationships
- One employee can have multiple attendance records
- Foreign key constraint ensures referential integrity between employees and attendance


## ⚙️ Backend Setup

### Prerequisites
- Python 3.9+
- MySQL
- pip / virtualenv

### Steps

```bash
cd backend
python -m venv venv
source venv/bin/activate    # macOS / Linux
venv\Scripts\activate       # Windows

pip install -r requirements.txt
