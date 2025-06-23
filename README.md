# 📝 MyBlog

A simple full-stack blog application built with **React**, **Node.js**, **Express**, and **Prisma**.  
Users can register, login, create posts, edit/delete them, and view the latest articles.

---

## 📦 Tech Stack

- **Frontend**: React, React Router, Bootstrap, React Hook Form, Yup
- **Backend**: Node.js, Express, Prisma, SQLite
- **Auth**: JWT (Token & Refresh Token)
- **State Management**: Zustand

---

## 🚀 Features

### 🔐 Authentication
- User registration with validation
- Login using email & password
- JWT-based token storage in Zustand + localStorage
- Auto-redirect if token expired
- Logout with token clear

---

### 🏠 Home Page
- Publicly accessible (even before login)
- Shows welcome message
- Displays latest 3 posts
- Button to write a post (if logged in), or login button otherwise

---

### 🧑‍💼 Profile Page
- Protected route (only visible if logged in)
- Displays user info (name, username, email, avatar, etc.)
- Optionally editable

---

### 📬 Posts
- View all blog posts (protected)
- Posts displayed in **cards** with title & preview
- Click to open single post page

---

### ➕ Create Post
- Form to add new blog post (title, content)
- Accessible from `/posts/create`
- Validation using `react-hook-form` + `yup`
- After creation, redirected to post page

---

### 🔍 Single Post Page
- Shows post title and full content
- Buttons to **Edit** (with modal form) and **Delete**
- On delete: confirmation alert then redirection to `/posts`
- On edit: opens a modal with Bootstrap, updates content, shows success alert

---

### 📎 Navbar
- Dynamic nav items:
  - Show "Login / Register" if not logged in
  - Show "Profile / Posts / Logout" if logged in
- Active link highlighting
- Bootstrap styled, responsive

---

## 🔧 Setup & Run Locally

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/myblog.git
   cd myblog

