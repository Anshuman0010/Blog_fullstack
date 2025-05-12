# MEAN Blog App

A full-stack blog application built using Angular, Node.js, Express, and MongoDB. This project allows users to register, log in, and perform complete CRUD operations on blog posts.

## 🌐 Tech Stack

- **Frontend**: Angular
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

---

## ✨ Features

- 🔐 **Authentication**
  - User Registration
  - User Login with JWT
  - Protected routes for post management

- 📝 **Blog Functionality**
  - Create new posts
  - View all posts
  - Edit and update posts
  - Delete posts

- 📱 **Responsive UI**
  - Clean and modern interface built with Angular
  - Responsive layout for mobile and desktop

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Anshuman0010/Blog_fullstack
cd Blog_fullstack
2. Setup Backend
cd blog-backend
npm install
npm run start
 Create a .env file in blog-backend/ with:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
3. Setup Frontend
cd ../blog-frontend
npm install
ng serve
